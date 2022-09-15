# keyof&typeof操作符 <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-08-29 02:03:45
> LastEditTime: 2022-08-29 02:04:03
> Description: NO Desc

# `keyof` 类型操作符

对一个对象类型使用 `keyof` 操作符，会返回该对象属性名组成的一个字符串或者数字字面量的联合。这个例子中的类型 P 就等同于 "x" | "y"：

```typescript
type Point = { x: number; y: number };
type P = keyof Point;

// type P = keyof Point
```

但如果这个类型有一个 `string` 或者 `number` 类型的索引签名，`keyof` 则会直接返回这些类型：

```typescript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
// type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// type M = string | number
```

注意在这个例子中，`M` 是 `string | number`，这是因为 JavaScript 对象的属性名会被强制转为一个字符串，所以 `obj[0]` 和 `obj["0"]` 是一样的。

(注：原文到这里就结束了)

## 数字字面量联合类型

一开始我们也说了，`keyof` 也可能返回一个数字字面量的联合类型，那什么时候会返回数字字面量联合类型呢，我们可以尝试构建这样一个对象：

```typescript
const NumericObject = {
  [1]: "冴羽一号",
  [2]: "冴羽二号",
  [3]: "冴羽三号"
};

type result = keyof typeof NumericObject

// typeof NumbericObject 的结果为：
// {
//   1: string;
//   2: string;
//   3: string;
// }
// 所以最终的结果为：
// type result = 1 | 2 | 3
```

## Symbol

其实 TypeScript 也可以支持 symbol 类型的属性名：

```typescript
const sym1 = Symbol();
const sym2 = Symbol();
const sym3 = Symbol();

const symbolToNumberMap = {
  [sym1]: 1,
  [sym2]: 2,
  [sym3]: 3,
};

type KS = keyof typeof symbolToNumberMap; // typeof sym1 | typeof sym
```

也就是为什么当我们在泛型中像下面的例子中使用，会如此报错：

```typescript
function useKey<T, K extends keyof T>(o: T, k: K) {
  var name: string = k; 
  // Type 'string | number | symbol' is not assignable to type 'string'.
}
```

如果你确定只使用字符串类型的属性名，你可以这样写：

```typescript
function useKey<T, K extends Extract<keyof T, string>>(o: T, k: K) {
  var name: string = k; // OK
}
```

## 类和接口

对类使用 `keyof`：

```typescript
// 例子一
class Person {
  name: "冴羽"
}

type result = keyof Person;
// type result = "name"
```

```typescript
// 例子二
class Person {
  [1]: string = "冴羽";
}

type result = keyof Person;
// type result = 1
```

对接口使用 `keyof`：

```typescript
interface Person {
  name: "string";
}

type result = keyof Person;
// type result = "name"
```

## 实战

在「[泛型 (opens new window)](https://ts.yayujs.com/handbook/Generics.html)」这篇中就讲到了一个 `keyof` 的应用：

我们希望获取一个对象给定属性名的值，为此，我们需要确保我们不会获取 `obj` 上不存在的属性。所以我们在两个类型之间建立一个约束：

```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m");

// Argument of type '"m"' is not assignable to parameter of type '"a" | "b
```

在后面的「[映射类型 (opens new window)](https://ts.yayujs.com/handbook/MappedTypes.html)」 章节中，我们还会讲到 `keyof` 。

# `typeof` 类型操作符（The `typeof` type operator）

JavaScript 本身就有 `typeof` 操作符，你可以在表达式上下文中（expression context）使用：

```typescript
// Prints "string"
console.log(typeof "Hello world");
```

而 TypeScript 添加的 `typeof` 方法可以在类型上下文（type context）中使用，用于获取一个变量或者属性的类型。

```typescript
let s = "hello";
let n: typeof s;
// let n: string
```

如果仅仅用来判断基本的类型，自然是没什么太大用，和其他的类型操作符搭配使用才能发挥它的作用。

举个例子：比如搭配 TypeScript 内置的 `ReturnType<T>`。你传入一个函数类型，`ReturnType<T>` 会返回该函数的返回值的类型：

```typescript
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
/// type K = boolean
```

如果我们直接对一个函数名使用 `ReturnType` ，我们会看到这样一个报错：

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;

// 'f' refers to a value, but is being used as a type here. Did you m
```

这是因为值（values）和类型（types）并不是一种东西。为了获取值 `f` 也就是函数 `f` 的类型，我们就需要使用 `typeof`：

```typescript
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
                    
// type P = {
//    x: number;
//    y: number;
// }
```

## 限制（Limitations）

TypeScript 有意的限制了可以使用 `typeof` 的表达式的种类。

在 TypeScript 中，只有对标识符（比如变量名）或者他们的属性使用 `typeof` 才是合法的。这可能会导致一些令人迷惑的问题：

```typescript
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
// ',' expected.
```

我们本意是想获取 `msgbox("Are you sure you want to continue?")` 的返回值的类型，所以直接使用了 `typeof msgbox("Are you sure you want to continue?")`，看似能正常执行，但实际并不会，这是因为 `typeof` 只能对标识符和属性使用。而正确的写法应该是：

```typescript
ReturnType<typeof msgbox>
```

(注：原文到这里就结束了)

## 对对象使用 `typeof`

我们可以对一个对象使用 `typeof`：

```typescript
const person = { name: "kevin", age: "18" }
type Kevin = typeof person;

// type Kevin = {
// 		name: string;
// 		age: string;
// }
```

## 对函数使用 `typeof`

我们也可以对一个函数使用 `typeof`：

```typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

type result = typeof identity;
// type result = <Type>(arg: Type) => Type
```

## 对 enum 使用 `typeof`

在 TypeScript 中，enum 是一种新的数据类型，但在具体运行的时候，它会被编译成对象。

```typescript
enum UserResponse {
  No = 0,
  Yes = 1,
}
```

对应编译的 JavaScript 代码为：

```typescript
var UserResponse;
(function (UserResponse) {
    UserResponse[UserResponse["No"] = 0] = "No";
    UserResponse[UserResponse["Yes"] = 1] = "Yes";
})(UserResponse || (UserResponse = {}));
```

如果我们打印一下 `UserResponse`：

```typescript
console.log(UserResponse);

// [LOG]: {
//   "0": "No",
//   "1": "Yes",
//   "No": 0,
//   "Yes": 1
// } 
```

而如果我们对 `UserResponse` 使用 `typeof`：

```typescript
type result = typeof UserResponse;

// ok
const a: result = {
      "No": 2,
      "Yes": 3
}

result 类型类似于：

// {
//	"No": number,
//  "YES": number
// }
```

不过对一个 enum 类型只使用 `typeof` 一般没什么用，通常还会搭配 `keyof` 操作符用于获取属性名的联合字符串：

```typescript
type result = keyof typeof UserResponse;
// type result = "No" | "Yes"
```
