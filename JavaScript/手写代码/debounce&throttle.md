# 防抖和节流 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-25 02:00:48
> LastEditTime: 2022-08-25 02:54:49
> Description: NO Desc

防抖(debounce)和节流(throttle)两词其实并非计算机领域的原生词语。追根溯源，防抖一词来自于弱电领域，指代的是消除外界对于开关扰动的技术。而节流来自于流体力学，指代的是限定流体流量的一种技术。由于JavaScript拥有事件驱动的特性，为避免事件频繁触发导致性能的损耗，防抖和节流这两种技术在JavaScript中亦被广泛应用。

# 1. 为什么需要防抖和节流？

日常与浏览器打交道比较多的前端开发者对于浏览器的各种事件想必都不会陌生，我们会针对某一个特定的事件绑定对应的响应函数，在事件被触发时让浏览器自动调用该函数。

```javascript
function onResizeHandler() {
    // do something on resize
}

window.addEventListener('resize', onResizeHandler);
```

如果只是一些触发频率很低的事件，那么上面的代码并没有什么问题。但是如果像resize这样可能在短时间内被频繁触发的事件（比如click/keydown/touchStart等），我们不去做任何的处理的话，可能导致事件的响应函数在短时间内被大量的触发，造成浏览器卡顿，伤害用户体验。

而节流和防抖一个很经典的应用场景就是去控制我们的事件的触发，节省浏览器开销。

# 2. 什么是防抖

JavaScript中的防抖指的是只有在x ms内没有调用该函数，才会真正调用该函数。如下图

![img](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220825020311.jpeg)

该图上方是事件触发的次数，下方是响应函数触发的次数，可以发现在事件大量被触发时(色块密集)，响应函数并没有被触发。当事件停止触发一段事件后(三个色块的时间间隔)后，响应函数才会被真正的触发。

如果你想自己试试上面的例子，可以访问这个 [codePen](https://codepen.io/dcorb/pen/KVxGqN) 。

## 2.1. debounce实现

这是高程中的经典代码：

```javascript
function debounce(method, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 100);
}
```

防抖函数其实是一个高阶函数，接收一个函数和防抖事件作为参数，返回值为防抖处理的函数。

的实现其实很简单，我们需要的是是一个定时器，如果在定时器的定时结束前，响应函数被触发的话则重置这个定时器的时间。

### 2.1.1. 通过闭包缓存一个定时器(setTimeout)

```javascript
// 实现 1
// fn 是需要防抖处理的函数
// wait 是时间间隔
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)

```

### 2.1.2. 通过闭包缓存一个定时器(时间戳)

```javascript
function debounce(fn, wait = 100) {
  let lastTime;
  return function (...args) {
    let now = Date.now();
    if (lastTime && now - lastTime > wait) {
      fn.apply(this, args);
    }
    lastTime = Date.now();
  };
}

function testFn() {
  console.log('tFn');
}
setInterval(debounce(testFn), 50);
```

### 2.1.3. 实现防抖第一次触发

下面的函数添加了leading参数。传统的防抖函数响应函数第一次触发也需要等待x ms，使用该参数可让响应函数立即进行触发，结合上面两种时间戳和定时器方法实现一下函数。

```javascript
function debounce(fn, wait, leading=false) {
  /** @type {number} */
  let timer;
  /** @type {number} */
  let lastCallTime;
  /** @type {boolean} */
  let isInvoked = false;
  return function debounced(...args) {
    const context = this;
    const thisCallTime = Date.now();
    if(leading) {
      if(!isInvoked) {
        fn.apply(context, args);
        isInvoked = true;
      }
      if(lastCallTime && thisCallTime - lastCallTime >= wait) {
        fn.apply(context, args);
      }
      lastCallTime = Date.now();
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), wait);
  }
}
```

## 2.2. 防抖的应用场景

防抖函数的应用场景很多，比如我们需要得到浏览器窗口resize前后窗口的大小。

```javascript
function onResizeHandler() {
    return  `${window.width()} + ${window.height()}`;
}
```

当浏览器窗口被拖动的时候，这个响应函数便会触发多次，但是我们实际上想得到的只有resize前和resize后的窗口大小。这时候使用防抖便能很好的解决这个问题。

另一个很经典的使用场景是表单验证，往往表单验证是和input框的onChange绑定在一起的。

```javascript
function onChange(e) {    validate(e.target.value); }
```

但是如果直接绑定onChange事件，用户的每个字符输入都会触发校验，可能会造成输入卡顿或者给用户抛出错误的校验失败信息，伤害用户体验。这时候如果我们给onChange绑定的是一个经过防抖处理的响应函数，便能很好的避免这种问题了。

# 3. 什么是节流

节流指的是在x ms内，某一个函数只能被触发一次。即固定间隔触发。

![img](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220825023156.jpeg)

## 3.1. throttle 实现

### 3.1.1. 使用定时器

```javascript
function throttle(func, wait, scope) {
  var timer = null
  return function() {
    var args = arguments
    var context = scope || this
    if (!timer) {
      timer = setTimeout(function() {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
}
```

### 3.1.2. 使用时间戳

```javascript
const throttle = (fn, wait = 100) => {
  // 上一次执行 fn 的时间
  let lastTime

  let isInvoked = false
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    const now = +new Date()

    // 新增：第一次调用 start
    if (!isInvoked) {
      fn.apply(this, args)
      lastTime = Date.now()
      isInvoked = true
    }
    // 新增：第一次调用 end

    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (lastTime && now - lastTime > wait) {
      fn.apply(this, args)
      lastTime = Date.now() // 认真观察这段，使用把这段代码放到下一行就是防抖的实现的
    }
  }
}

function testFn() {
  console.log('teset');
}
setInterval(throttle(testFn, 2000), 200)
```

## 3.2. 节流的应用场景

比如对于一个Button短时间内进行多次点击，可能没有必要触发多次handler，这时候就可以对click的响应函数进行节流处理。

或者一个使用键盘控制的飞机大战的游戏，子弹的射出速度是有限制的，不管你在短时间内触发多少次发射按键，永远只会有一枚子弹被发射。

再或者是在实现无限滚动时，需要去监测内容底部是否已经接近window底部，如果是的话就需要去请求新的内容。关于无限滚动，有一个很棒的 [codePen](https://codepen.io/dcorb/pen/eJLMxa) demo。

# 4. requestAnimationFrame

在最后要提一下requestAnimationFrame这个浏览器API。这个函数可以理解为 `throttle(handler, 16)` (16为60fps计算得出) 的浏览器原生实现。当然浏览器不仅做了简单的throttle，还有一些分片和空闲thread监测功能，来保证被这个函数处理的函数能满足每秒60帧的要求。

在某些情况下我们也可以调用这个函数来完成类似throttle的功能。但是需要注意的是

- 你需要手动触发requestAnimationFrame，但是throttle一旦被设置好后是自动触发的
- requestAnimationFrame不支持IE9及以下
- requestAnimationFrame是一个浏览器API，nodejs无法使用。

# 5. underscore 源码解读

上述代码实现了一个简单的节流函数，不过 underscore 实现了更高级的功能，即新增了两个功能

配置是否需要响应事件刚开始的那次回调（ leading 参数，false 时忽略）
配置是否需要响应事件结束后的那次回调（ trailing 参数，false 时忽略）
配置 { leading: false } 时，事件刚开始的那次回调不执行；配置 { trailing: false } 时，事件结束后的那次回调不执行，不过需要注意的是，这两者不能同时配置。

所以在 underscore 中的节流函数有 3 种调用方式，默认的（有头有尾），设置 { leading: false } 的，以及设置 { trailing: false } 的。上面说过实现 throttle 的方案有 2 种，一种是通过时间戳判断，另一种是通过定时器创建和销毁来控制。

第一种方案实现这 3 种调用方式存在一个问题，即事件停止触发时无法响应回调，所以 { trailing: true } 时无法生效。

第二种方案来实现也存在一个问题，因为定时器是延迟执行的，所以事件停止触发时必然会响应回调，所以 { trailing: false } 时无法生效。

underscore 采用的方案是两种方案搭配使用来实现这个功能。

```javascript
const throttle = function(func, wait, options) {
  var timeout, context, args, result;
  
  // 上一次执行回调的时间戳
  var previous = 0;
  
  // 无传入参数时，初始化 options 为空对象
  if (!options) options = {};

  var later = function() {
    // 当设置 { leading: false } 时
    // 每次触发回调函数后设置 previous 为 0
    // 不然为当前时间
    previous = options.leading === false ? 0 : _.now();
    
    // 防止内存泄漏，置为 null 便于后面根据 !timeout 设置新的 timeout
    timeout = null;
    
    // 执行函数
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  // 每次触发事件回调都执行这个函数
  // 函数内判断是否执行 func
  // func 才是我们业务层代码想要执行的函数
  var throttled = function() {
    
    // 记录当前时间
    var now = _.now();
    
    // 第一次执行时（此时 previous 为 0，之后为上一次时间戳）
    // 并且设置了 { leading: false }（表示第一次回调不执行）
    // 此时设置 previous 为当前值，表示刚执行过，本次就不执行了
    if (!previous && options.leading === false) previous = now;
    
    // 距离下次触发 func 还需要等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    
    // 要么是到了间隔时间了，随即触发方法（remaining <= 0）
    // 要么是没有传入 {leading: false}，且第一次触发回调，即立即触发
    // 此时 previous 为 0，wait - (now - previous) 也满足 <= 0
    // 之后便会把 previous 值迅速置为 now
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        
        // clearTimeout(timeout) 并不会把 timeout 设为 null
        // 手动设置，便于后续判断
        timeout = null;
      }
      
      // 设置 previous 为当前时间
      previous = now;
      
      // 执行 func 函数
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 最后一次需要触发的情况
      // 如果已经存在一个定时器，则不会进入该 if 分支
      // 如果 {trailing: false}，即最后一次不需要触发了，也不会进入这个分支
      // 间隔 remaining milliseconds 后触发 later 方法
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  // 手动取消
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  // 执行 _.throttle 返回 throttled 函数
  return throttled;
};

```

# 6. 其他

这是动画演示的代码

```javascript
/**
 * Created by thephpjo on 21.04.14.
 */

var helpers = {
  /**
   * debouncing, executes the function if there was no new event in $wait milliseconds
   * @param func
   * @param wait
   * @param scope
   * @returns {Function}
   */
  debounce: function(func, wait, scope) {
    var timeout
    return function() {
      var context = scope || this,
        args = arguments
      var later = function() {
        timeout = null
        func.apply(context, args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  /**
   * in case of a "storm of events", this executes once every $threshold
   * @param fn
   * @param threshhold
   * @param scope
   * @returns {Function}
   */
  throttle: function(fn, threshhold, scope) {
    threshhold || (threshhold = 250)
    var last, deferTimer
    return function() {
      var context = scope || this

      var now = +new Date(),
        args = arguments
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function() {
          last = now
          fn.apply(context, args)
        }, threshhold)
      } else {
        last = now
        fn.apply(context, args)
      }
    }
  }
}
```

# 7. 总结

- 防抖是指某个函数在空闲x ms后才被调用，如果该段时间内该函数被触发，则重置计时器。常用场景有resize事件或者input框的onChang事件
- 节流是指某个函数在x ms内只能被触发一次。常用场景有button的click事件或者键盘事件等。
- requestAnimationFrame是浏览器提供的API，提供了throttle(handler,16)类似的功能但是会有更多浏览器级别的优化来保证每秒16帧的渲染结果。

# 8. 参考

- [JS节流和防抖函数的理解和实现](https://blog.csdn.net/tinfengyee/article/details/105429619)
- [深入浅出节流函数 throttle](https://muyiy.cn/blog/7/7.1.html)
- [7分钟理解JS的节流、防抖及使用场景](https://juejin.cn/post/6844903669389885453)
- [JavaScript专题之跟着 underscore 学节流 #26](https://github.com/mqyqingfeng/Blog/issues/26)
- [Js中的防抖与节流](https://hateonion.me/posts/19jan02/)