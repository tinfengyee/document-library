Object.hasOwnProperty() 产生 ESLint 'no-prototype-builtins' 错误：如何修复？

https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to



https://eslint.org/docs/latest/rules/no-prototype-builtins



您可以通过以下方式访问它`Object.prototype`：

```js
Object.prototype.hasOwnProperty.call(obj, prop);
```

那应该更安全，因为

- 并非所有对象都继承自`Object.prototype` （ `Object.create(null)`）
- 即使对于继承自 的对象`Object.prototype`，该`hasOwnProperty`方法也可能被其他东西遮蔽。

当然，上面的代码假设

- 全局`Object`尚未被遮蔽或重新定义
- 本机`Object.prototype.hasOwnProperty`没有被重新定义
- 没有`call`自己的财产被添加到`Object.prototype.hasOwnProperty`
- 本机`Function.prototype.call`没有被重新定义

如果其中任何一个不成立，尝试以更安全的方式进行编码，您可能已经破坏了您的代码！

另一种不需要的`call`方法是

```js
!!Object.getOwnPropertyDescriptor(obj, prop);
```