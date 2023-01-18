# npm <!-- omit in toc -->

> Author: tinfengyee
> Date: 2023-01-16 09:49:05
> LastEditTime: 2023-01-16 09:51:49
> Description: NO Desc

# 常用npm包

```

cnpm
npm install -g cnpm --registry=https://registry.npmmirror.com
npm i cgr --registry=https://registry.npmmirror.com
pm2
yarn
@vue/cli
```



# 查看可执行文件路径

```bash
where java
where npm
```

# 如何将 Node 和 NPM 更新到最新版本

```bash
npm install -g n
n lts
n latest
n prune

// npm
npm install -g npm@latest
```

# 使用 nvm 更换node版本

[nvm 教程](https://baijiahao.baidu.com/s?id=1750888821840618173&wfr=spider&for=pc)

https://github.com/coreybutler/nvm-windows

卸载当前 node 和 相关配置

> Alternatively, copy the settings to the user config `%UserProfile%\.npmrc`. Delete the existing npm install location (e.g. `%AppData%\npm`) to prevent global module conflicts.

```
nvm list available
nvm use 18.13.0
nvm list
nvm use 16.19.0
nvm use latest 安装最新版本
nvm use lts 安装长期支持版本
```

> 一旦你安装了一个版本的 node，就会自动为你安装相应版本的 npm，所以不需要单独安装npm

# 获取 npm 配置

```
npm config ls

npm config set proxy http://server:port
npm config set https-proxy http://server:port

npm config delete proxy
npm config delete https-proxy
```

# npm 更新依赖包

https://juejin.cn/post/6913833065647341581

# NPM 换源

淘宝镜像

```
原淘宝 npm 域名即将停止解析
正如在《淘宝 NPM 镜像站喊你切换新域名啦》 中预告的那样：

http://npm.taobao.org 和 http://registry.npm.taobao.org 将在 2022.06.30 号正式下线和停止 DNS 解析。

域名切换规则：

http://npm.taobao.org => http://npmmirror.com
http://registry.npm.taobao.org => http://registry.npmmirror.com
```

http://npmmirror.com/

```bash
npm install -g cnpm --registry=https://registry.npmmirror.com
```

安装换源工具

这里我用cgr , 或者 nrm , yrm
https://github.com/daysai/cgr

```bash
cnpm install -g cgr
cgr use taobao [n/y]
```

安装 yarn

```bash
npm install --global yarn
```

# npm查看全局安装过的模块以及安装路径

```bash
npm config get prefix
npm list -g --depth 0
```

# 【npm publish package】发布流程

https://juejin.cn/post/6844904112153165832

[原来发布一个 npm 包如此简单](https://juejin.cn/post/7172036995489759245)

[13 个 npm 快速开发技巧](https://juejin.cn/post/6844903879943913485)

[都2202年了，不会有人还不会发布npm包吧](https://juejin.cn/post/7172240485778456606)

https://juejin.cn/post/6987695534504935438

https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages
