# RAF 优点：

1）目标是60fps（16ms的一帧），浏览器将决定如何安排渲染的最佳时间，采用系统时间间隔，保持最佳绘制效率，不会时间过短而过度绘制，增加开销，也不会因为间隔时间过长使动画卡顿
2）相对简单和标准的API，为了不会改变，减少维护成本
3）rAF会把每一帧中的所有DOm操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
4）在隐藏或不可见的元素中，rAF将不会进行重绘或回流，会更少的CPU，GPU和内存使用量。
5）rAF是浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下，动画会自动暂停，有效节省CPU开销。
缺点：
1）rAF是内部api，所以我们并不方便修改
2）如果浏览器选项卡没有激活，就用不了
3）兼容性不好，在IE9，Opera Mini和旧Android仍然不支持（firefox，chrome，ie10+），可以用定时器做一下兼容。

# 对 requestAnimationframe 的理解

https://www.bilibili.com/read/cv18158598

实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供一个专门用于请求动画的 API，那就是 requestAnimationFrame，顾名思义就是**请求动画帧**。

MDN 对该方法的描述：

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

**语法：** `window.requestAnimationFrame(callback);` 其中，callback 是**下一次重绘之前更新动画帧所调用的函数**(即上面所说的回调函数)。该回调函数会被传入 DOMHighResTimeStamp 参数，它表示 requestAnimationFrame() 开始去执行回调函数的时刻。该方法属于**宏任务**，所以会在执行完微任务之后再去执行。

**取消动画：** 使用 cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame 默认返回的 id，只需要传入这个 id 就可以取消动画了。

**优势：**

**1.CPU 节能**：使用 SetTinterval 实现的动画，当页面被隐藏或最小化时，SetTinterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 RequestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 RequestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。

**2.函数节流**：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

**3.减少 DOM 操作**：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒 60 帧。

**setTimeout 执行动画的缺点**：它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：

1.settimeout 任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；

2.settimeout 的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。

# 防抖/节流和raf

https://css-tricks.com/debouncing-throttling-explained-examples/

### 结论

使用 debounce、throttle 和`requestAnimationFrame`优化您的事件处理程序。每种技术都略有不同，但这三种技术都是有用的并且相互补充。

总之：

- **去抖动：**将突然爆发的事件（如击键）分组为一个事件。
- **throttle：**保证每 X 毫秒持续执行一次。就像每 200 毫秒检查一次滚动位置以触发 CSS 动画。
- **requestAnimationFrame：**节流阀替代方案。当您的函数重新计算并在屏幕上呈现元素并且您希望保证平滑的变化或动画时。注意：不支持 IE9。