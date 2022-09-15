# 关于 [理解 TypeScript 手册中的 `(...args: never[]) => ...`] 引发的问题

> 原文链接：[Understanding `(...args: never[]) => ...` in TypeScript Handbook](https://www.reddit.com/r/typescript/comments/muyl55/understanding_args_never_in_typescript_handbook/?sort=top)

## 问题:

```typescript
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
```

我理解`GetReturnType`是从函数类型获取返回类型的泛型类型。让我困惑的部分是`...args: never[]`。对我来说，这读作“一个永远不存在的类型的参数列表”。

注：

该`ReturnType`实用程序实际上包含在库中使用`any`（它甚至不费心使用`any[]`），它的价值：[https ://github.com/microsoft/TypeScript/blob/3d24b85f9e5dde6f35d6014539aeef9801e74493/lib/lib.es5.d.ts# L1536](https://github.com/microsoft/TypeScript/blob/3d24b85f9e5dde6f35d6014539aeef9801e74493/lib/lib.es5.d.ts#L1536)

```typescript
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```



## 简单回答

我会读它，因为该函数不允许有任何参数。

它是一个函数，可以有任何它喜欢的参数，表达式不会使用这些参数。

所以这表示一个接受零参数的函数，其中 ...args 将是一个空数组。

I would read it as the function is not allowed to have any arguments. 

It is a function that may have whatever arguments it likes, none of those arguments will be used by the expression.

## 回答 机翻：

### 回答 1 

非常有趣的问题，我想我找到了答案。

首先：你说得对，`(...args: never[]) => any` 意思是“一个不接受参数的函数”，我们可以用这个例子来验证：

```
type NeverArgs = (...args: never[]) => number;

declare const fnNeverArgs: NeverArgs;
fnNeverArgs('faz') // TS ERROR
```

但是在这里我们不应该忘记**extends**并不意味着**等于。**扩展 '...args: never[])' 实际上是函数参数的*最高*通用签名（我想）。通过使用 this ，我们接受具有多个参数的函数以及根本不接受任何参数的函数，**最重要**的是它接受期望类型为“never”的参数的函数。

让我们看一个更简单的类型：

```
type Check<T> = T extends (...args:never[]) => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; //type Test1 = OK
type Test2 = Check<(x: string) => number>; //type Test2 = OK
type Test3 = Check<(x: never) => number>; //type Test3 = OK
```

如果 T 函数与签名匹配，则此类型将返回类型“ok”，否则返回 ok。

如果我们完全删除会发生什么`...args:never[]:`

```
type Check<T> = T extends () => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; // type Test1 = OK
type Test2 = Check<(x: string) => number>; // type Test2 = NOT OK
type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
```

如果我们用更著名的“any”类型替换它会怎样：

```
type Check<T> = T extends (...args: any[]) => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; // type Test1 = OK
type Test2 = Check<(x: string) => number>; // type Test2 = OK
type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
```

结论：它只是涵盖了所有类型的函数（带参数，不带参数，以及从不带参数的类型）

**旁注：**如果extends函数的返回类型是`any`，我的最后一个例子不是真的，但我认为这是另一个问题，我不知道为什么会发生这种情况

```typescript
type CheckAny<T> = T extends (...args: any[]) => any ? 'OK' : 'NOT OK';
type Test1 = CheckAny<(x: never) => any>; // weirdly OK

type CheckAny2<T> = T extends (...args: any[]) => number ? 'OK' : 'NOT OK';
type Test2 = CheckAny2<(x: never) => number>; // as mentionned previously:
```

Other 1

哇非常感谢您的出色解释！在将您的示例复制到编辑器并尝试其他事情之后，这非常有意义`...args: never[]`

关于您的旁注，我认为它与返回类型无关`any`。我认为这是因为在这种情况下，您正在使用`any[]`具有`never[]`参数的类型扩展一个类型（与原始示例相反）。一个没有所有功能的例子使它更清楚：

```typescript
type ExtendsNeverArray<T> = T extends never[] ? 'OK' : 'NOT OK'
type ExtendsAnyArray<T> = T extends any[] ? 'OK' : 'NOT OK'

type Test1 = ExtendsNeverArray<any[]> // 'NOT OK'
type Test2 = ExtendsAnyArray<never[]> // 'OK'
```

同样来自手册：

> `never`类型是每个类型的子类型，并且可以分配给每个类型；但是，没有类型是子类型或可分配给`never`（除了`never`它自己）。甚至`any`不能分配给`never`.

Other 2

有趣的是，这会导致类型系统不准确的问题。请参阅以下代码：

```
type NeverArgs = (...args: never[]) => number;

function foo(n: number): number {
  return n;
}

var fnNeverArgs: NeverArgs = foo;
console.log(fnNeverArgs()); // prints undefined
```

问题是 [] 是 never[] 类型的成员（合理地），因此您可以调用没有参数的 NeverArgs 类型的函数。但是，因为具有任何 args 的函数是 NeverArgs 的子类型，所以您可以将实际需要参数的函数分配给 NeverArgs 类型的变量，然后在没有 args 的情况下调用该函数，从而导致您没有预料到的未定义.

在某种程度上，解决方案可能只是“不要实际使用具有该类型的变量”，但这仍然是类型系统中的一个略显尴尬的漏洞。

### 回答 2

这可以通过超类型和子类型、协变和逆变来理解。

在传统的面向对象编程中，超类型和子类型的经典示例是，如果您有`class Dog extends Animal`, 和`class Cat extends Animal`，您可以绘制一个继承图（一棵小树），其中 Animal 是超类型（根在顶部），Cat 和 Dog是亚型（像树枝一样垂下来）。根据 Liskov 替换原则，使某物成为子类型的是可替换性；如果您可以在任何需要 Animal 对象的地方替换 Dog 对象，那么 Dog 就是 Animal。反过来不一定是正确的；Dog 可能有一种`bark()`并非所有 Animals 都有的方法。但是，要使 Dog 成为 Animal，它必须具有所有 Animal 方法，这样针对 Animal 类的 API 编写的代码才能在 Dogs 上运行。

TypeScript 的超类型/子类型的主要概念是可分配性。TypeScript 还具有复杂的结构类型系统，具有有趣的功能，例如联合和交集。在 TypeScript 中，将类型视为集合，将超类型视为超集是非常有成效的。该类型`number | string`是 的超类型`number`，它是文字类型的超类型`1`。在可分配性方面，可`number`分配给`number | string`。就可替代性而言，为接受 a 而编写的代码在`number | string`给定 a 的情况下可以正常工作`number`。您可以将其`|`视为集合并集，以及`&`集合交集。

TypeScript 有一个“根”类型，它是所有其他类型的超类型，称为`unknown`. 它还有一个类型，它是所有其他类型的子类型，称为`never`，这有点难以让你的大脑环绕。这意味着，正如 Dog 是 Animal 一样，Animal 是 an `unknown`，`never`a Dog 也是。A`never`也是一只猫。仿佛`never`继承了一切！这实际上听起来有点危险，因为可以为期待 Animal 的代码提供 a `never`，并且类型检查器会确定它，对吗？就像`any`在这方面一样。问题是，具体来说（以我们人类可以推理但类型检查器不能推理的方式），*实际上*没有任何类型的值`never`. `never`（如果你能产生一个，它确实可以在任何地方工作，就像逻辑上的“虚假暗示任何事情”一样。事实上，如果你开始编写条件类型作为一种“其他情况” ，你确实必须小心“你只是反射性地扔在那里。理想情况下，你只会`never`用于真正无法到达的情况，或者你最终会告诉类型系统你有一个 type 的值`never`，它可以用于任何事情。`never`）有点深奥，因为您通常不想*使用*type 的值`never`。`never`例如，带有 type 参数的函数`(x: never) => R`是对事物的有效描述，您不能在任何值上调用它（除非该值本身具有类型`never`，这应该是不可能的）。您可能会说函数对 x 的要求是如此“具体”以至于无法满足。但是，您实际上不会声明和实现一个函数`f(x: never) { ... }`，因为主体会“使用” `x`，此时它会表现得像`any`，因为不应该有任何 x 值；这段代码甚至不应该运行！

因此，`never`最好抽象地使用，作为类型参数，它可用作通用子类型，也称为“底部类型”。作为一个集合，它是空集，它是任何集合的子集。关于 TypeScript 中的交集的旁注：它们对应于集合交集，并以 union ( `|`) 创建超类型的方式创建子类型。你可以用`Cat & Dog`TypeScript 编写，你会得到一个类型，它是 Cat 和 Dog 的子类型。是否真的有可能同时拥有一只猫和一只狗并不一定重要（出于 TypeScript 操作的目的）；TypeScript 不会深入研究，尽管在简单的情况下，根据上下文和 TypeScript 的版本，可能会发生一些简化，例如`number & string``never`

好的，这给我们带来了协变和逆变，它们是一对事物的超类型/子类型关系与另一对事物之间的关系。 `number | string`是 的超`number`类型 因此，该函数`() => number | string`是 的超类型`() => number`。这叫做协方差。 `() => T`在 T 中是协变的，因为 的成员之间的超类型/子类型关系`() => T`平行于 的成员之间的关系`T`。相反，函数类型的参数类型是逆变的。While`number | string`是 的超类型`number`，`(x: number | string) => void`是 的子*类型*。`(x: number) => void`就可替代性而言，您会说需要 a 的代码`(x: number) => void`可以给出`(x: number | string) => void`. 你可以这样想，也许接受这个方法的字符串是 Dogs 可以做的事情，但不是一般的 Animals。

TypeScript 在内部做了一堆簿记，以跟踪类型相对于参数的协变或逆变（或不变或双变）。在某些情况下，它实际上有点令人困惑和微妙，我希望 TypeScript 允许您在某些地方放置显式的协变和逆变注释。

无论如何，就是说，如果你想编写一个所有其他函数类型都是子类型的函数类型，你会希望返回值是通用超类型或顶级类型，`unknown`并且参数是通用子类型或底部类型，`never`。

我认为，出于条件的目的，您不妨使用`any`; 没关系。如果您试图“解构”在您不关心的参数之一中不是协变或逆变的类型，`any`无论如何您都将被迫使用，但如果它是协变的，您可以使用`unknown`, 和如果它是逆变的，则可以使用`never`. 但是，如果您切换它们，它将不起作用。

或者，您可以推断出您不关心的参数并将其丢弃：

```typescript
type GetReturnType<Type> = Type extends (...args: infer _Args) => infer Return
  ? Return
  : never;
```

## 回答  原文

### 回答1

Really interesting question and I think I found the answer.

First of all : you're right the `(...args: never[]) => any` would mean "a function that accept no parameters" as we can verify with this example:

```typescript
type NeverArgs = (...args: never[]) => number;

declare const fnNeverArgs: NeverArgs;
fnNeverArgs('faz') // TS ERROR
```

But here we should not forget that **extends** does ot means **equals.** Extending '...args: never[])' is actually the *highest* generic signature for function parameters (I suppose). By using this , we accept function that has multiple arguments as well as function that accept no argument at all, and **above all** it accept function that expect parameters of type `never`.

Let's look at a simpler type:

```typescript
type Check<T> = T extends (...args:never[]) => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; //type Test1 = OK
type Test2 = Check<(x: string) => number>; //type Test2 = OK
type Test3 = Check<(x: never) => number>; //type Test3 = OK
```

This type will return the type "ok" if the T function match the signature, not ok otherwise.

What happend if we remove totally the `...args:never[]:`

```typescript
type Check<T> = T extends () => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; // type Test1 = OK
type Test2 = Check<(x: string) => number>; // type Test2 = NOT OK
type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
```

And what if we replace it with a more famous "any" type :

```typescript
type Check<T> = T extends (...args: any[]) => number ? 'OK' : 'NOT OK';

type Test1 = Check<() => number>; // type Test1 = OK
type Test2 = Check<(x: string) => number>; // type Test2 = OK
type Test3 = Check<(x: never) => number>; // type Test3 = NOT OK
```

Conclusion: it's just to cover all kind of functions (with parameters, without parameters, and with parameter of type never)

**Side note:** My last exemple is not true if the return type of the function to extends is `any`, but I think it's another problem, I can't figure out why this happens

```typescript
type CheckAny<T> = T extends (...args: any[]) => any ? 'OK' : 'NOT OK';
type Test1 = CheckAny<(x: never) => any>; // weirdly OK

type CheckAny2<T> = T extends (...args: any[]) => number ? 'OK' : 'NOT OK';
type Test2 = CheckAny2<(x: never) => number>; // as mentionned previously
```



Other 1

Wow thanks so much for the excellent explanation! It makes perfect sense after copying your examples into an editor and trying things besides `...args: never[]`

About your side note, I don't think it has anything to do with the return type being `any`. I think it's because in this case, you are extending a type with `any[]` with a type that has `never[]` parameters (the opposite of the original example). An example without all the function stuff makes it clearer:

```typescript
type ExtendsNeverArray<T> = T extends never[] ? 'OK' : 'NOT OK'
type ExtendsAnyArray<T> = T extends any[] ? 'OK' : 'NOT OK'

type Test1 = ExtendsNeverArray<any[]> // 'NOT OK'
type Test2 = ExtendsAnyArray<never[]> // 'OK'
```

Also from the handbook:

> The `never` type is a subtype of, and assignable to, every type; however, no type is a subtype of, or assignable to, `never` (except `never` itself). Even `any` isn’t assignable to `never`.



Other 2

Interestingly, this leads to issues where the type system is legitimately inaccurate. See the following code:

```typescript
type NeverArgs = (...args: never[]) => number;

function foo(n: number): number {
  return n;
}

var fnNeverArgs: NeverArgs = foo;
console.log(fnNeverArgs()); // prints undefined
```

The issue is that [] is a member of type never[] (reasonably), so you can call a function of type NeverArgs with no arguments. However, because a function with any args at all is a subtype of NeverArgs, you can assign a function that actually needs arguments to a variable of type NeverArgs and then call that function with no args, leading to undefineds where you didn't expect them.

To an extent, the solution is probably just "don't actually use variables with that type", but it is still a slightly awkward hole in the type system.

### 回答 2

This can be understood in terms of supertypes and subtypes, covariance and contravariance.

In traditional object-oriented programming, the classic example of supertype and subtype would be that if you have `class Dog extends Animal`, and `class Cat extends Animal`, you could draw an inheritance diagram (a little tree) where Animal is the supertype (the root at the top) and Cat and Dog are the subtypes (hanging down as branches). According to the Liskov Substitution Principle, what makes something a subtype is substitutability; a Dog is an Animal if you can substitute a Dog object anywhere an Animal object is required. The reverse is not necessarily true; Dog may have a `bark()` method that not all Animals have. However, for a Dog to be an Animal, it must have all the Animal methods, so that code written against the API of the Animal class will work on Dogs.

TypeScript's main notion of supertype/subtype is assignability. TypeScript also has an elaborate structural type system with interesting features like unions and intersections. It's fruitful in TypeScript to think of types as sets, and supertypes as supersets. The type `number | string` is a supertype of `number`, which is a supertype of the literal type `1`. In terms of assignability, `number` is assignable to `number | string`. In terms of substitutability, code that is written to accept a `number | string` will work just fine given a `number`. You can think of `|` as set union, and `&` as set intersection.

TypeScript has a "root" type which is a supertype of all other types, called `unknown`. It also has a type that is a subtype of all other types, called `never`, which is a little harder to wrap your brain around. It means that, just as a Dog is an Animal, and an Animal is an `unknown`, so is a `never` a Dog. A `never` is also a Cat. It's as if `never` inherits from everything! This actually sounds a little dangerous, because code that is expecting an Animal could be given a `never`, and the type checker would OK it, right? It's like `any` in that respect. The thing is, concretely (in a way that we humans can reason about but the type checker can't), there aren't *actually* any values of type `never`. (If you could produce one, it would indeed work anywhere, just as a "falsehood implies anything" in logic. And in fact, you do have to be kind of careful if you start writing conditional types with `never` as a sort of "else case" that you just reflexively throw in there. Ideally you would only use `never` for cases that are truly unreachable, or you will end up telling the type system that you have a value of type `never`, which can be used for anything.) The uses of `never` are a bit esoteric, because you generally don't want to *use* a value of type `never`. A function with an argument of type `never`, for example, as in the type `(x: never) => R`, is a valid description of a thing, you just can't call it on any value (unless that value somehow itself has type `never`, which ought to be impossible). You might say the function's requirements on x are so "specific" as to be unmeetable. However, you wouldn't actually declare and implement a function `f(x: never) { ... }` because the body would "use" `x`, at which point it would act like `any`, because there aren't supposed to be any values of x; this code shouldn't even be possible to run!

So, `never` is best used abstractly, as a type parameter, where it is useful as the universal subtype, also called the "bottom type." As a set, it's the empty set, which is a subset of any set. A side note on intersections in TypeScript: they correspond to set intersection, and create subtypes the way union (`|`) creates supertypes. You can write `Cat & Dog` in TypeScript, and you will get a type that is a subtype of Cat and Dog. It doesn't necessarily matter (for the purpose of TypeScript's manipulations) if it's actually possible to have something be a Cat and a Dog simultaneously; TypeScript won't dive into figuring that out, though in simple cases, depending on the context and the version of TypeScript, some simplification may occur, e.g. `number & string` may be simplified to `never` by the type checker.

Ok, that brings us to covariance and contravariance, which are relationships between the supertype/subtype relationship of one pair of things and another pair of things. `number | string` is a supertype of `number`; therefore, the function `() => number | string` is a supertype of `() => number`. That's called covariance. `() => T` is covariant in T, because the supertype/subtype relationships among the members of `() => T` parallel those among the members of `T`. In contrast, function types are contravariant in their argument types. While `number | string` is a supertype of `number`, `(x: number | string) => void` is a *subtype* of `(x: number) => void`. In terms of substitutability, you'd say code requiring a `(x: number) => void` can be given a `(x: number | string) => void`. You could think of it like, maybe accepting strings to this method is something Dogs can do, but not Animals in general.

TypeScript does a bunch of bookkeeping internally to keep track of the covariance or contravariance (or invariance or bivariance) of types with respect to their parameters. It actually gets kind of confusing and subtle in some cases, and I wish TypeScript let you put explicit covariance and contravariance annotations in certain places.

Anyway, all that is to say, if you want to write a function type that all other function types are subtypes of, you'd want the return value to be the universal supertype or top type, `unknown`, and the parameters to be the universal subtype or bottom type, `never`.

For the purposes of a conditional, you might as well use `any`, I think; it doesn't really matter. In cases where you are trying to "destructure" a type that isn't covariant or contravariant in one of the parameters you don't care about, you would be forced to use `any` anyway, but if it is covariant, you can use `unknown`, and if it is contravariant, you can use `never`. It won't work if you switch them, though.

Or, you can just infer the parameter you don't care about and throw it away:

```typescript
type GetReturnType<Type> = Type extends (...args: infer _Args) => infer Return
  ? Return
  : never;
```