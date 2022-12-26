# 原理

### 总结

我们来总结一下，`babel-plugin-import` 和普遍的 `babel` 插件一样，会遍历代码的 `ast`，然后在 `ast` 上做了一些事情：

1. **收集依赖**：找到 `importDeclaration`，分析出包 `a` 和依赖 `b,c,d....`，假如 `a` 和 `libraryName` 一致，就将 `b,c,d...` 在内部收集起来
2. **判断是否使用**：在多种情况下（比如文中提到的 `CallExpression`）判断 收集到的 `b,c,d...` 是否在代码中被使用，如果有使用的，就调用 `importMethod` 生成新的 `impport` 语句
3. **生成引入代码**：根据配置项生成代码和样式的 `import` 语句

- [ ] [【前端工程化基础 - Babel 篇】简单实现 babel-plugin-import 插件](https://juejin.cn/post/6905708824703795214)
- [ ] [babel-plugin-import 按需加载原理](https://blog.csdn.net/qq_33988065/article/details/122063705)
- [ ] [用 babel-plugin 实现按需加载](https://zhuanlan.zhihu.com/p/210280253)