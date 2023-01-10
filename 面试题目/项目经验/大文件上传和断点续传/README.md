https://juejin.cn/post/6844903860327186445#heading-6

目前社区已经存在一些成熟的大文件上传解决方案，如[七牛SDK](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fqiniu)，[腾讯云SDK](https://link.juejin.cn/?target=https%3A%2F%2Fcloud.tencent.com%2Fdocument%2Fproduct%2F266%2F9239)等，也许并不需要我们手动去实现一个简陋的大文件上传库，但是了解其原理还是十分有必要的。

本文首先整理了前端文件上传的几种方式，然后讨论了大文件上传的几种场景，以及大文件上传需要实现的几个功能

- 通过Blob对象的`slice`方法将文件拆分成切片
- 整理了服务端还原文件所需条件和参数，演示了PHP将切片还原成文件
- 通过保存已上传切片的记录来实现断点续传

还留下了一些问题，如：合并文件时避免内存溢出、切片失效策略、上传进度暂停等功能，并没有去深入或一一实现，继续学习吧~