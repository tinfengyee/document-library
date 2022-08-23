# Title <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-07-14 01:31:12
> LastEditTime: 2022-07-14 02:04:54
> Description: 

## [最近最少使用（LRU）](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))

首先丢弃最近最少使用的项目。该算法需要跟踪何时使用过什么，如果要确保算法始终丢弃最近最少使用的项目，这将是昂贵的。该技术的一般实现需要为缓存线保留“年龄位”，并根据年龄位跟踪“最近最少使用”的缓存线。在这样的实现中，每次使用缓存线时，所有其他缓存线的年龄都会改变。LRU 实际上是[一个缓存算法家族，](https://en.wikipedia.org/wiki/Page_replacement_algorithm#Variants_on_LRU)其成员包括 Theodore Johnson 和 Dennis Shasha [[5\]](https://en.wikipedia.org/wiki/Cache_replacement_policies#cite_note-5)的 2Q以及 Pat O'Neil、Betty O'Neil 和 Gerhard Weikum 的 LRU/K。[[6\]](https://en.wikipedia.org/wiki/Cache_replacement_policies#cite_note-6)

以下示例的访问顺序为 ABCDED F。

[![LRU 工作](https://upload.wikimedia.org/wikipedia/commons/8/88/Lruexample.png)](https://en.wikipedia.org/wiki/File:Lruexample.png)

在上面的示例中，一旦 ABCD 安装在具有序列号的块中（每个新访问增加 1）并且当访问 E 时，它是未命中的，需要将其安装在其中一个块中。根据 LRU 算法，由于 A 的 Rank 最低(A(0))，E 将取代 A。

在倒数第二个步骤中，访问 D 并因此更新序列号。

最后，访问 F 以代替当前具有最低 Rank(B(1)) 的 B。
