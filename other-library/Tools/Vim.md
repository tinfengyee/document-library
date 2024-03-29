# 目录 <!-- omit in toc -->

- [1. Vim 编辑器介绍](#1-vim-编辑器介绍)
- [2. 常用命令](#2-常用命令)
- [3. 参考](#3-参考)

# 1. Vim 编辑器介绍

Vim文本编辑器，它默认会安装在当前所有的Linux操作系统上。Vim编辑器中设置了3种模式—命令模式、末行模式和编辑模式

+ **命令模式**：控制光标移动，可对文本进行复制、粘贴、删除和查找等工作。

+ **输入模式**：正常的文本录入。

+ **末行模式**：保存或退出文档，以及设置编辑环境。

![Vim编辑器模式的切换方法](https://tinf-pic.oss-cn-guangzhou.aliyuncs.com/img/2022/03/23/20220323041342.png)

# 2. 常用命令

```cmd
vi <file>
vim <file>
mkdir [dir-name] && cd $_

touch <file>
cat <file>
mkdir <directory>
rm -rf <file/dir>

echo 'desc' > filename.txt
echo 'desc' >> filename.txt
```


+ 输入模式

分别使用a、i、o三个键从命令模式切换到输入模式。其中，a键与i键分别是在光标后面一位和光标当前位置切换到输入模式，而o键则是在光标的下面再创建一个空行。


+ 命令模式中最常用的一些命令

要想切换到命令模式，按 ESC 即可。

| 命令 | 作用                                               |
| :--- | -------------------------------------------------- |
| dd   | 删除（剪切）光标所在整行                           |
| 5dd  | 删除（剪切）从光标处开始的5行                      |
| yy   | 复制光标所在整行                                   |
| 5yy  | 复制从光标处开始的5行                              |
| n    | 显示搜索命令定位到的下一个字符串                   |
| N    | 显示搜索命令定位到的上一个字符串                   |
| u    | 撤销上一步的操作                                   |
| p    | 将之前删除（dd）或复制（yy）过的数据粘贴到光标后面 |

+ 末行模式中最常用的一些命令

要想切换到末行模式，在命令模式中输入一个冒号即可。

| 命令          | 作用                                 |
| ------------- | ------------------------------------ |
| :w            | 保存                                 |
| :q            | 退出                                 |
| :q!           | 强制退出（放弃对文档的修改内容）     |
| :wq!          | 强制保存退出                         |
| :set nu       | 显示行号                             |
| :set nonu     | 不显示行号                           |
| :命令         | 执行该命令                           |
| :整数         | 跳转到该行                           |
| :s/one/two    | 将当前光标所在行的第一个one替换成two |
| :s/one/two/g  | 将当前光标所在行的所有one替换成two   |
| :%s/one/two/g | 将全文中的所有one替换成two           |
| ?字符串       | 在文本中从下至上搜索该字符串         |
| /字符串       | 在文本中从上至下搜索该字符串         |

末行模式主要用于保存或退出文件，以及设置Vim编辑器的工作环境，还可以让用户执行外部的Linux命令或跳转到所编写文档的特定行数。要想切换到末行模式，在命令模式中输入一个冒号就可以了

# 3. 参考

1. [Linux命令大全(手册)](https://www.linuxcool.com/)
2. [Vim编辑器与Shell命令脚本](https://www.linuxprobe.com/basic-learning-04.html)
