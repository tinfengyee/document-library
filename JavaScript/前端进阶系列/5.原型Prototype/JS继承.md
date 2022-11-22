# JS继承 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-06 01:27:24
> LastEditTime: 2022-11-06 01:52:04
> Description: NO Desc

## js原型链继承实现

- 使用空对象函数作为中介。

- 子类构造函数使用 `call`， 创建子类实例时调用`superClass`构造函数，于是`subClass`的每个实例都会将`superClass`中的属性复制一份。

```js
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F(); 
  // 可以使用 create 代替上面三条语句，效果一样
  // subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass;
  // 后面的一般没用到
  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

// 测试

function Father(name){
  this.name = name;
  this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
  console.log(this.name);
};
function Son(name,age){
  Father.call(this,name);//继承实例属性，第一次调用Father()
  this.age = age;
}
extend(Son,Father)//继承父类方法,此处并不会第二次调用Father()
Son.prototype.sayAge = function(){
  console.log(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
```

我一直不太明白的是为什么要 “**new F()**“, 既然extend的目的是将子类型的 prototype 指向超类型的 prototype,为什么不直接做如下操作呢?

```js
subClass.prototype = superClass.prototype;//直接指向超类型prototype
```

显然, 基于如上操作, 子类型原型将与超类型原型共用, 根本就没有继承关系.

## `Object.create()` polyfill

```js
// http://jsperf.com/new-vs-object-create-including-polyfill
if (typeof Object.create !== 'function') {
 Object.create = function(o, props) {
  function F() {}
  F.prototype = o;
  // 中间可以简化
  if (typeof(props) === "object") {
   for (prop in props) {
    if (props.hasOwnProperty((prop))) {
     F[prop] = props[prop];
    }
   }
  }
   // 中间可以简化
  return new F();
 };
}
```

## 参考

[详解JS原型链与继承](http://louiszhai.github.io/2015/12/15/prototypeChain/)

[JavaScript常用八种继承方案](https://juejin.cn/post/6844903696111763470)

[Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#see_also)

