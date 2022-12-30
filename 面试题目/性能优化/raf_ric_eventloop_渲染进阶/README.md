## 参考资料

[深入解析 EventLoop 和浏览器渲染、帧动画、空闲回调的关系](http://www.yancq.cn/2021/09/02/eventloop-raf-rid/#%E5%89%8D%E8%A8%80)

[回流 和 重绘](https://www.cnblogs.com/amiezhang/p/11450822.html)

## 事件循环

我们先依据[HTML 官方规范 (opens new window)](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)从浏览器的事件循环讲起，因为剩下的 API 都在这个循环中进行，它是浏览器调度任务的基础。

### [#](http://www.yancq.cn/2021/09/02/eventloop-raf-rid/#定义)定义

为了协调时间，用户交互，脚本，渲染，网络任务等，浏览器必须使用本节描述的事件循环。

### [#](http://www.yancq.cn/2021/09/02/eventloop-raf-rid/#流程)流程

1. 从任务队列中取出一个**宏任务**并执行；

2. 检查微任务队列，执行并清空**微任务**队列，如果在微任务的执行中又加入新的微任务，也会在这一步一起执行。

3. 进入更新渲染阶段，判断是否需要渲染，这里有一个`rendering opportunity`的概念，也就是说：**不一定每一轮event loop都会对应一次浏览器渲染**，要根据其屏幕刷新率、页面性能、页面是否在后台运行来共同决定。通常来说，这个渲染间隔是固定的。（**所以多个task很可能在一次渲染之间执行**）

   - 浏览器会尽可能的保持帧率稳定，例如页面性能无法维持60fps（每16.66ms渲染一次）的话，那么浏览器会选择30fps的更新速率，而不是偶尔丢帧。
   - 如果浏览器上下文不可见，那么页面帧率会降低到4fps左右甚至更低。
   - 如果满足以下条件，也会跳过渲染：
     - 浏览器判断更新渲染不会带来视觉上的改变，且
     - `map of animation frame callback`为空，也就是帧动画回调为空，可以通过`requestAnimationFrame`来请求帧动画。

4. 如果上述的判断决定本轮不需要渲染，那么下面的几步（5-9）也**不会**继续运行：

   > This step enables the user agent to prevent the steps below from running for other reasons, for example, to ensure certain tasks are executed immediately after each other, with only microtask checkpoints interleaved (and without, e.g., animation frame callbacks interleaved). Concretely, a user agent might wish to coalesce timer callbacks together, with no intermediate rendering updates. 有时候浏览器希望两次「定时器任务」是合并的，他们之间只会穿插着 `microTask`的执行，而不会穿插屏幕渲染相关的流程（比如`requestAnimationFrame`，下面会写一个例子）。

5. 对于需要渲染的文档，如果窗口大小发生了变化，执行监听的`resize`方法。

6. 对于需要渲染的文档，如果页面发生了滚动，执行`scroll`方法。

7. 对于需要渲染的文档，执行帧回调动画，也就是`requestAnimationFrame`的回调。

8. 对于需要渲染的文档，执行`IntersectionObserve`的回调。

9. 对于需要渲染的文档，***重新渲染***绘制用户界面。

10. 判断`task队列`和`microTask`队列是否都为空，如果是的话，则进行`Idle`空闲周期的算法，判断是否要执行`requestIdleCallback`的回调函数。

对于`resize` 和 `scroll`来说，并不是到了这一步才去执行滚动和缩放，那岂不是要延迟很多？浏览器当然会立刻帮你滚动视图，根据[CSSOM 规范 (opens new window)](https://drafts.csswg.org/cssom-view/#scrolling-events)所讲，浏览器会保存一个 `pending scroll event targets`，等到事件循环中的 `scroll`这一步，去派发一个事件到对应的目标上，驱动它去执行监听的回调函数而已。`resize`也是同理。

##  requestAnimationFrame

> 以下内容中`requestAnimationFrame` 简称 `rAF`

在解读规范的过程中，我们发现`requestAnimationFrame`的回调有两个特征：

1. 在重新渲染前调用
2. 很可能在宏任务之后不调用

## requestIdleCallback

 我们都知道 `requestIdleCallback` 是浏览器提供给我们的空闲调度算法，关于它的简介可以看 [MDN 文档 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)，意图是让我们把一些计算量较大但是又没那么紧急的任务放到空闲时间去执行。不要去影响浏览器中优先级较高的任务，比如动画绘制、用户输入等等。

React 的时间分片渲染就想要用到这个 API，不过目前浏览器支持的不给力，他们是自己去用 `postMessage` 实现了一套。

![img](./README.assets/20210831215658.png)

通过上图可看到，一帧内需要完成如下六个步骤的任务：

- 处理用户的交互
- JS 解析执行
- 帧开始。窗口尺寸变更，页面滚去等的处理
- requestAnimationFrame(rAF)
- 布局
- 绘制

上面六个步骤完成后没超过 16 ms(60Hz刷新情况下)，说明时间有富余，此时就会执行 `requestIdleCallback` 里注册的任务。

## 总结

通过本文的学习过程，我自己也打破了很多对于 Event Loop 以及 rAF、rIC 函数的固有错误认知，通过本文我们可以整理出以下的几个关键点。

1. 事件循环不一定每轮都伴随着重渲染，但是一定会伴随着微任务执行。
2. 决定浏览器视图是否渲染的因素很多，浏览器是非常聪明的。
3. `requestAnimationFrame`在重新渲染屏幕之前执行，非常适合用来做动画。
4. `requestIdleCallback`在渲染屏幕之后执行，并且是否有空执行要看浏览器的调度，如果你一定要它在某个时间内执行，请使用 `timeout`参数。
5. `resize`和`scroll`事件其实自带节流，它只在 Event Loop 的渲染阶段去执行事件。