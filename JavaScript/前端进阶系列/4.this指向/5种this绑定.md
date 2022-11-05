# 5种this绑定 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-03 20:13:32
> LastEditTime: 2022-11-03 20:13:41
> Description: NO Desc

先记住 1 句话：

- this 永远指向最后调用它的那个对象（隐式）

再牢记 2 句话：

- 普通函数中 this 的指向，是 this 执行时的上下文（默认）
- 箭头函数中 this 的指向，是 this 定义时的上下文

作用域链和 this 是两套不同的系统，它们之间基本没太多联系。

this 是和执行上下文绑定的，也就是说每个执行上下文中都有一个 this。
执行上下文分为 3 种：

- 全局执行上下文

- 函数执行上下文

- eval 执行上下文

## 默认绑定

- **独立函数调用**，可以把默认绑定看作是无法应用其他规则时的默认规则，this指向**全局对象**。
- **严格模式**下，不能将全局对象用于默认绑定，this会绑定到`undefined`。只有函数**运行**在非严格模式下，默认绑定才能绑定到全局对象。在严格模式下**调用**函数则不影响默认绑定。

```js
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";
    
    console.log( this.a );
}

var a = 2;

// 调用
foo(); // TypeError: Cannot read property 'a' of undefined

// --------------------------------------

function foo() { // 运行
    console.log( this.a );
}

var a = 2;

(function() { // 严格模式下调用函数则不影响默认绑定
    "use strict";
    
    foo(); // 2
})();
```

## 隐式绑定

当函数引用有**上下文对象**时，隐式绑定规则会把函数中的this绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

obj.foo(); // 2
```

### 隐式丢失

被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把this绑定到全局对象或者undefined上。

```js
// 虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身。
// bar()是一个不带任何修饰的函数调用，应用默认绑定。
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 函数别名

var a = "oops, global"; // a是全局对象的属性

bar(); // "oops, global"
```

参数传递就是一种隐式赋值，传入函数时也会被隐式赋值。回调函数丢失this绑定是非常常见的。

```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // fn其实引用的是foo
    
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo( obj.foo ); // "oops, global"

// ----------------------------------------

// JS环境中内置的setTimeout()函数实现和下面的伪代码类似：
function setTimeout(fn, delay) {
    // 等待delay毫秒
    fn(); // <-- 调用位置！
}
```

## 显式绑定

通过`call(..)` 或者 `apply(..)`方法。第一个参数是一个对象，在调用函数时将这个对象绑定到this。因为直接指定this的绑定对象，称之为显示绑定。

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2  调用foo时强制把foo的this绑定到obj上
```

显示绑定无法解决丢失绑定问题。

解决方案：

- 1、硬绑定

创建函数bar()，并在它的内部手动调用foo.call(obj)，强制把foo的this绑定到了obj。这种方式让我想起了**借用构造函数继承**，没看过的可以点击查看 [JavaScript常用八种继承方案](https://juejin.im/post/5bcb2e295188255c55472db0)

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// 硬绑定的bar不可能再修改它的this
bar.call( window ); // 2
```

典型应用场景是创建一个包裹函数，负责接收参数并返回值。

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

创建一个可以重复使用的辅助函数。

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}

var obj = {
    a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

ES5内置了`Function.prototype.bind`，bind会返回一个硬绑定的新函数，用法如下。

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

- 2、API调用的“上下文”

JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和`bind(..)`一样，确保回调函数使用指定的this。这些函数实际上通过`call(..)`和`apply(..)`实现了显式绑定。

```js
function foo(el) {
	console.log( el, this.id );
}

var obj = {
    id: "awesome"
}

var myArray = [1, 2, 3]
// 调用foo(..)时把this绑定到obj
myArray.forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

## new绑定

- 在JS中，`构造函数`只是使用`new`操作符时被调用的`普通`函数，他们不属于某个类，也不会实例化一个类。
- 包括内置对象函数（比如`Number(..)`）在内的所有函数都可以用`new`来调用，这种函数调用被称为构造函数调用。
- 实际上并不存在所谓的“构造函数”，只有对于函数的“**构造调用**”。

使用`new`来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

- 1、创建（或者说构造）一个新对象。
- 2、这个新对象会被执行`[[Prototype]]`连接。
- 3、这个新对象会绑定到函数调用的`this`。
- 4、如果函数没有返回其他对象，那么`new`表达式中的函数调用会自动返回这个新对象。

使用`new`来调用`foo(..)`时，会构造一个新对象并把它（`bar`）绑定到`foo(..)`调用中的this。

```js
function foo(a) {
    this.a = a;
}

var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log( bar.a ); // 2
```

**手写一个new实现**

```js
function create() {
	// 创建一个空的对象
    var obj = new Object(),
	// 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments);
	// 链接到原型，obj 可以访问到构造函数原型中的属性
    obj.__proto__ = Con.prototype;
	// 绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
	// 优先返回构造函数返回的对象
	return ret instanceof Object ? ret : obj;
};
```

使用这个手写的new

```js
function Person() {...}

// 使用内置函数new
var person = new Person(...)
                        
// 使用手写的new，即create
var person = create(Person, ...)
```

**代码原理解析**：

- 1、用`new Object()`的方式新建了一个对象`obj`
- 2、取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 `arguments`会被去除第一个参数
- 3、将 `obj`的原型指向构造函数，这样`obj`就可以访问到构造函数原型中的属性
- 4、使用`apply`，改变构造函数`this` 的指向到新建的对象，这样 `obj`就可以访问到构造函数中的属性
- 5、返回 `obj`

## 箭头函数绑定

其实大部分情况下可以用一句话来概括，**this总是指向调用该函数的对象**。

但是对于箭头函数并不是这样，是根据外层（函数或者全局）作用域（**词法作用域**）来决定this。

对于箭头函数的this总结如下：

1. 箭头函数不绑定this，箭头函数中的this相当于普通变量。
2. 箭头函数的this寻值行为与普通变量相同，在作用域中逐级寻找。
3. 箭头函数的this无法通过bind，call，apply来**直接**修改（可以间接修改）。
4. 改变作用域中this的指向可以改变箭头函数的this。
5. eg. `function closure(){()=>{//code }}`，在此例中，我们通过改变封包环境`closure.bind(another)()`，来改变箭头函数this的指向。

```js
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
}

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2，不是3！
```

##  优先级

```flow
st=>start: Start
e=>end: End
cond1=>condition: new绑定
op1=>operation: this绑定新创建的对象，
				var bar = new foo()
				
cond2=>condition: 显示绑定
op2=>operation: this绑定指定的对象，
				var bar = foo.call(obj2)
				
cond3=>condition: 隐式绑定
op3=>operation: this绑定上下文对象，
				var bar = obj1.foo()
				
op4=>operation: 默认绑定
op5=>operation: 函数体严格模式下绑定到undefined，
				否则绑定到全局对象，
				var bar = foo()

st->cond1
cond1(yes)->op1->e
cond1(no)->cond2
cond2(yes)->op2->e
cond2(no)->cond3
cond3(yes)->op3->e
cond3(no)->op4->op5->e
```

在`new`中使用硬绑定函数的目的是预先设置函数的一些参数，这样在使用`new`进行初始化时就可以只传入其余的参数（**柯里化**）。

```js
function foo(p1, p2) {
    this.val = p1 + p2;
}

// 之所以使用null是因为在本例中我们并不关心硬绑定的this是什么
// 反正使用new时this会被修改
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```

## 思考题

### 题目1

链接：https://www.jianshu.com/p/d647aa6d1ae6

```js
var a = 20;
var obj = {
  a: 10,
  c: this.a + 20,
  fn: function () {
    return this.a;
  }
}

console.log(obj.c); // NaN (undefined + 20)
console.log(obj.fn()); // 10
```

如果调用者函数，被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。
对象obj中的c属性使用`this.a + 20`来计算。这里我们需要明确的一点是，**单独的`{}`不会形成新的作用域**，因此这里的`this.a`，由于并没有作用域的限制，它仍然处于全局作用域之中。所以这里的this其实是指向的window对象。

> 再来看一些容易理解错误的例子，加深一下对调用者与是否独立运行的理解。

```js
var a = 20;
var foo = {
  a: 10,
  getA: function () {
    return this.a;
  }
}
console.log(foo.getA()); // 10

var test = foo.getA;
console.log(test());  // 20
```

```javascript
console.log(test());  // 20
```

`foo.getA()`中，getA是调用者，他不是独立调用，被对象foo所拥有，因此它的this指向了foo。而`test()`作为调用者，尽管他与foo.getA的引用相同，但是它是独立调用的，因此this指向undefined，在非严格模式，自动转向全局window。

### 题目2

在向其他执行上下文的传递中，确保this的指向保持不变

```javascript
var obj = {
  a: 20,
  getA: function () {
    setTimeout(function () {
      console.log(this.a)
    }, 1000)
  }
}

obj.getA();
```

我们期待的是getA被obj调用时，this指向obj，但是由于匿名函数的存在导致了this指向的丢失，在这个匿名函数中this指向了全局，因此我们需要想一些办法找回正确的this指向。

**解决办法**

使用一个变量，将this的引用保存起来

```javascript
var obj = {
  a: 20,
  getA: function () {
    var self = this;
    setTimeout(function () {
      console.log(self.a)
    }, 1000)
  }
}
```

另外就是借助闭包与apply方法，封装一个bind方法。

```javascript
function bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  }
}

var obj = {
  a: 20,
  getA: function () {
    setTimeout(bind(function () {
      console.log(this.a)
    }, this), 1000)
  }
}

obj.getA();
```

当然，也可以使用ES5中已经自带的bind方法。它与我上面封装的bind方法是一样的效果。

```javascript
var obj = {
  a: 20,
  getA: function () {
    setTimeout(function () {
      console.log(this.a)
    }.bind(this), 1000)
  }
}
```

> ES6中也常常使用箭头函数的方式来替代这种方案

### 题目3

```js
/**
 * 非严格模式
 */

var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1()
person1.show1.call(person2)

person1.show2()
person1.show2.call(person2)

person1.show3()()
person1.show3().call(person2)
person1.show3.call(person2)()

person1.show4()()
person1.show4().call(person2)
person1.show4.call(person2)()
```

答案如下：

```js
person1.show1() // person1，隐式绑定，this指向调用者 person1 
person1.show1.call(person2) // person2，显式绑定，this指向 person2

person1.show2() // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2) // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()() // window，默认绑定，这是一个高阶函数，调用者是window
				  // 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2) // person2，显式绑定，this指向 person2
person1.show3.call(person2)() // window，默认绑定，调用者是window

person1.show4()() // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2) // person1，箭头函数绑定，
							  // this指向外层作用域，即person1函数作用域
person1.show4.call(person2)() // person2
```

最后一个`person1.show4.call(person2)()`有点复杂，我们来一层一层的剥开。

- 1、首先是`var func1 = person1.show4.call(person2)`，这是显式绑定，调用者是`person2`，`show4`函数指向的是`person2`。
- 2、然后是`func1()`，箭头函数绑定，this指向外层作用域，即`person2`函数作用域

首先要说明的是，箭头函数绑定中，this指向外层作用域，并不一定是第一层，也不一定是第二层。

因为没有自身的this，所以只能根据作用域链往上层查找，直到找到一个绑定了this的函数作用域，并指向调用该普通函数的对象。

### 题目4

这次通过构造函数来创建一个对象，并执行相同的4个show方法。

```js
/**
 * 非严格模式
 */

var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1()
personA.show1.call(personB)

personA.show2()
personA.show2.call(personB)

personA.show3()()
personA.show3().call(personB)
personA.show3.call(personB)()

personA.show4()()
personA.show4().call(personB)
personA.show4.call(personB)()
```

------

------

空

白

占

位

符

------

------

正确答案如下：

```js
personA.show1() // personA，隐式绑定，调用者是 personA
personA.show1.call(personB) // personB，显式绑定，调用者是 personB

personA.show2() // personA，首先personA是new绑定，产生了新的构造函数作用域，
				// 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB) // personA，同上

personA.show3()() // window，默认绑定，调用者是window
personA.show3().call(personB) // personB，显式绑定，调用者是personB
personA.show3.call(personB)() // window，默认绑定，调用者是window

personA.show4()() // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB) // personA，箭头函数绑定，call并没有改变外层作用域，
							  // this指向外层作用域，即personA函数作用域
personA.show4.call(personB)() // personB，解析同题目1，最后是箭头函数绑定，
							  // this指向外层作用域，即改变后的person2函数作用域
```

题目3和题目4的区别在于题目4使用了new操作符。

> 使用 new 操作符调用构造函数，实际上会经历一下4个步骤：
>
> 1. 创建一个新对象；
> 2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
> 3. 执行构造函数中的代码（为这个新对象添加属性）；
> 4. 返回新对象。