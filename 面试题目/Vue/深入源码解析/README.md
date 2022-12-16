# Vue <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-15 02:10:59
> LastEditTime: 2022-12-15 02:21:27
> Description: NO Desc

## 阅读目录

- [Vue初始化](.\Vue初始化\README.md)
- [生命周期](.\生命周期\README.md)
- [Vue响应式](.\响应式原理\README.md)
- [模板编译](.\模板编译\README.md)
- [diff](.\diff\README.md)
- [批量异步更新队列 nextTick](.\异步更新队列 nextTick\README.md)

## 参考资料

- [x] [「字节面试官」面了几个说自己精通 Vue 的同学](https://mp.weixin.qq.com/s/a4PIjfd-AS7Jm-8Rymd2pQ)【必看】

- [x] [一篇鸡汤文，几个vue面试题](https://juejin.cn/post/6901603815267991560)

### 系统

- [x] [ 花帽子的博客-Vue源码解析](https://jonny-wei.github.io/blog/)【推荐】
- [x] [沐华-有几篇文章可以看看](https://juejin.cn/user/3368559359825448/posts)【推荐】
- [ ] [剖析 Vue.js 内部运行机制](https://www.kancloud.cn/sllyli/vuejs)
- [ ] [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/)
- [ ] [learnVue-Vue.js源码分析](https://github.com/answershuto/learnVue)

### 初始化/生命周期

- [x] [从 vue 源码看问题 —— vue 初始化都做了什么事？](https://juejin.cn/post/7038058903799595022)
- [x] [Vue 的完整生命周期源码流程详解](https://juejin.cn/post/7017712966485147678)

### 响应式原理

#### vue2 响应式

- [x] [深入浅出 Vue 响应式原理源码剖析](https://juejin.cn/post/7017327623307001864)
- [x] [Vue3.2 响应式原理源码剖析，及与 Vue2 .x响应式的区别](https://juejin.cn/post/7021046293627666463)
- [x] [面试官的步步紧逼：Vue2 和 Vue3 的响应式原理比对](https://juejin.cn/post/7124351370521477128)【推荐】
- [x] [响应式原理](https://jonny-wei.github.io/blog/vue/vue/vue-observer.html#%E5%A6%82%E4%BD%95%E4%BE%A6%E6%B5%8B%E6%95%B0%E6%8D%AE%E7%9A%84%E5%8F%98%E5%8C%96)
- [x] [Vue中的三种Watcher](https://www.cnblogs.com/WindrunnerMax/p/14864214.html)
- [ ] [vue源码分析-响应式系统(二)](https://www.cnblogs.com/yyzzabc123/p/16888655.html)
- [ ] [从 vue 源码看问题 —— 如何理解 vue 响应式？](https://juejin.cn/post/7039345669403836447)
- [ ] [纯干货！图解Vue响应式原理](https://juejin.cn/post/7074422512318152718)
- [ ] [深入理解vue响应式原理 8000字](https://mp.weixin.qq.com/s?__biz=MzkwODIwMDY2OQ==&mid=2247488058&idx=1&sn=4f3fcf191bb00b74d750d061058eb8fb&source=41#wechat_redirect)
- [ ] [面试官: 能不能手写 Vue 响应式？（Vue2 响应式原理【完整版】）](https://juejin.cn/post/7079807948830015502)
- [ ] [重学JS（十）—— 使用观察者模式实现双向绑定](https://www.jianshu.com/p/ced393a49aa7)
- [ ] [Vue双向绑定原理，教你一步一步实现双向绑定 ](https://www.cnblogs.com/beevesnoodles/p/9844854.html)

#### vue3 响应式

- [ ] [林三心画了8张图，最通俗易懂的Vue3响应式核心原理解析](https://juejin.cn/post/7001999813344493581)
- [ ] [听说你很了解 Vue3 响应式？](https://juejin.cn/post/7147461004954173471)
- [ ] [Vue3 原理解析之响应系统的实现](https://juejin.cn/post/7084915514434306078)

#### 观察者和发布订阅模式

- [ ] [理解【观察者模式】和【发布订阅】的区别](https://juejin.cn/post/6978728619782701087)

- [ ] [观察者模式与发布订阅模式区别 - JS](https://segmentfault.com/a/1190000041543041)

- [ ] [重学JS（九）—— 观察者模式和发布/订阅模式真不一样](https://www.jianshu.com/p/f0f22398d25d)

- [ ] [vue中的观察者模式和发布订阅者模式](https://blog.51cto.com/u_15127592/4336598)

### 模板渲染

- [x] [template 模板是怎样通过 Compile 编译的](https://www.kancloud.cn/sllyli/vuejs/1244021)

- [x] [render 函数是怎么来的？深入浅出 Vue 中的模板编译](https://juejin.cn/post/7011294489335562247)

### diff算法

推荐看这几篇

- [x] [深入浅出虚拟 DOM 和 Diff 算法，及 Vue2 与 Vue3 中的区别](https://juejin.cn/post/7010594233253888013)
- [x] [详解vue的diff算法](https://juejin.cn/post/6844903607913938951)
- [x] [Vue2、Vue3、React diff 算法对比](https://juejin.cn/post/7116141318853623839)

- [x] [【Vue】diff算法](https://juejin.cn/post/6966159729731059725)
- [x] [【Vue面试题】谈谈你对Vue的diff算法的理解 ](https://www.cnblogs.com/PaturNax/p/16637349.html)
- [x] [面试官：了解过vue中的diff算法吗？说说看](https://github.com/febobo/web-interview/issues/24)【过程分析】
- [x] [虚拟 DOM 与 Diff 算法](https://jonny-wei.github.io/blog/vue/vue/vue-diff.html#%E8%99%9A%E6%8B%9F-dom)

- [x] [网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？](https://www.zhihu.com/question/31809713)

可选择看

- [ ] [面试官问: 如何理解Virtual DOM？](https://juejin.cn/post/6844903921442422791)

- [ ] [15张图，20分钟吃透Diff算法核心原理](https://juejin.cn/post/6994959998283907102)
- [ ] [Vue2.0 diff](https://juejin.cn/post/6924220727788830727)
- [ ] [深入剖析：Vue核心之虚拟DOM](https://juejin.cn/post/6844903895467032589)
- [ ] [vue的diff算法](https://juejin.cn/post/6966851274700488741)
- [ ] [数据状态更新时的差异 diff 及 patch 机制](https://www.kancloud.cn/sllyli/vuejs/1244022)
- [ ] [Vue 中的 key 有什么作用](https://jonny-wei.github.io/blog/vue/vue/vue-diff.html#%E9%97%AE%E9%A2%98)
- [ ] [vue中的key](https://juejin.cn/post/6844904053344829453)
- [ ] [聊聊 Vue 的双端 Diff 算法](https://www.51cto.com/article/712614.html)

### nextTick

- [x] [异步更新队列](https://jonny-wei.github.io/blog/vue/vue/vue-nextTick.html)

- [x] [从 Event Loop 角度解读 Vue NextTick 源码](https://juejin.cn/post/6963542300073033764)

- [x] [Vue.$nextTick()干货详解](https://juejin.cn/post/7174018286378549285)
- [x] [关于vue中next和Tick(nextTick)的一点理解](https://juejin.cn/post/6844903638163259406)

- [x] [实现一个简单的 nextTick](https://www.yuque.com/fe9/basic/dss7fz)

### Vue系列

- [ ] [web前端面试-Vue - 面试官系列](https://vue3js.cn/interview/)

- [ ] [List of 300 VueJS Interview Questions](https://github.com/sudheerj/vuejs-interview-questions)

