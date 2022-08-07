# 一台电脑上的git同时使用两个github账户 <!-- omit in toc -->

# 生成 SSH 密钥

分别生成两个账号的 SSH 密钥，需要注意根据提示手动修改一下文件名，以免第一次生成的密钥被覆盖：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

然后把生成的公钥传入 GitHub 中。

# 将 SSH 密钥加入 ssh-agent 并进行配置

这一步我们需要打开 `~/.ssh/` 下的 config （若没有的话新建即可，windows 路径为 `%userprofile%\.ssh`）文件并输入以下的信息并保存：

```
# Personal account
Host github.com
   HostName github.com
   User tinfengyee
   IdentityFile ~/.ssh/id_ed25519_main
   
# Work account
Host workgithub.com
   HostName github.com
   User 712049187
   IdentityFile ~/.ssh/id_ed25519
```

这样我们的配置就完成啦，当我们需要 clone 公司的项目时，只需要略微修改其 SSH 即可：

```
git@Host:Username/ProjectName.git
```

例子：

```
::: 原本是
git@github.com:公司名/项目名.git

::: 改成 ->

git@workgithub.com:公司名/项目名.git
```

如果没有配置这个文件，那么你的那个名为 id_rsa.pub 对应的设置，默认值是这样的：

```
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa
```

# 配置工作区账号

我们如果通过 `git config user.email` 来查看当前邮箱时，会发现其实还是原来的个人账号邮箱，这样的话，对与公司项目的 `commit` 也会从我们的个人账号上传。

我们需要给这个仓库设置局部的用户名和邮箱，打开 cmd 然后输入：

```bash
git config --local user.email your_email@work.com
git config --local user.name your_name
```

这样我们就为该工作区配置好了正确的信息。

只要在工作区配置好工作账号之后，`commit` 就会从你的工作账号上传啦。而当我们切换回自己的项目时，一切还是会和原来一样不会受到影响的。

ssh -T tinfengyee@github.com
