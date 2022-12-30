## 参考资料

[web前端面试 - 面试官系列](https://vue3js.cn/interview/)

## 为什么data属性是一个函数而不是一个对象？

https://youle.zhipin.com/questions/04beed61008ef952tnVy29m_EFc~.html

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。