语句和声明 - 迭代器 - for...of
===

> create by **jsliang** on **2019-10-14 11:09:21**  
> Recently revised in **2019-10-16 01:45:37**

* **原文**：[MDN - for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

* **功能**：`for...of` 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

* **语法**：`for (variable of object) { statement }`
  * `variable`：在每次迭代时，`variable` 会被赋值为不同的属性名。
  * `object`：被迭代枚举其属性的对象。

* **说明**：

`for...of` 可以做非常多的事情，例如迭代 Array、String、Map、Set、DOM 集合……也可以关闭迭代器等，非常强大。

* **代码**：

```js
/**
 * @name 案例1
 * @description 迭代 Array
 */
const iterable1 = [10, 20, 30];
for (let value of iterable1) {
  value += 1;
  console.log(value);
}
// 11
// 21
// 31
console.log('iterable1: ' + iterable1);
// iterable1: 10,20,30


/**
 * @name 案例2
 * @description 迭代 String
 */
const iterable2 = 'jsliang';
for (let value of iterable2) {
  console.log(value);
}
// 'j'
// 's'
// 'l'
// 'i'
// 'a'
// 'n'
// 'g'

/**
 * @name 案例3
 * @description 迭代 Map
 */
const iterable3 = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (let entry of iterable3) {
  console.log(entry);
}
// [ 'a', 1 ]
// [ 'b', 2 ]
// [ 'c', 3 ]
for (let [key, value] of iterable3) {
  console.log(`${key}: ${value}`);
}
// 'a: 1'
// 'b: 2'
// 'c: 3'

/**
 * @name 案例4
 * @description 迭代 Set
 */
const iterable4 = new Set([1, 1, 2, 2, 3, 3]);
for (let value of iterable4) {
  console.log(value);
}
// 1
// 2
// 3

/**
 * @name 案例5
 * @description 关闭迭代器：可以使用 break、throw continue、return
 */
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
for (let o of foo()) {
  console.log(o);
  break;
}
// 1
```
