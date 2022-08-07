# Windows <!-- omit in toc -->

# windows store安装

```
在打开的“管理员：Windows Powershell”窗口中输入以下命令：
get-appxpackage *store* | remove-Appxpackage
再次安装：
add-appxpackage -register "C:\Program Files\WindowsApps\*Store*\AppxManifest.xml" -disabledevelopmentmode
```

# 注册表清理

卸载程序注册表残留
win+r 输入 regedit，然后 ctrl+f 搜 navicat，把所有关于 navicat 的东西全部删除

# navicat 

下载地址

http://download.navicat.com.cn/download/navicat150_premium_cs_x64.exe

# MySQL 安装配置

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

This is a release of MySQL, an SQL database server.

License information can be found in the LICENSE file.

This distribution may include materials developed by third parties.
For license and attribution notices for these materials,
please refer to the LICENSE file.

For further information on MySQL or additional documentation, visit
  http://dev.mysql.com/doc/

For additional downloads and the source of MySQL, visit
  http://dev.mysql.com/downloads/

MySQL is brought to you by the MySQL team at Oracle.

mysql8 安装教程

文档
https://blog.csdn.net/u010164507/article/details/114777036

https://dev.mysql.com/doc/refman/8.0/en/windows-install-archive.html

------------------------------------

1.设置环境变量

```
MYSQL_HOME
C:\mysql-5.7.37-winx64

Path
%MYSQL_HOME%\bin
```

2.添加my.ini文件 （Microsoft Windows 路径名在选项文件中使用（正向）斜杠而不是反斜杠指定。如果您确实使用反斜杠，请将它们加倍“`\\`”）

```
[mysql]
 
# 设置mysql客户端默认字符集
default-character-set=utf8 
 
[mysqld]
 
#设置3306端口
port = 3306 
 
# 设置mysql的安装目录
basedir=D:\Program Files\mysql
 
# 设置mysql数据库的数据的存放目录
datadir=D:\Program Files\mysql\data
 
# 允许最大连接数
max_connections=200
 
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
 
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

------------------------------------

3.初始化安装

切换到bin目录

#初始化安装

```
mysqld --initialize --console
```

#安装mysql服务（服务名可以自定义，也可以省略）

```
mysqld --install [服务名]
```

#启动mysql服务

```
net start mysql
```

4.修改密码

#登录
```
mysql -u root -p
```

#修改密码

```
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

#刷新权限，使新密码生效
`flush privileges;`


------------------------------------

mysql5 安装教程

文档

https://blog.csdn.net/Recky_wiers/article/details/79243804

https://dev.mysql.com/doc/refman/5.7/en/windows-install-archive.html

```
[mysqld]
port = 3306
basedir=C:/mysql-5.7.32-winx64
datadir=C:/mysql-5.7.32-winx64/data 
max_connections=200
character-set-server=utf8
default-storage-engine=INNODB
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
[mysql]
default-character-set=utf8
```

切换到bin目录

```
mysqld -install
mysqld --initialize-insecure --user=mysql
net start mysql
```

最后一步设置密码，
先登录 `mysql -u root -p`，需要输入密码时直接回车（一开始没有密码），
然后 `set password=password('123456');`
密码设置成功。

# PowerShell 脚本执行策略

https://lightless.me/archives/powershell-executtion-policies.html
