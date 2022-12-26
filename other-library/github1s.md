https://github.com/conwnet/github1s

只需在浏览器地址栏中添加`1s`并`github`按下`Enter`您要阅读的任何存储库。

例如，在 VS Code 存储库中尝试：

https://github1s.com/microsoft/vscode

您也可以以相同的方式使用[https://gitlab1s.com](https://gitlab1s.com/)或[https://npmjs1s.com](https://npmjs1s.com/)。

对于浏览器扩展，请参阅[第三方相关项目](https://github.com/conwnet/github1s#third-party-related-projects)。

或者将下面的代码片段保存为书签，你可以用它在github.com和github1s.com之间快速切换（GitHub markdown不允许js链接，所以直接复制到书签中）。

```
javascript: window.location.href = window.location.href.replace(/github(1s)?.com/, function(match, p1) { return p1 ? 'github.com' : 'github1s.com' })
```

