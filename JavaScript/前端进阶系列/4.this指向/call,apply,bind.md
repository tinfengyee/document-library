# call,apply,bind <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-03 19:40:26
> LastEditTime: 2022-11-03 22:48:05
> Description: NO Desc

```javascript
  // 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
  var arg = [].slice.call(arguments);
```

## call() 和 apply()

> call() 方法调用一个函数, 其具有一个指定的 `this` 值和分别地提供的参数(**参数的列表**)。

`call()` 和 `apply()`的区别在于，`call()`方法接受的是**若干个参数的列表**，而`apply()`方法接受的是**一个包含多个参数的数组**

举个例子：

```js
var func = function(arg1, arg2) {
     ...
};

func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]) // 使用 apply，参数数组
```

### 使用场景

####  1、合并两个数组

```js
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
// 4

vegetables;
// ['parsnip', 'potato', 'celery', 'beetroot']

// ----------

```

####  2、获取数组中的最大值和最小值

```js
var numbers = [5, 458 , 120 , -215 ]; 
Math.max.apply(Math, numbers);   //458    
Math.max.call(Math, 5, 458 , 120 , -215); //458

// ES6
Math.max.call(Math, ...numbers); // 458
```

为什么要这么用呢，因为数组 `numbers` 本身没有 `max`方法，但是 `Math`有呀，所以这里就是借助 `call / apply` 使用 `Math.max` 方法。

#### 3、验证是否是数组

```js
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function matchType(target, type) {
    // type= Array | Number | ... | string
    return toStr(target).slice(8, -1) === type;
}
console.log(matchType([2], 'Symbol'));
```

#### 4、类数组对象（Array-like Object）使用数组方法

```js
var domNodes = document.getElementsByTagName("*");
domNodes.unshift("h1");
// TypeError: domNodes.unshift is not a function

var domNodeArrays = Array.prototype.slice.call(domNodes);
// var args = Array.prototype.slice.call(arguments, 1); 

domNodeArrays.unshift("h1"); // 505 不同环境下数据不同
// (505) ["h1", html.gr__hujiang_com, head, meta, ...] 
```

类数组对象有下面两个特性

- 1、具有：指向对象元素的数字索引下标和 `length` 属性
- 2、不具有：比如 `push` 、`shift`、 `forEach` 以及 `indexOf`等数组对象具有的方法

要说明的是，类数组对象是一个**对象**。JS中存在一种名为**类数组**的对象结构，比如 `arguments` 对象，还有DOM API 返回的 `NodeList` 对象都属于类数组对象，类数组对象不能使用 `push/pop/shift/unshift` 等数组方法，通过 `Array.prototype.slice.call` 转换成真正的数组，就可以使用 `Array`下所有方法。

**类数组对象转数组**的其他方法：

```js
// 上面代码等同于
var arr = [].slice.call(arguments)；

ES6:
let arr = Array.from(arguments);
let arr = [...arguments];
```

`Array.from()` 可以将两类对象转为真正的数组：**类数组**对象和**可遍历**（iterable）对象（包括ES6新增的数据结构 Set 和 Map）。

#### 5、调用父构造函数实现继承

```js
function  SuperType(){
    this.color=["red", "green", "blue"];
}
function  SubType(){
    // 核心代码，继承自SuperType
    SuperType.call(this);
}

var instance1 = new SubType();
instance1.color.push("black");
console.log(instance1.color);
// ["red", "green", "blue", "black"]

var instance2 = new SubType();
console.log(instance2.color);
// ["red", "green", "blue"]
```

在子构造函数中，通过调用父构造函数的`call`方法来实现继承，于是`SubType`的每个实例都会将`SuperType` 中的属性复制一份。

缺点：

- 只能继承父类的**实例**属性和方法，不能继承原型属性/方法
- 无法实现复用，每个子类都有父类实例函数的副本，影响性能

更多继承方案查看我之前的文章。[JavaScript常用八种继承方案](https://juejin.im/post/5bcb2e295188255c55472db0)

### 注意事项

把`null`或者`undefined`作为`this`的绑定对象传入`call`、`apply`或者`bind`，这些值在调用时会被忽略，实际应用的是默认规则。（如果这个函数处于[非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)下，则this指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。）

下面两种情况下会传入`null`

- 使用`apply(..)`来“展开”一个数组，并当作参数传入一个函数
- `bind(..)`可以对参数进行柯里化（预先设置一些参数）

```javascript
function foo(a, b) {
    console.log( "a:" + a + "，b:" + b );
}

// 把数组”展开“成参数
foo.apply( null, [2, 3] ); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2，b:3 
```

总是传入`null`来忽略this绑定可能产生一些副作用。如果某个函数确实使用了this，那默认绑定规则会把this绑定到全局对象中。

**更安全的this**

安全的做法就是传入一个特殊的对象（空对象），把this绑定到这个对象不会对你的程序产生任何副作用。

JS中创建一个空对象最简单的方法是`Object.create(null)`，这个和`{}`很像，但是并不会创建`Object.prototype`这个委托，所以比`{}`更空。

```javascript
function foo(a, b) {
    console.log( "a:" + a + "，b:" + b );
}

// 我们的空对象
var ø = Object.create( null );

// 把数组”展开“成参数
foo.apply( ø, [2, 3] ); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2，b:3 
```

### 模拟实现

#### call

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

#### apply 

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

## bind()

> `bind()` 方法会创建一个新函数，当这个新函数被调用时，它的 `this` 值是传递给 `bind()` 的第一个参数，传入bind方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。bind返回的绑定函数也能使用 `new` 操作符创建对象：这种行为就像把原函数当成构造器，提供的 `this` 值被忽略，同时调用时的参数被提供给模拟函数。

`bind` 方法与 `call / apply` 最大的不同就是前者返回一个绑定上下文的**函数**，而后两者是**直接执行**了函数。

### bind的特征

来个例子说明下

```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

var bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

var bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}
```

通过上述代码可以看出`bind` 有如下特性：

- 1、可以指定`this`
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

### 使用场景

#### 1、业务场景

经常有如下的业务场景

```js
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {

        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }, 500);
    }
}
 
var person = new Person('jawil');
person.distractedGreeting();
//Hello, my name is Kitty
```

这里输出的`nickname`是全局的，并不是我们创建 `person` 时传入的参数，因为 `setTimeout` 在全局环境中执行（不理解的查看【进阶3-1期】），所以 `this` 指向的是`window`。

这边把 `setTimeout` 换成异步回调也是一样的，比如接口请求回调。

解决方案有下面两种。

**解决方案1**：缓存 `this`值

```js
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {
        
		var self = this; // added
        setTimeout(function(){
            console.log("Hello, my name is " + self.nickname); // changed
        }, 500);
    }
}
 
var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil
```

**解决方案2**：使用 `bind`

```js
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {

        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }.bind(this), 500);
    }
}
 
var person = new Person('jawil');
person.distractedGreeting();
// Hello, my name is jawil
```

完美！

#### 2、验证是否是数组

【进阶3-3期】介绍了 `call` 的使用场景，这里重新回顾下。

```js
function isArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 直接使用 toString()
[1, 2, 3].toString(); 	// "1,2,3"
"123".toString(); 		// "123"
123.toString(); 		// SyntaxError: Invalid or unexpected token
Number(123).toString(); // "123"
Object(123).toString(); // "123"
```

可以通过`toString()` 来获取每个对象的类型，但是不同对象的 `toString()`有不同的实现，所以通过 `Object.prototype.toString()` 来检测，需要以 `call() / apply()` 的形式来调用，传递要检查的对象作为第一个参数。

另一个**验证是否是数组**的方法，这个方案的**优点**是可以直接使用改造后的 `toStr`。

```js
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function isArray(obj){ 
    return toStr(obj) === '[object Array]';
}
isArray([1, 2, 3]);
// true

// 使用改造后的 toStr
toStr([1, 2, 3]); 	// "[object Array]"
toStr("123"); 		// "[object String]"
toStr(123); 		// "[object Number]"
toStr(Object(123)); // "[object Number]"
```

上面方法首先使用 `Function.prototype.call`函数指定一个 `this` 值，然后 `.bind` 返回一个新的函数，始终将 `Object.prototype.toString` 设置为传入参数。其实等价于 `Object.prototype.toString.call()` 。

这里有一个**前提**是`toString()`方法**没有被覆盖**

```js
Object.prototype.toString = function() {
    return '';
}
isArray([1, 2, 3]);
// false
```

#### 3、柯里化（curry）

> 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

可以一次性地调用柯里化函数，也可以每次只传一个参数分多次调用。

```js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12

add(1)(2);
// 3
```

这里定义了一个 `add` 函数，它接受一个参数并返回一个新的函数。调用 `add` 之后，返回的函数就通过闭包的方式记住了 `add` 的第一个参数。所以说 `bind` 本身也是闭包的一种使用场景。

### 模拟实现 / 【待定】

首先我们来实现以下四点特性：

- 1、可以指定`this`
- 2、返回一个函数
- 3、可以传入参数
- 4、柯里化

实现步骤

1. 对于第 1 点，使用 `call / apply` 指定 `this` 。
2. 对于第 2 点，使用 `return` 返回一个函数。
