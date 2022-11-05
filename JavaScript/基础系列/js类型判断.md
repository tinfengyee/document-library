# js类型判断
 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-03 00:11:25
> LastEditTime: 2022-11-03 22:51:48
> Description: NO Desc
> Link：https://www.jianshu.com/p/ddc7f189d130

## 1、js中的数据类型

基本数据类型：Undefined、Null、Boolean、Number、String，Symbol
 引用数据类型 ：Object

```jsx
let bool = true;
let num = 1;
let str = 'abc';
let  und= undefined;
let nul = null;
let arr = [1,2,3,4];
let obj = {name:'xiaoming',age:22};
let fun = function(){console.log('hello')};
let s1 = Symbol();
```

## 2、typeof

```jsx
console.log(typeof bool); //boolean
console.log(typeof num);//number
console.log(typeof str);//string
console.log(typeof und);//undefined
console.log(typeof nul);//object
console.log(typeof arr);//object
console.log(typeof obj);//object
console.log(typeof fun);//function
console.log(typeof s1); //symbol
```

typeof可以识别出基本类型boolean,number,undefined,string,symbol，但是不能识别null。不能识别引用数据类型，会把null、array、object统一归为object类型,但是可以识别出function。
 所以typeof可以用来识别一些基本类型。

## 3、instanceof

```jsx
console.log(bool instanceof Boolean);// false
console.log(num instanceof Number);// false
console.log(str instanceof String);// false
console.log(und instanceof Object);// false
console.log(nul instanceof Object);// false
console.log(arr instanceof Array);// true
console.log(obj instanceof Object);// true
console.log(fun instanceof Function);// true
console.log(s1 instanceof Symbol);// false
```

从结果中看出instanceof不能识别出基本的数据类型 number、boolean、string、undefined、unll、symbol。
 但是可以检测出引用类型，如array、object、function，同时对于是使用new声明的类型，它还可以检测出多层继承关系。
 其实也很好理解，js的继承都是采用原型链来继承的。比如objA instanceof A ，其实就是看objA的原型链上是否有A的原型，而A的原型上保留A的constructor属性。
 所以instanceof一般用来检测对象类型，以及继承关系。

## 4、constructor

```tsx
console.log(bool.constructor === Boolean);// true
console.log(num.constructor === Number);// true
console.log(str.constructor === String);// true
console.log(arr.constructor === Array);// true
console.log(obj.constructor === Object);// true
console.log(fun.constructor === Function);// true
console.log(s1.constructor === Symbol);//true
```

null、undefined没有construstor方法，因此constructor不能判断undefined和null。
 但是他是不安全的，因为contructor的指向是可以被改变。

## 5、Object.prototype.toString.call

```js
console.log(Object.prototype.toString.call(bool));//[object Boolean]
console.log(Object.prototype.toString.call(num));//[object Number]
console.log(Object.prototype.toString.call(str));//[object String]
console.log(Object.prototype.toString.call(und));//[object Undefined]
console.log(Object.prototype.toString.call(nul));//[object Null]
console.log(Object.prototype.toString.call(arr));//[object Array]
console.log(Object.prototype.toString.call(obj));//[object Object]
console.log(Object.prototype.toString.call(fun));//[object Function]
console.log(Object.prototype.toString.call(s1)); //[object Symbol]
```

我们可以使用 `bind`包装一个工具函数

```javascript
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function matchType(target, type) {
    // type= Array | Number | ... | string
    return toStr(target).slice(8, -1) === type;
}
console.log(matchType([2], 'Symbol'));
```

此方法可以相对较全的判断js的数据类型。

至于在项目中使用哪个判断，还是要看使用场景，具体的选择，一般基本的类型可以选择typeof，引用类型可以使用instanceof。
