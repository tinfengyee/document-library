[剖析无限滚动虚拟列表的实现原理](https://lkangd.com/post/virtual-infinite-scroll/#zhunbeigongzuodongtaigaodu) 推荐

> [附加代码](https://github.com/tinfengyee/infinite-scroll-sample)

https://m.isuike.com/archives/3302 简单理解

[虚拟滚动列表基础原理篇](https://juejin.cn/post/7091111799809900574)

[分片渲染，Vue虚拟列表](https://segmentfault.com/a/1190000040718725)

https://blog.csdn.net/Laollaoaolao/article/details/125052026

[vue实现虚拟列表组件解决长列表性能问题](https://www.jb51.net/article/255967.htm) 父使用padding

[vue长列表优化-虚拟滚动](https://juejin.cn/post/7063898544008069127)

其他

https://zhuanlan.zhihu.com/p/26022258

https://fehey.com/offsetheight-and-list

https://wensiyuanseven.github.io/lite-virtual-list/guide/

## DOM元素获取的宽和高

[**注：此文属于转载自他人博客**](https://juejin.cn/post/6844903505602281486)

网页可见区域宽： document.body.clientWidth 
网页可见区域高： document.body.clientHeight 
网页可见区域宽： document.body.offsetWidth (包括边线的宽) 
网页可见区域高： document.body.offsetHeight (包括边线的高) 
网页正文全文宽： document.body.scrollWidth 
网页正文全文高： document.body.scrollHeight 
网页被卷去的高： document.body.scrollTop 
网页被卷去的左： document.body.scrollLeft 
网页正文部分上： window.screenTop 
网页正文部分左： window.screenLeft 
屏幕分辨率的高： window.screen.height 
屏幕分辨率的宽： window.screen.width 
屏幕可用工作区高度： window.screen.availHeight 
屏幕可用工作区宽度： window.screen.availWidth 

```js
    <script>
     // 判断到达底部 ，页面的高 == 可视高度 + 滚动的距离
      document.addEventListener("scroll", (e) => {
        let warpHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;

        if (warpHeight < scrollTop + clientHeight + 30) {
        }
      });
    </script>
// https://blog.csdn.net/qq_29236119/article/details/115395029
```

-- https://segmentfault.com/a/1190000015364016?utm_source=sf-similar-article

https://blog.csdn.net/tinfengyee/article/details/104175899

https://segmentfault.com/a/1190000011965540

-- https://www.ifmicro.com/%E8%AE%B0%E5%BD%95/2017/08/21/get-dom-coords-size-by-javascript/

-- https://abelsu7.top/2018/09/19/js-get-dom-height-and-width/

https://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html