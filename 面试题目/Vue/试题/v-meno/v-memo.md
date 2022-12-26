# Vue3.2新的指令v-memo

# v-memo作用：

缓存一个模板的子树。在元素和组件上都可以使用。为了实现缓存，该指令需要传入一个固定长度的依赖值数组进行比较。如果数组里的每个值都与最后一次的渲染相同，那么整个子树的更新将被跳过。举例来说：

template

```
<div v-memo="[valueA, valueB]">
  ...
</div>
```

当组件重新渲染，如果 `valueA` 和 `valueB` 都保持不变，这个 `<div>` 及其子项的所有更新都将被跳过。实际上，甚至虚拟 DOM 的 vnode 创建也将被跳过，因为缓存的子树副本可以被重新使用。

正确指定缓存数组很重要，否则应该生效的更新可能被跳过。`v-memo` 传入空依赖数组 (`v-memo="[]"`) 将与 `v-once` 效果相同。

https://zhuanlan.zhihu.com/p/531870129

https://mp.weixin.qq.com/s/0BJrZQ3EfMl8n8-fJ9R0ug

https://blog.csdn.net/qq_46433453/article/details/125927742

https://zhuanlan.zhihu.com/p/531870129