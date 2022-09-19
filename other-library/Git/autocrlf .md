[Why do I keep getting Delete 'cr' prettier/prettier\?](https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier)

[Delete `␍`eslint(prettier/prettier) 错误的解决方案](https://juejin.cn/post/6844904069304156168)

```bash
git config --global core.autocrlf input 


git rm --cached -r . 


git reset --hard
```