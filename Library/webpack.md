[当前标签：Webpack](https://www.cnblogs.com/fe-linjin/tag/Webpack/)

[关于webpack的面试题](https://www.cnblogs.com/gaoht/p/11310365.html)

# Babel 是什么，怎么做到的

https://juejin.cn/post/7149884606005641223

https://juejin.cn/post/6901649054225465352

- 概念：Babel 是一个 JavaScript 编译器。它是一个工具链，用于将 ECMAScript 2015+ 的语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

- 核心原理（源码到源码的转移器实现）：

  - parse：通过 parser 把源码转成抽象语法树（AST）

  - transform：遍历 AST ，调用各种 transform 插件对 AST 进行增删改

  - generate：把转换后的 AST 打印成目标代码，并生成 sourcemap

    > babel的运行方式总共可以分为三个阶段：解析（parsing）、转换（transforming）和生成（generating）；负责解析阶段的插件是`@babel/parser`，其作用就是将源码解析成AST；而负责生成阶段的插件是`@babel/generator`，其作用就是将转好好的AST重新生成代码。
    >
    > 而@babel/core本身不具备转换处理的功能，它把转换的功能拆分到一个个插件（plugins）中；因此当我们不添加任何插件的时候，输入输出代码是相同的。

- 基本用途：

  - 将项目中的 ES6+ 代码转换为浏览器都可以兼容的 ES5及以下的代码
  - 通过不同的配置项，来支撑实际业务中兼容的 JavaScript 版本，以及不同的目标浏览器

- 拓展用途：

  - 利用 Babel 的插件机制，编写自定义的 Babel 插件，对项目代码进行 AST 静态分析，加入自定义的逻辑，产出项目需要的自定义代码
  - 全局添加或删除业务代码（自动埋点、自动国际化、类型检查等等，更多实战案例，可以参考掘金小册-《Babel 插件通关秘籍》）