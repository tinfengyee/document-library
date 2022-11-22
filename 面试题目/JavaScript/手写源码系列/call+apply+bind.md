# call+apply+bind <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-21 21:17:34
> LastEditTime: 2022-11-21 21:17:40
> Description: NO Desc

## call

语法 `function.call(thisArg, arg1, arg2, ...)`

>  thisArg 可选的。在 *function* 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则指定为 null 或 undefined 时会自动替换为指向**全局对象**，**原始值会被包装**。
>
> call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

**实现需求**

1. 改变了 this 指向
2. 函数执行了

**实现步骤**

1. 将函数设置为对象的属性(注意不能覆盖函数本来的对象，确保唯一)
2. 执行函数
3. 删除函数

**细节注意**

1. this 参数可以传 `null` 或者 `undefined`，此时 this 指向 window
2. this 参数可以传基本类型数据，原生的 call 会自动用 Object() 转换
3. 函数是可以有返回值的

ES6

```javascript
Function.prototype.call = function (context) {
  context = context ? Object(context) : window; 
  var fn = Symbol(); // added
  context[fn] = this; // changed

  let args = [...arguments].slice(1);
  let result = context[fn](...args); // changed

  delete context[fn]; // changed
  return result;
}
// 测试用例在下面
```

ES3

```javascript
function fnFactory(context) {
    var unique_fn = "fn";
    while (context.hasOwnProperty(unique_fn)) {
        unique_fn = "fn" + Math.random(); // 循环判断并重新赋值
    }
    
    return unique_fn;
}

Function.prototype.call = function (context) {
    context = context ? Object(context) : window; 
    var fn = fnFactory(context); // added
    context[fn] = this; // changed

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');  // 或者直接 args.push(arguments[i]) 也行吧， 我试过，看（其他）
    }
    var result = eval('context[fn](' + args +')'); // changed

    delete context[fn]; // changed
    return result;
}

// 递归的方式
function fnFactory(context) {
    var unique_fn = "fn" + Math.random();
    if(context.hasOwnProperty(unique_fn)) {
        // return arguments.callee(context); ES5 开始禁止使用
        return fnFactory(context); // 必须 return
    } else {
        return unique_fn;
    }
}
```

测试用例在这里：

```javascript
// 测试用例
var value = 2;
var obj = {
    value: 1,
    fn: 123
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call(null); 
// 2

console.log(bar.call(obj, 'kevin', 18));
// 1
// {value: 1, name: "kevin", age: 18}

console.log(obj);
// {value: 1, fn: 123}
```

## apply 

ES6：

```js
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}
```

ES3

```javascript
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;

    var result;
    // 判断是否存在第二个参数
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }

    delete context.fn
    return result;
}
```

## bind

首先我们来实现以下四点特性：

- 1、可以指定`this`
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

实现步骤

1. 对于第 1 点，使用 `call / apply` 指定 `this` 。
2. 对于第 2 点，使用 `return` 返回一个函数。
3. 对于第 3 点，使用 `arguments` 获取参数数组并作为 `self.apply()` 的第二个参数。
4. 对于第 4 点，获取返回函数的参数，然后同第3点的参数合并成一个参数数组，并作为 `self.apply()` 的第二个参数。

到现在已经完成大部分了，但是还有一个难点，`bind` 有以下一个特性

>  一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

解决方案是用一个空对象作为中介，把 `fBound.prototype` 赋值为空对象的实例（原型式继承）。

```js
var fNOP = function () {};          // 创建一个空对象
fNOP.prototype = this.prototype;    // 空对象的原型指向绑定函数的原型
fBound.prototype = new fNOP();      // 空对象的实例赋值给 fBound.prototype
```

这边可以直接使用ES5的 `Object.create()`方法生成一个新对象

```js
fBound.prototype = Object.create(this.prototype);
```

不过 `bind` 和 `Object.create()`都是ES5方法，部分IE浏览器（IE < 9）并不支持，Polyfill中不能用 `Object.create()`实现 `bind`，不过原理是一样的。

```js
// 第五版
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        // 这里其实跟模拟new差不多
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

## 参考

- [x] [深度解析bind原理、使用场景及模拟实现](https://muyiy.cn/blog/3/3.4.html)

* [ ] [MDN - Arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)【阅读建议：5min】
* [ ] [MDN - call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)【阅读建议：5min】
* [ ] [MDN - apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)【阅读建议：5min】
* [ ] [MDN - bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)【阅读建议：5min】
* [ ] [不用call和apply方法模拟实现ES5的bind方法](https://github.com/jawil/blog/issues/16)【阅读建议：1h】
* [ ] [JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)【阅读建议：20min】
* [ ] [this、apply、call、bind](https://juejin.im/post/6844903496253177863)【阅读建议：30min】
* [ ] [面试官问：能否模拟实现JS的call和apply方法](https://juejin.im/post/5bf6c79bf265da6142738b29)【阅读建议：10min】
* [ ] [JavaScript基础心法—— call apply bind](https://github.com/axuebin/articles/issues/7)【阅读建议：20min】
* [ ] [回味JS基础:call apply 与 bind](https://juejin.im/post/57dc97f35bbb50005e5b39bd)【阅读建议：10min】