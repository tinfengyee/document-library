# Git_link <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-06 19:31:34
> LastEditTime: 2022-08-07 01:25:08
> Description: NO Desc

# Git 资源参考

- [https://git-scm.com/docs](https://git-scm.com/docs)

- [Git 中文参考](https://www.bookstack.cn/read/git-doc-zh/README.md)
- [Git Community Book 中文版](http://static.kancloud.cn/thinkphp/git-community-book)
- [猴子都能懂的GIT入门](https://backlog.com/git-tutorial/cn/)
- [Git 使用规范流程](https://www.ruanyifeng.com/blog/2015/08/git-use-process.html)
- [阮一峰 Git 教程](https://www.bookstack.cn/read/git-tutorial/README.md)
- [Git超详解（看不懂算我输）](https://blog.csdn.net/weixin_44154094/article/details/114338173)

# Unsafe repository

- [Fatal error "unsafe repository ('/home/repon' is owned by someone else)"](https://stackoverflow.com/questions/71901632/fatal-error-unsafe-repository-home-repon-is-owned-by-someone-else)

```
PowerShell:
git config --global --add safe.directory *
Bash:
git config --global --add safe.directory '*'
git config --global --add safe.directory your-directory
```

# CRLF/LF

- [通过阅读 git-config 文档理解 Git 如何使用autocrlf、safecrlf、eol和.gitattributes处理line-ending](https://xiaozhuanlan.com/topic/4053786912#sectiontortoisegitsettingsaboutautocrlf)
- [使用 Git 处理 CRLF（回车、换行）的策略](https://stackoverflow.com/questions/170961/whats-the-strategy-for-handling-crlf-carriage-return-line-feed-with-git)
- [git如何避免”warning: LF will be replaced by CRLF“提示？](https://www.zhihu.com/question/50862500)
- [配置 Git 处理行结束符](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings#further-reading)


# .gitattributes

.gitattributes 是一个文本文件，文件中的一行定义一个路径的若干个属性，主要用于定义每种文件的属性，以方便 git 帮我们统一管理。

- [什么是 .gitattributes ？](https://zhuanlan.zhihu.com/p/108266134)
- [.gitattributes 作用详细讲解（git大佬必会技能)](https://blog.csdn.net/qq_35425070/article/details/106883833)
- [Git的gitattributes文件详解](https://www.shuzhiduo.com/A/x9J27W4j56/)
- [Mind the End of Your Line](https://adaptivepatchwork.com/2012/03/01/mind-the-end-of-your-line/)

# 其他

> 变基评论区

https://git-scm.com/book/zh/v2

http://gitbook.liuhui998.com/index.html

https://mirrors.edge.kernel.org/pub/software/scm/git/docs/

https://blog.csdn.net/yxlshk/article/details/79944535

> reset、revert