# Vue初始化 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-15 02:19:56
> LastEditTime: 2022-12-15 02:20:09
> Description: NO Desc

## 结合生命周期回答组件渲染流程

以下是 `beforeCreate` 和 `created` 生命周期前后需要处理的详细内容：

- **合并组件选项**，将组件配置项打平，存放到 `vm.$options` 选项上，减少原型链的查找
- **对组件关系属性进行初始化**，比如：`$root、$parent、$children、$refs` 等
- **初始化自定义事件**，比如：`@myclick="clickHandle"` 会被编译为`this.$on('myClick', function clickHandle(){})` 和 `this.$emit('myClick')` 的形式
- **初始化插槽**（`vm.$slots、vm.$scopedSlots`）、定义`_c`方法，即`createElement`（`h`函数）、对`$attrs`和`$listeners`属性进行响应式处理
- **执行 `beforeCreate` 生命周期函数**
- **初始化 `inject ` 选项**，根据`inject`选项从祖代组件配置项中找到对应的`provide`选项，从而获取对应`key`中的值，得到`result[key] = val`形式的结果
- **初始化 state 数据**，如：`props、data、methods、watch、computed` 等
- **处理 provide 选项**，判断 `provide`是不是函数，是函数就调用获取返回配置项，否则就直接使用`provide`选项
- **执行 `created` 生命周期函数**

## 参考资料

- [x] [从 vue 源码看问题 —— vue 初始化都做了什么事？](https://juejin.cn/post/7038058903799595022)
