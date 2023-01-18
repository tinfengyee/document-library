# npm <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-07-12 23:55:06
> LastEditTime: 2022-12-29 10:31:15
> Description: 

# npm 使用

```
使用 npm 的时候，多加--verbose

npm rebuild pkg

node
process.versions 可以查看 node 对应 modules
```

# npm 配置

[package.json详解](https://www.yuque.com/docs/share/72be91e9-c5dd-4410-a1f2-519a965bf23c?#)

- .npmrc

  The npm config files

- npm-shrinkwrap.json

  A publishable lockfile

- **package.json**

  Specifics of npm's package.json handling

- package-lock.json

  A manifestation of the manifest

## Config Settings

`init-author-email`

`init-author-name`

`proxy`

....

```bash
npm c set init-author-name="tinf" 

npm config set <key> <value> [--global]
npm config get <key>
npm config delete <key>
npm config list
npm config edit
npm get <key>
npm set <key> <value> [--global]
```

## .npmrc文件

```
registry=https://registry.npmmirror.com

disturl=https://registry.npmmirror.com/-/binary/node/
# node-sass预编译二进制文件下载地址
sass_binary_site=https://registry.npmmirror.com/-/binary/node-sass
# sharp预编译共享库, 截止2022-09-20 sharp@0.31.0的预编译共享库并未同步到镜像, 入安装失败可切换到sharp@0.30.7使用
sharp_libvips_binary_host=https://registry.npmmirror.com/-/binary/sharp-libvips
python_mirror=https://registry.npmmirror.com/-/binary/python/
electron_mirror=https://registry.npmmirror.com/-/binary/electron/
electron_builder_binaries_mirror=https://registry.npmmirror.com/-/binary/electron-builder-binaries/
# 无特殊配置参考{pkg-name}_binary_host_mirror={mirror}
canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
node_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/sqlite3
better_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/better-sqlite3
```

# npm CLI

https://docs.npmjs.com/cli/v8/commands/npm

```
npm CMD --help
npm view connect [version|versions]
```

- npm
  JavaScript package manager
- npm access
  Set access level on published packages
- npm adduser
  Add a registry user account- npm audit
  Run a security audit
- npm bin
  Display npm bin folder
- npm bugs
  Bugs for a package in a web browser maybe
- npm cache
  Manipulates packages cache
- npm ci
  Install a project with a clean slate
- npm completion
  Tab completion for npm
- **npm config**
  Manage the npm configuration files
- npm dedupe
  Reduce duplication
- npm deprecate
  Deprecate a version of a package
- npm diff
  The registry diff command
- npm dist-tag
  Modify package distribution tags
- npm docs
  Docs for a package in a web browser maybe
- npm doctor
  Check your environments
- npm edit
  Edit an installed package
- npm exec
  Run a command from an npm package
- npm explain
  Explain installed packages
- npm explore
  Browse an installed package
- npm find-dupes
  Find duplication in the package tree
- npm fund
  Retrieve funding information
- npm help
  Search npm help documentation
- npm help-search
  Get help on npm
- npm hook
  Manage registry hooks
- npm init
  Create a package.json file
- npm install  (-D -E -O)
  Install a package
- npm install-ci-test
  Install a project with a clean slate and run tests
- npm install-test
  Install package(s) and run tests
- npm link
  Symlink a package folder
- npm logout
  Log out of the registry
- npm ls
  List installed packages
- npm org
  Manage orgs
- npm outdated
  Check for outdated packages
- npm owner
  Manage package owners
- npm pack
  Create a tarball from a package
- npm ping
  Ping npm registry
- npm pkg
  Manages your package.json
- npm prefix
  Display prefix
- npm profile
  Change settings on your registry profile
- npm prune
  Remove extraneous packages
- npm publish
  Publish a package
- npm rebuild
  Rebuild a package
- npm repo
  Open package repository page in the browser
- npm restart
  Restart a package
- npm root
  Display npm root
- npm run-script
  Run arbitrary package scripts
- npm search
  Search for packages
- npm set-script
  Set tasks in the scripts section of package.json
- npm shrinkwrap
  Lock down dependency versions for publication
- npm star
  Mark your favorite packages
- npm stars
  View packages marked as favorites
- npm start
  Start a package
- npm stop
  Stop a package
- npm team
  Manage organization teams and team memberships
- npm test
  Test a package
- npm token
  Manage your authentication tokens
- npm uninstall
  Remove a package
- npm unpublish
  Remove a package from the registry
- npm unstar
  Remove an item from your favorite packages
- npm update
  Update a package
- npm version
  Bump a package version
- npm view
  View registry info
- npm whoami
  Display npm username
- npx
  Run a command from an npm package

# Shorthands and Other CLI Niceties

The following shorthands are parsed on the command-line:

- `-a`: `--all`
- `--enjoy-by`: `--before`
- `-c`: `--call`
- `--desc`: `--description`
- `-f`: `--force`
- `-g`: `--global`
- `--iwr`: `--include-workspace-root`
- `-L`: `--location`
- `-d`: `--loglevel info`
- `-s`: `--loglevel silent`
- `--silent`: `--loglevel silent`
- `--ddd`: `--loglevel silly`
- `--dd`: `--loglevel verbose`
- `--verbose`: `--loglevel verbose`
- `-q`: `--loglevel warn`
- `--quiet`: `--loglevel warn`
- `-l`: `--long`
- `-m`: `--message`
- `--local`: `--no-global`
- `-n`: `--no-yes`
- `--no`: `--no-yes`
- `-p`: `--parseable`
- `--porcelain`: `--parseable`
- `-C`: `--prefix`
- `--readonly`: `--read-only`
- `--reg`: `--registry`
- `-S`: `--save`
- `-B`: `--save-bundle`
- `-D`: `--save-dev`
- `-E`: `--save-exact`
- `-O`: `--save-optional`
- `-P`: `--save-prod`
- `-?`: `--usage`
- `-h`: `--usage`
- `-H`: `--usage`
- `--help`: `--usage`
- `-v`: `--version`
- `-w`: `--workspace`
- `--ws`: `--workspaces`
- `-y`: `--yes`

# 问题

## 解决 global 警告

> 参考 1

问题提示

```
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
```


第一种方法：

以管理员身份打开 PowerShell 并运行（[有关策略的信息](https://stackoverflow.com/a/26955050/10188661)）：

```
Set-ExecutionPolicy RemoteSigned

npm install --global --production npm-windows-upgrade

npm-windows-upgrade --npm-version latest

```

第二种方法：

The solution I followed to solve this problem:

1. Go to folder `C:\Program Files\nodejs`
2. You have to edit four files named `npm`, `npm.cmd`, `npx`, `npx.cmd`
3. Open the files in a text editor, like Visual Studio Code
4. Replace `prefix -g` with `prefix --location=global` in all four files
5. Save all (if asked, save as administrator)
6. Good to go!

## 给Git和NPM代理加速

[给Git和NPM代理加速](https://dpigu.github.io/post/%E7%BB%99Git%E5%92%8CNPM%E4%BB%A3%E7%90%86%E5%8A%A0%E9%80%9F/)

[npm 急速装包](https://blog.zuiyu1818.cn/posts/node_package.html)

```
# 根据你的终端选一个
# cmd
set http_proxy=http://127.0.0.1:7890 & set https_proxy=http://127.0.0.1:7890
# power shell
$Env:http_proxy="http://127.0.0.1:7890";$Env:https_proxy="http://127.0.0.1:7890"
# git bash
git config --global https.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```



### 配置 Git 本地代理

> Git 同时支持 Socket5 和 HTTP 代理，根据本地客户端具体情况选择一种配置就可以了

#### Socket5 代理

Git 默认的 Socket5 代理应设置为：(其中 server 是服务器地址，port是代理端口)

```
$ git config --global http.proxy socks5://server:port
$ git config --global https.proxy socks5://server:port
```

本地服务器的 IPV4 地址就是：127.0.0.1，端口填上面 Clash 中的 Socket5 代理端口

以我的本地代理端口为例，在 Git bash/Windows 终端下输入下面命令回车

```
$ git config --global http.proxy socks5://127.0.0.1:7891
$ git config --global https.proxy socks5://127.0.0.1:7891
```

Socket5 代理设置完成

#### HTTP 代理

> 如果你的代理客户端不支持 Socket5代理，那它至少是支持 HTTP代理的

Git 默认的 HTTP 代理应设置为：(其中 server 是服务器地址，port是代理端口)

```
$ git config --global http.proxy http://server:port
$ git config --global https.proxy http://server:port
```

本地服务器的 IPV4 地址就是：127.0.0.1，端口填上面 Clash 中的 HTTP 代理端口

以我的本地代理端口为例，在 Git bash/Windows 终端下输入下面命令回车

```
$ git config --global http.proxy http://127.0.0.1:7890
$ git config --global https.proxy https://127.0.0.1:7890
```

#### 测试 Git 速度

Git 拉取[OlaIndex](https://github.com/WangNingkai/OLAINDEX)的代码测试：

#### 取消 Git 代理

如果哪天需要取消代理，在 Git bash/Windows 终端下输入下面命令回车即可：

```
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```

### 配置本地 NPM 代理

NPM 原生支持 HTTP 代理，但是不支持 Socket5 代理，要想使用 Socket5 为 NPM 代理，你还需要 HTTP 监听 Socket5 代理工具，这里不做讨论🙄

> 对于没有密码的 HTTP 代理（比如上面）

#### HTTP 代理

默认的 HTTP 代理应设置为：(其中 server 是服务器地址，port是代理端口)

```
$ npm config set proxy http://server:port
$ npm config set https-proxy http://server:port
用户名:密码@代理ip:端口号
```

打开 Git bash/Windows 终端，比如我的设置为：

```
$ npm config set proxy http://127.0.0.1:7890
$ npm config set https-proxy http://127.0.0.1:7890
```

这时本地的 NPM 的 HTTP 代理设置已经完成

#### 取消 NPM 代理

如果你需要取消代理，在终端输入下面命令即可😋

```
$ npm config delete proxy
$ npm config delete https-proxy
```

### 查看 Git 和 NPM 的配置文件

以默认设置安装的 Git 和 Node.js 客户端默认的配置文件都在该目录下：

```
Explorer
C:\Users\用户名
```

#### 你可以直观的查看 Git 和 NPM 的配置

其中.gitconfig 是 Git 的配置文件

.npmrc 是 NPM 的配置文件

## 安装node-sass ,canvas等失败

[npm - node环境canvas安装慢、安装失败的解决方法](https://huaweicloud.csdn.net/639fe933dacf622b8df8fa92.html) `推荐`

[Node Sass version 8.0.0 is incompatible with ^4.0.0?](https://stackoverflow.com/questions/74501317/whats-the-fix-for-error-node-sass-version-8-0-0-is-incompatible-with-4-0-0)

[记录安装 node-sass 失败原因及解决办法汇总](https://juejin.cn/post/6946530710324772878)

[Node-Sass安装失败的三种解决方案](https://github.com/kaindy7633/blog/blob/main/front-end/Node-Sass%E5%AE%89%E8%A3%85%E5%A4%B1%E8%B4%A5%E7%9A%84%E4%B8%89%E7%A7%8D%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.md)

`npm` 安装 `node-sass` 依赖时，会从 `github.com` 上下载 `.node` 文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。

这是使用 `sass` 的同学可能都会遇到的郁闷的问题。

解决方案就是使用其他源，或者使用工具下载，然后将安装源指定到本地。

> 另外 react-scripts 需要更新到 4.0.3

### 更换成 sass

```bash
npm uninstall node-sass
npm install sass
```

> Try this: In your packege.json file, delete "node-sass": "^4.12.0" and replace it with "sass": "". This did it for me.

### 使用淘宝镜像源

设置变量 `sass_binary_site`，指向淘宝镜像地址。示例：

```
npm i node-sass --sass_binary_site=https://registry.npmmirror.com/-/binary/node-sass
// 也可以设置系统环境变量的方式。示例
// linux、mac 下
SASS_BINARY_SITE=https://registry.npmmirror.com/-/binary/node-sass

// window 下
set SASS_BINARY_SITE=https://registry.npmmirror.com/-/binary/node-sass && npm install node-sass
```

或者设置全局镜像源：

```
npm config set sass_binary_site https://registry.npmmirror.com/-/binary/node-sass
或者
npm set sass_binary_site https://registry.npmmirror.com/-/binary/node-sass
```

之后再涉及到 `node-sass` 的安装时就会从淘宝镜像下载。

### 使用 cnpm

使用 `cnpm` 安装 `node-sass` 会默认从淘宝镜像源下载，也是一个办法：

```
cnpm install node-sass
```

### 为什么使用 https://registry.npmmirror.com

目前网上搜索到的canvas二进制文件镜像配置均是如下，此镜像在年前的时候确实可以正常安装，但是年后我在执行npm i构建项目时却执行失败。浏览器访问镜像地址，镜像地址下已没有任何文件。

```
canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/
```

### 我的.npmrc文件

在用户配置或者项目根目录创建`.npmrc`文件，复制下面代码到该文件。

```
registry=https://registry.npmmirror.com

disturl=https://registry.npmmirror.com/-/binary/node/
# node-sass预编译二进制文件下载地址
sass_binary_site=https://registry.npmmirror.com/-/binary/node-sass
# sharp预编译共享库, 截止2022-09-20 sharp@0.31.0的预编译共享库并未同步到镜像, 入安装失败可切换到sharp@0.30.7使用
sharp_libvips_binary_host=https://registry.npmmirror.com/-/binary/sharp-libvips
python_mirror=https://registry.npmmirror.com/-/binary/python/
electron_mirror=https://registry.npmmirror.com/-/binary/electron/
electron_builder_binaries_mirror=https://registry.npmmirror.com/-/binary/electron-builder-binaries/
# 无特殊配置参考{pkg-name}_binary_host_mirror={mirror}
canvas_binary_host_mirror=https://registry.npmmirror.com/-/binary/canvas
node_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/sqlite3
better_sqlite3_binary_host_mirror=https://registry.npmmirror.com/-/binary/better-sqlite3
```

### Found bindings for the following environments

```
Found bindings for the following environments:
  - Windows 64-bit with Node.js 6.x
```

这是因为原有`binding.node`缓存跟现node版本不一致。按提示`npm rebuild node-sass`或清除缓存重新安装即可。

保存后 删除之前安装失败的包(第一次安装请跳过此步)

```
npm uninstall node-sass
```

重新安装

```
npm install node-sass
```

## digital envelope routines::initialization error

[error:03000086:digital envelope routines::initialization error 问题解决](https://blog.csdn.net/qq_21271511/article/details/127996193)

```
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run start
```
