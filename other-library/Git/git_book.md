# Git 手册 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-07 13:15:49
> LastEditTime: 2022-08-07 19:27:09
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

**显示配置文件对应路径**

```
git config -h
git config --list --show-origin --show-scope
```

**配置用户名和邮箱**

```
git config --global user.email "tinfengyee@163.com"
git config --global user.name "tinfengyee"
```

**去除提醒 Unsafe repository**

```
PowerShell:
git config --global --add safe.directory *
Bash:
git config --global --add safe.directory '*'
git config --global --add safe.directory your-directory
```

**重新进行配置**

```
git config --unset [configname]		重置指定的配置
可以加参数 --global`和`--system
```

**手动添加配置**

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

# 4. 基本操作

初始化仓库

```
git init
```

## 4.1. Git仓库

![20210302215017199](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220807124745.png)

## 4.2. add 添加操作

`git add .`：会把当前仓库下所有的文件（包括子文件夹）做过的修改（增删改）都会提交到仓库中。（除在.gitignore设置的以外）。
`git add *`：他会忽略所有以`.`开头的文件，但是子文件夹下的以`.`开头的文件，是不会被忽略的。
`git add -u`：只会将那些已经被跟踪的文件进行更新。

## 4.3. commit 提交

使用一次新的commit，替代上一次提交

```
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
```

## 4.4. 删除操作

### 4.4.1. 已经添加到仓库，删除

`git rm 文件名`, 如果文件的修改已经被添加到仓库中了，那么可以使用 `git rm 文件名`, 

直接从工作区和暂存区中直接删除，相当于执行两个操作：

- 在文件夹中手动删除文件。
- 执行`git add .`操作。

### 4.4.2. 只添加到暂存区，删除

`git rm --cached 文件名`：如果文件被修改（新增，修改内容）了，只添加到暂存区，我们想从暂存区中删掉这个文件，那么可以使用`--cached`参数，这个参数不会把硬盘中的文件删掉，只会从暂存区和仓库中删掉，让这个文件处于`Untracked files`状态。

## 4.5. 删除git库中untracked files（未监控）的文件/目录

```
git clean -f
git clean -fd

在用上述 git clean 前，强烈建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
git clean -nxfd
git clean -nf
git clean -nfd
```

## 4.6. 重命名文件

```
git mv abc.txt 111.txt
```

相当于执行两个步骤：

1. 在文件夹中重命名文件：`mv abc.txt 111.txt`。
2. 执行`git add 111.txt`。

## 4.7. 撤销操作

一般使用这个就可以了

```
git restore [--staged] . 
```

## 4.8. 查看当前状态

使用`git status`可以查看当前暂存区的状态。

## 4.9. 查看版本

```
git log --oneline --graph
```

## 4.10. 版本回退

使用`git reset`命令，他有三个参数

1. `git reset --soft [commit_id]`：会将`HEAD`指针指向给定的`commitid`，不会修改索引（暂存区），也不会修改工作区的数据。
2. `git reset --mixed [commit_id]`：使用`reset`默认的方式。`--mixed`可以省略
   会将`HEAD`指针指向给定的`commitid`，然后也会修改索引（暂存区），这时候体现出来，就是会提示有文件没有被提交到暂存区，但不会修改工作区的数据。
3. `git reset --hard [commit_id]`：会将指针指向指定`commitid`，然后会修改索引（暂存区），也会修改工作区的数据。这个命令直接就把所有的地方，都回退到之前指定的版本了。
   如果想回到之前的版本继续写代码，就需要使用`git reset --hard`

一般我们返回上一个版本可以使用

```
git reset --hard HEAD~1 / HEAD^
```

如果版本回退了，然后又想回退到之前的版本，那么可以用`git reflog`查看`HEAD`指针移动的过程，可以找到对应的`commit`，进行版本回退。

## 4.11. .gitignore 忽略文件

文件 `.gitignore` 的格式规范如下：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。
- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
- 匹配模式可以以（`/`）开头防止递归。
- 匹配模式可以以（`/`）结尾指定目录。
- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。 星号（`*`）匹配零个或多个任意字符；`[abc]` 匹配任何一个列在方括号中的字符 （这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）； 问号（`?`）只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 `[0-9]` 表示匹配所有 0 到 9 的数字）。 使用两个星号（`**`）表示匹配任意中间目录，比如 `a/**/z` 可以匹配 `a/z` 、 `a/b/z` 或 `a/b/c/z` 等。

`.gitignore` 文件的例子：

```
# git add -f <file> 忽略文件也可以强制推送
# git check-ignore -v <file> 需要找出来到底哪个规则写错了

# 排除所有.开头的隐藏文件:
.*

# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf

#  忽略所有.o 和 .a文件.
*.[oa]
```

**注意：如果之前已经把不需要跟踪的文件进行了`commit`，需要先执行`git rm --cached 文件名`，把文件从仓库删掉，然后再添加到`.gitignore`中才能生效**

# 5. 远程仓库命令

## 5.1. clone

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

## 5.2. remote

```bash
$ git remote [add <shortname> <url>] [-v] [show <shortname>] [rename <old_shortname> <new_shortname>] [remove | rm <shortname> ]
```

### 5.2.1. 编辑远程仓库信息

```
git remote add ... -h
git remote rename origin paul
git remote remove origin
```

### 5.2.2. 显示远程仓库

项目，可以关联多个远程仓库。如果想要看本地的代码有哪几个仓库进行关联。

那么可以通过`git remote -v`进行查看：

```
origin  git@github.com:tinfengyee/EOL.git (fetch)
origin  git@github.com:tinfengyee/EOL.git (push)
```

### 5.2.3. 检查远程仓库

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

## 5.3. fetch

### 5.3.1. 拉取远程分支信息

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

### 5.3.2. 拉取并且清理过时分支信息

```
git fetch –all -p
```

等同于使用 `git remote prune origin` 命令，参考下面删除分支命令。

# 6. 分支操作

## 6.1. 创建和切换分支

```bash
git branch <branch>        # 创建分支
git checkout/switch --orphan <branch> # 创建空分支 git rm -rf .
git checkout  <branch>        # 切换分支
git checkout -b <branch>        # 创建并切换分支
git switch -c <branch>        # 创建并切换分支
git switch -c <branch> origin/<remote_branch> # 根据远程分支创建并切换分支
git merge <branch>        # 合并分支
git branch -a        # 查看所有
```

## 6.2. 合并分支冲突处理

```
<<<<-<<< HEA-Df
i love python
=======
i love git
>>>>>>> dev

解释：
<<<<<<< HEADf
i love python 是属于HEAD指针指向的分支的代码。
也就是当前分支的代码。
=======

=======
i love git 是属于dev分支的代码。
>>>>>->> d-ev
```

说白了，该删删！！！

1. 如果dev分支上面的代码应该保留下来，那么就应该把当前分支
   的代码删掉，并且把<<<HEAD,===,>>>dev删掉，值留下dev分支的代码

2. 如果dev分支上面的代码是写错了，应该保留当前分支的代码，
   这时候，就留下当前分支的代码，并且把<<<HEAD,===,>>>dev删掉。

3. 有些时候，dev分支和当前分支代码都选择性的保留或者都要保留，
   这时候，就需要人工去干预，看哪些代码要保留，哪些代码要删掉，
   但是<<<HEAD,===,>>>dev是必须要删掉的。

非常重要的一点是。解决完冲突以后。这个文件相当于重新配置，需要重新`add` 和 `commit`

## 6.3. 本地分支和远程仓库关联

如果想远程创建一个分支，那么需要在本地先创建一个该分支，比如`dev`

```
git switch -c dev  # create
git push origin dev # 然后推送到远程
```

**关联**

```
git branch -u origin/分支名称
```

输入命令`git branch -vv`可以查看本地分支和远程分支的关联情况。

```
如果出现了类似以下的输出，那么说明是已经关联了：
master b9bfb09 [origin/master]
```

如果没有关联，那么这时候可以用`git branch -u origin/分支名称`进行关联。前提是
远程有这个分支。比如本地有dev分支，但是远程没有dev分支，这时候我们应该先把
本地分支推送到远程上去，`git push origin 分支名` 来创建一个dev分支。

关联有什么好处呢？以后我们只要通过`git push 分支名`就可以将本地当前分支，推送到关联的远程分支。

## 6.4. 远程拉取分支

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

## 6.5. 删除远程分支

当你新创建分支，或者其他人新创建分支的时候，可以使用 `git fetch` 拉取远程最新分支到本地；此时也可以使用 `git remote show origin` 查看本地分支和远程分支的差异；

```
# 删除本地分支命令
git branch -d <branch>

# 删除远程分支命令
git push origin :<branch>  # ":"前面为空，前面是本地分支，后面是远程，表示推送空对象
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

## 6.6. 推送 push / 拉取 pull

### 6.6.1. `-u/--set-upstream`

git分支与远程主机存在对应分支，可能是单个可能是多个。 

- simple方式：如果当前分支只有一个追踪分支，那么 `git push origin` 到主机时，可以省略主机名。 

- matching方式：如果当前分支与多个主机存在追踪关系，那么 `git push --set-upstream origin master`（省略形式为：`git push -u origin master`）将本地的master分支推送到origin主机（`--set-upstream` 选项会指定一个默认主机），同时指定该主机为默认主机，后面使用可以不加任何参数使用 `git push`。

下面会将您的代码推送到定义的远程存储库的主分支，`origin`并`-u` (相当于 `--set-upstream`)让您将当前本地分支指向远程主分支：

```
git push -u origin master
```

**-u** 选项执行以下操作：对于每个最新或成功推送的分支，添加上游（跟踪）引用，由无参数、git-pull 和其他命令使用。

**因此，使用-u** 选项推送本地分支后，该本地分支将自动与远程分支链接，您可以使用 git pull 不带任何参数。

## 6.7. 合并没有历史相关的commit

我们本地有一个仓库了，然后远程也有一个仓库了。这时候如果我们在本地仓库直接拉
远程仓库的代码，会提示以下错误：

```
fatal: refusing to merge unrelated histories
```

原因是远程仓库的commit和我们本地仓库的commit是没有历史相关的，这时候如果我们
还是想要进行合并，那么可以使用`--allow-unrelated-historeis`参数：

```
$ git pull --allow-unrelated-histories origin master
```

只要本地代码进行了commit，拉代码的时候就不会被覆盖掉，顶多是产生冲突。

重要的事情说三遍：
做任何pull操作之前，一定要先进行commit。
做任何pull操作之前，一定要先进行commit。
做任何pull操作之前，一定要先进行commit。
（如果你和同事都修改了同一个文件，然后同事先把代码提交到服务器了，这时候如果
你不commit直接pull，那么你同事的代码会把你本地的代码该覆盖掉了，这时候，神仙也救不了你了。）

```
git remote add origin url //添加远程仓库

然后如果直接git pull origin master会出错

原因是因为本地和云端是两个不关联的仓库，需要允许不关联的进行合并

git pull  --allow-unrelated-histories origin master
```

# 7. 变基 rebase

git rebase 将当前分支移植到指定分支或指定commit之上。跟merge功能类似，但也存在着很大的不同。变基可以把提交线整合得更加是一条直线。

## 7.1. 基本操作

- 假如有这样一个提交图

![img](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220807141501.png)

- 然后我们把dev分支合并到master分支后，结果图为：

![在这里插入图片描述](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220807141518.png)

- 以上是采用正常的merge操作实现的结果。还有另外一种方式，可以将dev上的代码合并到master分支上。那就是变基。变基命令为git rebase。命令如下：

```
$ git checkout dev
$ git rebase master
```

- 原理是，先找到两个分支的共同祖先，然后获取这两个祖先后面提交的diff（不同内容），保存为临时文件，然后再创建一个commit，把这些diff进行提交。再把当前的分支指向最新的提交。示例图如下：

![在这里插入图片描述](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/08/20220807141610.png)

- 这时候已经新生成了一个新的commit。并且dev已经指向了这个commit。我们的目的是要把dev分支上的代码合并到master分支上，在这里我们还需要执行merge操作。命令如下：

```
$ git checkout master
$ git merge dev
```

到现在为止，我们通过merge和rebase得到的结果都是一样的，就是都把代码合并到master分支上了。

不管是变基操作后最新的提交，还是合并操作后最终的合并提交，这两个提交的快照内容是完全一样的，这两种操作的结果区别只是得到的提交历史不一样。总结一下，变基操作是把某条开发分支线上的工作在另一个分支线上按顺序重现。而合并操作则是找出两个分支的末端，并把他们合并到一起。

## 7.2. 解决冲突

- 在产生冲突的时候，我们先解决冲突。然后做一个`git add .`，
- 接着再执行`git rebase --continue`操作，
- 再回退到`master`分支，执行`git merge dev`操作。

在任何时候，你可以用`--abort`参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。

## 7.3. 什么时候使用变基

1. 看公司的策略。有的公司认为提交历史就是实际发生过的事件的记录。它是一个记载着历史的“史书”，自有其价值，而且不能随意篡改。从这个角度来说，是不允许更改提交历史，也就不能使用变基了。
2. 还有另外一个角度是，提交历史是关于项目如何被构建的故事。就像我们写的软件，一定是整理好了才发出去，使得后来的人能够更好的理解项目的构建。这时候就推荐使用变基。

## 7.4. 注意事项

千万不要在协作的分支上（比如dev/master）上使用变基，否则会变得非常乱！

*我们可以在自己的分支上，把代码变基到协作分支上，这样既不影响和别人的协作，也可以让自己的分支更加的简洁（也要看自己的喜好）。*

## 7.5. 实际使用参考

[Git 使用规范流程](https://www.ruanyifeng.com/blog/2015/08/git-use-process.html)

# 8. 标签控制 tag

有时候完成一个大版本，比如`v1.0.0`,这时候我们可以在某个分支的某个提交上，打上一个 `v1.0.0` 的标签，方便后期查看。

## 8.1. 创建标签

创建轻量标签

1. 轻量标签很像是一个不变的分支，它只是一个指向某次提交的指针。不会记录标签提交者，创建时间等。
2. 注释标签则会作为完整的对象存储在Git数据库中。Git会计算其校验和，除此之外还包括其他信息，比如标记者（tagger）的名字、邮箱地址、标签的创建时间、标记消息等。

轻量标签创建方式非常简单，只要在git tag后面不要加-a、-s或-m参数即可：

```bash
$ git tag v1.4 
```

创建带说明的标签

```bash
$ git tag -a <tag-name> -m "DESC" [<hash>] # 带说明的 tag
```

后期打标签

```bash
$ git tag -a <tag-name> <commit> # 根据 commit_hash 打 tag
```

## 8.2. 查看标签

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

## 8.3. 推送标签

```bash
$ git push <remote> <tag-name> # remote 通常为 origin
$ git push <remote> --tags # 推送所有 tag
```

## 8.4. 删除标签

```bash
# 删除本地 tag
$ git tag -d <tag-name>

# 删除远程 tag
$ git push <remote> :refs/tags/<tag-name>
$ git push origin --delete <tagname>
```

## 8.5. 检出标签

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

# 9. 储藏 stash

有时候我们代码写到一半，需要切换到另外一个分支上去工作。但是我本地这个工作还没做完，如果我现在做一个commit 那么会让我的这个开发线多出很多的零散的commit。所以这时候我就可以先把代码进行储藏，然后再切换到其他分支，在其他分支工作完成后再切回现在这个分支。

## 9.1. 基本操纵

```
git stash  # 储藏 staged 内容
git stash save "desc" # 储藏 staged 内容

git stash pop # 恢复最新储藏并删除 stash
git stash apply [<stash@{0}>] # 恢复所有 stash

git stash drop [stash name] # 删除 stash
git stash clear  # 清除所有的 stash

git stash list # 查看 stash 列表

git cherry-pick <hash> # 合并指定 commit 修改
```

## 9.2. 储藏未跟踪的文件

默认情况下`git stash`只会储藏那些被跟踪的文件。如果想要储藏那些未被跟踪的文件，那么可以加上`--include-untracked`参数。命令如下：

```
git stash --include-untracked
```

我们还可以使用`git stash -a`来储藏工作区所有的文件。包括跟踪的文件，没有跟踪的文件，以及在`.gitignore`中指定了不需要跟踪的文件。

# 10. Git Flow 工作流

- 因为Git功能实在太强大了，太灵活了。这导致如果每个人都有自己的习惯，而不统一遵循一个规范，
那么一起协作开发将变成灾难性的。
- 所以有Git工作流来规范大家的行为，工作流大部分情况都是规范分支的使用。
- 不同的Git平台，都有可能自己不同的Git工作流，以下进行讲解。

## 10.1. Git基本工作流

Git基本工作流是规定长期存在两个分支master和dev。

## 10.2. master分支

master分支：合并到master分支上的代码都是经过测试，没有问题，可以发布到线上环境的代码。
dev分支：用于合并公司所有同事最新的开发代码的分支，上面可能会存在bug。

然后这两个长期分支下，还存在以下分支：

### 10.2.1. Feature分支

Feature分支：特征分支，比如我现在和前端一起开发一个登录的功能，那我就可以创建一个登录的分支和前端开发一起协作。

### 10.2.2. Release分支

Release分支：版本分支。比如我们现在开发了v2.0版本的代码，那么在合并到master分支之前，先合并到release-v20分支，然后经过深度测试，没有问题后再把代码合并到master分支和dev分支，一旦确定没有问题，就可以将这个分支删掉了。

### 10.2.3. bug分支

bug分支：比如现在master分支上的代码在运行过程中出现了紧急的bug，那么我们可以从master分支上开一个bug分支，把问题解决后再合并到master分支，并且这个bug分支也可以被删掉了。

## 10.3. Github工作流

Github的工作流最大的特点是，只有一个master主分支，团队成员如果想要合并代码，通过发送Pull Request，然后管理员审核通过后再合并到master分支。如果你不是项目管理员，那么你可以先在自己的分支上进行变基，然后再发送一个PR，别人看到你这个PR，如果没有问题，他合并的时候就直接用Fast-Forward了，不需要去解决冲突等问题了。

## 10.4. Gitlab工作流

GitLab结合了Git基本工作流和GitHub工作流。既支持多个长期分支，也支持将分支设置为受保护的，其他人想要合并代码，需要发一个Merge Request，管理员审核通过后才能进行合并。

# 11. 参考链接

- [https://git-scm.com/docs](https://git-scm.com/docs)

- [Git Community Book 中文版](http://static.kancloud.cn/thinkphp/git-community-book)

- [阮一峰 Git 教程](https://www.bookstack.cn/read/git-tutorial/README.md)

- [Git超详解（看不懂算我输）](https://blog.csdn.net/weixin_44154094/article/details/114338173)
