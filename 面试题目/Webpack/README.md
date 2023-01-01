## 参考资料

[Webpack与Grunt、Gulp的区别？](https://segmentfault.com/a/1190000019650765)

[webpack 易混淆知识点](https://www.cnblogs.com/skychx/tag/Webpack/) （[webpack 中，module，chunk 和 bundle 的区别是什么？](https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html)）

[当前标签：Webpack](https://www.cnblogs.com/fe-linjin/tag/Webpack/)

[当面试官问Webpack的时候他想知道什么](https://juejin.cn/post/6943468761575849992)

[关于 webpack 的面试题有哪些？](https://www.zhihu.com/question/266788138)

[webpack4打包vue前端多页面项目](https://juejin.cn/post/6844903679607177229)

Webpack是目前比较物流的前端构建工具，它基于入口，用不同的Loader来处理不同的文件。我们来看一下常见的Webpack面试题及答案吧，希望对你有帮助。

## **一、webpack了解吗，讲一讲原理，怎么压缩代码？**

1. 需要读到入口文件里面的内容。
2. 分析入口文件，[递归](https://www.zhihu.com/search?q=递归&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})的去读取模块所依赖的文件内容，生成AST[语法树](https://www.zhihu.com/search?q=语法树&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})。
3. 根据AST语法树，生成浏览器能够运行的代码

## 二、**webpack怎么配置？**

主要配置5个核心文件 

\1. mode：通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。 

\2. entry：**入口起点(entry point)** 指示 webpack 应该使用哪个模块，来作为构建其内部 [依赖图(dependency graph)]([https://webpack.docschina.org/concepts/dependency-graph/](https://link.zhihu.com/?target=https%3A//webpack.docschina.org/concepts/dependency-graph/)) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。 

\3. output：**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。 

\4. loader：webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 [模块]([https://webpack.docschina.org/concepts/modules](https://link.zhihu.com/?target=https%3A//webpack.docschina.org/concepts/modules))，以供应用程序使用，以及被添加到依赖图中。 

\5. plugin：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

## 三、**webpack怎么打包？**

`初始化参数`：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数,形成最后的配置结果； 

`开始编译`：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件 监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译； 

`确定入口`：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去； 

`编译模块`：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理； 

`完成模块编译并输出`：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk; 

`输出完成`：输出所有的chunk到[文件系统](https://www.zhihu.com/search?q=文件系统&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})。

## 你知道webpack的作用是什么吗？

从官网上的描述我们其实不难理解，`webpack`的作用其实有以下几点：

- **模块打包**。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
- **编译兼容**。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack`的`Loader`机制，不仅仅可以帮助我们对代码做`polyfill`，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
- **能力扩展**。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## 四、**说说[gulp](https://www.zhihu.com/search?q=gulp&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})和webpack的区别**

Gulp强调的是前端开发的工作流程。我们可以通过配置一系列的task，定义task处理的事务（例如[文件压缩](https://www.zhihu.com/search?q=文件压缩&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})合并、雪碧图、启动server、[版本控制](https://www.zhihu.com/search?q=版本控制&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})等），然后定义执行顺序，来让Gulp执行这些task，从而构建项目的整个前端开发流程。通俗一点来说，“Gulp就像是一个产品的流水线，整个产品从无到有，都要受流水线的控制，在流水线上我们可以对产品进行管理。” 

Webpack是一个前端模块化方案，更侧重模块打包。我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。 Webpack就是需要通过其[配置文件](https://www.zhihu.com/search?q=配置文件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})（Webpack.config.js）中 entry 配置的一个入口文件（JS文件），然后在解析过程中，发现其他的模块，如[scss](https://www.zhihu.com/search?q=scss&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})等文件，再调用配置的loader或者插件对相关文件进行解析处理。 

虽然Gulp 和 Webpack都是[前端自动化构建](https://www.zhihu.com/search?q=前端自动化构建&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2737696833})工具，但看2者的定位就知道不是对等的。Gulp严格上讲，模块化不是他强调的东西，旨在规范前端开发流程。Webpack更明显的强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。

## 说一下模块打包运行原理？

如果面试官问你`Webpack`是如何把这些模块合并到一起，并且保证其正常工作的，你是否了解呢？

首先我们应该简单了解一下`webpack`的整个打包流程：

- 1、读取`webpack`的配置参数；
- 2、启动`webpack`，创建`Compiler`对象并开始解析项目；
- 3、从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
- 4、对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为`Javascript`文件；
- 5、整个过程中`webpack`会通过发布订阅模式，向外抛出一些`hooks`，而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

其中文件的解析与构建是一个比较复杂的过程，在`webpack`源码中主要依赖于`compiler`和`compilation`两个核心对象实现。

`compiler`对象是一个全局单例，他负责把控整个`webpack`打包的构建流程。 `compilation`对象是每一次构建的上下文对象，它包含了当次构建所需要的所有信息，每次热更新和重新构建，`compiler`都会重新生成一个新的`compilation`对象，负责此次更新的构建过程。

而每个模块间的依赖关系，则依赖于`AST`语法树。每个模块文件在通过`Loader`解析完成之后，会通过`acorn`库生成模块代码的`AST`语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。

最终`Webpack`打包出来的`bundle`文件是一个`IIFE`的执行函数。



作者：希沃ENOW大前端
链接：https://juejin.cn/post/6943468761575849992
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## Loader？

postcss-loader、style-loader、css-loader、sass-loader、babel-loader、vue-loader。。。

从上面的打包代码我们其实可以知道，`Webpack`最后打包出来的成果是一份`Javascript`代码，实际上在`Webpack`内部默认也只能够处理`JS` / JSON模块代码，在打包过程中，会默认把所有遇到的文件都当作 `JavaScript`代码进行解析，因此当项目存在非`JS`类型文件时，我们需要先对其进行必要的转换，才能继续执行打包任务，这也是`Loader`机制存在的意义。

```js
// webpack.config.js
module.exports = {
  // ...other config
  module: {
    rules: [
      {
        test: /^your-regExp$/,
        use: [
          {
             loader: 'loader-name-A',
          }, 
          {
             loader: 'loader-name-B',
          }
        ]
      },
    ]
  }
}
```

## Plugin？

如果说`Loader`负责文件转换，那么`Plugin`便是负责功能扩展。`Loader`和`Plugin`作为`Webpack`的两个重要组成部分，承担着两部分不同的职责。

上文已经说过，`webpack`基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务，从而实现自己想要的功能。

既然基于发布订阅模式，那么知道`Webpack`到底提供了哪些事件钩子供插件开发者使用是非常重要的，上文提到过`compiler`和`compilation`是`Webpack`两个非常核心的对象，其中`compiler`暴露了和 `Webpack`整个生命周期相关的钩子（[compiler-hooks](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompiler-hooks%2F)），而`compilation`则暴露了与模块和依赖有关的粒度更小的事件钩子（[Compilation Hooks](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fapi%2Fcompilation-hooks%2F)）。

## [你真的需要 Webpack DllPlugin 吗？](https://www.cnblogs.com/skychx/p/webpack-dllplugin.html)

dll 其实就是缓存。

我们对比一下 DLL 和前端常接触的网络缓存，一张表就看明白了：

| DLL                                         | 缓存                                   |
| ------------------------------------------- | -------------------------------------- |
| 1.把公共代码打包为 DLL 文件存到硬盘里       | 1.把常用文件存到硬盘/内存里            |
| 2.第二次打包时动态链接 DLL 文件，不重新打包 | 2.第二次加载时直接读取缓存，不重新请求 |
| 3.打包时间缩短                              | 3.加载时间缩短                         |

dll 加速不明显了，有没有更好的替代品？在 [AutoDllPlugin](https://github.com/asfktz/autodll-webpack-plugin) 的 README.md 里，给我们推荐了 [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)，初始配置更简单，只需要一行代码：

```javascript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
}
```

## webpack深入了解——多入口、多出口以及html-webpack-plugin

https://www.jianshu.com/p/6ce74871189a

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/main.js',
        main2: './src/main2.js'
    },
    output: {//出口配置
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js' // [name]占位符
    },
    plugins: [ // 通过 htmlwebpack插件引入js文件
        new HtmlWebpackPlugin({
            chunks: ['main'], // 这个名字，就是入口定义的名字
            filename:'index.html',
            hash: true,
            title: '你好，世界',
            template: './src/index.html'
        }),

        new HtmlWebpackPlugin({
            chunks:['main2'],
            filename:'index2.html',
            hash: true,
            title: 'hello world',
            template: './src/index2.html'
        })
    ]
    
}
```

## 热模块更换(Hot Moudle Replacement)的原理

原理大概是这样: 在本地开发环境下,浏览器是客户端,webpack-dev-server(WDS)相当于我们的服务端。HRM的核心就是客户端从服务端拉取更新后的资源(准确地说,HRM拉取的不是整个资源文件,而是chunk diff),即 chunk需要更新的部分。

这需要WDS对本地资源文件进行监听,实际上**WDS与浏览器之间维护了一个websocket,当本地资源发生变化时,WDS会向浏览器推送更新事件,带上这次构建的hash,让客户端与上次资源进行对比,**通过对比hash可以防止冗余更新的出现。

https://juejin.cn/post/7130269957979865102

## 问题

基本概念…比如entry, output, chunk

常用Loader.plugin. 以及其作用。

实践经验，比如code spliting, build

如何提高构建/编译速度，并解答每个方案的原理
