# HTTP缓存机制 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-01 15:57:44
> LastEditTime: 2022-11-01 15:58:24
> Description: NO Desc
> Link: [HTTP缓存机制](https://quincychen.cn/http-cache/)

## 概述

关于 HTTP缓存，以前是在计算机网络课程上学过，后来在工作中只涉及到其中很小的一部分。今天在梳理知识点的时候发觉很多概念已经淡忘，所以写篇博客重温并记录一下。

## HTTP缓存策略

HTTP缓存机制分为三个策略，客户端根据这三个策略判断是否存储缓存、缓存是否过期等。

### 1. 缓存存储策略

**存储策略**用来决定客户端是否可以存储 HTTP 响应内容。

很常见的 HTTP 响应头 **Cache-Control** 中的取值：Public, Private, no-cache, max-age, no-store 都是用来指明响应内容是否可以被客户端存储。

| 取值     | 是否存储                 |
| :------- | :----------------------- |
| Public   | 存储                     |
| Private  | 存储                     |
| no-cache | 不建议存储，但其实会存储 |
| max-age  | 存储                     |
| no-store | 不存储                   |

需要注意的是，no-cache 和 max-age 同时包含 **存储策略** 和 **过期策略**，这个我们后面再展开讲。

通过设置 cache-control 的值，我们可以让客户端将响应内容存储在本地，但这并不意味着下次请求相同内容时客户端会从缓存中读取。为什么？因为客户端无法确认本地缓存数据是否可用（可能已经失效），需要有一套鉴别缓存是否过期的机制，这就是接下来要讲的 **缓存过期策略**。

> 下文要讲的 **缓存过期策略** 和 **缓存对比策略** 的工作前提是 Cache-Control 值不为 no-store

### 2. 缓存过期策略

客户端根据 **过期策略** 确认存储在本地的缓存数据是否已过期，进而决定是否重新发送请求到服务器获取资源。

那么，客户端是通过什么规则来判断缓存是否过期的？答案是：**Expires**，服务端通过设置 Expires 响应头指定了缓存数据的有效时间（绝对时间），当客户端时间超过这一时间，本地缓存即过期，在这时间点前，客户端可认为缓存是有效的。

不过，不仅仅是 **Expires** 来决定缓存过期策略，前面提到的 **Cache-Control** 里的 `no-cache` 和 `max-age` 也包含缓存过期策略。我们以 `max-age` 为例，它实际上相当于：

```
Cache-Control： private
Expries: 当前客户端时间 + maxAge
```

可以看出，设置 `max-age` 和 直接设置 `Expires` 的区别在于，一个是相对时间，一个是绝对时间。

需要注意的是：

1. **Cache-Control 的优先级高于 Expires**。
2. 标记为过期的缓存数据并非就此作废，还是有可能会被用到

关于第2点，是因为还需要考虑 **缓存对比策略** 的影响。

### 3. 缓存对比策略

客户端将缓存资源的数据标识（`Last-Modified` / `If-Modified-Since` 和 `Etag` / `If-None-Match`）发送到服务端，服务端通过标识判断客户端的缓存数据是否失效，进而决定返回新资源还是304（304意味着缓存未失效）。

我们先来看看两对缓存标识的工作方式：

#### Last-Modified / If-Modified-Since

首次请求资源时，服务端返回资源时会带上 **Last-Modified** 头，告知客户端资源的最后修改时间。客户端将资源与标识都存在缓存中，再次请求相同资源时，会将 **Last-Modified** 值作为 **If-Modified-Since** 值传递给服务端。

服务端检测到 **If-Modified-Since** 时，会将其与资源最后修改时间进行对比，若资源最后修改时间大于 **If-Modified-Since** (即资源在上次返回给客户端后被修改过)，服务端会将资源再次发送给客户端；反之，说明资源未更新，服务端返回 HTTP 304 给客户端，客户端收到 304 后会直接从本地读取缓存。

#### Etag / If-None-Match

首次请求资源时，服务端返回资源的同时会带上 **ETag** 头（根据文件内容 Hash 计算得出的唯一值）给客户端，客户端将资源与标识都存在缓存中，再次请求相同资源时，会将 **ETag** 值作为 **If-None-Match** 值传递给服务端。

服务端检测到 **If-None-Match** 时，会将其与资源新的标识对比（资源变更时服务端会更新其 **ETag** 值），若两者不匹配，服务端会将资源再次发送给客户端；若两者匹配，说明资源未更新，服务端返回 HTTP 304 给客户端，客户端收到 304 后会直接从本地读取缓存。

需要注意的是：

1. 优先级高于 `Last-Modified / If-Modified-Since`
2. 由于每次文件变更都需要通过计算变更 etag，这种方式效率较低，因此使用的比较少

### 4. 其他

以上就是HTTP的缓存对比策略，到这里我们也就知道讲 **缓存过期策略** 的时候为什么说：

> 标记为过期的缓存数据并非就此作废，还是有可能会被用到

到这里，还有一个问题，假如请求中没有约定缓存过期策略，会发生什么？例如以下请求

```
HTTP/1.1 200 OK
Cache-Control: private
Content-Type: image/png
Last-Modified: Tue, 19 Jun 2018 11:00:00 GMT
Accept-Ranges: bytes
Date: Sun, 10 Jun 2016 11:00:00 GMT
Content-Length: 7253
```

跟缓存相关的请求头有：

```
Cache-Control: private
Last-Modified: Tue, 19 Jun 2018 11:00:00 GMT
```

没有跟缓存过期策略相关的请求头，那么客户端是否会向服务器发起请求？还是说存在另外的缓存过期策略？

答案是：**存在的另外的缓存过期策略**，客户端会根据以下规则决定是否向服务器发起请求：

> 响应头中2个时间字段 Date 和 Last-Modified 之间的时间差值，取其值的10%作为缓存时间

这个规则来自于 [HTTP1.1规范](https://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html) ，当然，这个算是很生僻的知识点了 -。-

## 浏览器的加载方式

讲完了 HTTP 缓存机制，不得不提一下浏览器的页面加载方式。前端的同学基本都知道，浏览器存在三种请求方式，没有对应缓存的时候是一样的，在缓存命中的情况下，这三种请求方式使用缓存的策略是不同的：

- 在地址栏输入URL后回车进入

  直接使用缓存，不发起请求

- 在页面按下 F5 刷新

  发起请求带上 `If-Modify-Since` ，根据服务端是否返回304决定是否使用缓存

- ctrl+F5 强制刷新

  先删除缓存，再发起请求