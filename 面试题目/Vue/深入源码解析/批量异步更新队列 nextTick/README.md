# 批量异步更新 nexttick <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-16 03:11:40
> LastEditTime: 2022-12-16 03:15:03
> Description: NO Desc

## 概述

触发 setter 的时候会调用 `dep.notify()` 通知所有订阅者进行派发更新 `subs[i].update()`，

watcher 执行 `update` 会将自己添加到 queue 队列`queueWatcher(this)`，

`queueWatcher` 主要做的是：先用 has 对象查找 id，保证同一个 watcher 只会 push 一次，接着 调用 `nextTick(flushSchedulerQueue)`，

flushSchedulerQueue 主要做的是：先排序队列，然后遍历队列，执行对应 `watcher.run()`更新视图，

 到 `nextTick` 就是把 timerFunc 设为微任务或者宏任务，然后包装 `callbacks` 执行。

## 参考资料

- [x] [异步更新队列](https://jonny-wei.github.io/blog/vue/vue/vue-nextTick.html)

- [x] [从 Event Loop 角度解读 Vue NextTick 源码](https://juejin.cn/post/6963542300073033764)

- [x] [Vue.$nextTick()干货详解](https://juejin.cn/post/7174018286378549285)
- [x] [关于vue中next和Tick(nextTick)的一点理解](https://juejin.cn/post/6844903638163259406)

- [x] [实现一个简单的 nextTick](https://www.yuque.com/fe9/basic/dss7fz)

