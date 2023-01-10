## Fetch 

[Fetch 和 Ajax 有什么区别？](https://learnku.com/articles/60098)

jax与fetch的区别

- Fetch
  - 是基于promise实现的，也可以结合async和await使用
  - fetch请求默认是不携带cookie的，需要设置
  - fetch是window的一个方法
  - 只有网络出错导致请求不能完成时，fetch才会被fetch，400/500不会reject
- Ajax
  - 状态为200/304时才会请求成功
  - 是XMLHttpRequest的一个实例，实现网页不刷新异步更新。
  - ajax针对MVC编程，不符合MVVM模式浪潮