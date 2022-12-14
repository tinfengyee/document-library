# 模板编译 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-14 00:59:12
> LastEditTime: 2022-12-14 13:05:47
> Description: NO Desc

## 概述

template 模板是怎样通过 Compile 编译的？

`compile` 编译可以分成 `parse`、`optimize` 与 `generate` 三个阶段，最终需要得到 render function。

- **parse**：首先是 `parse`，`parse` 会用正则等方式将 template 模板中进行字符串解析，得到指令、class、style等数据，形成 AST（[在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。](https://zh.wikipedia.org/wiki/抽象語法樹)）。

- **optimize**：`optimize` 主要作用就跟它的名字一样，用作「优化」。为静态的节点做上一些「标记」，为了后面 `patch` 过程中就会跳过静态节点的对比，直接克隆一份过去，从而优化了 `patch` 的性能

  > isStatic 函数当 type 为 3（文本节点）的时候判定是静态节点；`markStatic` 所有的节点标记上 `static`；`markStaticRoots` 函数用来标记 `staticRoot`（静态根），静态根节点条件是当前节点是静态节点，同时满足该节点并不是只有一个文本节点左右子节点

- **generate**：会将 AST 转化成 render funtion 字符串，最终得到 render 的字符串以及 staticRenderFns 字符串。


## 参考资料

- [x] [template 模板是怎样通过 Compile 编译的](https://www.kancloud.cn/sllyli/vuejs/1244021)

- [x] [render 函数是怎么来的？深入浅出 Vue 中的模板编译](https://juejin.cn/post/7011294489335562247)
