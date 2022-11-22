# DNS <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-14 23:55:25
> LastEditTime: 2022-11-14 23:59:02
> Description: NO Desc

## 1. 正文

DNS（Domain Name System，域名系统），最初，由于 IP 地址长且难记，通过 IP 访问网站不方便。

所以后来通过发明了 DNS 服务器，这个时候我们访问网站输入网站域名，DNS 服务器就解析我们的域名为 IP。

1. 查询 `www.baidu.com`
2. 访问客户端 DNS 缓存：**浏览器缓存** -> **系统缓存（host）** -> **路由器缓存**
3. 访问 **ISP DNS 服务器**（ISP，互联网服务提供商，有联通电信移动等。如果你是电信网络，则进入电信的 DNS 缓存服务器，以下简称本地），如果本地服务器有，则直接返回；如果没有，让本地 DNS 服务器去逐个咨询查找。
4. 本地去咨询 **DNS 根服务器**，DNS 根服务器发现是 `.com 区域` 管理的，告诉本地去咨询它。
5. 本地去咨询 **.com 顶级域服务器**，.com 域服务器告诉本地去咨询 `baidu.com 主区域` 的服务器。
6. 本地去咨询 **baidu.com 主域名服务器**，baidu.com 域服务器查找到对应的 IP 地址，返回给本地。
7. 本地 DNS 云服务器通知用户对方 IP 地址，同时缓存这个 IP 地址，下次就直接访问了

## 2. 参考文献

* [ ] [DNS 解析顺序](https://blog.csdn.net/Yooneep/article/details/89882123)【阅读建议：5min】
* [ ] [写给前端工程师的DNS基础知识](http://www.sunhao.win/articles/netwrok-dns.html)【阅读建议：10min】
* [ ] [前端优化: DNS预解析提升页面速度](https://www.jianshu.com/p/95a0c0636d28)【阅读建议：5min】
* [ ] [DNS解析](https://imweb.io/topic/55e3ba46771670e207a16bc8)【阅读建议：10min】
