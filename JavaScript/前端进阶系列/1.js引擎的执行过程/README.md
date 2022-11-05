# js引擎的执行过程 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-02 19:20:58
> LastEditTime: 2022-11-02 19:24:03
> Description: NO Desc

执行上下文生命周期，来自https://www.jianshu.com/p/d647aa6d1ae6

![img](./README.assets/webp.webp)

深入理解请阅读 [理解JavaScript 中的执行上下文和执行栈](https://muyiy.cn/blog/1/1.1.html)

## 题目

> 声明优先级，函数 > 变量

```js
foo();  // foo2
var foo = function() {
    console.log('foo1');
}

foo();  // foo1，foo重新赋值

function foo() {
    console.log('foo2');
}

foo(); // foo1
```

上面三个例子中，第一个例子是变量提升，第二个例子是函数提升，第三个例子是函数声明优先级高于变量声明。

**需要注意**的是同一作用域下存在多个同名函数声明，后面的会替换前面的函数声明。
