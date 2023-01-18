# WSL <!-- omit in toc -->

# 1. WSL

```cmd
wsl -help
```

- [Microsoft WSL 帮助](https://docs.microsoft.com/zh-cn/windows/wsl/)
- [Microsoft Terminal 帮助](https://docs.microsoft.com/zh-CN/windows/terminal/)

# 安装 WSL

[安装步骤](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual)

```
wsl --install

默认情况下，安装的 Linux 分发版为 Ubuntu。 可以使用 -d 标志进行更改。

若要更改安装的发行版，请输入：wsl --install -d <Distribution Name>。 将 <Distribution Name> 替换为要安装的发行版的名称。
若要查看可通过在线商店下载的可用 Linux 发行版列表，请输入：wsl --list --online 或 wsl -l -o。
若要在初始安装后安装其他 Linux 发行版，还可使用命令：wsl --install -d <Distribution Name>
```



# 2. 配置

## 2.1. 修改root的密码
```cmd
sudo passwd root

测试一下：su - root、su - user 查看是否切换成功
```

## 2.2. 配置UBUNTU

1. 换源, 这里换清华源

   1. 先备份 `cp /etc/apt/sources.list /etc/apt/sources.list.bak`

   2. 把[清华源](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)的配置内容拷贝到/etc/apt/sources.list中(要把原来的内容全部覆盖掉)

      ```
      # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
      deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
      
      # 预发布软件源，不建议启用
      # deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
      # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
      
      ```

2. `sudo apt update`、 `sudo apt upgrade`

   如果这两步出错，做如下操作，无错，进行第三步:
   `rm /etc/resolv.conf` #必须删除,因为这是一个链接文件
   `sudo vim /etc/resolv.conf` #再把下面内容写入这个文件，**一定要确保真正写进去了！**

   ```
   # Add the lines 
   nameserver 8.8.8.8
   nameserver 8.8.4.4
   ```

   `sudo vim /etc/wsl.conf` #在这个文件中写入下面内容

   ```
   root = /
   options = "metadata"
   [network]
   generateResolvConf = false
   ```

   `cat /etc/resolv.conf` 、`cat /etc/wsl.conf`查看一下俩文件的内容是否都写入

   都写入后再执行 `sudo apt update`、`sudo apt upgrade`

# 3. 其他

## 3.1. 打开当前目录

```cmd
explorer .
start .
start .
::: WSL路径
 \\wsl$
```
## 3.2. 关于使用WSL2出现“参考的对象类型不支持尝试的操作”的解决方法。

1. 临时解决方案（不推荐）：

```CMD
netsh winsock reset
```

2. 比较长期解决的方案（推荐）：
www.proxifier.com/tmp/Test20200228/NoLsp.exe

```CMD
NoLsp.exe C:\Windows\System32\wsl.exe
```

## 3.3. windows 访问 unbuntu 权限不够

可以通过切换 root 默认用户解决。

```
ubuntu2004.exe config --default-user root
```

[另外的几种方法 ](https://www.likecs.com/ask-175266.html)

方法1

```
sudo chown -R $USER /path/to/folder
```

方法2

添加文件“/etc/wsl.conf”

```
options = "metadata,umask=22,fmask=11"
```

方法3

```
sudo find /home/ -type d -user root -exec sudo chown -R $USER: {}  \;
```
## 3.4. 以管理员运行 Power Shell？

方法一：

可以使用 scoop 工具包，安装sudo命令就行了

`scoop install sudo --global`1

然后在你的命令前面加sudo就行

`sudo netsh winsock reset`

方法二：
新建一个su.bat文件

```
@echo off
mode con lines=30 cols=60
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
start C:\Users\yunyi\AppData\Local\Microsoft\WindowsApps\wt.exe
```

作者：八重樱
链接：https://www.zhihu.com/question/353701331/answer/1338291321
将bat文件保存在一个文件夹中，将文件夹路径保存在Path环境变量里，重启然后输入su就行了

## 通过WINDOWS TERMINAL打开LINUX子系统直接进入家目录

[通过WINDOWS TERMINAL打开LINUX子系统直接进入家目录](https://www.freesion.com/article/8323914723/)

正常情况下通过WT打开Ubuntu，进入的目录一般是挂载的C盘的当前用户目录

当前目录并非我们Ubuntu的家目录，每次我们只能手动切换到家目录进行工作，非常的不方便。
下面介绍如何在Windows Terminal启动Ubuntu就直接进入家目录

```
cd ~
ls -al
sudo vim .bashrc
```

英文状态下按i进入编辑模式，在文件末尾添加

```
cd ~
```

按esc退出编辑模式，键入：wq保存退出

```
source .bashrc
```

再次打开Ubuntu就直接进入家目录了

Windows Terminal的一个使用技能：选中文本右键单击一次是复制，再单击一次是粘贴

# 安装编程软件 redis,jdk

## docker wsl2

https://docs.docker.com/desktop/windows/wsl/

## [Windows远程连接Redis（Linux）](https://juejin.cn/post/7174558006682583077)

https://redis.io/docs/getting-started/installation/

[win11的WSL安装以及linux各种环境配置](https://blog.csdn.net/hataksumo/article/details/127973297)

```vim
ps -ef|grep redis
```

# 4. 参考

1. [快速配置wsl成一个适合做开发的Linux环境](https://www.jianshu.com/p/47e01916cdc3)
2. [安装WINDOWS的UBUNTU子系统](https://www.freesion.com/article/73601305348/)
3. [关于使用WSL2出现“参考的对象类型不支持尝试的操作”的解决方法。](https://blog.csdn.net/weixin_43347283/article/details/107006275)
4. [PowerShell如何在资源管理器中打开当前目录](https://www.bilibili.com/read/cv7391684)
