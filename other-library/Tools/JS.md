# JS 一些杂七杂八的 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-15 15:17:13
> LastEditTime: 2022-08-15 15:58:53
> Description: NO Desc

# 打印一组数据/表格（可以嵌套使用）

[14个你可能不知道的JavaScript调试技巧](https://blog.csdn.net/snsHL9db69ccu1aIKl9r/article/details/104120816)

```JS
// 打印一组数组
    console.group("beforeUpdate 更新前状态(父）===============》");
    console.log("%c%s", "color:red;background:yellow;", "el     : " + this.$el);
    console.log(this.$el);
    console.log("%c%s", "color:red", "data   : " + this.$data);
    console.log("%c%s", "color:red", "message: " + this.message);
    console.group("子元素===============》");
    console.groupEnd()

// 打印表格
var animals = [    { animal: 'Horse', name: 'Henry', age: 43 },    { animal: 'Dog', name: 'Fred', age: 13 },    { animal: 'Cat', name: 'Frodo', age: 18 }];
console.table(animals);
```