# diff <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-13 23:08:25
> LastEditTime: 2022-12-13 23:12:10
> Description: NO Desc

## 概述

### 虚拟DOM

虚拟 DOM 简单说就是 **用JS对象来模拟 DOM 结构**。

虚拟DOM好处：

- 保证性能下限
- 函数式编程，即UI = f(data)这种构建UI，不需要手动操作DOM，提高开发效率。
- 跨平台，可以将JS对象渲染到浏览器DOM以外的环境中。

### diff

Diff 算法，在 Vue 里面就是叫做 `patch` ，它的核心就是参考 [Snabbdom](https://github.com/snabbdom/snabbdom)，通过新旧虚拟 DOM 对比(即 patch 过程)，找出最小变化的地方转为进行 DOM 操作，因此我们不需要完全的更新整个视图，而是只更新他们差异的部分, 尽可能的减少DOM操作的开销。

diff 整体策略为：深度优先，同层比较

- 比较只会在同层级进行, 不会跨层级比较
- 比较的过程中，循环从两边向中间收拢

核心原理跟打乱一个数组，然后两两匹配差不多。

例子：将一个排好序的数组A打乱后变成数组B，如何找到数组A中的元素对应在数组B的位置

- A：`[1, 2, 3, 4, 5, 6]`
- B：`[2, 5, 1, 3, 6, 4]`
- 这道题很简单，两个for循环就可以解决：

```js
for(let i = 0; i < A.length; i++){
    for(let j = 0; j < B.length; j++){
        if(A[i] = B[j]) return j
    }
}
```

diff算法的“核心”就是如此，diff其他部分的处理可以认为是在此基础之上的优化。

#### 什么时候触发 patch ？

- 在页面**首次渲染**的时候会调用一次 `patch` 并创建新的 `vnode`，不会进行更深层次的比较。

- 在组件中数据发生变化时：
  1. 先触发 `setter` 然后通过 `Notify` 通知 `Watcher`。
  2. 对应的 `Watcher` 会通知更新并执行更新函数，它会执行 `render` 函数获取新的虚拟 `DOM`。
  3. 执行 `patch` 对比上次渲染结果的老的虚拟 `DOM`，并计算出最小的变化，然后再去根据这个最小的变化去更新真实的 `DOM`，也就是视图`View`

#### diff 过程

**patch**：

- vnode 不存在，oldVnode 存在，就删掉 oldVnode
- vnode 存在，oldVnode 不存在，就创建 vnode
- 两个都存在的话，通过 `sameVnode` 函数(后面有详解)对比是不是同一节点
  - 如果是同一节点的话，通过` patchVnode` 进行后续对比节点文本变化或子节点变化
  - 如果不是同一节点，就把 vnode 挂载到 oldVnode 的父元素下
    - 如果组件的根节点被替换，就遍历更新父节点，然后删掉旧的节点
    - 如果是服务端渲染就用 hydrating 把 oldVnode 和真实 DOM 混合

**sameVnode**：判定同一类型节点，通过 key、tagName *标签名*、isComment *注释节点*、isDef(oldVnode.data) *定义了data* 、sameInputType *标签为 input 时，type必须是否相同*。

**patchVnode**：

- 如果 oldVnode 和 vnode 的引用地址是一样的，就表示节点没有变化，直接返回
- 如果 oldVnode 的 isAsyncPlaceholder 存在，就跳过异步组件的检查，直接返回
- 如果 oldVnode 和 vnode 都是静态节点，并且有一样的 key，并且 vnode 是克隆节点或者 v-once 指令控制的节点时，把 oldVnode.elm 和 oldVnode.child 都复制到 vnode 上，然后返回
- 如果 vnode 是文本节点但是和 oldVnode 文本内容不一样，就更新文本
- 如果 vnode 不是文本节点也不是注释的情况下
  - 如果 vnode 和 oldVnode 都有子节点，而且子节点不一样的话，就调用 updateChildren 更新子节点
  - 如果只有 vnode 有子节点，就调用 addVnodes 创建子节点
  - 如果只有 oldVnode 有子节点，就调用 removeVnodes 删除该子节点
  - 如果 vnode 文本为 undefined，就删掉 vnode.elm 文本

**updateChildren**：

- 循环遍历两个列表，头尾指针两两比对，这四种比对没通过就使用 key 查找，没有 key 就通过遍历旧 vnode 查找， 还是没找到就直接创建新的节点。

- 循环停止条件是：其中一个列表的开始指针 startIdx 大于 结束指针 endIdx 
- 循环内容是：
  - 新的头和老的头对比
  - 新的尾和老的尾对比
  - 新的头和老的尾对比
  - 新的尾和老的头对比
- 以上四种只要有一种判断相等，就调用 `patchVnode` 对比节点文本变化或子节点变化，然后移动对比的下标，下标往中间靠拢，继续下一轮循环对比。
- 如果以上四种情况都没有命中，使用 vnode 的 key 去匹配 旧 vnode 的 hash 表(`createKeyToOldIdx` 生成)，匹配不到通过 `sameVnode` 遍历旧 vnode。
  - 如果没找到，就创建一个新的节点
  - 如果找到了，再对比标签是不是同一个节点
    - 如果是同一个节点，就调用 patchVnode 进行后续对比，然后把这个节点插入到老的开始前面，并且移动新的开始下标，继续下一轮循环对比
    - 如果不是相同节点，就创建一个新的节点 
- 如果老的 vnode 先遍历完，就添加新的 vnode 没有遍历的节点
- 如果新的 vnode 先遍历完，就删除老的 vnode 没有遍历的节点

>  为什么会有头对尾，尾对头的操作？

有经验法则(启发式算法)，通过首位两两对比 4 种快捷的查找方式，极大减少循环次数，只有当以上 4 种方式都查找不到的时候，再进行循环查找，所以是快速检测出 reverse 操作，加快 Diff 效率

### key

由于 diff 算法是一种最大限度减少动态元素并且尽可能的尝试**就地修改/复用**相同类型元素的算法。所以有些相同类型的元素可能由于就地复用(即 patch 过程  `sameVnode` 函数判定为相同 Vnode) 会造成渲染错误。

主要问题场景：

- 造成列表渲染错误。
- 需要触发列表过渡
- 需要完整地触发组件的生命周期钩子

通过添加 key 可以用于强制替换元素/组件而不是重复使用它。

#### 使用 key 标识唯一节点的好处：

- 使用 key 一定程度上能提高 diff 的效率。key 是 Vnode 的唯一标记，diff 算法中双端两两比较一共有 4 种比较方式，如果以上 4 种比较都没匹配，如果设置了 key，就会用 key 与 旧 Vnode 的 通过 `createKeyToOldIdx` 函数生成的 key hash 表 进行比较，如果没有设置 key，则会使用 `findIdxInOld` 函数遍历。
- 在 patch 过程中 `sameVnode()` 函数判断时更好判断两个 Vnode 到底是不是同一个 Vnode, **更准确地去 `patchVnode`**，而不是就地复用旧 Vnode 造成列表渲染错误。

#### 不带key的速度可能更快

虽然使用 key 一定程度上能提高 diff 的效率，但是不一定能提高效率。在大数据列表中，不带 key 被认为是相同节点进入 patch 流程，后续只要就地复用改变内容文字即可，时间会更快。

而带 key 进入判断 key 不同，被认为是不同 vnode，暴力插入新的删除旧的，所以时间会更长。

## 参考资料

推荐看这几篇

- [x] [深入浅出虚拟 DOM 和 Diff 算法，及 Vue2 与 Vue3 中的区别](https://juejin.cn/post/7010594233253888013)【推荐】
- [x] [详解vue的diff算法](https://juejin.cn/post/6844903607913938951)【推荐】
- [x] [Vue2、Vue3、React diff 算法对比](https://juejin.cn/post/7116141318853623839)【推荐】

- [x] [【Vue】diff算法](https://juejin.cn/post/6966159729731059725)
- [x] [【Vue面试题】谈谈你对Vue的diff算法的理解 ](https://www.cnblogs.com/PaturNax/p/16637349.html)【推荐】
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

