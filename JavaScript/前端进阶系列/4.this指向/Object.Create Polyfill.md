# Object.Create Polyfill <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-21 21:41:08
> LastEditTime: 2022-11-21 21:42:14
> Description: NO Desc

## 模拟实现

```js
if (!Object.create) {
  Object.create = function(proto) {
    function F() {};
    F.prototype = proto;
    return new F();
  }
}
```

## 参考

[Object.Create Polyfill With Code Examples](https://www.folkstalk.com/2022/10/object-create-polyfill-with-code-examples.html)
