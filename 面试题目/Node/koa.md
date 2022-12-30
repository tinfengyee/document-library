## [洋葱模型](https://juejin.cn/post/7012031464237694983)

本文将讲解 `koa` 的洋葱模型，我们为什么要使用洋葱模型，以及它的原理实现。掌握洋葱模型对于理解 `koa` 至关重要，希望本文对你有所帮助~

## 什么是洋葱模型

先来看一个 `demo`

```js
const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use((ctx, next) => {
    console.log(1);
    next();
    console.log(2);
});

// 中间件 2 
app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
});

app.listen(8000, '0.0.0.0', () => {
    console.log(`Server is starting`);
});
复制代码
```

输出的结果是：

```
1
3
4
2
复制代码
```

在 `koa` 中，中间件被 `next()` 方法分成了两部分。`next()` 方法上面部分会先执行，下面部门会在后续中间件执行全部结束之后再执行。可以通过下图直观看出：

![img](./Koa.assets/461dbf9917634fe1a1b578237ad78600tplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

在洋葱模型中，每一层相当于一个中间件，用来处理特定的功能，比如错误处理、`Session` 处理等等。其处理顺序先是 `next()` 前请求（`Request`，从外层到内层）然后执行 `next()` 函数，最后是 `next()` 后响应（`Response`，从内层到外层），也就是说**每一个中间件都有两次处理时机**。

![img](./Koa.assets/65c691fe2b7842ed831b6069af4f463dtplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

## 为什么 Koa 使用洋葱模型

假如不是洋葱模型，我们中间件依赖于其他中间件的逻辑的话，我们要怎么处理？

比如，我们需要知道一个请求或者操作 `db` 的耗时是多少，而且想获取其他中间件的信息。在 `koa` 中，我们可以使用 `async await` 的方式结合洋葱模型做到。

```js
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const delta = new Date() - start;
  console.log (`请求耗时: ${delta} MS`);
  console.log('拿到上一次请求的结果：', ctx.state.baiduHTML);
})

app.use(async(ctx, next) => {
  // 处理 db 或者进行 HTTP 请求
  ctx.state.baiduHTML = await axios.get('http://baidu.com');
})
复制代码
```

![img](./Koa.assets/9f4a4d62b44d4cdb9864745bf58af842tplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

而假如没有洋葱模型，这是做不到的。

## 深入 Koa 洋葱模型

我们以文章开始时候的 `demo` 来分析一下 `koa` 内部的实现。

```js
const Koa = require('koa');

//Applications
const app = new Koa();

// 中间件1
app.use((ctx, next) => {
  console.log(1);
  next();
  console.log(2);
});

// 中间件 2 
app.use((ctx, next) => {
  console.log(3);
  next();
  console.log(4);
});

app.listen(9000, '0.0.0.0', () => {
    console.log(`Server is starting`);
});
复制代码
```

### use 方法

`use` 方法就是做了一件事，维护得到 `middleware` 中间件数组

```js
  use(fn) {
    // ...
    // 维护中间件数组——middleware
    this.middleware.push(fn);
    return this;
  }
复制代码
```

### listen 方法 和 callback 方法

执行 `app.listen` 方法的时候，其实是 `Node.js` 原生 `http` 模块 `createServer` 方法创建了一个服务，其回调为 `callback` 方法。`callback` 方法中就有我们今天的重点 `compose` 函数，它的返回是一个 `Promise` 函数。

```js
  listen(...args) {
    debug('listen');
    // node http 创建一个服务
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    // 返回值是一个函数
    const fn = compose(this.middleware);
    const handleRequest = (req, res) => {
      // 创建 ctx 上下文环境
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }
复制代码
```

`handleRequest` 中会执行 `compose` 函数中返回的 `Promise` 函数并返回结果。

```js
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    // 执行 compose 中返回的函数，将结果返回
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
复制代码
```

### koa-compose

`compose` 函数引用的是 `koa-compose` 这个库。其实现如下所示：

```js
function compose (middleware) {
  // ...
  return function (context, next) {
    // last called middleware #
    let index = -1
    // 一开始的时候传入为 0，后续会递增
    return dispatch(0)
    function dispatch (i) {
      // 假如没有递增，则说明执行了多次
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 拿到当前的中间件
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      // 当 fn 为空的时候，就会开始执行 next() 后面部分的代码
      if (!fn) return Promise.resolve()
      try {
        // 执行中间件，留意这两个参数，都是中间件的传参，第一个是上下文，第二个是 next 函数
        // 也就是说执行 next 的时候也就是调用 dispatch 函数的时候
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
复制代码
```

代码很简单，我们来看看具体的执行流程是怎样的：

当我们执行第一次的时候，调用的是 `dispatch(0)`，这个时候 i 为 0，`fn` 为第一个中间件函数。并执行中间件，留意这两个参数，都是中间件的传参，第一个是上下文，第二个是 `next` 函数。也就是说**中间件执行 next 的时候也就是调用 dispatch 函数的时候**，这就是为什么执行 `next` 逻辑的时候就会执行下一个中间件的原因：

```js
return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
复制代码
```

当第二、第三次执行 `dispatch` 的时候，跟第一次一样，分别开始执行第二、第三个中间件，执行 `next()` 的时候开始执行下一个中间件。

当执行到第三个中间件的时候，执行到 `next()` 的时候，`dispatch` 函数传入的参数是 3，`fn` 为 `undefined`。这个时候就会执行

```js
if (!fn) return Promise.resolve()
复制代码
```

这个时候就会执行第三个中间件 `next()` 之后的代码，然后是第二个、第一个，从而形成了洋葱模型。

其过程如下所示：

![img](./Koa.assets/85ec89edd9cf46f889fbe3d4597fa32atplv-k3u1fbpfcp-zoom-in-crop-mark4536000.webp)

## 简易版 compose

模范 `koa` 的逻辑，我们可以写一个简易版的 `compose`。方便大家的理解：

```js
const middleware = []
let mw1 = async function (ctx, next) {
    console.log("next前，第一个中间件")
    await next()
    console.log("next后，第一个中间件")
}
let mw2 = async function (ctx, next) {
    console.log("next前，第二个中间件")
    await next()
    console.log("next后，第二个中间件")
}
let mw3 = async function (ctx, next) {
    console.log("第三个中间件，没有next了")
}

function use(mw) {
  middleware.push(mw);
}

function compose(middleware) {
  return (ctx, next) => {
    return dispatch(0);
    function dispatch(i) {
      const fn = middleware[i];
      if (!fn) return;
      return fn(ctx, dispatch.bind(null, i+1));
    }
  }
}

use(mw1);
use(mw2);
use(mw3);

const fn = compose(middleware);

fn();
复制代码
```

## 总结

`Koa` 的洋葱模型指的是以 `next()` 函数为分割点，先由外到内执行 `Request` 的逻辑，再由内到外执行 `Response` 的逻辑。通过洋葱模型，将多个中间件之间通信等变得更加可行和简单。其实现的原理并不是很复杂，主要是 `compose` 方法。