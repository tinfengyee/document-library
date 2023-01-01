# 前端错误监控 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-22 02:41:08
> LastEditTime: 2022-12-26 16:32:44
> Description: NO Desc

## 前言

## 错误捕获

### try-catch 异常处理

> 能捕获常规运行时错误，语法错误和异步错误不行

```javascript
// 常规运行时错误，可以捕获 ✅
try {
  console.log(notdefined);
} catch(e) {
  console.log('捕获到异常：', e);
}

// 语法错误，不能捕获 ❌
try {
  const notdefined,
} catch(e) {
  console.log('捕获到异常：', e);
}

// 异步错误，不能捕获 ❌
try {
  setTimeout(() => {
    console.log(notdefined);
  }, 0)
} catch(e) {
  console.log('捕获到异常：',e);
}
```

try/catch有它细致处理的优势，但缺点也比较明显。

### window.onerror 异常处理

window.onerror 捕获异常能力比 try-catch 稍微强点，无论是异步还是非异步错误，onerror 都能捕获到运行时错误。

然而 window.onerror 对于语法错误还是无能为力，所以我们在写代码的时候要尽可能避免语法错误的，不过一般这样的错误会使得整个页面崩溃，还是比较容易能够察觉到的。

> 需要注意的是，window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error: xxxxx。

### window.addEventListener

> 当一项资源（如图片或脚本）加载失败，加载资源的元素会触发一个 Event 接口的 error 事件，这些 error 事件不会向上冒泡到 window，但能被捕获。而window.onerror不能监测捕获。

### Promise错误

 可以通过unhandledrejection捕获

```javascript
// 全局统一处理Promise
window.addEventListener("unhandledrejection", function(e){
  console.log('捕获到异常：', e);
});
fetch('https://tuia.cn/test')
```

### Vue错误

> 由于Vue会捕获所有Vue单文件组件或者Vue.extend继承的代码，所以在Vue里面出现的错误，并不会直接被window.onerror捕获，而是会抛给Vue.config.errorHandler。

```javascript
/**
 * 全局捕获Vue错误，直接扔出给onerror处理
 */
Vue.config.errorHandler = function (err) {
  setTimeout(() => {
    throw err
  })
}
```

## 错误上报

### 上报时机

使用`window.requestIdleCallback()`，该方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。

```javascript
window.onload = () => { 
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
        })
    } else {
        setTimeout(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
        }, 0)
    }
}
```

当然，你也可以设一个定时器，循环上报。不过每次上报最好做一下对比去重再上报，避免同样的数据重复上报。

- Javascript错误产生后，应该**存入浏览器的缓存**中，然后定时上传，如果实时上传，将会对服务器造成压力。

- 收集异常信息量太多，怎么办？实际中，我们不得不考虑这样一种情况：如果你的网站访问量很大，那么一个必然的错误发送的信息就有很多条，这时候，我们需要**设置采集率**，从而[减缓服务器的压力](https://github.com/happylindz/blog/issues/5)：

```js
Reporter.send = function(data) {
  // 只采集 30%
  if(Math.random() < 0.3) {
    send(data)      // 上报错误信息
  }
}
```

采集率应该通过实际情况来设定，随机数，或者某些用户特征都是不错的选择。

### 上报方式

对于一个埋点方案来说，数据上报有两个点需要着重考虑：

- 对跨域做特殊处理。
- 页面销毁后，如何还能够将未上传的埋点数据成功上报？

传统的XHR发送数据请求的方式，对上面提到的两个点都无能为力。在数据上报过程中，较为常用的有两种方式：

- 动态创建img标签，在 img.src 中拼接url的方式发送请求
- 调用 sendBeacon 接口发送数据

#### 通过Ajax发送数据

通过Ajax发送数据（可以配合 [requestIdleCallback](https://blog.csdn.net/KlausLily/article/details/122852531)（注意兼容性），在浏览器空闲时进行数据上报。）

### new img

动态创建 img 标签的形式。

利用`img`标签的`src`属性发送请求的方式，具体执行方案如下：

```javascript
let _img = new Image();
_img.src = `${url}?${util.spliceParam(params)}`;
_img.onload = _img.onerror = function() {}
```

它非常契合埋点数据上报这个应用场景：

1. 只上报的数据不需要接收响应；
2. img的src属性天然地不存在跨域问题。

这种使用方式也存在缺陷。首先对于src 中的URL内容是有大小限制的，太大的数据量不适用。详细看[这里](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers/417184#417184)。其次，在页面卸载的时候，若存在数据未发送的情况，会先将对应的数据发送完，再执行页面卸载。这种情况下，会在体验上给使用者带来不方便。

### sendBeacon

sendBeacon方法是一个异步、非阻塞的数据传输方法。具体使用方式如下：

```javascript
window.navigator.sendBeacon && window.navigator.sendBeacon(url, params)
```

它的特点是：

- Beacon请求是Post方式。
- Beacon请求优先避免与关键操作和更高优先级的网络请求竞争。
- Beacon请求可以有效地合并，以优化移动设备上的能量使用。
- Beacon保证页面卸载之前启动信标请求，并允许运行完成且不会阻塞请求或阻塞处理用户交互事件的任务。
- 返回值：sendBeacon 方法被执行后返回一个布尔值，`true`代表用户代理成功地将信标请求加入到队列中，否则返回`false`。

对于sendBeacon方法，它的局限性体现在：

- 不能跨域，需要服务端设置。
- 新特性接口，兼容性存在问题。

因此，在实际的应用过程中，需要针对实际情况，结合 Img 标签 与 sendBeacon 的方式一起使用。

## 错误定位

### SourceMap

SourceMap 是一个信息文件，存储着源文件的信息及源文件与处理后文件的映射关系。

在定位压缩代码的报错时，可以通过错误信息的行列数与对应的 SourceMap 文件，处理后得到源文件的具体错误信息。

```
{
  "version": 3, // SourceMap的版本
  "sources": [ // 转换前的文件来源
    "webpack:///webpack/universalModuleDefinition",
    "webpack:///webpack/bootstrap"
  ],
  "names": [], // 转换前的变量名
  "mappings": "AAAA,AACA;AACA", // 位置信息
  "file": "react-ui-components-library.js", // 转换后的文件名
  "sourceRoot": "" // 转换前的文件目录,
  "sourcesContent":[] // 原始文件内容
}
```

## 跨域问题

> 一般情况，如果出现 Script error 这样的错误，基本上可以确定是出现了跨域问题。

如果当前投放页面和云端JS所在不同域名，如果云端JS出现错误，window.onerror会出现Script Error。通过以下两种方法能给予解决。

- 后端配置Access-Control-Allow-Origin、前端script加crossorigin。

```javascript
<script src="http://yun.tuia.cn/test.js" crossorigin></script>

const script = document.createElement('script');
script.crossOrigin = 'anonymous';
script.src = 'http://yun.tuia.cn/test.js';
document.body.appendChild(script);
```

## 开源方案 sentry

sentry 是一个实时的错误日志追踪和聚合平台，包含了上面 sourcemap 方案，并支持更多功能，如：错误调用栈，log 信息，issue管理，多项目，多用户，提供多种语言客户端等，具体介绍可以查看 [getsentry/sentry](https://github.com/getsentry/sentry)，[sentry.io](https://sentry.io/welcome/)，这里暂不展开。

## 解决线上问题：

线上的错误日志统计出来了，解析出用户的UA 机型，版本，系统平台，影响范围，以及通过sourcemap解码（*SourceMap*，它可以对打包前后的文件进行映射，https://github.com/mozilla/source-map可以解出来）具体的错误位置， 从而提高我们解决问题的效率。公司业务没那么多的时候写过自己的错误日志框架，但是后面还是采用sentry，觉得sentry更成熟，把精力放在公司业务开发

上报错误：

```
按照上报的频率（重要紧急度）可将上报分为四种：

a. 即时上报

收集到日志后，立即触发上报函数。仅用于A类异常。而且由于受到网络不确定因素影响，A类日志上报需要有一个确认机制，只有确认服务端已经成功接收到该上报信息之后，才算完成。否则需要有一个循环机制，确保上报成功。

b. 批量上报

将收集到的日志存储在本地，当收集到一定数量之后再打包一次性上报，或者按照一定的频率（时间间隔）打包上传。这相当于把多次合并为一次上报，以降低对服务器的压力。
```



## 参考资料

- [x] [一篇讲透自研的前端错误监控](https://juejin.cn/post/6987681953424080926)
- [x] [如何优雅处理前端异常？](http://jartto.wang/2018/11/20/js-exception-handling/index.html)
- [x] [前端代码异常监控实战](https://github.com/happylindz/blog/issues/5)
- [ ] [脚本错误量极致优化-让脚本错误一目了然](https://github.com/joeyguo/blog/issues/14)

- [ ] [前端错误监控](https://bengbu-yuezhang.github.io/2020/05/16/%E5%89%8D%E7%AB%AF%E9%94%99%E8%AF%AF%E7%9B%91%E6%8E%A7/)
- [x] [前端监控系列-数据上报](https://lion1ou.tech/2020-11/%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7%E7%B3%BB%E5%88%97-%E6%95%B0%E6%8D%AE%E4%B8%8A%E6%8A%A5/)

- [ ] [一步一步搭建前端监控系统：JS错误监控篇](https://blog.fundebug.com/2019/07/06/how-to-monitor-javascript-error/)
- [ ] [搭建前端监控系统（二）JS错误监控篇](https://www.webfunny.cn/blog/post/33)

- [ ] [利用sourceMap定位错误实践](https://blog.fundebug.com/2019/07/06/how-to-monitor-javascript-error/)

- [ ] [前端搞监控|Allan - 如何实现一套多端错误监控平台](https://www.yuque.com/zaotalk/posts/c5-5#vfE2R)
