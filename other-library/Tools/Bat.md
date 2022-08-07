# 批处理教程 <!-- omit in toc -->
- [1. 批处理基础知识](#1-批处理基础知识)
  - [1.1. 入门](#11-入门)
  - [1.2. `echo`、`@` 和 `pause` 命令](#12-echo-和-pause-命令)
  - [1.3. 批处理注释](#13-批处理注释)
- [2. 常见符号命令](#2-常见符号命令)
  - [2.1. 重定向符 `>` 和 `>>`](#21-重定向符--和-)
    - [2.1.1. 屏蔽批处理错误](#211-屏蔽批处理错误)
  - [2.2. 命令管道符 `|`](#22-命令管道符-)
  - [2.3. 组合命令 `&`、`&&`、`||`](#23-组合命令-)
  - [2.4. 转义字符 `^`](#24-转义字符-)
  - [2.5. 界定符 `""`](#25-界定符-)
  - [2.6. `errorlevel` 基础用法](#26-errorlevel-基础用法)
  - [2.7. 获取磁盘路径 `%~dp0`](#27-获取磁盘路径-dp0)
    - [2.7.1. `%cd%`](#271-cd)
    - [2.7.2. `%~dp0`](#272-dp0)
    - [2.7.3. 总结](#273-总结)
- [3. 变量操作](#3-变量操作)
  - [3.1. set](#31-set)
    - [3.1.1. 拓展命令](#311-拓展命令)
      - [3.1.1.1. /A 命令](#3111-a-命令)
      - [3.1.1.2. /P 命令](#3112-p-命令)
  - [3.2. setlocal/endlocal 命令](#32-setlocalendlocal-命令)
    - [3.2.1. 定义局部区域](#321-定义局部区域)
    - [3.2.2. 启用延时变量](#322-启用延时变量)
  - [3.3. 批处理文件参数](#33-批处理文件参数)
    - [3.3.1. shift 接收多于 %1~%9 个参数](#331-shift-接收多于-19-个参数)
  - [3.4. shift 命令](#34-shift-命令)
  - [3.5. 字符串操作](#35-字符串操作)
    - [3.5.1. 字符串截取](#351-字符串截取)
    - [3.5.2. 字符串替换](#352-字符串替换)
    - [3.5.3. 字符串合并](#353-字符串合并)
  - [3.6. 更多的动态变量](#36-更多的动态变量)
  - [3.7. set](#37-set)
    - [3.7.1. 拓展命令](#371-拓展命令)
      - [3.7.1.1. /A 命令](#3711-a-命令)
      - [3.7.1.2. /P 命令](#3712-p-命令)
  - [3.8. setlocal/endlocal 命令](#38-setlocalendlocal-命令)
    - [3.8.1. 定义局部区域](#381-定义局部区域)
    - [3.8.2. 启用延时变量](#382-启用延时变量)
  - [3.9. 批处理文件参数](#39-批处理文件参数)
    - [3.9.1. shift 接收多于 %1~%9 个参数](#391-shift-接收多于-19-个参数)
  - [3.10. shift 命令](#310-shift-命令)
  - [3.11. 字符串操作](#311-字符串操作)
    - [3.11.1. 字符串截取](#3111-字符串截取)
    - [3.11.2. 字符串替换](#3112-字符串替换)
    - [3.11.3. 字符串合并](#3113-字符串合并)
  - [3.12. 更多的动态变量](#312-更多的动态变量)
- [4. 控制命令](#4-控制命令)
  - [4.1. if](#41-if)
    - [4.1.1. if 语句基础](#411-if-语句基础)
    - [4.1.2. if 语句扩展](#412-if-语句扩展)
  - [4.2. goto 语句](#42-goto-语句)
    - [4.2.1. goto 语句注意事项](#421-goto-语句注意事项)
  - [4.3. for 语句](#43-for-语句)
    - [4.3.1. for 语句注意事项](#431-for-语句注意事项)
    - [4.3.2. for /D 语句扩展](#432-for-d-语句扩展)
    - [4.3.3. for /R 语句扩展](#433-for-r-语句扩展)
    - [4.3.4. for /L 语句扩展](#434-for-l-语句扩展)
    - [4.3.5. for /F 语句扩展](#435-for-f-语句扩展)
    - [4.3.6. for /F 高级选项](#436-for-f-高级选项)
      - [4.3.6.1. eol=c](#4361-eolc)
      - [4.3.6.2. skip=n](#4362-skipn)
      - [4.3.6.3. delims=xxx](#4363-delimsxxx)
      - [4.3.6.4. tokens=x,y,m-n](#4364-tokensxym-n)
      - [4.3.6.5. for /F 实例](#4365-for-f-实例)
    - [4.3.7. for /F 的 usebackq 选项](#437-for-f-的-usebackq-选项)
      - [4.3.7.1. usebackq 处理有空格的文件名](#4371-usebackq-处理有空格的文件名)
      - [4.3.7.2. usebackq 处理文本字符串](#4372-usebackq-处理文本字符串)
      - [4.3.7.3. usebackq处理 CMD 命令](#4373-usebackq处理-cmd-命令)
    - [4.3.8. for 变量增强](#438-for-变量增强)
- [5. 高级命令](#5-高级命令)
  - [5.1. 子程序](#51-子程序)
    - [5.1.1. 子程序参数 %0](#511-子程序参数-0)
    - [5.1.2. 子程序放置位置](#512-子程序放置位置)
    - [5.1.3. 子程序的变量](#513-子程序的变量)
    - [5.1.4. 子程序传参](#514-子程序传参)
  - [5.2. call 命令](#52-call-命令)
    - [5.2.1. CALL 语句扩展](#521-call-语句扩展)
    - [5.2.2. CALL 参数扩展](#522-call-参数扩展)
  - [5.3. start 命令](#53-start-命令)
  - [5.4. pushd 和 popd 命令](#54-pushd-和-popd-命令)
    - [5.4.1. pushd 命令](#541-pushd-命令)
    - [5.4.2. popd 命令](#542-popd-命令)
- [6. 批处理实例](#6-批处理实例)
  - [6.1. 解压缩](#61-解压缩)
  - [6.2. 完整项目实际案例【必看】](#62-完整项目实际案例必看)
    - [6.2.1. 主bat（负责定义公共变量和代码）：](#621-主bat负责定义公共变量和代码)
    - [6.2.2. 子文件（负责处理单个项目）：](#622-子文件负责处理单个项目)
  - [6.3. 例子-网上项目](#63-例子-网上项目)
  - [6.4. 例子-批量删除](#64-例子-批量删除)
  - [6.5. 实例-for 的使用](#65-实例-for-的使用)
    - [6.5.1. 批量修改文件名](#651-批量修改文件名)
  - [批处理读取文件内容](#批处理读取文件内容)
  - [批处理调用MySql执行SQL脚本](#批处理调用mysql执行sql脚本)
  - [6.6. 例子-杂类](#66-例子-杂类)
- [7. 参考](#7-参考)

# 1. 批处理基础知识

## 1.1. 入门

命令帮助
```cmd
help [cmd]
cmd/?
```
部分命令如下。
```cmd
有关某个命令的详细信息，请键入 HELP 命令名
文件
CHDIR          显示当前目录的名称或将其更改。
COMP           比较两个或两套文件的内容。
COPY           将至少一个文件复制到另一个位置。
DEL            删除至少一个文件。
DIR            显示一个目录中的文件和子目录。
ERASE          删除一个或多个文件。
FC             比较两个文件或两个文件集并显示
               它们之间的不同。
FIND           在一个或多个文件中搜索一个文本字符串。
FINDSTR        在多个文件中搜索字符串，可以进行模式匹配搜索。
MD             创建一个目录。
MKDIR          创建一个目录。
MOVE           将一个或多个文件从一个目录移动到另一个
               目录。
RD             删除目录。
REN            重命名文件。
RENAME         重命名文件。
REPLACE        替换文件。
RMDIR          删除目录。
TREE           以图形方式显示驱动程序或路径的目录
               结构。
TYPE           显示文本文件的内容。
VER            显示 Windows 的版本。
XCOPY          复制文件和目录树。

磁盘
CHKDSK         检查磁盘并显示状态报告。
CHKNTFS        显示或修改启动时间磁盘检查。
COMPACT        显示或更改 NTFS 分区上文件的压缩。
CONVERT        将 FAT 卷转换成 NTFS。你不能转换
               当前驱动器。
DISKPART       显示或配置磁盘分区属性。
FORMAT         格式化磁盘，以便用于 Windows。
GRAFTABL       使 Windows 在图形模式下显示扩展
               字符集。
LABEL          创建、更改或删除磁盘的卷标。
PUSHD          保存当前目录，然后对其进行更改。
RECOVER        从损坏的或有缺陷的磁盘中恢复可读信息。
SUBST          将路径与驱动器号关联。
VOL            显示磁盘卷标和序列号。

系统
DATE           显示或设置日期。
MKLINK         创建符号链接和硬链接
PATH           为可执行文件显示或设置搜索路径。
ROBOCOPY       复制文件和目录树的高级实用工具
SET            显示、设置或删除 Windows 环境变量。
SCHTASKS       安排在一台计算机上运行命令和程序。
SHUTDOWN       允许通过本地或远程方式正确关闭计算机。
SYSTEMINFO     显示计算机的特定属性和配置。
TASKLIST       显示包括服务在内的所有当前运行的任务。
TASKKILL       中止或停止正在运行的进程或应用程序。
TIME           显示或设置系统时间。

其他
CD             显示当前目录的名称或将其更改。
CLS            清除屏幕。
CALL           从另一个批处理程序调用这一个。
CHCP           显示或设置活动代码页数。（中文 65001 UTF-8/ 936 GBK）
CMD            打开另一个 Windows 命令解释程序窗口。
ECHO           显示消息，或将命令回显打开或关闭。
EXIT           退出 CMD.EXE 程序(命令解释程序)。
FOR            为一组文件中的每个文件运行一个指定的命令。
GOTO           将 Windows 命令解释程序定向到批处理程序
               中某个带标签的行。
HELP           提供 Windows 命令的帮助信息。
IF             在批处理程序中执行有条件的处理操作。
PAUSE          暂停批处理文件的处理并显示消息。
REM            记录批处理文件或 CONFIG.SYS 中的注释(批注)。
START          启动单独的窗口以运行指定的程序或命令。
SETLOCAL       开始本地化批处理文件中的环境更改。
TITLE          设置 CMD.EXE 会话的窗口标题。

有关工具的详细信息，请参阅联机帮助中的命令行参考。
```

## 1.2. `echo`、`@` 和 `pause` 命令

如果在某一条命令最前面加上 `@` 那么这一行命令就不会显示出来

```cmd
@ECHO on | off
:: 打开/关闭回显
ECHO msg
ECHO msg &ECHO msg
:: 多行显示
ECHO msg > file 
:: 写入文件
ECHO msg >> file
:: 结尾追加写入文件
(ECHO msg &ECHO msg…)>file
ECHO.
:: 输出空行,“．”可以用，：；＋等任一符号替代。
ECHO 答复语|命令文件名
:: 自动答复命令中的提问 ，不需要人为的输入
```

## 1.3. 批处理注释

注释语法

```cmd
REM [string]
```

其他形式的注释

```cmd
@echo off
 
rem 段注释一种比较常用的方法
goto start
= 可以是多行文本，可以是命令
= 可以包含重定向符号和其他特殊字符
= 只要不包含 :start 这一行，就都是注释
:start
 
:: 注释内容（第一个冒号后也可以跟任何一个非字母数字的字符，此方法不会显示到窗口）
 
echo 注释内容（不能出现重定向符号和管道符号）> nul
 
if not exist nul 注释内容（不能出现重定向符号和管道符号）
 
:注释内容（注释文本不能与已有标签重名）
 
rem 可以用作行间注释，不能出现重定向符号和管道符号
%注释内容%
 
goto 标签 注释内容（可以用作说明goto的条件和执行内容）
:标签 注释内容（可以用作标签下方段的执行内容）
 
pause
```

# 2. 常见符号命令

## 2.1. 重定向符 `>` 和 `>>`

`>`:

在批处理中 `>` 符号实现重定向，可将命令的输出写入到指定的文件、`nul`（`nul` 是空设备名，像个黑洞，往往用来屏蔽错误输出等） 等位置。注意：> 符会覆盖文件中已有的内容。

实例：将 ping 命令的输出信息输出到 ping.txt 文件。如下：

```cmd
@echo off
ping www.baidu.com > ping.txt
ping www.hxstrive.com > ping.txt
echo finished
pause
```

`>>`：

`\>>` 符号和 `>` 符号作用类似，也可将命令的输出写入到指定的文件、nul 等。唯一不同的是，`>>` 符号会将当前命令的结果直接追加到指定文件的最后面。

实例：将 ping 命令的结果写入到 ping.txt 文件。如下：

```cmd
@echo off
ping www.baidu.com >> ping.txt
ping www.hxstrive.com >> ping.txt
echo finished
pause
```

### 2.1.1. 屏蔽批处理错误

假如我们需要使用批处理执行 copy 命令拷贝文件到指定目录。如下：

```cmd
@echo off
copy a.txt bak\b.txt
if %errorlevel%==0 (
  echo SUCCESS
)  else (
  echo ERROR
)
pause
```

如果我们不小心将 copy 错误的写成 copu。如下：

```cmd
copu a.txt bak\b.txt
```

运行结果：

```
'copu' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
ERROR
请按任意键继续. .
```

上面结果中输出了 “'copu' 不是内部或外部命令，也不是可运行的程序或批处理文件” 错误信息。我们可以使用重定向符号隐藏这个错误信息，如下：

```cmd
@echo off
copu a.txt bak\b.txt >nul 2>nul
if %errorlevel%==0 (
    echo SUCCESS
) else (
    echo ERROR
)
pause
```

运行结果：

```
ERROR
请按任意键继续. .
```

上面的输出结果并没有输出 copu 命令执行的错误信息，只显示我们 echo 给出的提示信息。其中：`>nul 2>nul` 就是把命令执行的输出信息和错误信息不输出到屏幕，而是输出到一个根本不存在的设备。`>nul` 等效于 `1>nul`，`>nul` 前面的 1 表示输出流，2 表示错误流（1可以省略不写）

**常见设备名：**

- con 控制台（键盘和显示器）
- aux , com1 - com4 所有串口
- prn , lpt1 - lpt3 所有并口
- nul 空设备
- clock$ 电子钟

实例：将输出信息和错误信息重定向到 con 设备。如下：

```cmd
@echo off
copu a.txt bak\b.txt >con 2>con
if %errorlevel%==0 (
    echo SUCCESS
) else (
    echo ERROR
)
pause
```

运行结果和不添加 >con 2>con 结果一致。

**总结：**

`>` 和 `>>` 符号均可以将命令输出结果输入到指定的文件、nul 设备等。其中，> 符号将会覆盖文件旧的内容；`>>` 符号不会覆盖文件旧的内容，直接将结果写入文件末尾。

## 2.2. 命令管道符 `|`

`|` 可以将它左边命令的输出结果放到它右边的命令里作为输入参数。

实例1：

`echo Y|rd /s c:\abc`，通过管道命令`|`将 `echo y` 的结果传给 `rd /s c:\abc` 命令，从而达到自动输入 `y` 的目的。

实例2：传入参数给 find 命令。

```cmd
netstat /a /n | find "7626" && echo 已被冰河感染 || echo 未被冰河感染 。
```

## 2.3. 组合命令 `&`、`&&`、`||`

- `&`，允许同时执行多条命令，当第一个命令执行失败了，也不影响后边的命令执行。这里 & 两边的命令是顺序执行的，从前往后执行。
- `&&`，允许同时执行多条命令，当碰到执行出错的命令后将不再执行后面的命令，如果一直没有出错则一直执行完所有命令。
- `||`，正确的命令后将不执行后面的命令,如果没有出现正确的命令则一直执行完所有命令。

## 2.4. 转义字符 `^`
要输出特殊字符，就需要用 `echo ^>`、`echo ^|`、`echo ^^…`之类的格式来处理。

## 2.5. 界定符 `""`
（1）在表示带有空格或特殊符号的路径时常要用""来将路径括起来。

实例：`cd /d cd "d:\program files\^%*abc"`

因为路径中带有空格和特殊符号，所以要用 `""` 将路径括起来。

（2）表示其中的内容是一个完整的字符串。
```cmd
set "var=abc 123"
echo %var%
```

## 2.6. `errorlevel` 基础用法

本文将介绍批处理文件中 `errorlevel` 与 `%errorlevel%` 的作用和用法。

`errorlevel` 常用来判断上条命令的执行情况。因此我们可以先看看 `if /?` 语句的帮助文档。如下：

```cmd
C:\Users\Administrator>if /?
执行批处理程序中的条件处理。
 
IF [NOT] ERRORLEVEL number command
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command
 
NOT               指定只有条件为 false 的情况下，Windows 才应该执行该命令。
ERRORLEVEL number 如果最后运行的程序返回一个等于或大于指定数字的退出代码，指定条件为 true。
.... 省略 ....
```

根据 if 语句的帮助信息，如果我们使用 `if errorlevel number command` 去使用 `errorlevel`，它的含义是：如果返回的错误码值大于或等于值 的时候，将执行 cmmand 操作。实例：

```cmd
@echo off
copu a.txt bak\b.txt
echo errorlevel=%errorlevel%
if errorlevel 0 echo SUCCESS
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
'copu' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
errorlevel=9009
SUCCESS
请按任意键继续. . .
```

当使用 `if %errorlevel%==值 cmmand` 句式时，它含义是：如果返回的错误码值等于值的时候，将执行cmmand操作。实例：

```cmd
@echo off
copu a.txt bak\b.txt
echo errorlevel=%errorlevel%
if %errorlevel%==0 (
    echo success
) else (
    echo error
)
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
'copu' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
errorlevel=9009
error
请按任意键继续. . .
```

上面实例中，`errorlevel` 等于 9009，并不等于0，因此输出“error”。

一般上一条命令的执行结果返回的值只有两个，“成功”用 **0** 表示；“失败”用 **1** 表示；实际上，`errorlevel` 返回值可以在 0~255 之间，例如 `xcopy` 默认的 `errorlevel` 值就有5 个，分别表示5种执行状态：

- 0 复制文件成功 
- 1 未找到复制文件 
- 2 用户通过CTRL C 终止了xcopy操作 
- 4 出现了初始化错误 
- 5 出现了磁盘写入错误

if `%ERRORLEVEL%` 对数值的比较方法不仅仅限于等于，可以使用参数来控制。比如：

```cmd
rem 小于或等于
if %ERRORLEVEL% LEQ 1 echo SUCCESS
```

全部的比较参数如下： 

- `EQU` - 等于，`=`
- `NEQ` - 不等于，`!=`
- `LSS` - 小于，`<`
- `LEQ` - 小于或等于，`<=`
- `GTR` - 大于，`>`
- `GEQ` - 大于或等于，`>=`


## 2.7. 获取磁盘路径 `%~dp0`

在编写批处理文件时，经常需要获取当前目录路径，然后根据当前路径进行文件定位；我们常用 `%cd%` 或者 `%~dp0` 来获取当前路径。

### 2.7.1. `%cd%`

`%cd%` 扩展到当前目录字符串。需要注意的是，这里的当前目录有可能和脚本实际所在目录不一致。实例：

```cmd
@echo off
set basePath=%cd%
echo %basePath%
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
C:\Users\Administrator\Desktop
 
rem 我们在 C:\Users\Administrator 目录执行脚本，输出的也是该目录
C:\Users\Administrator>call Desktop/test.bat
C:\Users\Administrator
```

`%cd%` 返回的是当前执行环境目录（如果是DOS窗口，则是DOS窗口里面的路径），并非是 bat 脚本实际所在的路径。

### 2.7.2. `%~dp0`

`%~dp0` 可以用来获取批处理文件的实际路径，与当前 DOS 环境所在的目录没有关系。其中：

- `%~dp0` 的 “d” 为 Drive 的缩写，即为驱动器，磁盘；
- `%~dp0` 的 “p” 为 Path 缩写，即为路径，目录；

我们可以使用 cd 命令转到 `%~dp0` 返回的目录，不过推荐使用 `cd /d %~dp0`。原因如下：

```cmd
REM %~dp0 返回的路径带有盘符的，因此执行下面命令失败
C:\Users\Administrator\Desktop>cd D:\test
C:\Users\Administrator\Desktop>
 
REM 实际上，我们进入 D:\test 目录需要两步
REM 第一步：选择盘符
C:\Users\Administrator>D:
 
REM 第二步：进入 D:\test 目录
D:\>cd test
 
REM 使用 cd /d 命令
C:\Users\Administrator>cd /d D:\test
D:\test>
```

实例：获取批处理文件自身磁盘路径。

```cmd
@echo off
set basePath=%~dp0
echo %basePath%
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
C:\Users\Administrator\Desktop\
 
REM 在其他目录运行 test.bat
C:\Users\Administrator> call Desktop/test.bat
C:\Users\Administrator\Desktop\
```

更多选项语法：

- `~0`  删除任何引号(")，扩充 %0
- `%~d0`  仅将 %0 扩充到一个驱动器号
- `%~f0`  将 %0 扩充到一个完全合格的路径名（“f” 是 file，即文件）
- `%~p0`  仅将 %0 扩充到一个路径
- `%~n0`  仅将 %0 扩充到一个文件名（“n” 是 name 文件名）
- `%~x0`  仅将 %0 扩充到一个文件扩展名
- `%~s0`  扩充的路径只含有短名（“s” 为 Short，短的）
- `%~a0`  将 %0 扩充到文件的文件属性（“a” 为 attribute，即属性）
- `%~t0`  将 %0 扩充到文件的日期/时间（“t” time）
- `%~z0`  将 %0 扩充到文件的大小（Size 大小）
- `%~$PATH:0`  查找列在路径环境变量的目录，并将 %0 扩充到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩充到空字符串

实例：尝试使用的选项，查看每个选项的输出结果。

```cmd
@echo off
REM C:
echo %~d0
 
REM C:\Users\Administrator\Desktop\test.bat
echo %~f0
 
REM \Users\Administrator\Desktop\
echo %~p0
 
REM test
echo %~n0
 
REM .bat
echo %~x0
 
REM C:\Users\ADMINI~1\Desktop\test.bat
echo %~s0
 
REM --a------
echo %~a0
 
REM 2020/06/10 13:27
echo %~t0
 
REM 141
echo %~z0
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
C:
C:\Users\Administrator\Desktop\test.bat
\Users\Administrator\Desktop\
test
.bat
C:\Users\ADMINI~1\Desktop\test.bat
--a------
2020/06/10 13:27
141
```

可以组合修饰符来得到多重结果：

- `%~dp0`  仅将 %0 扩充到一个驱动器号和路径
- `%~nx0`  仅将 %0 扩充到一个文件名和扩展名
- `%~fs0`  仅将 %0 扩充到一个带有短名的完整路径名
- `%~dp$PATH:0`  查找列在路径环境变量的目录，并将 %I 扩充到找到的第一个驱动器号和路径。
- `%~ftza0`   将 %0 扩充到类似输出线路的 DIR
- `%0` 为当前批处理文件。如果0换成1为第一个文件，2为第2个

### 2.7.3. 总结

`%cd%` 和 `%~dp0` 两者均可以获取到当前路径，而 `%~dp0` 获取的是批处理文件所在目录的路径，`%cd%` 获取的是当前 DOS 环境的路径。如果批处理文件和执行批处理文件不再同一目录，则 `%cd%` 返回的路径并不是批处理文件所在目录的路径，而是执行环境当前的路径。

**`%cd% `和 `%~dp0` 区别：**

1）使用范围上的不同

- `%cd%` 可以在批处理脚本（bat脚本）、命令行窗口中使用
- `%~dp0` 只能在批处理脚本（bat脚本） 中使用

2）bat 脚本执行时，两者代表的值是否会变化

- `%cd%` 会，因为代表的是当前目录
- `%~dp0` 不会，因为代表的是脚本文件在磁盘的位置

# 3. 变量操作

## 3.1. set 

set 命令用来显示、设置或删除 cmd.exe 环境变量。语法如下：

```cmd
SET [variable=[string]]
```

参数说明：

- variable 指定环境变量名。
- string  指定要指派给变量的一系列字符串。

如果要显示当前环境变量，键入不带参数的 SET。实例：

```cmd
C:\Users\Administrator> set java_home
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_171
 
C:\Users\Administrator> set classpath
CLASSPATH=.;C:\Program Files\Java\jdk1.8.0_171\lib
```

上面实例中显示了 java_home 和 classpath 环境变量的值。

如果命令扩展被启用，SET 显示所有前缀匹配的变量，实例：

```cmd
C:\Users\Administrator>set p
Path=D:\ProgramFiles\Python38-32\Scripts\;
PROCESSOR_REVISION=9e09
ProgramData=C:\ProgramData
ProgramFiles=C:\Program Files
```
会显示所有以字母 P 打头的变量。如果在当前环境中找不到该变量名称，SET 命令将把 ERRORLEVEL设置成 1。如下：

输出结果：

```cmd
Path=D:\ProgramFiles\... 省略结果
PATHEXT=.COM;.EXE;.BAT;.CMD;
errorlevel=0
环境变量 NOT_HA_HA 没有定义
errorlevel=1
```
SET 命令不允许变量名含有等号。实例：

```cmd
@echo off
set PATH=
```
上面实例并不会有任何输出，并且会删除 PATH 环境变量。你可以使用 SET PATH 命令查看输出，输出结果：

```cmd
C:\Users\Administrator\Desktop> set PATH
PATHEXT=.COM;.EXE;.BAT;.CMD;
```
### 3.1.1. 拓展命令

在 SET 命令中添加了两个新命令行开关:

```cmd
rem /A 指定 expression 为数字表达式
SET /A expression
rem promptString 为提示字符串
SET /P variable=[promptString]
```

#### 3.1.1.1. /A 命令

/A 命令行开关指定等号右边的字符串为被评估的数字表达式。该表达式评估器很简单并以递减的优先权顺序支持下列操作：

| 操作符                             | 描述         |
| ---------------------------------- | ------------ |
| ()                                 | 分组         |
| ! ~ -                              | 一元运算符   |
| * / %                              | 算数运算符   |
| << >>                              | 逻辑移位     |
|                                    | 按位“与”     |
| ^                                  | 按位“异”     |
| \|                                 | 按位“或”     |
| = *= /= %= += -= &= ^= \|= <<= >>= | 赋值         |
| ,                                  | 表达式分隔符 |

如果您使用任何逻辑或取余操作符， 您需要将表达式字符串用引号扩起来。在表达式中的任何非数字字符串键作为环境变量名称，这些环境变量名称的值已在使用前转换成数字。实例：

```cmd
@echo off
rem 使用 /A 执行加法运算。其：val=32
set /A val=10+22
echo %val%
 
rem 将 val 环境变量加10，赋值给val2环境变量。其：val2=42
set /A val2=%val%+10
echo %val2%
 
rem 将 16 使用位移操作符，向右移动一位，移动一位等于除以2。其：val3=8
set /A "val3=16>>1"
echo %val3%
 
rem 使用分组符号提升加法的优先级，其：val4=18
set /A val4=(0+1+2+3+4+5+6+7+8+9)/5*2
echo %val4%
 
rem 使用 %% 进行取余运算，其：val5=4
set /A "val5=94%%10"
echo %val5%
```
如果指定了一个环境变量名称，但未在当前环境中定义，那么值将被定为零。这使您可以使用环境变量值做计算而不用键入那些 % 符号来得到它们的值。

```cmd
@echo off
rem 下面在 set 中使用 tmp 参与运算，但是 tmp 并没有定义
rem 默认 tmp 为 0，因此 val=22
set /A val=tmp+22
echo %val%
 
rem 下面在 set 中使用 %tmp2% 获取变量 tmp2 的值，因为没有定义 tmp2 变量，
rem 因此抛出 “运算符不存在。” 错误。其中，val2=0
set /A val2=%tmp2%+22
echo %val2%
```
如果 SET /A 在命令脚本外的命令行执行的，那么它显示该表达式的最后值。该分配的操作符在分配的操作符左边需要一个环境变量名称。除十六进制有 0x 前缀，八进制有 0 前缀的，数字值为十进位数字。因此，0x12 与 18 和 022 相同。请注意八进制公式可能很容易搞混: 08 和 09 是无效的数字，因为 8 和 9 不是有效的八进制位数。实例：

```cmd
C:\Users\Administrator>set /a val=1+1
2
C:\Users\Administrator>set /a 1+1
2
C:\Users\Administrator>set /a val=0x4+2
6
C:\Users\Administrator>set /a val=04+02
6
```

####  3.1.1.2. /P 命令

/P 命令行开关允许将变量数值设成用户输入的一行输入。读取输入行之前，显示指定的 promptString。promptString 可以是空的。语法：

```cmd
set /P variateName=promptStrig
```
其中：

- variateName 为变量名
- promptStrig 为提示字符串，将在 DOS 窗口中显示

实例：提示用户输入名称。

```cmd
@echo off
set /p username=请输入姓名：
echo 你的姓名：%username%
pause
```

## 3.2. setlocal/endlocal 命令

setlocal 和 endlocal 命令是用来定义一个局部区域，这个局部区域中的环境变量任何变化都不会改变原先的环境变量。

开始批处理文件中环境改动的本地化操作。在执行 setlocal 之后所做的环境改动只限于批处理文件。要还原原先的设置，必须执行 endlocal 。达到批处理文件结尾时，对于该批处理文件的每个尚未执行的 setlocal 命令，都会有一个隐含的 endlocal 被执行。语法：

```cmd
SETLOCAL
ENDLOCAL
```
如果命令扩展被启用，setlocal 会如下改变：

setlocal 批命令现在可以接受可选参数：

- `enableextensions` / `disableextensions` 启用或禁用命令处理器扩展。这些参数比 `cmd /e:on` 或 `/e:off` 开关有优先权。请参阅 `cmd /?` 获取详细信息。
- `enabledelayedexpansion` / `disabledelayedexpansion` 启用或禁用延缓环境变量扩展。这些参数比 `cmd /v:on` 或 `/v:off` 开关有优先权。请参阅 cmd /? 获取详细信息。

无论在 setlocal 命令之前它们的设置是什么，这些修改会一直保留到匹配的 endlocal 命令。

如果有一个参数，setlocal 命令将设置 errorlevel 的值。如果有两个有效参数中的一个，该值则为零。用下列技巧，您可以在批脚本中使用这个来决定扩展是否可用：

```cmd
@ECHO OFF
VERIFY OTHER 2>nul
SETLOCAL ENABLEEXTENSIONS
IF ERRORLEVEL 1 echo Unable to enable extensions
```
这个方法之所以有效，是因为在 cmd.exe 的旧版本上，setlocal 未设置 errorlevel 值。具有不正确参数的 verify 命令将 errorlevel值初始化成非零值。

### 3.2.1. 定义局部区域

实例：演示使用 setlocal 和 endlocal 定义局部区域，然后在局部区域中修改 path。

```cmd
@echo off
echo before setlocal:
set path
pause
 
setlocal
rem reset environment var path
set path=E:\tools
echo after setlocal and reset path
set path
pause
endlocal
 
echo recovery path by endlocal
set path
```
输出结果：

```cmd
C:\Users\Administrator\Desktop>test.bat
before setlocal:
Path=D:\ProgramFiles\Python38-32\Scripts\;
PATHEXT=.COM;.EXE;.BAT;.CMD;
请按任意键继续. . .
after setlocal and reset path
Path=E:\tools
PATHEXT=.COM;.EXE;.BAT;.CMD;
请按任意键继续. . .
recovery path by endlocal
Path=D:\ProgramFiles\Python38-32\Scripts\;D:\ProgramFiles\Python38-32\;D:\...
PATHEXT=.COM;.EXE;.BAT;.CMD;
```
从上例我们可以看到环境变量 PATH 第1次被显示得时候是系统默认路径。被设置成了 “E:\TOOLS” 后显示为 “E:\TOOLS”。但当 endlocal 后我们可以看到他又被还原成了系统的默认路径。但这个设置只在该批处理运行的时候有作用。当批处理运行完成后环境变量 PATH 将会还原。

### 3.2.2. 启用延时变量

需求原因，批处理读取命令时是按行读取的，在处理之前要完成必要的预处理工作，这其中就包括对该行命令中的变量赋值（另外例如for命令等，其后用一对圆括号闭合的所有语句也当作一行）。

使用 enabledelayedexpansion 启动延缓环境变量扩展，在延时变量扩展中，要使用 `!` 来引用变量。也可以通过 CMD.EXE 的 `/V` 命令行开关启用/停用延迟环境变量，参阅 `CMD /?`。

以下例子说明直接变量扩充的问题：

```cmd
@echo off
set VAR=before
if "%VAR%" == "before" (
    set VAR=after
    if "%VAR%" == "after" @echo If you see this, it worked
)
```
不会显示消息，因为在读到第一个 IF 语句时，两个 IF 语句中的 `%VAR%` 会被代替；原因是：它包含 IF 的文体，IF 是一个复合语句。所以，复合语句中的 IF 实际上是在比较 "before" 和 "after"，这两者永远不会相等。

实例1：利用 for 循环将当前目录下面的文件名称拼接到 LIST 变量中，必须启用延时变量，否则那时的 LIST 变量是空的。。

```CMD
@echo off
set LIST=
for %%i in (*) do set LIST=%LIST% %%i
echo %LIST%
```

原因是，它不会在目前的目录中建立一个文件列表，而只是将 LIST 变量设成找到的最后一个文件。这也是因为 `%LIST%` 在 `FOR` 语句被读取时，只被扩充了一次；而且，那时的 LIST 变量是空的。

因此，我们真正执行的 FOR 循环是：

```cmd
@echo off
for %%i in (*) do set LIST= %%i
```

延迟环境变量扩充允许您使用一个不同的字符（惊叹号，`!`）在执行时间扩充环境变量。如果延迟的变量扩充被启用，可以将上面例子写成以下所示，以达到预期效果：

```cmd
@echo off
setlocal enabledelayedexpansion
set LIST=
for %%i in (*) do set LIST=!LIST! %%i
echo %LIST%
endlocal
```

实例2：理解，读取变量。

```cmd
@echo off 
set a=4 
@REM 输出结果为 4
set a=5&echo %a%
@REM 输出结果为 5
echo %a% 
pause

@REM 启用延时变量
@echo off 
setlocal enabledelayedexpansion 
set a=4 
@REM 输出结果为 5
set a=5&echo !a! 
pause
```
批处理在运行到这句“`set a=5&echo %a%`”之前，先把这一句整句读取并做了预处理——对变量 `a` 赋了值，那么 `%a%` 当然就是 4 了！（没有为什么，批处理就是这样做的。）

例子3：
```cmd
@echo off 
for /l %%i in (1,1,3) do ( 
set k=%%i ::对k进行循环赋值 
echo %k% %%i 
) 
@REM _ 1
@REM _ 2
@REM _ 3
@REM _为空格。因为 k 没有赋初值，则替换为空。

@echo off 
set k=yyy 
for /l %%i in (1,1,3) do ( 
set k= %%i ::对k进行循环赋值 
echo %k% %%i 
)
@REM yyy  1
@REM yyy  2
@REM yyy  3

@echo off 
setlocal enabledelayedexpansion 
set k= 3 
for /l %%i in (1,1,3) do ( 
set k=%%i 
echo %k% %%i 
)
@REM 3 1
@REM 3 2
@REM 3 3

@echo off 
setlocal enabledelayedexpansion 
set k= 3 
for /l %%i in (1,1,3) do ( 
set k=%%i 
echo !k! %%i 
)
@REM 1 1
@REM 2 2
@REM 3 3
```

## 3.3. 批处理文件参数

本章将介绍批处理程序中怎样传递参数，接收参数。批处理程序中可引用的参数为 `%0~%9`，`%0` 是指批处理文件的本身，也可以说是一个外部命令；`%1~%9` 是批处理参数，也称形参。下面我们通过简单的实例演示：

```cmd
@echo off
echo param0=%0
echo param1=%1
echo param2=%2
echo param3=%3
echo param4=%4
echo param5=%5
echo param6=%6
echo param7=%7
echo param8=%8
echo param9=%9
pause
```

将上面脚本保存到 test.bat 文件，然后运行 “test.bat a b c d e f g h i”。运行结果：

```
C:\Users\Administrator\Desktop\bat> test.bat a b c d e f g h i
param0=test.bat     
param1=a
param2=b
param3=c
param4=d
param5=e
param6=f
param7=g
param8=h
param9=i
请按任意键继续. . .
```

### 3.3.1. shift 接收多于 %1~%9 个参数

上面我们了解到批处理文件中可引用的参数为 `%0~%9`， `%0`是指批处理文件的本身；`%1~%9` 是批处理参数，也称形参；而替换形参的实参若超过了批处理文件中所规定数值（9个）且想在批处理文件中应用这些实参的话，shift 命令可以帮你实现，查看更多 shift  命令信息。

实例：演示怎样使用 shift 命令接收更多参数。如下：

```cmd
@echo off
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /0   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /1   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /2   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /3   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /4   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /5   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /6   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /7   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
shift /8   
echo   %1 %2 %3 %4 %5 %6 %7 %8 %9
pause
```

将上面脚本保存到 “test.bat”，然后打开 DOS 窗口，运行 “test.bat a b c d e f g h i j k l m n o p q r s t u v w x y z” 命令。运行结果如下：

```
C:\Users\Administrator\Desktop\bat> test.bat a b c d e f g h i j k l m n o p q r s t u v w x y z
  a b c d e f g h i
  b c d e f g h i j
  c d e f g h i j k
  c e f g h i j k l
  c e g h i j k l m
  c e g i j k l m n 
  c e g i k l m n o 
  c e g i k m n o p 
  c e g i k m o p q 
  c e g i k m o q r 
请按任意键继续. . .
```

**总结**

1. 如果不借助其他其他命令，批处理做多接收9个额外的参数（`%1~%9`）。
2. 使用 shift 命令可以对参数进行偏移，从而取到更多的参数。
3. 如果使用的某个参数没有传递进来，则该变量为空。

## 3.4. shift 命令

shift 命令用于更改批处理文件处理参数的方式，如指定起始处理参数的位置等。先使用 `shift /?` 看看帮助信息：

```cmd
C:\Users\Administrator\Desktop>shift /?
更改批处理文件中可替换参数的位置。
 
SHIFT [/n]
 
如果命令扩展被启用，SHIFT 命令支持/n 命令行开关；该命令行开关告诉命令从第 n 个参数开始移位；n 介于零和八之间。例如:
 
    SHIFT /2
 
会将 %3 移位到 %2，将 %4 移位到 %3，等等；并且不影响 %0 和 %1。
```

实例1：利用 shift 命令动态输出批处理执行时输入的所有参数。

```cmd
@echo off
:round
if "%1"=="" goto cmd1
echo 参数：%1
shift
goto round
 
:cmd1
echo 没有获取到参数，结束脚本
goto end
:end
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat arg1 arg2 arg3
参数：arg1
参数：arg2
参数：arg3
没有获取到参数，结束脚本
```

实例2：使用 shift /n 的方式重新设置处理参数的起止位置。

```cmd
@echo off
echo 参数1：%1
echo 参数2：%2
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat arg1 arg2 arg3
参数1：arg1
参数2：arg2
```

运行上面实例时，我们传递了3个参数，分别是：arg1 arg2 arg3

如果我们在执行 echo 之前添加 “shift /2” 命令，cmd.exe 将把传递参数的起始位置设置为2，即 %3 移动 %2。代码如下：

```cmd
@echo off
shift /2
echo 参数1：%1
echo 参数2：%2
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat arg1 arg2 arg3
参数1：arg1
参数2：arg3
```

实例3：使用 shift命令和批处理子程序实现累加功能。

```cmd
@echo off
set sum=0
rem 调用子程序
call :sub sum 1 2 3 4
echo sum=%sum%
pause
rem 定义一个子程序
:sub
set /a %1=%1+%2
shift /2
if not "%2"=="" goto sub
goto :eof
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
sum=10
请按任意键继续. . .
```

## 3.5. 字符串操作

### 3.5.1. 字符串截取

语法如下：

```cmd
%variable:~n,m%
```
参数说明：

- variable：要进行操作的变量名称，该变量中放的是字符串；
- n：开始截取字符串的偏移量；如果为正数，则从左边开始；如果没有为负数，则从右边开始
- m：要截取字符的个数。如果没有指定个数，则采用默认值，即变量数值的余数（余数指剩余个数，如：%variable:~-5% 当前偏移量为倒数第6，将剩下的字符全部截取）。如果两个数字 (偏移量和长度) 都是负数，使用的数字则是字符串长度加上指定的偏移量或长度

实例1：演示从左或从右截取字符串，以及截取最后的字符。

```cmd
@echo off
set ifo=abcdefghijklmnopqrstuvwxyz0123456789
echo 原字符串：
echo %ifo%
 
rem abcde
echo 截取前5个字符：
echo %ifo:~0,5%
 
rem fghijklmnopqrstuvwxyz0123456789
echo 截取第六个字符直到最后一个字符
echo %ifo:~5%
 
rem 56789
echo 截取最后5个字符：
echo %ifo:~-5%
echo %ifo:~-5,5%
 
rem abcdefghijklmnopqrstuvwxyz01234
echo 截取第一个到倒数第6个字符：
echo %ifo:~0,-5%
 
rem defgh
echo 从第4个字符开始，截取5个字符：
echo %ifo:~3,5%
 
rem wxyz0
echo 从倒数第14个字符开始，截取5个字符：
echo %ifo:~-14,5%
pause
```
输出结果：

```
原字符串：
abcdefghijklmnopqrstuvwxyz0123456789
截取前5个字符：
abcde
截取第六个字符直到最后一个字符
fghijklmnopqrstuvwxyz0123456789
截取最后5个字符：
56789
56789
截取第一个到倒数第6个字符：
abcdefghijklmnopqrstuvwxyz01234
从第4个字符开始，截取5个字符：
defgh
从倒数第14个字符开始，截取5个字符：
wxyz0
请按任意键继续. . .
```
实例2：演示偏移量和长度均为负数。

```cmd
@echo off
set ifo=a0123456789
echo 原字符串：%ifo%
echo %ifo:~-8%
echo %ifo:~-8,-7%
echo %ifo:~-8,-6%
echo %ifo:~-8,-5%
echo %ifo:~-8,-4%
echo %ifo:~-8,-3%
echo %ifo:~-8,-2%
echo %ifo:~-8,-1%
 
rem error: ECHO 处于关闭状态。
echo %ifo:~-5,-5%
echo %ifo:~-5,-10%
 
pause
```

输出结果：

```
原字符串：a0123456789
23456789
2     
23    
234   
2345  
23456 
234567
2345678
ECHO 处于关闭状态。
ECHO 处于关闭状态。
请按任意键继续. . .
```

根据上面实例可知，偏移量为字符串长度加上指定的负数偏移量（11 + -8 = 3），因此从第四个字符开始截取；如果没有指定待截取的长度，则截取到字符串末尾；如果指定的截取长度为负数，则表示将从末尾排除n个字符。如：`echo %ifo:~-8,-4%` 将从第四个字符串开始截取，并且排除最后4个字符，截取结果为“2345”。

实例3：拆分打印Windows的版本号。

```cmd
@echo off
 
FOR /F "tokens=1,2,3,4" %%I IN ('VER') DO (
  set Ver_Temp=%%L
)
echo Windows版本字符串：%Ver_Temp%
 
rem 截取版本
set Ver_Major=%Ver_Temp:~0,2%
set Ver_Minor=%Ver_Temp:~3,1%
set Ver_Build=%Ver_Temp:~-4,3%
 
echo Windows Version:
echo   Major %Ver_Major%
echo   Major %Ver_Minor%
echo   Build %Ver_Build%
```
输出结果：

```
Windows版本字符串：10.0.18363.900]
Windows Version:
  Major 10
  Major 0
  Build 900
```

实例4：获取当前时间，然后截取成“*点*分*秒*毫秒”格式。

```cmd
@echo off
echo 当前时间：%time%
echo 当前时间：%time:~0,2%点%time:~3,2%分%time:~6,2%秒%time:~9,2%毫秒
pause
```

输出结果：

```
当前时间：16:28:18.38
当前时间：16点28分18秒39毫秒
请按任意键继续. . .
```

### 3.5.2. 字符串替换

语法如下：

```cmd
%variable:str1=str2%
```
参数说明：

- variable：变量命令，存放字符串。
- str1：被替换的字符串
- str2：替换字符串，将使用该字符串去替换字符串中所有的 str1 字符串。

实例如下，

```cmd
@echo off
set val=hello bat
echo %val%
@REM echo %val:bat=CMD%
set "val=%val:bat=CMD%"
echo %val%
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
hello bat
hello CMD
请按任意键继续. . .
```

要有效地从扩展结果中删除所有的 "str1"，"str2" 可以是空的。实例：

```cmd
@echo off
set val=hello bat
echo %val%
echo %val:a=%
pause
```

"str1" 可以以星号打头；在这种情况下，"str1" 会从扩展结果的开始到 str1 剩余部分第一次出现的地方，都一直保持相配。实例：

```cmd
@echo off
set val=hello bat hello bat
echo %val%
echo %val:*bat=CMD%
pause
```
输出结果：

```
C:\Users\Administrator\Desktop>test.bat
hello bat hello bat
CMD hello bat
请按任意键继续. . .
```

实例：利用字符串替换功能，实现查找字符串是否包含指定的字符串。

```cmd
@echo off
set str=Hello, welcome to the article.
echo 原文：%str%
 
rem 判断 str 变量中是否存在 the 字符串
set "tmpStr=%str:the=%"
if "%str%"=="%tmpStr%" (
    echo 很抱歉！没有找到
) else (
    echo 存在字符串 “the”
)
 
pause
```

输出结果：

```
原文：Hello, welcome to the article.
存在字符串 “the”    
请按任意键继续. . .
```

### 3.5.3. 字符串合并

其实，合并字符串就是将两个字符串放在一起就可以了。例如：

```cmd
@echo off
set str1=Hello
set str2=World
 
rem 直接输出合并后的字符串
echo %str1%%str2%
 
rem 将合并后的字符串放入 str 变量中
set str=%str1%%str2%
echo %str%
 
pause
```

实例：利用 for 循环将当前目录和子目录下面的文件路径保存到变量中，然后打印到控制台。

```cmd
@echo off
rem 设置变量延迟扩展
if "%OS%"=="Windows_NT" setlocal enabledelayedexpansion
 
rem 将当前目录下面以及子目录下面的目录路径放到 allFile 变量
set "bastPath=%~dp0"
set allFile=
for /r %%i in (*) do (
    set "var=%%i"
    set "allFile=!allFile! !var:%bastPath%=!"
)
echo %allFile%
 
pause
```

输出结果：

```
echo.txt ifconfig.txt ipconfig.txt ping.txt set.txt t.bat tmp\2020478.jpg tmp\tmp.txt
请按任意键继续. . .
```

### 3.5.4. 判断某个变量中是否包含某些字符

判断某个变量中是否包含某些字符，还真适合用find/findstr命令，用if命令的话，会很麻烦。[link](https://zhidao.baidu.com/question/880334089177813372)

使用管道符啊！把变量内容传递给find就可以了。

方法一：

```cmd
echo "%var%" | find "TEST"
```

方法二：

```cmd
@echo off
set "s=123abc"
if "%s:3a=%" neq "%s%" (echo;Y) else (echo;N)
pause
```



## 3.6. 更多的动态变量

```
%errorlevel% 
%errorlevel%表达上一条命令的返回值，用于判断。一般上一条命令的执行结果返回的值只有两个，0表示”成功”、1表示”失败”，实际上，errorlevel 返回值可以在0~255 之间。

SET
系统
返回环境变量。

%ALLUSERSPROFILE%
局部
返回“所有用户配置文件”的位置。

%APPDATA%
局部
返回默认情况下应用程序存储数据的位置。

%CD%
局部
返回当前目录字符串。

%CMDCMDLINE%
局部
返回用来启动当前的 Cmd.exe 的准确命令行。

%CMDEXTVERSION%
系统
返回当前的“命令处理程序扩展”的版本号。

%COMPUTERNAME%
系统
返回计算机的名称。

%COMSPEC%
系统
返回命令行解释器可执行程序的准确路径。

%DATE%
系统
返回当前日期。使用与 date /t 命令相同的格式。由 Cmd.exe 生成。

%ERRORLEVEL%
系统
返回上一条命令的错误代码。通常用非零值表示错误。

%HOMEDRIVE%
系统
返回连接到用户主目录的本地工作站驱动器号。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。

%HOMEPATH%
系统
返回用户主目录的完整路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。

%HOMESHARE%
系统
返回用户的共享主目录的网络路径。基于主目录值而设置。用户主目录是在“本地用户和组”中指定的。

%LOGONSERVER%
局部
返回验证当前登录会话的域控制器的名称。

%NUMBER_OF_PROCESSORS%
系统
指定安装在计算机上的处理器的数目。

%OS%
系统
返回操作系统名称。Windows 2000 会将该操作系统显示为 Windows NT。

%PATH%
系统
指定可执行文件的搜索路径。

%PATHEXT%
系统
返回操作系统认为可执行的文件扩展名的列表。

%PROCESSOR_ARCHITECTURE%
系统
返回处理器的芯片体系结构。值：x86 或 IA64（基于 Itanium）。

%PROCESSOR_IDENTFIER%
系统
返回处理器说明。

%PROCESSOR_LEVEL%
系统
返回计算机上安装的处理器的型号。

%PROCESSOR_REVISION%
系统
返回处理器的版本号。

%PROMPT%
局部
返回当前解释程序的命令提示符设置。由 Cmd.exe 生成。

%RANDOM%
系统
返回 0 到 32767 之间的任意十进制数字。由 Cmd.exe 生成。

%SYSTEMDRIVE%
系统
返回包含 Windows 服务器操作系统根目录（即系统根目录）的驱动器。

%SYSTEMROOT%
系统
返回 Windows 服务器操作系统目录的位置。

%TEMP% 和 %TMP%
系统和用户
返回对当前登录用户可用的应用程序所使用的默认临时目录。有些应用程序需要 TEMP，而其他应用程序则需要 TMP。

%TIME%
系统
返回当前时间。使用与 time /t 命令相同的格式。由 Cmd.exe 生成。

%USERDOMAIN%
局部
返回包含用户帐户的域的名称。

%USERNAME%
局部
返回当前登录的用户的名称。

%USERPROFILE%
局部
返回当前用户的配置文件的位置。

%WINDIR%
系统
返回操作系统目录的位置。
```

# 4. 控制命令

## 4.1. if

在批处理程序中 if 语句非常有用，本章将仔细根据 `if /?` 帮助信息来解读 if 语句的基础用法，以及更高级的用法。

### 4.1.1. if 语句基础

语法：

```cmd
IF [NOT] ERRORLEVEL number command
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command
```
参数说明：

- **NOT**  将表达式的结果取反。
- **ERRORLEVEL number**  如果最后运行的程序返回一个**等于或大于**指定数字的退出代码，指定条件为 true。
- **string1==string2**  如果指定的字符串 string1 等于 string2，条件表达式为 true，执行 if 语句的命令。
- **EXIST filename**  如果指定的文件名存在，指定条件为 true。
- **command**  如果符合条件（即表达式为TRUE），指定要执行的命令。如果指定的条件为 FALSE，命令后可跟 ELSE 命令，该命令将在 ELSE 关键字之后执行该命令。

实例：下面通过实例演示上面几种 IF 语句形式的用法。

```cmd
@echo off
rem 需要用户输入密码
set /p pwd=请输入密码：
if "%pwd%"=="123456" echo 密码正确
if not "%pwd%"=="123456" echo 错误的密码: %pwd%
 
set file=D:\tmp.txt
if exist %file% echo %file% 文件存在
if not exist %file% echo %file% 文件不存在
 
rem 下面有意将 copy 的目标文件参数不写，导致 copy 执行失败
rem 此时 errorlevel 等于 1，我们使用 “ERRORLEVEL number” 风格来判断拷贝是否成功
rem 用意：测试 “ERRORLEVEL number” %ERRORLEVEL% 的结果大于等于指定值，表达式为true
copy tmp.txt >nul 2>nul
if errorlevel 1 echo errorlevel=%errorlevel% 拷贝失败
if errorlevel 0 echo errorlevel=%errorlevel% 文件拷贝成功
 
ipconfig > nul
if errorlevel 0 echo errorlevel=%errorlevel% 执行成功
```
输出结果：

```cmd
C:\Users\Administrator\Desktop> test.bat
请输入密码：123
错误的密码: 123
D:\tmp.txt 文件不存在
errorlevel=1 拷贝失败
errorlevel=1 文件拷贝成功
errorlevel=0 执行成功
```

**if-else 语句**。ELSE 子句必须出现在同一行上的 IF 之后。语法如下：

```cmd
IF EXIST filename. (
    del filename.
) ELSE (
    echo filename. missing.
)
```
由于 del 命令需要用新的一行终止，因此以下子句不会有效：

```cmd
IF EXIST filename. del filename. ELSE echo filename. missing
```

由于 ELSE 命令必须与 IF 命令的尾端在同一行上，以下子句也不会有效：

```cmd
IF EXIST filename. del filename.
ELSE echo filename. missing
```

如果都放在同一行上，以下子句有效（将 del 语句放入括号中）：

```cmd
IF EXIST filename. (del filename.) ELSE echo filename. missing
```

实例：用户输入密码，判断密码是否正确。

```cmd
@echo off
set /p pwd=请输入密码：
if "%pwd%"=="123456" (
    echo 密码正确
) else (
    echo 错误的密码: %pwd%
)
```

如果条件分支比较少，使用 if-else 就可以了。遇到条件非常多的批处理提供了 if -elseif-else 类似 switch 语句。实例：根据学生输入的成绩给出学生级别。代码如下：

```cmd
@echo off
set /p score=输入成绩：
if %score% lss 60 (
    echo 未及格，需要多努力啊!
) else if %score% lss 70 (
    echo 及格，多做题
) else if %score% lss 80 (
    echo 良，加把劲考
) else if %score% lss 90 (
    echo 优，你很优秀，继续保持
) else (
    echo 不是凡人
)
pause
```
> 如果你要将 else if 换行，需要在 “)” 后面添加 “^” 符号。

### 4.1.2. if 语句扩展

如果命令扩展被启用，IF 会如下改变：

```cmd
IF [/I] string1 compare-op string2 command
IF CMDEXTVERSION number command
IF DEFINED variable command
```

其中， compare-op 可以是：

- `EQU` - 等于
- `NEQ` - 不等于
- `LSS` - 小于
- `LEQ` - 小于或等于
- `GTR` - 大于
- `GEQ` - 大于或等于

而 `/I` 开关（如果指定）说明要进行的字符串比较不分大小写。`/I` 开关可以用于 IF 的 string1==string2 的形式上。这些比较都是通用的；原因是，如果 string1 和 string2 都是由数字组成的，字符串会被转换成数字，进行数字比较。实例：

```cmd
@echo off
if "A" equ "A" echo equ ok
if "A" == "A" echo equ ok
if /I "A" equ "a" echo equ ok
if 100 equ 100 echo equ ok
if 100 == 100 echo equ ok
```

CMDEXTVERSION 条件的作用跟 ERRORLEVEL 的一样，除了它是在跟与命令扩展有关联的内部版本号比较。第一个版本是 1。每次对命令扩展有相当大的增强时，版本号会增加一个。命令扩展被停用时，CMDEXTVERSION 条件不是真的。实例：

```cmd
@echo off
echo %CMDEXTVERSION%
if CMDEXTVERSION 2 echo 内部版本号为2
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
2
内部版本号为2
```

而对于 if defined 来说，与 if exist 类似，只不过 if defined 的判断对象不是文件，而是变量，它用于判断环境变量是否被定义。

```cmd
REM %%i这是for循环中的变量
if not define %%i set %%i=s
REM 如果%%i中的值不是已经定义的变量的话，将其值作为变量名，该变量的值为s
```

实例：使用 DEFINED 判断变量是否定义

```cmd
@echo off
set val=10
if DEFINED val echo val=%val%
if NOT DEFINED val echo 没有定义 val 环境变量
 
if DEFINED myPath echo val=%myPath%
if NOT DEFINED myPath echo 没有定义 myPath 环境变量
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
val=10
没有定义 myPath 环境变量
```

如果没有名为 ERRORLEVEL 的环境变量，`%ERRORLEVEL%` 会扩充为 ERROLEVEL 当前数值的字符串表达式；否则，您会得到其数值。运行程序后，以下语句说明 ERRORLEVEL 的用法：

```cmd
@echo off
xcopy tmp.txt D:\tmp\tmp.txt
echo ERRORLEVEL=%ERRORLEVEL%
goto answer%ERRORLEVEL%
 
rem xcopy 默认的 errorlevel 值就有5个，分别表示5种执行状态
rem 0 复制文件成功 
rem 1 未找到复制文件 
rem 2 用户通过CTRL C 终止了xcopy操作 
rem 4 出现了初始化错误  
rem 5 出现了磁盘写入错误
:answer0
echo xcopy 复制文件成功
goto end
 
:answer1
echo xcopy 未找到复制文件
goto end
 
:answer2
echo xcopy 用户通过 CTRL C 终止了xcopy 操作
goto end
 
:answer4
echo xcopy 出现了初始化错误
goto end
 
:answer5
echo xcopy 出现了磁盘写入错误
goto end
 
:end
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
找不到文件 - tmp.txt
复制了 0 个文件
ERRORLEVEL=4
xcopy 出现了初始化错误
```

您也可以使用以上的数字比较：

```cmd
@echo off
xcopy tmp.txt D:\tmp\tmp.txt
echo ERRORLEVEL=%ERRORLEVEL%
IF %ERRORLEVEL% EQU 0 goto answer0
IF %ERRORLEVEL% EQU 1 goto answer0
IF %ERRORLEVEL% EQU 2 goto answer2
IF %ERRORLEVEL% EQU 4 goto answer4
IF %ERRORLEVEL% EQU 5 goto answer5
 
rem xcopy 默认的 errorlevel 值就有5个，分别表示5种执行状态
rem 0 复制文件成功 
rem 1 未找到复制文件 
rem 2 用户通过CTRL C 终止了xcopy操作 
rem 4 出现了初始化错误  
rem 5 出现了磁盘写入错误
 
:answer0
echo xcopy 复制文件成功
goto end
 
:answer1
echo xcopy 未找到复制文件
goto end
 
:answer2
echo xcopy 用户通过 CTRL C 终止了xcopy 操作
goto end
 
:answer4
echo xcopy 出现了初始化错误
goto end
 
:answer5
echo xcopy 出现了磁盘写入错误
goto end
 
:end
```

如果没有名为 CMDCMDLINE 的环境变量，`%CMDCMDLINE%` 将在 CMD.EXE 进行任何处理前扩充为传递给 CMD.EXE 的原始命令行；否则，您会得到其数值。

如果没有名为 CMDEXTVERSION 的环境变量，`%CMDEXTVERSION%` 会扩充为 CMDEXTVERSION 当前数值的字串符表达式；否则，您会得到其数值。

```cmd
@echo off
echo cmdLine=%CMDCMDLINE%
echo version=%CMDEXTVERSION%
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
cmdLine=C:\Windows\System32\cmd.exe
version=2
```

## 4.2. goto 语句

一般的批处理命令，都是按照自上而下的流程逐行执行的，也就是说，只有第一行的命令执行了之后，才可能执行第二行，第二行执行完之后，再执行第三行……如此依次执行。

如果对不同的情况，需要执行不同的既定操作，若还是按照常规的执行流程的话，是无法完成任务的。这个时候，就需要引入流程跳转的概念，动用流程跳转语句 goto 了。流程跳转的含义是：改变默认的执行顺序，强制跳转到指定的位置执行特定的程序块。

```cmd
C:\Users\Administrator> goto /?
将 cmd.exe 定向到批处理程序中带标签的行。
 
GOTO label
  label   指定批处理程序中用作标签的文字字符串。
 
标签必须单独一行，并且以冒号打头。
 
如果命令扩展被启用，GOTO 会如下改变：
GOTO 命令现在接受目标标签 :EOF，这个标签将控制转移到当前
批脚本文件的结尾。不定义就退出批脚本文件，这是一个容易的
办法。有关能使该功能有用的 CALL 命令的扩展描述，请键入
CALL /?。
```

实例：要求用户输入字母（A或B），然后根据用户输入的字母显示不同的提示信息。

```cmd
@echo off
setlocal
set /p input=请输入字母A或B：
if "%input%"=="A" goto A
if "%input%"=="B" goto B
echo 您没有输入字母
goto end
REM 定义了一个标签
 
:A
echo 您输入的字母是A
goto end
REM 定义了一个标签
 
:B
echo 您输入的字母是B
goto end
:end
```

其中：

- :A 和 :B 定义了两个标签，可以使用 goto A 或 goto B 跳转到定义的标签。
- setlocal 用来实现环境变量局部化，当批处理执行完毕后，定义的 input 变量将销毁。

### 4.2.1. goto 语句注意事项

（1）goto 语句和标签要互相呼应，不能只有 goto 语句而没有相应的标签段；否则，程序将找不到相应的标签段而直接退出。实例：

```cmd
@echo off
echo hello bat
goto test
echo www.hxstrive.com
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
hello bat
系统找不到指定的批处理标签 - test
```

（2）只有标签段而没有goto语句是允许的，但不能实现流程跳转功能，从代码精简的角度来看，有标签段而没有goto语句，则此标签是多余的，可以精简掉。

（3）若有多个标签段，则需要注意标签段之间是否需要添加合适的退出语句来终止程序继续向下执行，这是很多新手很容易犯错的地方，需要谨慎。实例：

```cmd
@echo off
setlocal
set /p input=请输入字符（A或B）：
if "%input%"=="A" goto A
if "%input%"=="B" goto B
echo 您没有输入字母
goto end
 
:A
echo 您输入了字符A
 
:B
echo 您输入了字符B
 
:end
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
请输入字符（A或B）：A
您输入了字符A
您输入了字符B
```

上面实例中，当输入字母A之后，结果将同时显示 "您输入了字母A" 和 "您输入了字母B" 这两行内容。这是因为批处理是自上而下逐行执行的，即使用 goto 语句跳转之后，在新的位置上，这一执行流程仍然会保持，直到碰上另一个流程跳转语句，执行过程并不会在两个标签段之间自动终止。您可以在标签（:A 和 :B）代码块后面添加 exit 或者 goto end （end 是我们在批处理最后面添加的标签）语句。实例：

```cmd
@echo off
setlocal
set /p input=请输入字符（A或B）：
if "%input%"=="A" goto A
if "%input%"=="B" goto B
echo 您没有输入字母
goto end
 
:A
echo 您输入了字符A
goto end
 
:B
echo 您输入了字符B
goto end
 
:end
```

或者使用 exit 语句实现上面实例，代码如下：

```cmd
@echo off
setlocal
set /p input=请输入字符（A或B）：
if "%input%"=="A" goto A
if "%input%"=="B" goto B
echo 您没有输入字母
exit
 
:A
echo 您输入了字符A
exit
 
:B
echo 您输入了字符B
exit
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
请输入字符（A或B）：A
您输入了字符A
```

（4）标签名只可以使用常量，而不能使用变量。实例：

```cmd
@echo off
setlocal
REM 使用变量存放标签名
set labelA=:A
set labelB=:B
set /p input=请输入字符（A或B）：
if "%input%"=="A" goto A
if "%input%"=="B" goto B
echo 您没有输入字母
goto end
 
REM 使用变量定义标签名
%labelA%
echo 您输入了字符A
goto end
 
REM 使用变量定义标签名
%labelB%
echo 您输入了字符B
goto end
 
:end
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
请输入字符（A或B）：A
系统找不到指定的批处理标签 - A
```

（5）若有同名的标签段，将执行位于最顶层的标签段，其后的标签段是否得到执行，将视具体的情况加以处理。实例：

```cmd
@echo off
setlocal
set /p input=请输入字符（A或B）：
if "%input%"=="A" goto A
goto end
 
:A
echo (1) 您输入了字符A
 
:A
echo (2) 您输入了字符A
 
:end
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
请输入字符（A或B）：A
(1) 您输入了字符A
(2) 您输入了字符A
```

## 4.3. for 语句

基本格式如下：

```cmd
REM 在 CMD 窗口中
FOR %variable IN (set) DO command [command-parameters]
 
REM 在批处理文件中
FOR %%variable IN (set) DO command [command-parameters]
```

参数说明：

-  `%variable` 指定一个单一字母可替换的参数，该参数用来存放 for 语句每次迭代的数据。
-  (set)  指定一个或一组文件，可以使用通配符。
-  command  指定对每个文件执行的命令。
-  command-parameters  为特定命令指定参数或命令行开关。

> 注意：在批处理程序中使用 FOR 命令时，指定变量请使用 %%variable 而不要用 %variable。变量名称是区分大小写的，所以 %i 不同于 %I。

实例：在 CMD 窗口执行简单的 for 循环。

```cmd
C:\Users\Administrator>for %I in (ABC) do echo %I
 
C:\Users\Administrator>echo ABC
ABC
```

实例2：在批处理文件中定义一个非常简单的 for 循环，输出指定的字符串。

```cmd
@echo off
for  %%I in (ABC) do (
    echo %%I
)
pause
```

### 4.3.1. for 语句注意事项

for语句的形式变量I，可以换成26个字母中的任意一个，这些字母会区分大小写，也就是说，`%%I` 和 `%%i` 会被认为不是同一个变量；形式变量I还可以换成其他的字符，但是，为了不与批处理中的 `%0～%9` 这 10 个形式变量发生冲突，请不要随意把 `%%I` 替换为 `%%0～%%9` 中的任意一个。实例：

```cmd
@echo off
for  %%A in (ABC) do echo %%A
for  %%I in (ABC) do echo %%I
for  %%Z in (ABC) do echo %%Z
REM %%J 和 %%j 是不同的两个变量
for  %%J in (ABC) do echo %%j
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
ABC
ABC
ABC
%j 
请按任意键继续. . .
```

n 和 do 之间的 command1 表示的字符串或变量可以是一个，也可以是多个，每一个字符串或变量，我们称之为一个元素，每个元素之间，用空格键、跳格键、逗号、分号或等号分隔。

实例：演示使用空格、分号、逗号和等号分割 command1。

```cmd
@echo off
for  %%I in (A B C) do echo %%I
for  %%I in (A;B;C) do echo %%I
for  %%I in (A,B,C) do echo %%I
for  %%I in (A=B=C) do echo %%I
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
A
B
C
A
B
C
A
B
C
A
B
C
请按任意键继续. . .
```

现在，来分析上面代码中 for 语句的执行过程：

（1）for语句以空格、分号、逗号和等号为分隔符，把 A,B,C 这个字符串切分成三个元素：A、B和C，由此决定了do后的语句将会被执行3次。

（2）第一次执行过程是这样的：先把 A 这个字符串作为形式变量 I 的值，带入 do 后的语句中加以执行，也就是执行 echo %%I 语句，此时的 I 值为 A，因此，第一次执行的结果，将会在屏幕上显示 A 这个字符串；第二次执行和第一次执行的过程是一样的，只不过此时 I 的值已经被替换为 command1 中的第二个元素了，也就是 B 这个字符串；如此循环，当第三次 echo 执行完毕之后，整条 for 语句才算执行完毕；此时，将执行下一条语句，也就是 pause 命令。

### 4.3.2. for /D 语句扩展

如果启用命令扩展，则 for 语句支持 /D 扩展，语法如下：

```cmd
FOR /D %variable IN (set) DO command [command-parameters]
```

for语句默认将会匹配文件名。如果添加了 /D 扩展命令，则该 for 语句与目录名匹配，而不与文件名匹配。实例：

```cmd
@echo off
 
REM 匹配当前目录下面的文件名
echo 第一个 for 语句
for %%i in (*) do echo "%%i"

REM (*.*) 和 (*) 效果一样，匹配特地后缀，可以改成，如 (*.txt)
for %%i in (*.*) do echo "%%i"

 
REM 匹配当前目录下面的目录名
echo 第二个 for 语句
for /D %%i in (*) do echo "%%i"
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
第一个 for 语句
"for.txt"
"test.bat"
第二个 for 语句
"tmp"
请按任意键继续. . .
```

实例：搜索 C 盘下的所有目录，但是不包含子目录。

```cmd
@echo off
for /D %%i in (C:/*) do echo "%%i"
pause
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
"C:Program Files"      
"C:Program Files (x86)"
"C:Python38"
"C:Users"
"C:Windows"
请按任意键继续. . .
```

### 4.3.3. for /R 语句扩展

/R 语法如下：

```cmd
FOR /R [[drive:]path] %variable IN (set) DO command [command-parameters]
```

将递归进入根目录树 [Drive:]Path，在树的每个目录中执行 for 语句。如果在 /R 后没有指定目录，则认为是当前目录。如果 set 只是一个句点（.），则只枚举目录树。

实例：搜索当前目录下的所有文件。

```cmd
@echo off
for /r %%i in (*) do echo %%i
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
"C:\Users\Administrator\Desktop\bat\call.bat"   
"C:\Users\Administrator\Desktop\bat\for.txt"    
"C:\Users\Administrator\Desktop\bat\hello.bat"  
"C:\Users\Administrator\Desktop\bat\test.bat"   
"C:\Users\Administrator\Desktop\bat\tmp\for.txt"  
请按任意键继续. . .
```

运行结果将显示，当前目录下的所有文件以及该目录下所有子目录里的所有文件。

实例：输出 D 盘下面所有的目录

```cmd
@echo off
for /r d:/ %%i in (.) do echo %%i
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
d:\.
d:\360Downloads\.
d:\360Downloads\Software\.
d:\360Downloads\Software\漏洞补丁目录\.
d:\360Downloads\Software\漏洞补丁目录\sxs\.
d:\360Downloads\wpcache\.
d:\360Downloads\wpcache\srvsetwp\.
... 省略 ...
```

实例：搜索C盘里所有的扩展名为exe的文件。

```cmd
@echo off
for /r c:/ %%i in (*.exe) do echo %%i
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
c:\AMD\WU-CCC2\ccc2_install\WULaunchApp.exe
c:\AMD\WU-CCC2\ccc2_install\Support64\CCC2App64.exe
```

运行结果将显示C盘和C盘里各个文件夹下的exe文件。

实例：搜索 C 盘是否有 notepad.exe 可执行文件。如果存在，则使用 start 启动 notepad.exe 程序。

```cmd
@echo off
for /r c:/ %%i in (notepad.exe) do (
    if exist %%i (
        echo 找到了 notepad.exe
        REM 去启动 notepad.exe
        start %%i
        goto end
    )
)
echo 没有找到 notepad.exe
 
:end
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
找到了 notepad.exe
```

### 4.3.4. for /L 语句扩展

for /L 用使用给定信息创建序列，语法如下：

```cmd
FOR /L %variable IN (start,step,end) DO command [command-parameters]
```

上面语法中其他指令已经在前面介绍过，for /L 表示以增量形式从 start 以每次增加 step，直到到 end 的一个数字序列。如果 start 小于 end，就会执行该命令。如果迭代变量超过 end，则命令解释程序退出此循环。还可以使用负的 step 以递减数值的方式逐步执行此范围内的值。其他参数说明：

- start：指定创建序列的开始位置
- step：for 语句创建序列时单步距离。
- end：指定创建序列结束位置

实例：创建 1~5 的序列。

```cmd
@echo off
for /L %%i in (1,1,5) do echo %%i
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
1
2
3
4
5
请按任意键继续. . .
```

实例：创建 5~1 的序列。

```
@echo off
for /L %%i in (5,-1,1) do echo %%i
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
5
4
3
2
1
请按任意键继续. . .
```

实例：使用 for 创建大量的文件夹。

```cmd
@echo off
cd test
for /l %%i in (1,1,100) do (
    md %%i
)
echo finished.
pause >nul
```

### 4.3.5. for /F 语句扩展

/F 扩展是 for 语句最常用的、也是最强的命令。主要用来处理文件和一些命令的输出结果。它可以提取文本文件的内容，进行逐行分析和处理。语法：

```cmd
FOR /F ["options"] %variable IN (file-set) DO command [command-parameters]
FOR /F ["options"] %variable IN ("string") DO command [command-parameters]
FOR /F ["options"] %variable IN ('command') DO command [command-parameters]
```

其中，file-set 为一个或多个文件名。for 语句会逐一分析指定的每个文件，打开指定文件、读取并处理文件内容。处理包括读取文件内容，将文件内容逐行读取，然后将每行解析成零或更多的符号（默认使用空格作为分隔符）。

实例：下面是一个简单的 for /F 语句，该实例将逐行读取 test.txt 文件的内容，然后默认使用空格分隔。然后将分隔后的列赋值给 `%%i`（这里只是将第一列赋值给 `%%i`）。test.txt 文本文件内容如下：

```
姓名  年龄   成绩
张三   28     87
李四   32     92
```

批处理脚本内容如下：

```cmd
@echo off
for /F %%i in (test.txt) do (
    echo %%i
)
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
姓名
张三
李四
请按任意键继续. . .
```

### 4.3.6. for /F 高级选项

for /F 还有很多高级功能，这些功能需要通过设置 "options" 来实现，下面将进行逐一介绍。

#### 4.3.6.1. eol=c

忽略以指定字符开头的行。可以使用该功能跳过注释。

#### 4.3.6.2. skip=n

指定在 for 语句解析每个文件时，从文件头部跳过的行数。

#### 4.3.6.3. delims=xxx 

指定分隔符号集，替换 for 语句默认的**空格**和**制表符**分隔符号。

delims 允许指定多个分隔符，如果指定多个分割符号时，你要指定空格，请将空格放置到最后，不要放置到最前面。实例如下：

```
姓名#年龄#成绩
张三|28|87
李四,32,92
赵六 30 78
```

批处理脚本：

```cmd
@echo off
REM 错误的方式，如果指定多个分隔符时，不要将空格放置到前面
for /F "delims= #|," %%i in (test.txt) do (
    echo %%i
)
REM 正确的方式，将空格放置到 delims 最后
for /F "delims=#|, " %%i in (test.txt) do (
    echo %%i
)
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
姓名
张三
李四
赵六   
请按任意键继续. . .
```

**逐行读取文件内容实例**

显示本机账号。

```cmd
@echo off
FOR /F "delims=" %%i in ('net user') do @echo %%i
pause
```

这样你本机全部帐号名字就出来了把扩号内的内容用两个单引号引起来就表示那个当命令执行,FOR会返回命令的每行结果,加那个**"delims=" 是为了让我空格的行能整行显示出来,不加就只显示空格左边一列!** 简单来说就是没有分隔符的意思。

#### 4.3.6.4. tokens=x,y,m-n

简单的来说就是配置怎样去提取每一行的列，列的数量是根据你配置的 delims 决定了，因为 for 语句将使用 delims 对行进行分割。tokens 语法格式：

- tokens=m 表示提取第m列；
- tokens=m,n 表示提取第m列和第n列；
- tokens=m-n 表示提取第m列至第n列；
- tokens=* 忽略行首的所有空格；
- tokens=m* 提取第m列以后的所有字符，星号表示剩余的字符；

> 注意：输出变量的个数由定义了的tokens决定。在 FOR 语句中显式声明 %%i。使用 tokens= 隐式声明 %%j 和 %%k。只要不会引起试图声明高于字母“z”或“Z”的某个变量，则使用 tokens= 可以指定最多 26 个输出变量。 

#### 4.3.6.5. for /F 实例

实例1：文字筛选。

```cmd
::::::::::文字筛选.txt::::::::::
@echo off
echo 测试 文字筛选.txt 里每一行的首单词
for /f %%i in (文字筛选.txt) do echo %%i
pause

echo.
echo skip=2 表示前两行被跳过
for /f "skip=2" %%i in (文字筛选.txt) do echo %%i
pause

echo.
echo tokens=2,4-6 表示提取每行的第2个、以及第4到6个单词
for /f "skip=2 tokens=2,4-6" %%i in (文字筛选.txt) do echo %%i, %%j, %%k, %%l.
pause

echo.
echo eol=N 表示当此行的首字母为 N 时，就忽略该行
for /f "eol=N skip=2 tokens=2,4-6" %%i in (文字筛选.txt) do echo %%i, %%j, %%k, %%l.
pause

echo.
echo delims=e 表示不再以空格区分每个词，而是以字母 e 作为间隔
for /f "eol=N skip=2 tokens=2,4-6 delims=e" %%i in (文字筛选.txt) do echo %%i, %%j, %%k, %%l.
pause

echo.
echo usebackq 表示双引号里的东西是文件名而不是字符串
for /f "usebackq eol=N skip=2 tokens=2,4-6 delims=e" %%i in ("文字筛选.txt") do echo %%i, %%j, %%k, %%l.
pause
::::::::::::::::::::::::::::::::
作为测试，可以在上述批处理文件的同一路径下创建一个用于测试的文本文件 文字筛选.txt ，其内容为：
Hello there!
This text is an example of test for the batch file 文字筛选.bat.
Notice the first letter in this line, N.
If the eol charactor was set to be letter N.
The third line will not be considered by the batch.
```

输出结果：

```
测试 文字筛选.txt 里每一行的首单词
Hello
This
Notice
If
The
请按任意键继续. . .

skip=2 表示前两行被跳过
Notice
If
The
请按任意键继续. . .

tokens=2,4-6 表示提取每行的第2个、以及第4到6个单词
the, letter, in, this.
the, charactor, was, set.
third, will, not, be.
请按任意键继续. . .

eol=N 表示当此行的首字母为 N 时，就忽略该行
the, charactor, was, set.
third, will, not, be.
请按任意键继续. . .

delims=e 表示不再以空格区分每个词，而是以字母 e 作为间隔
 , t to b,  l, tt.
 third lin,  consid, r, d by th.
请按任意键继续. . .

usebackq 表示双引号里的东西是文件名而不是字符串
 , t to b,  l, tt.
 third lin,  consid, r, d by th.
请按任意键继续. . .
```

实例2：

```cmd
@echo off
rem 首先建立临时文件test.txt
echo ;注释行,这是临时文件,用完删除 >test.txt
echo 11段 12段 13段 14段 15段 16段 >>test.txt
echo    21段,22段,23段,24段,25段,26段 >>test.txt
echo 31段-32段-33段-34段-35段-36段 >>test.txt
FOR /F "eol=; tokens=1,3* delims=,- " %%i in (test.txt) do echo %%i # %%j # %%k
Pause


@echo off
FOR /F "eol= delims=" %%i in (test.txt) do echo %%i
Pause

REM Del test.txt

REM 运行将显示test.txt全部内容，包括注释行，不解释了哈。，/F 通过每个文件的每一行中分开的第一个空白符号。跳过空白行。通过delims=空就是匹配一整行
```

输出结果：

```
11段 # 13段 # 14段 15段 16段
21段 # 23段 # 24段,25段,26段
31段 # 33段 # 34段-35段-36段
请按任意键继续. . .
;注释行,这是临时文件,用完删除
11段 12段 13段 14段 15段 16段
31段-32段-33段-34段-35段-36段
请按任意键继续. . .
```

### 4.3.7. for /F 的 usebackq 选项

usebackq 命令的功能和意义不是很明朗，据说是由机器自动添加进去的，因此它变得可有可无，我们写代码时可无，机器执行时可有。但可以肯定的是，启用该选项时，它会改变“FOR /F“解析文本的功能，集合内原有引号功能失效，因此需要变成新的引号。

#### 4.3.7.1. usebackq 处理有空格的文件名

为了用这种方式来使用双引号，还需要使用 usebackq 选项，否则，双引号会被理解成是用作定义某个要分析的字符串。

实例：演示文件名带有空格时，使用双引号和不使用双引号的区别。

```cmd
@echo off
 
REM 将抛出“系统找不到文件 test”错误
for /F "usebackq" %%a in (test text.txt) do (
    echo %%a
)
 
REM 正确
for /F "usebackq" %%a in ("test text.txt") do (
    echo %%a
)
 
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
系统找不到文件 test。
姓名|年龄|成绩
张三|28|87
李四|32|92
赵六|30|78
```

#### 4.3.7.2. usebackq 处理文本字符串

还可以在 for /F 语句中直接分析字符串，需要使用单引号将 file-set 括起来。这样，该字符串会被当做一个文件中的内容来进行解析。

实例：直接在 file-set 中使用单引号来解析字符串。

```cmd
@echo off
 
REM 解析失败
for /F "usebackq tokens=1-3" %%a in ("张三|28|87") do (
    echo %%a
)
 
REM 解析成功
for /F "usebackq tokens=1-3" %%a in ('张三 28 87') do (
    echo %%a
    echo %%b
    echo %%c
)
 
pause
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
系统找不到文件 张三|28|87。
张三
28
87
请按任意键继续. . .
```

#### 4.3.7.3. usebackq处理 CMD 命令

最后，可以用 FOR /F 命令来分析命令的输出。方法是，将括号之间的 file-set 变成一个反括字符串。该字符串会被当作命令行，传递到一个子 CMD.EXE，其输出会被捕获到内存中，并被当作文件分析。如以下例子所示：

```cmd
@echo off
FOR /F "usebackq delims==" %%i IN (`set`) DO (
    echo %%i
)
pause
```

会枚举当前环境中的环境变量名称。输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
ALLUSERSPROFILE
APPDATA
ChocolateyInstall
ChocolateyLastPathUpdate
CLASSPATH
... 省略 ...
请按任意键继续. . .
```

### 4.3.8. for 变量增强

FOR 变量已被增强。你可以使用下列选项语法去增强 for 变量：

- `%~I`  删除任何引号(")，扩展 `%I`
- `%~fI`  将 %I 扩展到一个完全合格的路径名
- `%~dI`  仅将 `%I` 扩展到一个驱动器号
- `%~pI`  仅将 `%I` 扩展到一个路径
- `%~nI`  仅将 `%I` 扩展到一个文件名
- `%~xI`  仅将 `%I` 扩展到一个文件扩展名
- `%~sI`  扩展的路径只含有短名
- `%~aI`  将 `%I` 扩展到文件的文件属性
- `%~tI`  将 `%I` 扩展到文件的日期/时间
- `%~zI`  将 `%I` 扩展到文件的大小
- `%~$PATH:I`  查找列在路径环境变量的目录，并将 `%I` 扩展到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩展到空字符串

可以组合修饰符来得到多重结果：

- `%~dpI`  仅将 `%I` 扩展到一个驱动器号和路径
- `%~nxI`  仅将 `%I` 扩展到一个文件名和扩展名
- `%~fsI`  仅将 `%I` 扩展到一个带有短名的完整路径名
- `%~dp$PATH:I`  搜索列在路径环境变量的目录，并将 `%I` 扩展到找到的第一个驱动器号和路径
- `%~ftzaI`  将 `%I` 扩展到类似 DIR 的输出行。

实例：获取每个文件的路径，文件名称，文件大小以及文件扩展名。

```cmd
@echo off
FOR %%i IN (*) DO (
    echo PATH=%%~dpi  NAME=%%~nxi  SIZE=%%~zi  EXT=%%~xi
)
pause
```

输出结果：

```

C:\Users\Administrator\Desktop\bat> test.bat
PATH=C:\Users\Administrator\Desktop\bat\  NAME=call.bat  SIZE=0  EXT=.bat  
PATH=C:\Users\Administrator\Desktop\bat\  NAME=for.txt  SIZE=4382  EXT=.txt
PATH=C:\Users\Administrator\Desktop\bat\  NAME=hello.bat  SIZE=25  EXT=.bat
PATH=C:\Users\Administrator\Desktop\bat\  NAME=ping.txt  SIZE=1323  EXT=.txt
PATH=C:\Users\Administrator\Desktop\bat\  NAME=test.bat  SIZE=98  EXT=.bat
PATH=C:\Users\Administrator\Desktop\bat\  NAME=text_content.txt  SIZE=50  EXT=.txt
请按任意键继续. . .
```

# 5. 高级命令

## 5.1. 子程序

在批处理程序中可以调用外部可运行程序，比如：exe程序，也可调用其他批处理程序。但是不够方便，如果被调用的程序很多，就显得不够简明了，很繁琐。

在 Windows 中，批处理可以调用本程序中的一个程序段，相当于子程序，这些子程序一般放在主程序后面。

子程序调用格式：

```cmd
call :label arguments
```

子程序语法：

```cmd
:label
command1
command2
......
commandn
goto :eof
```

### 5.1.1. 子程序参数 %0

在子程序段中，参数 `%0` 指标签 `:label`。实例：

```cmd
@echo off
call :sub 10
goto end
rem 子程序
 
:sub
echo arg0=%0 arg1=%1
goto :eof
 
:end
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
arg0=:sub arg1=10
请按任意键继续. . .
```

### 5.1.2. 子程序放置位置

子程序一般放在最后，并且注意在主程序最后要加上 exit 或跳转语句，避免错误的进入子过程。实例：

```cmd
@echo off
call :sub 10
 
rem 子程序
:sub
echo arg0=%0 arg1=%1
goto :eof
```

输出结果：

```
C:\Users\Administrator\Desktop>test.bat
arg0=:sub arg1=10
arg0=test.bat arg1=
```

上述实例，在主程序后面并没有添加 exit 或者跳转语句，导致子程序被执行了两次。正确的写法如下：

```cmd
@echo off
call :sub 10
goto end
 
rem 子程序
:sub
echo arg0=%0 arg1=%1
goto :eof
 
:end
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
arg0=:sub arg1=10
请按任意键继续. . .
```

### 5.1.3. 子程序的变量 

子程序和主程序中的变量都是全局变量，其作用范围都是整个批处理程序。实例：在子程序中设置了 val 变量，然后在主程序中访问。

```cmd
@echo off
call :sub 10
echo %val%
goto end
 
rem 子程序
:sub
echo sub program
set val=hello sub
goto :eof
 
:end
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
sub program
hello sub
请按任意键继续. . .
```

### 5.1.4. 子程序传参

传至子程序的参数在 call 语句中指定，在子程序中用 %1、%2 至 %9 的形式调用，而子程序返回主程序的数据只需在调用结束后直接引用就可以了，当然也可以指定返回变量。

实例：定义一个子程序，向子程序传递参数。子程序则把传递的参数放入到变量中。

```cmd
@echo off
call :sub return 你好
echo 子程序返回值：%return%
pause
exit
 
:sub
set %1=%2
goto :eof
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
子程序返回值：你好
请按任意键继续. . .
```

上面实例中，“call :sub return 你好” 语句中 call 为关键字；:sub 为子程序名称；return 是一个变量名，将传递给子程序，用来存放参数“你好”；而 “你好” 也是一个参数，同样传递给子程序。上面实例，实际执行如下：

```cmd
@echo off
call :sub
echo 子程序返回值：%return%
pause
exit
 
:sub
set return=你好
goto :eof
```

实例：要求用户输入一个大于1的数字，然后使用子程序计算 1,2,3,4,.....n 的总和，其中：n为用户输入的数字。如下：

```cmd
@echo off
set sum=0
set count=1
set /p maxValue=输入一个数字：
 
rem 调用子程序
call :sub sum %maxValue%
echo 数据求和结果：%sum%
pause
exit
 
rem 子程序
:sub
set /a %1=%1+%count%
if %count% lss %2 (
    set /a count=%count%+1
    goto sub
)
goto :eof
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
输入一个数字：5
数据求和结果：21
请按任意键继续. . .
```

## 5.2. call 命令

call 是一个功能强大的命令，它不但可在批处理程序中调用另一个批处理程序，而且还可调用指定标号处后面的所有命令（也可以称为子程序）。语法如下：

```CMD
CALL [drive:][path]filename [batch-parameters]
```

参数说明：

- **[Drive:]**  指定被调用批处理文件的盘符
- **[Path]**  指定被调用批处理文件路径
- **FileName** 指定被调用的批处理文件名，当被调用的批处理文件与正在执行的批处理文件都处于同一目录下时，可以省略盘符及路径；
- **batch-parameters**  指定批处理程序所需的命令行参数信息；
- **/?** 在命令提示符显示帮助；

实例：创建两个批处理文件，分别为 test.bat 和 sub.bat。在 test.bat 中调用 sub.bat，不传递任何参数信息。

（1）test.bat 文件内容：

```CMD
@echo off
echo test.bat
call sub.bat
call C:\Users\Administrator\Desktop\sub.bat
pause
```

（2）sub.bat 文件内容：

```CMD
@echo off
echo sub.bat
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
test.bat
sub.bat
sub.bat
请按任意键继续. . .
```

实例：创建两个批处理文件，分别为 test.bat 和 sub.bat。在 test.bat 中调用 sub.bat，传递参数信息。

（1）test.bat 文件内容：

```CMD
@echo off
echo test.bat
call sub.bat arg1 arg1
call C:\Users\Administrator\Desktop\sub.bat arg1 arg1
pause
```

（2）sub.bat 文件内容：

```CMD
@echo off
echo sub.bat
echo 第一个参数：%1
echo 第二个参数：%2
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
test.bat
sub.bat
第一个参数：arg1
第二个参数：arg1
sub.bat
第一个参数：arg1
第二个参数：arg1
请按任意键继续. . .
```

### 5.2.1. CALL 语句扩展

如果命令扩展被启用，CALL 会如下改变，CALL 命令可以调用指定标签后面的语句（即调用子程序）。语法是：

参数说明：

- **:label** 用于指定调用位置的标签，与goto语句中使用的标签类似；
- **arguments** 对于以 :label 开头的批处理程序（或子程序），指定要传送给其新实例的命令行信息，包括命令行选项、文件名、批处理参数或者变量；
- **/?** 在命令提示符显示帮助；

实例：在批处理脚本中创建 :sub 标签，然后使用 call :sub 调用该标签。

```CMD
@echo off
echo test.bat
call :sub
goto end
 
:sub
echo sub label
goto :eof
:end
 
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
test.bat
sub label
请按任意键继续. . .
```

实例：在批处理脚本中创建 :sub 标签，然后使用 call :sub arg1 arg2 调用该标签， 并且指定参数。

```CMD
@echo off
echo test.bat
call :sub arg1 arg2
goto end
 
:sub
echo sub label
echo 第一个参数：%1
echo 第二个参数：%2
goto :eof
:end
 
pause
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
test.bat
sub label
第一个参数：arg1
第二个参数：arg2
请按任意键继续. . .
```

### 5.2.2. CALL 参数扩展

另外，批脚本文本参数（%0、%1、等等）已如下改变：

（1）批脚本里的 %* 指出所有的参数(如 %1 %2 %3 %4 %5 ...)，实例：

test.bat 文件内容：

```CMD
@echo off
echo test.bat
call sub.bat arg1 arg2
pause
```

sub.bat 文件内容：

```CMD
@echo off
echo sub.bat
echo 参数：%*
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
test.bat
sub.bat
参数：arg1 arg2
请按任意键继续. . .
```

2）批处理参数（%n）已被增强。您可以使用以下语法：

- %~1  删除引号(")，扩展 %1
- %~f1  将 %1 扩展到一个完全合格的路径名
- %~d1  仅将 %1 扩展到一个驱动器号
- %~p1  仅将 %1 扩展到一个路径
- %~n1  仅将 %1 扩展到一个文件名
- %~x1  仅将 %1 扩展到一个文件扩展名
- %~s1  扩展的路径只含有短名
- %~a1  将 %1 扩展到文件属性
- %~t1  将 %1 扩展到文件的日期/时间
- %~z1  将 %1 扩展到文件的大小
- %~$PATH:1  查找列在 PATH 环境变量的目录，并将 %1 扩展到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此修改符会扩展到空字符串

可以将增强符组合起来，可取得多重结果：

- %~dp1  只将 %1 扩展到驱动器号和路径
- %~nx1  只将 %1 扩展到文件名和扩展名
- %~dp$PATH:1  在列在 PATH 环境变量中的目录里查找 %1，并扩展到找到的第一个文件的驱动器号和路径。
- %~ftza1  将 %1 扩展到类似 DIR 的输出行。

在上面的例子中，%1 和 PATH 可以被其他有效数值替换。%~ 语法被一个有效参数号码终止。%~ 修定符不能跟 %* 使用。

实例：生成一个临时文件 tmp.txt，先将目录 C:\windows 设置为当前目录，调用子程序进行参数扩展；然后再恢复当前目录，调用子程序；观察参数扩展结果。

```CMD
@echo off
echo 产生一个临时文件 > tmp.txt
 
REM 下行先保存当前目录，再将 c:\windows 设为当前目录
pushd c:\windows
call :sub tmp.txt
 
REM 下行恢复前次的当前目录
popd
call :sub tmp.txt
pause
 
del tmp.txt
exit
 
:sub
echo 删除引号： %~1
echo 扩充到路径： %~f1
echo 扩充到一个驱动器号： %~d1
echo 扩充到一个路径： %~p1 
echo 扩充到一个文件名： %~n1
echo 扩充到一个文件扩展名： %~x1
echo 扩充的路径指含有短名： %~s1 
echo 扩充到文件属性： %~a1 
echo 扩充到文件的日期/时间： %~t1 
echo 扩充到文件的大小： %~z1 
echo 扩展到驱动器号和路径：%~dp1
echo 扩展到文件名和扩展名：%~nx1
echo 扩展到类似 DIR 的输出行：%~ftza1
echo.
 
goto :eof
```

输出结果：

```
C:\Users\Administrator\Desktop> test.bat
删除引号： tmp.txt
扩充到路径： c:\Windows\tmp.txt
扩充到一个驱动器号： c:
扩充到一个路径： \Windows\
扩充到一个文件名： tmp
扩充到一个文件扩展名： .txt
扩充的路径指含有短名： c:\Windows\tmp.txt
扩充到文件属性：
扩充到文件的日期/时间：
扩充到文件的大小：
扩展到驱动器号和路径：c:\Windows\
扩展到文件名和扩展名：tmp.txt
扩展到类似 DIR 的输出行：c:\Windows\tmp.txt
 
删除引号： tmp.txt
扩充到路径： C:\Users\Administrator\Desktop\tmp.txt
扩充到一个驱动器号： C:
扩充到一个路径： \Users\Administrator\Desktop\
扩充到一个文件名： tmp
扩充到一个文件扩展名： .txt
扩充的路径指含有短名： C:\Users\ADMINI~1\Desktop\tmp.txt
扩充到文件属性： --a------
扩充到文件的日期/时间： 2020/06/16 13:21
扩充到文件的大小： 19
扩展到驱动器号和路径：C:\Users\Administrator\Desktop\
扩展到文件名和扩展名：tmp.txt
扩展到类似 DIR 的输出行：--a------ 2020/06/16 13:21 19 C:\Users\Administrator\Desktop\tmp.txt
 
请按任意键继续. . .
```

## 5.3. start 命令

start 命令用来启动一个单独的窗口来运行指定的程序（如：exe 文件）或命令（如：批处理脚本 *.bat）。

在使用 start 之前，先使用 start /? 命令查看 start 的手册信息：

```cmd
START ["title"] [/D path] [/I] [/MIN] [/MAX] [/SEPARATE | /SHARED]
      [/LOW | /NORMAL | /HIGH | /REALTIME | /ABOVENORMAL | /BELOWNORMAL]
      [/NODE <NUMA node>] [/AFFINITY <hex affinity mask>] [/WAIT] [/B]
      [command/program] [parameters]
```

参数描述：

- "title"  在窗口标题栏中显示的标题。
- path  启动目录。
- B  启动应用程序，但不创建新窗口。应用程序已忽略 ^C 处理。除非应用程序启用 ^C 处理，否则 ^Break 是唯一可以中断该应用程序的方式。
- I  新的环境将是传递给 cmd.exe 的原始环境，而不是当前环境。
- MIN  以最小化方式启动窗口。
- MAX  以最大化方式启动窗口。
- SEPARATE  在单独的内存空间中启动 16 位 Windows 程序。
- SHARED  在共享内存空间中启动 16 位 Windows 程序。
- LOW  在 IDLE 优先级类中启动应用程序。
- NORMAL  在 NORMAL 优先级类中启动应用程序。
- HIGH  在 HIGH 优先级类中启动应用程序。
- REALTIME  在 REALTIME 优先级类中启动应用程序。
- ABOVENORMAL  在 ABOVENORMAL 优先级类中启动应用程序。
- BELOWNORMAL  在 BELOWNORMAL 优先级类中启动应用程序。
- NODE  将首选非一致性内存结构 (NUMA) 节点指定为十进制整数。
- AFFINITY  将处理器关联掩码指定为十六进制数字。进程被限制在这些处理器上运行。当 /AFFINITY 和 /NODE 结合时，会对关联掩码进行不同的解释。指定关联掩码，正如 NUMA 节点的处理器掩码正确移动到零位起始位置一样。进程被限制在指定关联掩码和 NUMA 节点之间的那些通用处理器上运行。如果没有通用处理器，则进程被限制在指定的 NUMA 节点上运行。
- WAIT  启动应用程序并等待它终止。
- command/program  如果它是内部 cmd 命令或批文件，则该命令处理器是使用 cmd.exe 的 /K 开关运行的。这表示运行该命令之后，该窗口将仍然存在。如果它不是内部 cmd 命令或批文件，则它就是一个程序，并将作为一个窗口化应用程序或控制台应用程序运行。
- parameters 这些是传递给 command/program 的参数。

> 注意：在 64 位平台上不支持 SEPARATE 和 SHARED 选项。

实例：以最小化和最大化方式启动记事本 notepad.exe 程序。

```cmd
@echo off
rem 最小化启动记事本，在任务栏可以看见
start /MIN notepad.exe
rem 最大化启动记事本，当于我们点击了最大化按钮
start /MAX notepad.exe
```

实例：本例使用 /WAIT 实现启动记事本应用程序，并且等待关闭记事本后才结束主批处理脚本。

```cmd
@echo off
echo 启动记事本程序
start /WAIT notepad.exe
echo 记事本程序关闭了...
```

实例：使用 start 命令启动一个子脚本，并且设置脚本的 title 为 “Sub Title”。

```cmd
@echo off
start "Sub Title" sub.bat
```

实例：运行 start+文件的绝对存储路径打开对应的文件；

```cmd
@echo off
start D:\tmp.txt
```

当然我们也可以使用 “start 目录地址” 打开资源管理器，或者使用 “start 网站URL” 通过默认浏览器打开指定的 URL。

## 5.4. pushd 和 popd 命令

pushd 和 popd 这两个命令一般都是同时使用，下面将分别对这两命令进行介绍。

### 5.4.1. pushd 命令

将当前目录的路径保存下来，并且切换到你指定的新目录路径。语法：

```cmd
PUSHD [path | ..]
```

参数说明：

- path  指定你要切换的目标目录路径

如果命令扩展被启用，除了一般驱动器号和路径，PUSHD 命令还接受网络路径。如果指定了网络路径，PUSHD 将创建一个指向指定网络资源的临时驱动器号，然后再用刚定义的驱动器号（前面创建的临时驱动器号）更改当前的驱动器和目录。可以从 Z: 往下分配临时驱动器号，使用找到的第一个没有用过的驱动器号。更多信息可以使用 pushd /? 查看

实例：通过 DOS 窗口输入 pushd 命令切换到 D 盘；然后使用 popd 命令，恢复到原来的目录。

```cmd
C:\Users\Administrator>pushd D:\
D:\>popd
C:\Users\Administrator>
```

### 5.4.2. popd 命令

该命令用来将当前目录切换到 pushd 命令存储的目录路径。语法：

```cmd
POPD
```

如果命令扩展被启用，从 PUSHD 目录堆栈 POPD 驱动器时，POPD 命令会删除 PUSHD 创建的临时驱动器号。更多信息可以使用 popd /? 查看

实例：使用 pushd 切换到 D:\ 盘，然后再次使用 popd 命令切换到执行 pushd 之前的目录。

```cmd
@echo off
echo %cd%
pushd "D:\"
echo %cd%
popd
echo %cd%
```

输出结果：

```
C:\Users\Administrator\Desktop\bat> test.bat
C:\Users\Administrator\Desktop\bat
D:\
C:\Users\Administrator\Desktop\bat
```


# 6. 批处理实例

## 6.1. 解压缩

可以将 WinRAR.exe Rar.exe UnRAR.exe 移到 C:\Windows目录，就可以运行相关解压缩命令。更多拓展参数运行 `unrar.exe /?`查看。

例子如下：

```cmd
winrar x %cd%\tt.zip *.txt

unrar e 压缩文件路径\名称 解压后路径
```

## 6.2. 完整项目实际案例【必看】

自动发版工具。

### 6.2.1. 主bat（负责定义公共变量和代码）：

```cmd
@echo off

:: 公共参数设置 start
cd %cd%
:: 跳转到上级目录
cd ../
:: 自动发版工具所在地址
set autoDeployPath=%cd%
::-------------------------该地址需要手动修改为本机项目打包后的地址-------------------------
::本机项目打包后的地址
set sourcePath=xxx\upload
::本机项目所在磁盘
set sourceDisk=D:
::-------------------------该地址需要手动修改为本机项目打包后的地址-------------------------
:: 公共参数设置 end

:: uat项目部署所在地址
set uatPath=%autoDeployPath%\resource\uat
set livePath=%autoDeployPath%\resource\live
set otePath=%autoDeployPath%\resource\ote
:: 公共参数设置 end
:: 先删除旧的项目包 live、uat、ote全部清空
echo ----清空uat文件夹----
echo y|del %uatPath%\*.*
echo ----清空live文件夹----
echo y|del %livePath%\*.*
echo ----清空ote文件夹----
echo y|del %otePath%\*.*

::清屏操作
cls
echo 文件部署工具根目录：%autoDeployPath%
cd %autoDeployPath%\bat-test
goto start
:start
    echo --------------------------------------------------
    echo --                  uat部署                     --
    echo --  1.www                                       --
    echo --  2.admin                                     --
    echo --  3.static                                    --
    echo --  4.all(该选项操作完成后会自动部署)             --
    echo --  5.deploy(需要先执行1或者2或者3)               --
    echo --  6.END                                       --
    echo --------------------------------------------------
    ECHO.
    echo (请输入数字选择操作命令)
    set /p ans=                   
    if %ans%==1 goto www
    if %ans%==2 goto admin
    if %ans%==3 goto static
    if %ans%==4 goto all
    if %ans%==5 goto deploy
    if %ans%==6 goto END
:www
    ECHO.
    echo ----执行www项目解压操作----
    :: 执行的逻辑命令--为bat文件传参
    start wwww.bat %uatPath% %sourcePath% %sourceDisk%
    echo ----www项目解压操作完成----
    goto start
:admin
    ECHO.
    echo ----执行admin项目解压操作----
    :: 执行的逻辑命令--为bat文件传参
    start admin.bat %uatPath% %sourcePath% %sourceDisk%
    echo ----admin项目解压操作完成----
    goto start
:static
    ECHO.
    echo ----执行static项目解压操作----
    :: 执行的逻辑命令--为bat文件传参
    start static.bat %uatPath% %sourcePath% %sourceDisk%
    echo ----static项目解压操作完成----
    goto start
:all
    ECHO.
    echo ----www、admin、static项目解压操作----
    :: 执行的逻辑命令--为bat文件传参
    start all.bat %uatPath% %sourcePath% %sourceDisk% %autoDeployPath%
    echo ----项目解压操作完成----
    exit
:deploy
    ECHO.
    echo ----执行部署任务----
    :: 执行的逻辑命令--为bat文件传参
    start deploy.bat %autoDeployPath%
    echo ----部署完成----
    goto END
:END
    ECHO.
    echo 退出批处理操作
pause
```

### 6.2.2. 子文件（负责处理单个项目）：

```cmd
@echo off
:: 项目部署所在地址
set sysPath=%1
:: 项目打包后的地址
set sourcePath=%2
::本机项目所在磁盘
set sourceDisk=%3
:: 解压的路径
set unRarSourcePath=%sourcePath%\xxx

:: 进入项目zip所在的盘符根路径D盘
%sourceDisk%
:: 进入项目zip所在的文件夹
cd %sourcePath%

:: 复制文件到部署项目文件夹中
::copy xxx.zip %sysPath%

:: 解压文件 winrar命令要比单纯的rar或者unrar命令高级的多
winrar x xxx.zip * xxx\
:: 进入解压后字体所在文件夹
cd %unRarSourcePath%\WEB-INF\classes\resource\fonts
:: 删除文件夹下的所有文件
echo y|del *.*
:: 返回classes目录
cd %unRarSourcePath%\WEB-INF\classes
:: 删除resource文件夹
rd/s/q resource
:: 进入解压后的项目文件夹
cd %unRarSourcePath%
:: 将该文件夹下的所有内容从新打包 rar的压缩命令即使压缩为.zip但事实上还是以rar格式为基础的，可以通过比较文件大小确定
:: rar a -r xxx.zip *
winrar a -r xxx.zip *
:: 移动文件到部署项目文件夹中
move xxx.zip %sysPath%
cd %sourcePath%
:: 删除原解压的文件夹
rd/s/q xxx

exit
```

## 6.3. 例子-网上项目

我这里有个别人帮我的cmd批处理代码，就是他用的调用的fciv不能支持中文字符，可惜了，下面复制上去，给大家参考，不只是帮我，也帮大家自己了，说不定以后大家自己也要用呢：

```cmd
@echo off & title 批量分析MD5、SHA1、CRC32信息

setlocal enabledelayedexpansion

cd /d %~dp0

:Input

cls

echo 提醒：由于 fciv 不支持中文字符，请不要分析带中文字符的路径和文件。 & echo,

set /p Dir=请输入要分析的目录，回车确认：

 

if not defined Dir (

    set ErrorMsg=您尚未输入路径

    goto ErrorMsg

)

if not exist "%Dir%" (

    set ErrorMsg=您输入的路径不存在

    goto ErrorMsg

)

del /f /q Tools\tmp.log "%Dir%\Analysis_Result.log" >nul 2>nul

for /r "%Dir%" %%a in (*) do (

    call :Analyze md5 "%%~a"

    call :Analyze sha1 "%%~a"

    call :Analyze crc32 "%%~a"

    (echo %%~a md5:!md5!   sha1:!sha1! crc32:!crc32!)>>Tools\tmp.log

    set "md5=" & set "sha1=" & set "crc32="

)

echo 分析结果日志文件 “Analysis_Result.log”已保存至“%Dir%”目录中。

copy Tools\tmp.log "%Dir%\Analysis_Result.log" >nul

del /f /q Tools\crc32.tmp Tools\tmp.log >nul 2>nul

pause

exit

:Analyze

if "%~1"=="crc32" (

    Tools\crc32.exe "%~2">Tools\crc32.tmp

    for /f "skip=4 delims=" %%i in (Tools\crc32.tmp) do (

        set "str=%%~i"

        set "str=!str:CRC of file %~2 =!"

        for /f "tokens=4 delims= " %%j in ('echo !str!') do set %~1=%%~j

        del /f /q Tools\crc32.tmp >nul 2>nul

        goto :eof

   )

)

for /f "skip=3 delims= " %%i in ('Tools\fciv.exe -%~1 "%~2"') do set %~1=%%~i

goto :eof

 

:ErrorMsg

cls & echo %ErrorMsg%，请重新输入。

ping 127.0.0.1 -n "2">nul

set "Dir=" & goto Input
```

## 6.4. 例子-批量删除

在del命令中，文件夹不能用通配符。

如果说extensions这个文件仅存在于类似intdu36g.default这样的目录里面，那么可以写成如下代码：

```cmd
del /s /q "%AppData%\Thunderbird\Profiles\extensions"
```

但如果说在其它不是类似于intdu36g.default这样的目录里面也有extensions文件，但不需要删除的，那么就用下面那个代码：

```cmd
cd /d "%AppData%\Thunderbird\Profiles"
for /d %%a in (*.default) do del "%%a\extensions"
```

例子-进程目录

```cmd
@echo off
set "task=qq.exe"
echo 开始查询进程是否存在
tasklist|find /i "%task%">nul
if %errorlevel% equ 0 (
for /f "eol= delims== tokens=2" %%i in ('wmic process where "name='%task%'" get executablepath /value') do (
echo 您查找的进程 %task% 的路径是:%%~dpi
set path=%%~dpi
)
)
pause
```

## 6.5. 实例-for 的使用

for 的用法

```cmd
for /d %%i in (.\APP\*) do echo %%~ni 

for /r ".\APP" %%i in (*) do echo "%%i"

for /r ".\APP" %%i in (*) do if not defined %%~nxi+1 set %%~nxi+1=1 &echo %%~nxi+1 # 没有意义，只是看看用法
```

### 6.5.1. 批量修改文件名

```cmd
::::::::批量改文件名.bat::::::::
@echo off
setlocal EnableDelayedExpansion

set /p zpath=请输入目标文件所在的路径：
set /p prefix=请输入文件名前缀(不能包含以下字符\/:*?"<>|)：
set /p ext=请输入文件的扩展名(例如 .txt)：
set /a num=1

for %%i in (%zpath%\*%ext%) do (
ren "%%i" "%prefix%!num!.%ext%"
set /a num+=1
)
```

## 6.6. 批处理读取文件内容

实例1：将 tmp.txt 文本文件的内容读取到 value 变量中。

（1）先在当前脚本的目录下面创建 tmp.txt 文件，内容如下：

```
Hello Bat
 
你好 Bat
```

（2）编写脚本内容，如下：

```cmd
@echo off
rem 将 tmp.txt 文件内容存入 value 变量
set /p value=<./tmp.txt
echo %value%
pause
```

上面脚本将 tmp.txt 文件内容保存到 value 变量，然后再将变量内容打印到控制台。

实例2：逐行读取文件内容

（1）在 tmp.txt 文本文件中写入数据。内容如下：

```
zhangsan,28
lisi,33,chengdu
wangwu,34,unknown
```

（2）下面批处理程序将逐行读取文本文件内容，然后每行采用逗号分隔，将处理后的内容存入变量。代码如下：

```cmd
@echo off
setlocal enabledelayedexpansion
for /f "tokens=1-3 delims=," %%i in (tmp2.txt) do (
    set name=%%i
    set age=%%j
    set address=%%k
    echo 姓名=!name!   年龄=!age!   家住地址=!address!
)
pause
```

运行结果如下：

```
姓名=zhangsan   年龄=28   家住地址=
姓名=lisi   年龄=33   家住地址=chengdu
姓名=wangwu   年龄=34   家住地址=unknown
请按任意键继续. . .
```
## 6.7. 如何批处理一次性移到多个文件夹里文件到上一级文件夹中
几百个文件夹，里面全是TXT文本文件，
```
f:\bak1\asp\1.txt 2.txt 3.txt 4.txt
f:\bak2\asp\1.txt 2.txt 3.txt 4.txt
f:\bak3\asp\1.txt 2.txt 3.txt 4.txt
..................
```

怎样一次性把.txt移到上一级目录
如：
```
f:\bak1\1.txt 2.txt 3.txt 4.txt
f:\bak2\1.txt 2.txt 3.txt 4.txt
f:\bak3\1.txt 2.txt 3.txt 4.txt
```

代码如下
```cmd
@echo off
pushd f:\
for /d %%i in (bak*) do (
pushd "%%i"
move /y asp\*
popd)
```

## 6.8. 批处理调用MySql执行SQL脚本

**背景**

假如你现在正在开发一个系统，而系统版本迭代很快。每个版本都有对应的数据库SQL脚本，而我们将每个版本的数据库脚本使用名为“版本-日期.sql”的文件进行保存。当我们版本变多时，sql文件也就将变多。

```
1.0.0-20200224.sql
1.1.2-20200224.sql
1.2.0-20200224.sql
run.bat
version.txt
```

上图中，1.0.0-*.sql ~ 1.2.0-*.sql 为每个版本的数据库 SQL 脚本。version.txt 文件中保存当前软件数据库版本；run.bat 保存批处理脚本；

**需求**

每次初始化/更新数据库时我们只需要执行 run.bat 脚本，然后根据 version.txt 中保存的当前软件版本信息，动态选择需要执行那些 sql。例如：当前版本为 1.1.2，当我们执行 run.bat 时，将数据库从 1.1.2 版本升级到最新版本（即 1.2.0）；

**实现**

run.bat 脚本内容如下：

```cmd
@echo off
if "%OS%" == "Windows_NT" setlocal enabledelayedexpansion
set "CURRENT_DIR=%cd%"
 
rem 数据库名称
set dbName=test
rem 数据库用户名
set dbUsername=root
rem 数据库密码
set dbPassword=XM_zm2019
 
rem 进入到批处理文件所在的目录
cd /d %~dp0
if not "%MYSQL_HOME%" == "" goto gotHome
rem 如果没有定义 MYSQL_HOME 环境变量，则将当前目录设置为 MySQL 主目录
set "MYSQL_HOME=%CURRENT_DIR%"
rem 判断 mysql.exe 和 mysqldump.exe 是否存在
if exist %MYSQL_HOME%\bin\mysql.exe (
    if exist %MYSQL_HOME%\bin\mysqldump.exe goto okExec
)
rem 如果还是没有找到 mysql.exe 和 mysqldump.exe
rem 则将 MYSQL_HOME 设置为默认目录 D:\mysql-5.7.24-winx64
set "MYSQL_HOME=D:\mysql-5.7.24-winx64"
 
:gotHome
rem 判断 mysql.exe 和 mysqldump.exe 是否存在
if exist %MYSQL_HOME%\bin\mysql.exe (
    if exist %MYSQL_HOME%\bin\mysqldump.exe goto okExec
)
echo mysql.exe 和 mysqldump.exe 不存在
goto END
 
:okExec
set "exe_mysql=%MYSQL_HOME%\bin\mysql.exe"
set "exe_mysqldump=%MYSQL_HOME%\bin\mysqldump.exe"
 
echo exe_mysql        %exe_mysql%
echo exe_mysqldump    %exe_mysqldump%
 
rem 检查 MySql 服务是否启动，如果没有启动直接退出
tasklist /NH | findstr /i "mysqld.exe" > nul && goto okScript
echo 检测到 MySql 服务未启动，请先启动 MySql 服务
goto END
 
:okScript
rem 提示用户是否备份
cd /d %~dp0
set /p is_bk=是否备份数据库(Y/N)：
if "%is_bk%"=="Y" goto okBackup
if "%is_bk%"=="y" goto okBackup
goto oKImport
 
:okBackup
echo 数据库备份开始......
set last_script_name=%date:~0,10%
if not exist %cd%\db_bak (
    mkdir %cd%\db_bak
)
%exe_mysqldump% -u%dbUsername% -p%dbPassword% -R test > "%cd%\db_bak\bk_%last_script_name:/=-%_%time:~0,2%%time:~3,2%%time:~6,2%.sql"
if not "%errorlevel%"=="0" (
    echo ERROR: 备份数据库失败, CODE=%errorlevel%
    goto END
)
echo 脚本备份完成，文件：bk_%last_script_name:/=-%.sql
 
rem 开始导入数据库脚本
:oKImport
set /p version=<version.txt
if "%version%" equ "" (
    set version=0.0.0
    set continueInfo=全新安装数据库脚本
    goto continueConfirm
)
set continueInfo=从%version%版本升级到最新版数据库脚本
 
:continueConfirm
set /p continueFlag=%continueInfo%。确定要继续吗(Y/N)：
if "%continueFlag%" equ "Y" goto startRun
if "%continueFlag%" equ "y" goto startRun
echo 不进行数据库脚本升级
goto END
 
:startRun
set currentVersion=%version:.=%
echo mysql脚本初始化开始......
for %%i in (*.sql) do (
    set "fileName=%%i"
    set "filePrefix=!fileName:.=!"
    set "prefixNum=!filePrefix:~0,3!"
    if !prefixNum! gtr %currentVersion% (
        echo 初始化脚本 -------- %%i
        %exe_mysql% -u%dbUsername% -p%dbPassword% < %%i
    )
)
echo mysql脚本初始化结束，时间：%date:~0,4%-%date:~5,2%-%date:~8,2% %time:~0,2%:%time:~3,2%:%time:~6,2%
 
:END
pause
```

**运行**

（1）将 version.txt 文件的内容清空，然后执行 run.bat 脚本。运行结果省略。

（2）将 version.txt 文件的内容设置为 1.1.2，然后执行 run.bat 脚本。运行结果省略。

## 6.9. 获取上级目录

```cmd
@echo off
 
set CurrentPath=%~dp0
set P1Path=
set P2Path=
set P3Path=
set P4Path=
set P5Path=
 
:begin
for /f "tokens=1,* delims=\" %%i in ("%CurrentPath%") do (set content=%%i&&set CurrentPath=%%j)
REM echo %content% -- %CurrentPath%
if "%P1Path%%content%\" == "%~dp0" goto end
REM echo =======

set P5Path=%P4Path%
set P4Path=%P3Path%
set P3Path=%P2Path%
set P2Path=%P1Path%
set P1Path=%P1Path%%content%\
 
goto begin
 
 
:end
echo BatPath=%~dp0
echo P1Path=%P1Path%
echo P2Path=%P2Path%
echo P3Path=%P3Path%
echo P4Path=%P4Path%
echo P5Path=%P5Path%
 
pause
```
## 6.10. 例子-杂类

### 6.10.1. 查找进程

```cmd
tasklist|find /i "qq"
```

### 6.10.2. 清空文件内容

```cmd
echo''>test.txt
cd. > test.txt
cls > test.txt :::这个会有问题
cat /dev/null >%file% ::: linux
```
### 6.10.3. 如何用CMD复制文件并给重复文件加序号

```
一个备份存档的命令
copy E:\SOFT\Steam\userdata\108090219\582010\remote\SAVEDATA1000 D:\backup
如在复制过程中 不覆盖已有文件 并给新文件加序号 或者加日期时间
自己找到的方法
@echo off
set n=1
for /f %%a in ('dir /b SAVEDATA1000%date:~5,2%.%date:~8,2%-* 2^>nul ^|find /v /c ""') do (
set /a n+=%%a
)
set name=SAVEDATA1000%date:~5,2%.%date:~8,2%-%n%
copy /y SAVEDATA1000 %name%
放在要备份文件的目录下即可 谁能改良一下 把输出目录改为D:\backup
```

**实现**

```
@echo off
setlocal enabledelayedexpansion
if not exist d:\123 md d:\123
pushd c:\123
for /f "tokens=*" %%i in ('dir/s/b') do (
if exist "d:\123\%%~nxi" (
for /f %%j in ('dir/b "d:\123\%%~ni*%%~xi"^|find /c /v ".*"') do set /a n=%%j + 1
copy "%%i" "d:\123\%%~ni!n!%%~xi") else copy "%%i" d:\123)
表示把c:\123\文件夹下所有文件复制到d:\123\文件夹下，如果有重名文件，则自动加上（1）进行区分。比如：(1)项目通知书.jpg和项目通知书.jpg。
```

### 6.10.4. 将当前目录/文件夹里的文件以递增数字序号重命名 `dir /a-d/b`

```cmd
@echo off
setlocal
set Folder=E:\手机删除APP
cd /d "%Folder%"
for /f "delims=" %%a in ('dir /a-d/b') do (
set /a N+=1
echo "%%~sa" "%%N%%.txt"
)
endlocal
pause
```

```cmd
@echo off
rem 将当前目录/文件夹里的文件以递增数字序号重命名
set #=Any question&set @=WX&set $=Q&set/az=0x53b7e0b4
title %#% +%$%%$%/%@% %z%
cd /d "%~dp0"
for /f "delims=" %%a in ('dir /a-d/b') do (
    if "%%~nxa" neq "%~nx0" (
        set /a n+=1
        set "file=%%a"
        setlocal enabledelayedexpansion
        echo;"!file!" --^> "!n!%%~xa"
        ren "!file!" "!n!%%~xa"
        endlocal
    )
)
echo;%#% +%$%%$%/%@% %z%
pause
exit
```

# 7. 参考

1. [CMD/Linux/Powershell命令大全](https://ss64.com/nt/) 【推荐】
2. [Windows 批处理脚本学习教程](http://docs.30c.org/dosbat/index.html)【推荐】
3. [【纯干货】小白都能看懂的windows常用bat批处理命令(附代码参考)](https://www.imooc.com/article/8283)【推荐】
4. [Bat 批处理教程](https://www.hxstrive.com/subject/windows_bat.htm?id=111) 【推荐】
5. [BAT批处理基本命令总结](https://zhuanlan.zhihu.com/p/54572985)
6. [bat 批处理教程](https://www.w3cschool.cn/dosmlxxsc1/wvqyr9.html)
7. [批处理中常用命令介绍(Echo、rem、goto、call、pause、if、for)](https://www.jb51.net/article/50384.htm)
8. [Windows batch files: .bat vs .cmd?](https://stackoverflow.com/questions/148968/windows-batch-files-bat-vs-cmd)
9. [批处理如何获取进程所在目录,不是文件路径](https://zhidao.baidu.com/question/101225361.html)
10. [批处理中setlocal enabledelayedexpansion的作用详细整理](https://www.jb51.net/article/29323.htm)
11. [<转>批处理中几个动态环境变量](https://blog.csdn.net/lwhoami/article/details/83136047)
12. [DOS批处理高级教程 第二章 DOS循环for命令详解](https://www.jb51.net/article/93273.htm)
