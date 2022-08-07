# Git 学习 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-03-29 19:57:03
> LastEditTime: 2022-08-07 13:42:44
> Description: NO Desc

# 1. 集中式和分布式

关于 SVN 和 Git，其实涉及两种管理系统的比较，即：集中式与分布式。

+ **集中式**：每个人都可以在一定程度上看到项目中的其他人正在做些什么。 而管理员也可以轻松掌控每个开发者的权限，并且管理一个 CVCS 要远比在各个客户端上维护本地数据库来得轻松容易。

  事分两面，有好有坏。 这么做最显而易见的缺点是中央服务器的单点故障。 如果宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。 如果中心数据库所在的磁盘发生损坏，又没有做恰当备份，毫无疑问你将丢失所有数据——包括项目的整个变更历史，只剩下人们在各自机器上保留的单独快照。 本地版本控制系统也存在类似问题，只要整个项目的历史记录被保存在单一位置，就有丢失所有历史更新记录的风险。

+ **分布式**：客户端并不只提取最新版本的文件快照， 而是把代码仓库完整地镜像下来，包括完整的历史记录。 这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。

  更进一步，许多这类系统都可以指定和若干不同的远端代码仓库进行交互。籍此，你就可以在同一个项目中，分别和不同工作小组的人相互协作。 你可以根据需要设定不同的协作流程，比如层次模型式的工作流，而这在以前的集中式系统中是无法实现的。

#  2. 安装配置

**配置：**
1.系统级别：`git config --system` 配置选项 (`%git安装路径%/etc/gitconfig`)
2.用户级别：`git config --global` 配置选项 (`\$USER\.gitconfig`。)
3.仓库级别：`git config` 配置选项 (`.git/config`)

当前仓库级别`>`用户级别`>`系统级别。

显示配置文件对应路径

```
git config -h
git config --list --show-origin --show-scope
```

**配置用户名和邮箱**

```
git config --global user.email "tinfengyee@163.com"
git config --global user.name "tinfengyee"
```

去除提醒 Unsafe repository

```
PowerShell:
git config --global --add safe.directory *
Bash:
git config --global --add safe.directory '*'
git config --global --add safe.directory your-directory
```

重新进行配置

```
git config --unset [configname]		重置指定的配置
可以加参数 --global`和`--system
```

手动添加配置

`C:\Users\<user>\.gitconfig` 

```
[core]
	editor = \"C:\\Program Files\\Microsoft VS Code\\bin\\code.cmd\" --wait
	autocrlf = true
[user]
	name = tinfengyee
	email = tinfengyee@163.com
[safe]
	directory = *
[http]
	sslVerify = false
[alias]
	lg = log --oneline -10
	graph = log --oneline --graph -10
	st = status
	ci = commit -m
	rs = reset --hard HEAD~1
[color]
	ui = auto
```

# 3. 获取帮助

我们可以通过命令打开相应Git 命令的综合手册（manpage）

```bash
$ git help <verb>
$ git <verb> --help
$ man git-<verb>
```

例如，要想获得 `git config` 命令的手册，执行

```bash
$ git help config

# 输入 -h 显示简要手册在控制台
$ git add -h
```

# 4. 开始使用 Git

- [开始使用 Git](https://docs.github.com/cn/get-started/getting-started-with-git/setting-your-username-in-git)

- [Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

- [Git Community Book 中文版](http://static.kancloud.cn/thinkphp/git-community-book)

# 5. Git 基础命令

## 5.1. add

添加跟踪文件到暂存区。

```bash
$ git add .
```

## 5.2. commit

提交。

```bash
$ git commit [-m <msg>] [-a] [--amend]
```

- 如果不带参数，默认启动文本编辑器输入提交说明。

- `-m` ，提交并且输入提交说明

- `-a`，跳过使用暂存区域，不需要 `git add`

  ```bash
  $ git commit -a -m 'msg'
  ```

- `--amend`，提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了，运行此命令可以第二次 commit 将代替第一次 commit 的结果。

  例如，你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

  ```bash
  $ git commit -m 'initial commit'
  $ git add forgotten_file
  $ git commit --amend
  ```

  >  当你在修补最后的提交时，与其说是修复旧提交，倒不如说是完全用一个 **新的提交** 替换旧的提交， 理解这一点非常重要。从效果上来说，就像是旧有的提交从未存在过一样，它并不会出现在仓库的历史中。修补提交最明显的价值是可以稍微改进你最后的提交，而不会让“啊，忘了添加一个文件”或者 “小修补，修正笔误”这种提交信息弄乱你的仓库历史。

## 5.3. reset

重置、撤消操作。

1.取消暂存文件。

```bash
$ git reset HEAD CONTRIBUTING.md
# 更推荐使用 git restore --staged <file>
```

## 5.4. restore

```bash
$ git restore [--staged] <file>
```

## 5.5. checkout

中文意思为**检出**，理解一下什么叫检出，把东西拿出来。

撤销修改

```bash
$ git checkout -- CONTRIBUTING.md
# 更推荐使用 git restore <file>
```

> 请务必记得 `git checkout -- <file>` 是一个危险的命令。 你对那个文件在本地的任何修改都会消失——Git 会用最近提交的版本覆盖掉它。 除非你确实清楚不想要对那个文件的本地修改了，否则请不要使用这个命令。阅读 [数据恢复](https://git-scm.com/book/zh/v2/ch00/_data_recovery) 了解数据恢复）

分支操作

```bash
$ git checkout dev # 切换 dev 分支 --- 检出 dev 分支
$ git checkout -b dev origin/main # 从 origin/main 创建并切换到本地 dev 分支
```

## 5.6. status

仓库状态。

```bash
$ git status [-s]
```

- `-s` ，使用 `git status -s` 命令或 `git status --short` 命令简洁输出。

## 5.7. diff

差异。

```bash
$ git diff # 查看工作区尚未暂存文件与仓库差异
$ git diff --staged #查看暂存文件与仓库差异
$ git diff --cached # --staged 和 --cached 是同义词
```

## 5.8. rm

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 `git rm` 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

```bash
$ git rm [-f] [--cached] <file> 

# 等同于
$ rm <file>
$ git add .
```

- `-f`，下一次提交时，该文件就不再纳入版本管理了。 如果要删除之前修改过或已经放到暂存区的文件，则必须使用强制删除选项 `-f`（译注：即 force 的首字母）。
- `--cached`，我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中。 换句话说，你想让文件保留在磁盘，但是并不想让 Git 继续跟踪。 当你忘记添加 `.gitignore` 文件，不小心把一个很大的日志文件或一堆 `.a` 这样的编译生成文件添加到暂存区时，这一做法尤其有用。 为达到这一目的，使用 `--cached` 选项。

`git rm` 命令后面可以列出文件或者目录的名字，也可以使用 `glob` 模式。比如：

```bash
$ git rm log/\*.log
```

注意到星号 `*` 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 `log/` 目录下扩展名为 `.log` 的所有文件。 类似的比如：

```bash
$ git rm \*~
```

该命令会删除所有名字以 `~` 结尾的文件。

## 5.9. mv

移动文件/重命名。

不像其它的 VCS 系统，Git 并不显式跟踪文件移动操作。 如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。 不过 Git 非常聪明，它会推断出究竟发生了什么。

要在 Git 中对文件改名，可以这么做：

```bash
$ git mv file_from file_to
```

其实，运行 `git mv` 就相当于运行了下面三条命令：

```bash
$ mv README.md README
$ git rm README.md
$ git add README
```

## 5.10. log

查看提交历史。

```bash
$ git log [--oneline] [--pretty=oneline] [--graph] [--all] [-number] [options]
# 常用命令 git log --oneline --graph
```

- `--oneline` ，常用，简洁输出 log 。
- `-number`，number 输入显示 log 数量。
- `--graph`，在日志旁以 ASCII 图形显示分支与合并历史。
- `--all`，查看所有分支的信息。
- `-p`，或 `--patch` 显示每次提交所引入的差异（按 补丁 的格式输出），即 diff 信息。
- `--stat`，简略统计文件更改信息，比 `-p` 简洁。
- `--pretty`，这个选项可以使用不同于默认格式的方式展示提交历史。如 `oneline`  、`format`等。

Table. `git log` 的常用选项：

| 选项              | 说明                                                         |
| :---------------- | :----------------------------------------------------------- |
| `-p`              | 按补丁格式显示每个提交引入的差异。                           |
| `--stat`          | 显示每次提交的文件修改统计信息。                             |
| `--shortstat`     | 只显示 --stat 中最后的行数修改添加移除统计。                 |
| `--name-only`     | 仅在提交信息后显示已修改的文件清单。                         |
| `--name-status`   | 显示新增、修改、删除的文件清单。                             |
| `--abbrev-commit` | 仅显示 SHA-1 校验和所有 40 个字符中的前几个字符。            |
| `--relative-date` | 使用较短的相对时间而不是完整格式显示日期（比如“2 weeks ago”）。 |
| `--graph`         | 在日志旁以 ASCII 图形显示分支与合并历史。                    |
| `--pretty`        | 使用其他格式显示历史提交信息。可用的选项包括 oneline、short、full、fuller 和 format（用来定义自己的格式）。 |
| `--oneline`       | `--pretty=oneline --abbrev-commit` 合用的简写。              |



Table. `git log --pretty=format` 常用的选项：

| 选项  | 说明                                          |
| :---- | :-------------------------------------------- |
| `%H`  | 提交的完整哈希值                              |
| `%h`  | 提交的简写哈希值                              |
| `%T`  | 树的完整哈希值                                |
| `%t`  | 树的简写哈希值                                |
| `%P`  | 父提交的完整哈希值                            |
| `%p`  | 父提交的简写哈希值                            |
| `%an` | 作者名字                                      |
| `%ae` | 作者的电子邮件地址                            |
| `%ad` | 作者修订日期（可以用 --date=选项 来定制格式） |
| `%ar` | 作者修订日期，按多久以前的方式显示            |
| `%cn` | 提交者的名字                                  |
| `%ce` | 提交者的电子邮件地址                          |
| `%cd` | 提交日期                                      |
| `%cr` | 提交日期（距今多长时间）                      |
| `%s`  | 提交说明                                      |

使用方式如下，

```bash
$ git log --pretty=format:"%h - %an, %ar : %s"
```



Table. 限制 `git log` 输出的选项：

| 选项                  | 说明                                       |
| :-------------------- | :----------------------------------------- |
| `-<n>`                | 仅显示最近的 n 条提交。                    |
| `--since`, `--after`  | 仅显示指定时间之后的提交。                 |
| `--until`, `--before` | 仅显示指定时间之前的提交。                 |
| `--author`            | 仅显示作者匹配指定字符串的提交。           |
| `--committer`         | 仅显示提交者匹配指定字符串的提交。         |
| `--grep`              | 仅显示提交说明中包含指定字符串的提交。     |
| `-S`                  | 仅显示添加或删除内容匹配指定字符串的提交。 |

如果要在 Git 源码库中查看 Junio Hamano 在 2008 年 10 月其间， 除了合并提交之外的哪一个提交修改了测试文件，可以使用下面的命令：

```bash
$ git log --pretty="%h - %s" --author='Junio C Hamano' --since="2008-10-01" \
   --before="2008-11-01" --no-merges -- t/
```

> 按照你代码仓库的工作流程，记录中可能有为数不少的合并提交，它们所包含的信息通常并不多。 为了避免显示的合并提交弄乱历史记录，可以为 `log` 加上 `--no-merges` 选项。



# 6. 远程仓库命令

## 6.1. clone

```bash
$ git clone <url> [dir_name] [--depth=1]
```

`--depth 1`,

```
git clone --depth 1  --branch english https://github.com/labuladong/fucking-algorithm.git
```

- 用 git clone --depth=1 的好处是限制 clone 的深度，不会下载 Git 协作的历史记录，这样可以大大加快克隆的速度 (如commit历史有人上传了大文件并且提交，后面又删除了)
- depth用于指定克隆深度，为1即表示只克隆最近一次commit
- 适合用 git clone --depth=1 的场景：**你只是想clone最新版本来使用或学习，而不是参与整个项目的开发工作**

git clone --depth=1后拉取其他分支的方法

上面提到的 git clone --depth=1 操作只会clone一个分支english，如果我们想把其他远程分支(如master)也克隆到本地，我们需要用下面的命令

```
$ git remote set-branches origin 'remote_branch_name'
$ git fetch --depth 1 origin remote_branch_name
$ git checkout remote_branch_name
```

参考 [详细介绍git clone --depth=1的用法](https://blog.csdn.net/qq_43827595/article/details/104833980)

## 6.2. remote

```bash
$ git remote [add <shortname> <url>] [-v] [show <shortname>] [rename <old_shortname> <new_shortname>] [remove | rm <shortname> ]
```

### 6.2.1. 编辑远程仓库信息

```
git remote add ... -h
git remote rename origin paul
git remote remove origin
```

### 6.2.2. 显示远程仓库

项目，可以关联多个远程仓库。如果想要看本地的代码有哪几个仓库进行关联。

那么可以通过`git remote -v`进行查看：

```
origin  git@github.com:tinfengyee/EOL.git (fetch)
origin  git@github.com:tinfengyee/EOL.git (push)
```

### 6.2.3. 检查远程仓库

`git remote show origin` 列出远程仓库的 URL 与跟踪分支的信息。

这些信息非常有用，它告诉你正处于 `main` 分支，并且如果运行 `git pull`， 就会抓取所有的远程引用，然后将远程 `main` 分支合并到本地 `main` 分支。 它也会列出拉取到的所有远程引用。

这是一个经常遇到的简单例子。 如果你是 Git 的重度使用者，那么还可以通过 `git remote show` 看到更多的信息。

```bash
$ git remote show origin
* remote origin
  Fetch URL: git@github.com:tinfengyee/EOL.git
  Push  URL: git@github.com:tinfengyee/EOL.git
  HEAD branch: main
  Remote branches:
    dev  tracked
    main tracked
  Local branch configured for 'git pull':
    main merges with remote main
  Local ref configured for 'git push':
    main pushes to main (fast-forwardable)
```

## 6.3. fetch

### 6.3.1. 拉取远程分支

```bash
$ git fetch origin
```

如果在多人开发中，你的领导创建了一个dev分支，用来作为发布前的协作分支，并且
已经把dev分支推送到了远程，那么这时候我们怎么在本地进行关联呢？

```bash
# 是把远程仓库的数据在本地进行更新。
$ git fetch origin

# 创建一个新的分支，并且把远程的origin/dev和本地的dev进行关联
$ git checkout -b dev origin/dev
# $ git branch dev origin/main 
# $ git switch dev
# $ git switch -c dev origin/main

# 将origin/dev的分支上的代码合并到dev分支
$ git merge origin/dev

```

正常来说：`pull=fetch+merge`;但是此处只能这样，如果pull，因为本地没有这个分支，会将远程gitbash代码与当前分支dev合并，也就是两个不相干的分支合并，就会有问题

比如现在在dev分支上，不要pull远程的其他分支（比如zhiliao），这样会把代码搞得
很乱。

### 6.3.2. 拉取并且清理过时分支

```
git fetch –all -p
```

等同于使用 `git remote prune origin` 命令，参考下面删除分支命令。

# 7. tag

像其他版本控制系统（VCS）一样，Git 可以给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ `v1.0` 、 `v2.0` 等等）。 

**列出标签**

这个命令以字母顺序列出标签，但是它们显示的顺序并不重要。

```bash
$ git tag
v1.0
v2.0
```

你也可以按照特定的模式查找标签。

```bash
$ git tag -l "v1.8.5*" # -l 或 --list 选项
v1.8.5
v1.8.5-rc0
v1.8.5-rc1
```

显示当前标签信息

```bash
$ git show <tag-name>
```

**创建标签**

创建轻量标签

```bash
$ git tag v1.4 
```

创建带说明的标签

```bash
$ git tag -a <tag-name> -m "DESC" <hash> # 带说明的 tag
```

后期打标签

```bash
$ git tag -a <tag-name> <commit> # 根据 commit_hash 打 tag
```

**推送标签**

```bash
$ git push <remote> <tag-name> # remote 通常为 origin
$ git push <remote> --tags # 推送所有 tag
```

**删除标签**

```bash
# 删除本地 tag
$ git tag -d <tag-name>

# 删除远程 tag
$ git push <remote> :refs/tags/<tag-name>
$ git push origin --delete <tagname>
```

**检出标签**

如果你想查看某个标签所指向的文件版本，可以使用 `git checkout` 命令， 虽然这会使你的仓库处于“**分离头指针**（**detached HEAD**）”的状态。

你可以四处看看，做些实验更改并提交它们，您可以放弃在此中所做的任何提交状态不影响任何分支，切换回一个分支。

```bash
$ git checkout v1.0
Note: switching to 'v1.0'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:
# 放弃操作
  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 5530c37 add a file
```

如果需要关闭 detached HEAD ，则运行，

```bash
$ git switch -
```

在“分离头指针”状态下，如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问。 因此，如果你需要进行更改，比如你要修复旧版本中的错误，那么通常需要创建一个新分支：

```bash
$ git switch -c version1 v1.0

Switched to a new branch 'version1'

# $ git checkout -b version2 v2.0.0 等同于 switch ，后面文档不再使用 checkout 检出分支。

```

如果在这之后又进行了一次提交，`version1` 分支就会因为这个改动向前移动， 此时它就会和 `v1.0.0` 标签稍微有些不同，这时就要当心了。

# 8. alias

如果不想每次都输入完整的 Git 命令，可以通过 `git config` 文件来轻松地为每一个命令设置一个别名。 这里有一些例子你可以试试：

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg 'log --oneline -10'

# 配置git alias别名
git config --global alias.st status

git config --global alias.unstage 'reset HEAD'

git unstage test.py
# =
git reset HEAD test.py

# 多长都可以配置
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

这意味着，当要输入 `git commit` 时，只需要输入 `git ci`。 

我们也可以通过 `git config --list --show-origin` 查找本地配置文件手动添加别名。

> 全局配置文件 windows 通常在 `C:\Users\<user>.gitconfig` 

`.gitconfig`

```
[alias]
	lg = log --oneline -10
	graph = log --oneline --graph -10
	st = status
```

# 9. 分支

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。

Git 又是怎么知道当前在哪一个分支上呢？ 也很简单，它有一个名为 `HEAD` 的特殊指针。 请注意它和许多其它版本控制系统（如 Subversion 或 CVS）里的 `HEAD` 概念完全不同。 在 Git 中，它是一个指针，指向当前所在的本地分支（译注：将 `HEAD` 想象为当前分支的别名）

![HEAD 指向当前所在的分支。](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/04/01/20220401012215.png)

## 9.1. branch

分支操作

```bash
git branch [<new-branch>] [-v] [other-options]
```

- 如果不带参数，显示当前所有分支。
- `-v`，查看所有分支，并每一个分支的最后一次提交。
- `--merged` / `--no-merged`，过滤这个列表中已经合并或尚未合并到当前分支的分支。
- `-m/-M`，更改分支名称。
- `-d/-D`，删除分支。

## 9.2. switch

切换分支，早期版本用 `checkout`。

```bash
git switch -c <new-branch> [<remote> <remote_branch>]❶
# 或者使用
git checkout -b <new-branch>
```

- `-c`，切换并创建新分支。
- ❶，切换并基于远程分支创建新分支。

# 10. 实战操作

## 10.2. .gitignore

```
.gitignore
git add -f <file> #忽略文件也可以强制推送
git check-ignore -v <file> # 需要找出来到底哪个规则写错了

# 排除所有.开头的隐藏文件:
.*
# 排除所有.class文件:
*.class

# 不排除.gitignore和App.class:
!.gitignore
!App.class
#  忽略所有.o 和 .a文件.
*.[oa]
```

## 10.3. remote add/set-url/push -u 是什么意思？

https://stackoverflow.com/questions/42830557/git-remote-add-origin-vs-remote-set-url-origin

below is used to a add a new remote:

```
git remote add origin git@github.com:User/UserRepo.git
```

below is used to change the url of an existing remote repository:

usually when I'm forking a new repo, I make a mistake and set the origin to the upstream. End up needing to correct it using the  command

```
git remote set-url origin git@github.com:User/UserRepo.git
```

## 10.4. push -u

git分支与远程主机存在对应分支，可能是单个可能是多个。 

- simple方式：如果当前分支只有一个追踪分支，那么 `git push origin` 到主机时，可以省略主机名。 

- matching方式：如果当前分支与多个主机存在追踪关系，那么 `git push --set-upstream origin master`（省略形式为：`git push -u origin master`）将本地的master分支推送到origin主机（`--set-upstream` 选项会指定一个默认主机），同时指定该主机为默认主机，后面使用可以不加任何参数使用 `git push`。

下面会将您的代码推送到定义的远程存储库的主分支，`origin`并`-u` (相当于 `--set-upstream`)让您将当前本地分支指向远程主分支：

```
git push -u origin master
```

**-u** 选项执行以下操作：对于每个最新或成功推送的分支，添加上游（跟踪）引用，由无参数、git-pull 和其他命令使用。

**因此，使用-u** 选项推送本地分支后，该本地分支将自动与远程分支链接，您可以使用 git pull 不带任何参数。

[git push -u origin master 中的 -u 标志是什么意思？](https://stackoverflow.com/questions/18867824/what-does-the-u-flag-mean-in-git-push-u-origin-master)

## 10.5. 删除git库中untracked files（未监控）的文件/目录

```
git clean -f
git clean -fd

在用上述 git clean 前，强烈建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
git clean -nxfd
git clean -nf
git clean -nfd
```

## 10.6. 删除分支命令

当你新创建分支，或者其他人新创建分支的时候，可以使用 `git fetch` 拉取远程最新分支到本地；此时也可以使用 `git remote show origin` 查看本地分支和远程分支的差异；

```
# 删除本地分支命令
git branch -d <branch>

# 删除远程分支命令
git push origin :<branch> 
git push origin --delete <branch>

# 查看所有分支
git branch -a

# 删除远程remote-tracking信息
git branch -d -r <branchname>

git fetch –all -p
```

有时候你会发现：git 已经删除了远程分支，本地仍然能看到 的问题  `git branch -a` 命令可以查看所有本地分支和远程分支，发现很多在远程仓库已经删除的分支在本地依然可以看到。

**解决方法：**

使用命令 `git remote show origin`，可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息，以及分支删除情况。

此时我们可以看到哪些远程仓库已经不存在的分支，根据提示，使用 `git remote prune origin` 命令；

这个时候，你再使用 `git branch -a` 查看，发现分支信息已经和远程git仓库同步了；

pull/fetch 只能同步分支信息，但是不能删除分支，所以面对上述问题，使用 pull/fetch 是不能解决问题的。但是使用 `git fetch –all -p` 操作跟上面效果是一样的。

## 10.7. 另一种删除远程分支/tag方法

```
git push origin :refs/tags/v0.9
```

在工作空间下，其实有一个隐藏文件.git（可用ls -a查看），这个文件里面就存储了对每次操作和文件的管理信息。其中，在路径refs/tags 下就存储了所有的tags信息。所以，当从本地去删除远程服务器上的标签是直接从.git配置文件里面删除了该标签。

冒号前面本来写的是你本地的分支名（或者对象，标签），冒号后面是远程分支名，现在冒号前面什么也没有，看起来就像是在远程标签前面加了个冒号一样，因为你推送了空给这个标签所以git认为你想删除这个标签

官方的解释：将冒号前面的空值推送到远程标签名，从而高效地删除它。

https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE

## 10.8. stash(藏匿处)

```
git stash save "desc" # 储藏 staged 内容
git stash list # 查看 stash 列表
git stash apply [<stash@{0}>] # 恢复 stash
git stash drop # 删除 stash
git stash pop # 恢复并删除 stash

git cherry-pick <hash> # 合并指定 commit 修改
```

通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场 `git stash` 一下，然后去修复bug，修复后，再 `git stash pop` ，回到工作现场；

在master分支上修复的bug，想要合并到当前dev分支，可以用 `git cherry-pick <commit>` 命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过 `git branch -D <name>` 强行删除。

## 10.9. 仓库操作

```bash
git reset --hard HEAD^
git reset --hard commit_id
git log --oneline --graph
git reflog
git diff HEAD -- <file>
git checkout -- <file> ## 没有--，就变成了“切换到另一个分支”的命令。现在推荐用 restore 
git restore --staged <file>
git reset <file> ## git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。现在推荐用 restore 

rm <file> # linux command
git rm <file> # 先手动删除文件，然后使用git rm <file>和git add<file>效果是一样的。
git branch <new-branch> [<hash>] # 使用 hash 可以创建一个历史分支
git branch -M <new-branch>
git branch -d/-D <branch> # 大写为强制删除

git fetch --all -p
git pull
git remote -v
git remote rm <remote>

git checkout -b <branch>
git checkout -b <branch> <remote>/<branch>
git switch -c <branch> origin/<remote_branch> # 新版本创建并且切换分支
git merge <branch>
git merge --no-ff -m "DESC" <branch> #使用非快速模式合并，即保留分支信息
git cherry-pick <hash> # 合并指定 commit 修改
```

## 10.10. Tag

```bash
git push <remote> <tag-name> # remote 通常为 origin
git push <remote> --tags # 推送所有 tag
git push <remote> :refs/tags/<tag-name> # 可以删除一个远程标签。

git tag
git tag <tag-name> [<hash>]
git tag -a <tag-name> -m "DESC" <hash> # 带说明的 tag
git show <tag-name>
git tag -d <tag-name>
```

## 10.11. 区间

你可以用".."来指两个提交(commit)之间的区间. 下面的命令会给出你在"7b593b5" 和"51bea1"之间除了"7b593b5外"的所有提交(commit)(注意:51bea1是最近的提交).

```
7b593b5..51bea1
```

这会包括所有 *从* 7b593b开始的提交(commit). 译者注: 相当于 7b593b..HEAD

```
7b593b.. 
```

## 10.12. 追踪分支

你可以在使用'git branch'命令时加上'--track'参数, 来手动创建一个'追踪分支'.

```
git branch --track experimental origin/experimental
```

当你运行下命令时:

```
git pull experimental
```

它会自动从‘origin'抓取(fetch)内容，再把远程的'origin/experimental'分支合并进(merge)本地的'experimental'分支.

当要把修改推送(push)到origin时, 它会将你本地的'experimental'分支中的修改推送到origin的‘experimental'分支里,　而无需指定它(origin).

## 10.13. Diff

```
@@ -1,5 +1,3 @@
## @@ -1,5 +1,3 @@是差异小结,代表的意思是源文件的1-5行与目标文件的1-3行有差异,
## 以空格开头的行代表源文件与目标文件没有差异,以-开头 的行代表在源文件的基础上删除,以+开头代表在源文件基础上添加;
```

## 10.14. 分支, Remote 或 标签的引用

你可以使用分支,remote或标签名来代替SHA串名, 它们只是指向某个对象的指针. 假设你的master分支目前在提交(commit):'980e3'上, 现在把它推送(push)到origin上并把它命名为标签'v1.0', 那么下面的串都会被git视为等价的:

```
980e3ccdaac54a0d4de358f3fe5d718027d96aae
origin/master
refs/remotes/origin/master
master
refs/heads/master
v1.0
refs/tags/v1.0
```

这意味着你执行下面的两条命令会有同样的输出:

```
git log master

git log refs/tags/v1.0
```

## 10.15. 使用Git Grep进行搜索

例如, 你要看 git.git　这个仓库里每个使用'xmmap'函数的地方, 你可以运行下面的命令:

```
git grep xmmap
```

如果你要显示行号, 你可以添加'-n'选项:

如果我们想只显示文件名, 我们可以使用'--name-only'选项:

我们可以用'-c'选项,可以查看每个文件里有多少行匹配内容(line matches):

现在, 如果我们要查找git仓库里某个特定版本里的内容, 我们可以像下面一样在命令行末尾加上标签名(tag reference):

```
git grep xmmap v1.5.0
```

## 10.16. rebase

