# npm <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-07-12 23:55:06
> LastEditTime: 2022-07-30 00:28:40
> Description: 

# CLI CMD

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

# Configuring npm

[package.json详解](https://www.yuque.com/docs/share/72be91e9-c5dd-4410-a1f2-519a965bf23c?#)

- Install

  Download and install node and npm

- Folders

  Folder structures used by npm

- .npmrc

  The npm config files

- npm-shrinkwrap.json

  A publishable lockfile

- **package.json**

  Specifics of npm's package.json handling

- package-lock.json

  A manifestation of the manifest

# Using npm

- Registry

  JavaScript 包注册表

- Package spec

  包名说明符

- **Config**

  关于 npm 配置

- Logging

  Why, What & How we Log

- Scope

  Scoped packages

- Scripts

  npm 如何处理“脚本”字段

- Workspaces

  Working with workspaces

- Organizations

  Working with teams & organizations

- Developers

  Developer guide

- Removal

  Cleaning the slate

## Shorthands and Other CLI Niceties

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

## Config Settings

`init-author-email`

`init-author-name`

`proxy`

....

```bash
npm c set init-author-name="tinf" 
```



# 1. 问题

## 1.1. 解决 global 警告

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

# 2. 参考

1. [message-npm-warn-config-global-global-local-are-deprecated-use-loc](https://stackoverflow.com/questions/72401421/message-npm-warn-config-global-global-local-are-deprecated-use-loc)
