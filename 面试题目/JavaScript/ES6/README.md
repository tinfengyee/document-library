# ES6 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-12-26 21:47:19
> LastEditTime: 2022-12-26 21:47:24
> Description: NO Desc

## 参考资料

[ES6 教程](https://www.runoob.com/w3cnote/es6-tutorial.html)

[web前端面试 - 面试官系列-ES6系列](https://vue3js.cn/interview/)

## 声明变量 var、let、const 区别

变量提升

重复声明

块级作用域

暂时性死区

const 声明只读常量，必须赋值，原理是不能修改栈保存的地址。

## 解构赋值

```js
let [a, b, c] = [1, 2, 3];
let [a, ...b] = [1, 2, 3];
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
let { baz : foo } = { baz : 'ddd' };
```

## 基本数据类型 symbol

ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。

有 7 种原始数据类型：

- [string](https://developer.mozilla.org/zh-CN/docs/Glossary/String)
- [number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)
- [bigint](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)
- [boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)
- [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)
- [symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)

## Proxy / Reflect

Proxy 与 Reflect 是 ES6 为了操作对象引入的 API 。

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。

Reflect 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

## 字符串拓展

模板字符串 `${exp}`

字符串方法

- **padStart**：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
- **padEnd**：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。

## 数组新增拓展

`...` 拓展运算符、rest 参数

数组构造方法，`Array.from`  、 ` Array.of`

数组实例方法 includes 、 findIndex、flat

entries()，keys()，values()

## 对象新增方法

属性的简写

属性名表达式

super关键字

对象新增的方法

> 关于对象新增的方法，分别有以下：
>
> - Object.is()
> - Object.assign()
> - Object.getOwnPropertyDescriptors()
> - Object.setPrototypeOf()，Object.getPrototypeOf()
> - Object.keys()，Object.values()，Object.entries()
> - Object.fromEntries()

属性的遍历

> ES6 一共有 5 种方法可以遍历对象的属性。
>
> - for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
> - Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
> - Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
> - Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
> - Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

## 函数新增拓展

参数默认值

箭头函数

> - 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
> - 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
> - 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
> - 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数

## Set、Map两种数据结构

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

什么是集合？什么又是字典？

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

map 和对象的区别

key类型：Object 只能字符串或者 symbol

Key顺序：Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。

遍历：因为 map/set 实现迭代器方法，可以直接遍历。

性能：Map 对象在涉及频繁添加和删除键值对的场景中表现更好，而普通对象没有优化。

Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

[7 Differences Between Map Objects and Plain Objects](https://levelup.gitconnected.com/7-differences-between-map-objects-and-plain-objects-9690a78fbc06)

## WeakSet 和 WeakMap

`WeakSet`只能成员只能是引用类型，而不能是其他类型的值

`WeakSet`里面的引用只要在外部消失，它在 `WeakSet`里面的引用就会自动消失



`WeakMap`的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

举个场景例子：

在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构，当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除

```javascript
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

## Promise

解决回调地狱

瞬间感受到`promise`解决异步操作的优点：

- 链式操作减低了编码难度
- 代码可读性明显增强

下面我们正式来认识`promise`：

### 状态

`promise`对象仅有三种状态

- `pending`（进行中）
- `fulfilled`（已成功）
- `rejected`（已失败）

### 特点

- 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态
- 一旦状态改变（从`pending`变为`fulfilled`和从`pending`变为`rejected`），就不会再变，任何时候都可以得到这个结果

### 实例方法

`Promise`构建出来的实例存在以下方法：

- then()
- catch()
- finally()

### 构造函数方法

`Promise`构造函数存在以下方法：

- all()
- race()
- allSettled()
- resolve()
- reject()
- try()

## Generator

Generator 有两个区分于普通函数的部分：

- 一是在 function 后面，函数名之前有个 * ；
- 函数内部有 yield 表达式。

```js
function* func(){
 console.log("one");
 yield '1';
 console.log("two");
 yield '2'; 
 console.log("three");
 return '3';
}
```

### next传参

第`i`次调用next时传的参数，会作为第`i-1`次`yield`表达式的**返回值**。

就是传参实际是传给上一个 yield 的返回值。

### 生成器代替迭代器（yield*）

```js
//传入一个数组，返回该数组的迭代器（虽然数组有迭代器）
function createArrayIterator(arr){
  let index = 0
  return {
    next:function(){
      return index < arr.length?
          {value:arr[index++],done:false}:{value:undefined,done:true}
    }
  }
}

//代替写法
function* createArrayIterator(arr){
	//第一种写法
    for(const item of arr){
        yield item
    }
    
    //第二种写法：yield*后面跟着的是可迭代对象，每次调用next的时候会迭代一次可迭代对象
    yield* arr
}
```

## async/await

async、await这种解决异步的方案，其实就是Generator+Promise**自动执行版本**的语法糖

```js
async function a(){  
  await 1  
  console.log("1")  
  console.log("2")
}
a()
console.log("3")
```

> 值得注意的是，await关键字后面的代码**本质上是在当前await返回的Promise的then方法中执行的**，也就是说，await后面的代码是放到**微任务**中执行的。需要注意的是，await后如果跟着的是常数，await关键字下面的代码本质上还是会被放到微任务中。

```js
async function a(){  
  await 1  
  console.log("1")  
  console.log("2")
}
a()
console.log("3")
//打印： 3 1 2
```

## class 类

子类 constructor 方法中必须有 super ，且必须出现在 this 之前。

```js
class Father {
    constructor() {}
}
class Child extends Father {
    constructor() {}
    // or 
    // constructor(a) {
        // this.a = a;
        // super();
    // }
}
let test = new Child(); // Uncaught ReferenceError: Must call super 
// constructor in derived class before accessing 'this' or returning 
// from derived constructor
```

## 模块

ESM 和 CJS

1. ESM输出的是`值的引用`，而CJS输出的是`值的拷贝`； ESM:

```JS
// a.mjs(Node环境中进行测试，必须修改后缀名为mjs，这是Node的强制规定)
export let age = 18;

export function addAge() {
  age++;
}

// b.mjs
import { age, addAge } from "./a.mjs";

addAge();

console.log(age); // 19


// ------------
// a.js(Node环境中进行测试，必须修改后缀名为mjs，这是Node的强制规定)
let age = 18;

module.exports = {
  age,
  addAge: function () {
    age++;
  },
};


// b.js
const { age, addAge } = require("./a.js");

addAge();

console.log(age); // 18
```

2. CJS的输出是`运行时加载`，而ESM是`编译时`输出接口；

因为CJS输出的是一个对象，该对象需要在脚本运行完成后才生成，而ESM的输出是静态的，在编译时就能生成。 

我们可以把 CommonJS 理解成按需加载，需要什么就加载什么，加载进来就执行。所以可以动态加载、条件加载、循环加载。

ESM 倾向于静态加载，方便解析依赖，优化运行效率。所以起初不能条件加载或者循环加载。不过后面考虑到实际需求，还是开放了 `import()` 做动态加载。

3. esm 存在 export/import 提升

[ESM(ESModule)和CJS(CommonJS)的区别](https://juejin.cn/post/6974404976022192141)

[深入浅出 ESM 模块 和 CommonJS 模块](https://segmentfault.com/a/1190000041396029)