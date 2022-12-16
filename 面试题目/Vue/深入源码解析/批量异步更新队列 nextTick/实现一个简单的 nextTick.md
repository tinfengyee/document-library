# 实现一个简单的 nextTick <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-17 00:33:18
> LastEditTime: 2022-12-17 00:33:28
> Description: NO Desc

## 前言

nextTick 是 Vue 的一个核心功能，在 Vue 内部实现中也经常用到 nextTick。但是，很多新手不理解 nextTick 的原理，甚至不清楚 nextTick 的作用。

那么，我们就先来看看 nextTick 是什么。

## nextTick 功能

看看官方文档的描述：

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

再看看官方示例：

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

> 2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，你得自己提供 polyfill。

可以看到，nextTick 主要功能就是改变数据后让回调函数作用于 dom 更新后。很多人一看到这里就懵逼了，为什么需要在 dom 更新后再执行回调函数，我修改了数据后，不是 dom 自动就更新了吗？

这个和 JS 中的 Event Loop 有关，网上教程不计其数，在此就不再赘述了。建议明白 Event Loop 后再继续向下阅读本文。

举个实际的例子：

我们有个带有分页器的表格，每次翻页需要选中第一项。正常情况下，我们想的是点击翻页器，向后台获取数据，更新表格数据，操纵表格 API 选中第一项。

但是，你会发现，表格数据是更新了，但是并没有选中第一项。因为，你选中第一项时，虽然数据更新了，但是 DOM 并没有更新。此时，你可以使用 nextTick ，在DOM更新后再操纵表格第一项的选中。

那么，nextTick 到底做了什么了才能实现在 DOM 更新后执行回调函数？

## 源码分析

nextTick 的源码位于`src/core/util/next-tick.js`，总计118行，十分的短小精悍，十分适合初次阅读源码的同学。

nextTick源码主要分为两块：

1. 能力检测，降级处理

2. 根据能力检测以不同方式执行回调队列

### 能力检测，降级处理

这一块其实很简单，众所周知，Event Loop 分为宏任务（macro task）以及微任务（ micro task），不管执行宏任务还是微任务，完成后都会进入下一个 tick，并在两个 tick 之间执行UI渲染。

但是，宏任务耗费的时间是大于微任务的，所以在浏览器支持的情况下，优先使用微任务。如果浏览器不支持微任务，使用宏任务；但是，各种宏任务之间也有效率的不同，需要根据浏览器的支持情况，使用不同的宏任务。

nextTick在能力检测这一块，就是遵循的这种思想

```js
import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = [] // 回调队列 存放异步执行的回调
let pending = false // 异步锁 一个标记位，如果已经有 timerFunc 被推送到任务队列中去则不需要重复推送

// 下一个tick时执行队列中的每一个回调
function flushCallbacks () {
  pending = false // 重置异步锁
  // 防止出现nextTick中包含nextTick时出现问题，在执行回调函数队列前，提前复制备份并清空回调函数队列
  const copies = callbacks.slice(0) 
  callbacks.length = 0
  // 执行回调函数队列
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc  // 一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的 timerFunc 被调用



/**
 * 一共有 Promise、MutationObserver setImmediate 以及 setTimeout 四种尝试得到 timerFunc 的方法 
 */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 使用 Promise  
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
   /**  
   * 使用 MutationObserver
   * 新建一个 textNode 的 DOM 对象，用 MutationObserver 绑定该 DOM 并指定回调函数，
   * 在 DOM 变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），
   * 即 textNode.data = String(counter) 时便会触发回调
   */
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 使用(回退到) setImmediate
  // 技术上它利用了(宏)任务队列,
  // 但是它仍然是一个比setTimeout更好的选择。
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 最后使用(回退到) setTimeout(cb,0).
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}


// 导出 nextTick
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 回调函数推入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 如果异步锁未锁上，锁上异步锁，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line  // 如果没有提供回调，并且支持Promise，返回一个Promise
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

### 执行回调函数队列

执行回调函数队列的代码刚好在一头一尾

```js
// 回调函数队列
const callbacks = []
// 异步锁
let pending = false

// 执行回调函数
function flushCallbacks () {
  // 重置异步锁
  pending = false
  // 防止出现nextTick中包含nextTick时出现问题，在执行回调函数队列前，提前复制备份，清空回调函数队列
  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 执行回调函数队列
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

...

// 我们调用的nextTick函数
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 将回调函数推入回调队列
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 如果异步锁未锁上，锁上异步锁，调用异步函数，准备等同步函数执行完后，就开始执行回调函数队列
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // $flow-disable-line
  // 2.1.0新增，如果没有提供回调，并且支持Promise，返回一个Promise
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

总体流程就是：接收回调函数，将回调函数推入回调函数队列中。

同时，在接收第一个回调函数时，执行能力检测中对应的异步方法（异步方法中调用了回调函数队列）。

#### 如何保证只在接收第一个回调函数时执行异步方法？(异步锁)

nextTick 源码中使用了一个异步锁的概念，即接收第一个回调函数时，先关上锁，执行异步方法。此时，浏览器处于等待执行完同步代码就执行异步代码的情况。

打个比喻：相当于一群旅客准备上车，当第一个旅客上车的时候，车开始发动，准备出发，等到所有旅客都上车后，就可以正式开车了。

当然执行 flushCallbacks 函数时有个难以理解的点，即：为什么需要备份回调函数队列？执行的也是备份的回调函数队列？

因为，会出现这么一种情况：nextTick 的回调函数中还使用 nextTick。如果 flushCallbacks 不做特殊处理，直接循环执行回调函数，会导致里面 nextTick 中的回调函数会进入回调队列。这就相当于，下一个班车的旅客上了上一个班车。

## 实现一个简易的nextTick

说了这么多，我们来实现一个简单的 nextTick：

```js
let callbacks = []
let pending = false

function nextTick (cb) {
    callbacks.push(cb)

    if (!pending) {
        pending = true
        setTimeout(flushCallback, 0)
    }
}

function flushCallback () {
    pending = false
    let copies = callbacks.slice()
    callbacks.length = 0
    copies.forEach(copy => {
        copy()
    })
}
```

## 转载

- [x] [实现一个简单的 nextTick](https://www.yuque.com/fe9/basic/dss7fz)
