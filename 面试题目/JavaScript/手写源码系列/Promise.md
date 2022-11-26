# Promise <!-- omit in toc -->

> Author: tinfengyee
> Date: 2022-11-26 01:05:58
> LastEditTime: 2022-11-27 01:52:24
> Description: NO Desc

## 前言

JavaScript 里的异步方案的演进中：

* `callback -> promise -> generator -> async/await`

在计算机行业，盛行着一种朴素还原论的迷思：即认为越接近底层，技术含量越高。

每个程序员都有读懂底层源代码的追求。

这在一定程度上是正确的。

不过，我们也应该看到，一旦底层和表层之间，形成了领域鸿沟。

精通底层，并不能代表在表层的水平。

比如游戏的开发者，不一定是游戏中的佼佼者。这在 `FPS` 射击游戏或者格斗游戏里尤为明显，这些游戏里的绝大部分顶尖玩家，完全不会写代码。

如果将精通 `Promise` 定义为，善于在各种异步场景中使用 `Promise` 解决问题。

那么，能手写 `Promise` 实现，对精通 `Promise` 帮助不大。

> 这段文本来源于 工业聚

## 实现要求

```
/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

作者：刘小夕
链接：https://juejin.cn/post/6844903796129136654
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 简版手写 Promise

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function myPromise(fn) {
  const that = this;
  that.status = PENDING;
  that.value = null;
  that.reason = null;

  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  function resolve(value) {
    if (that.status === PENDING) {
      that.status = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(value));
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.rejectedCallbacks.map(cb => cb(reason));
    }
  }

  try {
    fn(resolve, reject);
  } catch(e) {
    reject(e);
  }
}

myPromise.prototype.then = function(onFullfilled, onRejected) {
  const that = this;
  
  if (that.status === PENDING) {
    that.resolvedCallbacks.push(onFullfilled);
    that.rejectedCallbacks.push(onRejected);
  }

  if (that.status === RESOLVED) {
    onFullfilled(that.value);
  }

  if (that.status === REJECTED) {
    onFullfilled(that.reason);
  }

  return that;
}

const p = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});

p.then((res) => {
  console.log('结果：', res); // 结果：1000
}).then(() => {
  console.log('jsliang'); // jsliang
})
```

这段代码在 **jsliang** 的个人理解上是这样解读的：

1. 有 `pending`、`resolved` 以及 `rejected` 这 3 个状态。详见代码前 3 行。
2. 状态一旦由 `pending` 向 `resolve` 或者 `rejected` 转变，那就不能再次变化。详见代码 `function resolve` 和 `function reject`。
3. 代码执行到 `.then` 的时候，分为 2 种情况：其一是走了异步，状态成了 `PENDING`，走第一个逻辑；其二是 `RESOLVED` 或者 `REJECTED`，走了第二个和第三个逻辑。
4. 在走了第一个逻辑的情况中，因为我们是异步方案，所以会在 `n` 秒之后走 `function resolve` 或者 `function reject`，而在这两个方法体中，`that.resolvedCallbacks.map(cb => cb(value))` 或者 `that.rejectedCallbacks.map(cb => cb(reason))` 会将我们存入的回调方法进行执行，从而实现 `Promise.then()` 的功能。

## 手写 Promise

```js
const asap = (function() {
  if (process && process.nextTick) {
    return process.nextTick
  } else {
    return setTimeout
  }
})()

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(executor) {
  const self = this;
  self.status = PENDING;
  self.value = undefined;
  self.reason = undefined;
  self.resolvedCallbacks = []; // resolved callback
  self.rejectedCallbacks = []; // rejected callback
  // PromiseA+ 2.1
  function resolve(value) {
    // 调用resolvePromise处理value为thenable的情况
    resolvePromise(self, value, function(v) {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = v;
        self.resolvedCallbacks.map((cb) => cb()); // PromiseA+ 2.2.6.1
      }
    }, reject)
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.rejectedCallbacks.map((cb) => cb()); // PromiseA+ 2.2.6.2
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  // PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
  onRejected = typeof onRejected === 'function' ? onRejected :reason => { throw reason }
  const self = this
  // PromiseA+ 2.2.7
  let promise2 = new Promise((resolve, reject) => {

    function handleOnFulfilled() {
      // PromiseA+ 2.2.2
      // PromiseA+ 2.2.4 --- setTimeout
      asap(function() {
        try {
          let x =  onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
    
    function handleOnRejected() {
      // PromiseA+ 2.2.3
      asap(function() {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    if (self.status === PENDING) {
      self.resolvedCallbacks.push(handleOnFulfilled)
      self.rejectedCallbacks.push(handleOnRejected)
    }
    
    if (self.status === FULFILLED) {
      handleOnFulfilled()
    }

    if (self.status === REJECTED) {
      handleOnRejected()
    }
  })
  // 返回promise，完成链式
  return promise2
};

/**
 * If x is a thenable, it attempts to make promise adopt the state of x, under the assumption that x behaves at least somewhat like a promise. Otherwise, it fulfills promise with the value x.
 * 如果x是一个thenable ，它试图使Promise采用x的状态，假设x的行为至少在某种程度上类似于Promise。否则，它将用值x实现Promise。
 * @param {*} promise 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
  // PromiseA+ 2.3.1  循环引用报错
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'))
  }

  // 如果是Promise实例直接调用then方法，免去了后面判断thenable、取then方法的操作
  if (x instanceof Promise) {
    return x.then(resolve, reject)
  }

  // x不是null 且x是对象或者函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then, used // PromiseA+2.3.3.3.3 防止多次调用,只能调用一次
    try {
      // A+规定，声明then = x的then方法
      then = x.then
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') {
        // PromiseA+2.3.3
        then.call(x, (y) => {
          // PromiseA+2.3.3.1 // 成功和失败只能调用一个
          if (used) return
          used = true
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          //PromiseA+2.3.3.2 // 成功和失败只能调用一个
          if (used) return
          used = true
          reject(r)
        })
      } else {
        //PromiseA+2.3.3.4
        // if (used) return
        // used = true
        resolve(x)
      }
    } catch (e) {
      // PromiseA+ 2.3.3.2
      if (used) return
      used = true
      reject(e)
    }
  } else {
    // PromiseA+ 2.3.3.4
    resolve(x)
  }
}
```

大概说一下主要过程，

**三个状态**： pending、fulfilled、rejected

**Promise 属性**：status、value、reason、resolved 和 rejected 回调函数

**`Promise.prototype.then`**：返回新 `promise2` 对象；如果`status` 状态 pending ，把回调添加到 resolved 和 rejected 回调函数，或者用微任务(settimeout模拟)里面处理 `onFulfilled` 和 `onRejected `并且返回 `x` 结果传入 `resolvePromise`。

**`resolvePromise`**：处理 then 返回的结果。判断 x 是否与 promise2 相等，判断 x 是否是 `object`或 `function`，如果是取 `x.then`，`x.then`是函数则 `then.call(x, y=>{}, r = {})` 当作处理 promise 函数处理，不是则直接 `resolve(x)`

## 参考的代码

### 1.这个比较好理解

来源参考1

```js
/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(executor) {
    let self = this;
    self.status = PENDING;
    self.onFulfilled = [];//成功的回调
    self.onRejected = []; //失败的回调
    //PromiseA+ 2.1
    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled.forEach(fn => fn());//PromiseA+ 2.2.6.1
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejected.forEach(fn => fn());//PromiseA+ 2.2.6.2
        }
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let self = this;
    //PromiseA+ 2.2.7
    let promise2 = new Promise((resolve, reject) => {
        if (self.status === FULFILLED) {
            //PromiseA+ 2.2.2
            //PromiseA+ 2.2.4 --- setTimeout
            setTimeout(() => {
                try {
                    //PromiseA+ 2.2.7.1
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    //PromiseA+ 2.2.7.2
                    reject(e);
                }
            });
        } else if (self.status === REJECTED) {
            //PromiseA+ 2.2.3
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (self.status === PENDING) {
            self.onFulfilled.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            self.onRejected.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    let self = this;
    //PromiseA+ 2.3.1
    if (promise2 === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used; //PromiseA+2.3.3.3.3 只能调用一次
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //PromiseA+2.3.3
                then.call(x, (y) => {
                    //PromiseA+2.3.3.1
                    if (used) return;
                    used = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    //PromiseA+2.3.3.2
                    if (used) return;
                    used = true;
                    reject(r);
                });

            }else{
                //PromiseA+2.3.3.4
                if (used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            //PromiseA+ 2.3.3.2
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        //PromiseA+ 2.3.3.4
        resolve(x);
    }
}

module.exports = Promise;
```

package.json

```
{
  "name": "understanding-promise",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/MarvinXu/understanding-promise.git",
  "author": "xupeiyuan <xupeiyuan123@qq.com>",
  "license": "MIT",
  "scripts": {
    "test": "promises-aplus-tests promise.js"
  },
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  }
}

```

### 1.这个看起来比较好

来源参考2

```js
var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'

var asap = (function () {
  if (process && process.nextTick) {
    return process.nextTick
  } else {
    return setTimeout
  }
}())

function Promise(executor) {
  var self = this
  self.status = PENDING
  self.value = undefined
  self.reason = undefined
  self.resolvedCallbacks = []
  self.rejectedCallbacks = []

  function resolve(value) {
    // 调用resolvePromise处理value为thenable的情况
    resolvePromise(self, value, function(v){
      if (self.status === PENDING) {
        self.status = FULFILLED
        self.value = v
        for (var i = 0; i < self.resolvedCallbacks.length; i++) {
          self.resolvedCallbacks[i]()
        }
      }
    }, reject)
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      for (var i = 0; i < self.rejectedCallbacks.length; i++) {
        self.rejectedCallbacks[i]()
      }
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }

}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

  var self = this
  var promise2 = new Promise(function (resolve, reject) {
    function handleOnFulfilled() {
      asap(function () {
        try {
          var x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    function handleOnRejected() {
      asap(function () {
        try {
          var x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }

    if (self.status === FULFILLED) {
      handleOnFulfilled()
    }

    if (self.status === REJECTED) {
      handleOnRejected()
    }

    if (self.status === PENDING) {
      self.resolvedCallbacks.push(handleOnFulfilled)
      self.rejectedCallbacks.push(handleOnRejected)
    }
  })

  return promise2
}

/**
 * If x is a thenable, it attempts to make promise adopt the state of x, under the assumption that x behaves at least somewhat like a promise. Otherwise, it fulfills promise with the value x.
 * @param {*} promise 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    throw TypeError('Chaining cycle detected for promise')
  }

  // 如果是Promise实例直接调用then方法，免去了后面判断thenable、取then方法的操作
  if (x instanceof Promise) {
    return x.then(resolve, reject)
  }

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    var then, called
    try {
      then = x.then
    } catch (e) {
      // 一定要写return，如果访问then报错就不走后面判断then的逻辑了
      return reject(e)
    }

    if (typeof then === 'function') {
      try {
        then.call(x, function (y) {
          if (!called) {
            called = true
            resolvePromise(promise, y, resolve, reject)
          }
        }, function (r) {
          if (!called) {
            called = true
            reject(r)
          }
        })
      } catch (e) {
        if (!called) {
          reject(e)
        }
      }
    } else {
      resolve(x)
    }

  }
  else {
    resolve(x)
  }
}

// 其他API的实现，不在promises-aplus的测试用例中
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.resolve = function (v) {
  return new Promise(function (resolve) {
    resolve(v)
  })
}

Promise.reject = function (r) {
  return new Promise(function (resolve, reject) {
    reject(r)
  })
}

Promise.all = function (iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] != 'function') {
    throw TypeError(iterable + 'is not iterable')
  }
  var resolvedCount = 0
  var result = []


  return new Promise(function (resolve, reject) {
    var handleResolve = function (value, index) {
      result[index] = value
      resolvedCount++
      if (resolvedCount === iterable.length) {
        resolve(result)
      }
    }
    for (var i = 0; i < iterable.length; i++) {
      var elem = iterable[i]
      if (elem && typeof elem.then == 'function') {
        (function (i) {
          elem.then(function (v) {
            handleResolve(v, i)
          }, function (r) {
            reject(r)
          })
        })(i)
      } else {
        handleResolve(elem, i)
      }

    }
  })
}

Promise.race = function (iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] != 'function') {
    throw TypeError(iterable + 'is not iterable')
  }
  return new Promise(function (resolve, reject) {
    for (var i = 0; i < iterable.length; i++) {
      var elem = iterable[i]
      if (elem && typeof elem.then == 'function') {
        elem.then(resolve, reject)
      } else {
        resolve(elem)
      }
    }
  })
}

Promise.allSettled = function (iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] != 'function') {
    throw TypeError(iterable + 'is not iterable')
  }
  var result = []
  var settledCount = 0
  return new Promise(function (resolve, reject) {
    var handleSettled = function (value, index) { }
    for (var i = 0; i < iterable.length; i++) {
      var elem = iterable[i]
      if (elem && typeof elem.then == 'function') {
        (function (i) {
          elem.then(function (v) {
            result[i] = { status: 'fulfilled', value: v }
            settledCount++
            if (settledCount === iterable.length) {
              resolve(result)
            }
          }, function (r) {
            result[i] = { status: 'rejected', reason: r }
            settledCount++
            if (settledCount === iterable.length) {
              resolve(result)
            }
          })
        })(i)
      } else {
        result[i] = { status: 'fulfilled', value: elem }
        settledCount++
        if (settledCount === iterable.length) {
          resolve(result)
        }
      }
    }
  })
}

// promises-tests adapter
Promise.deferred = Promise.defer = function () {
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
```

## Promise的其他方法

虽然上述的promise源码已经符合PromiseA+的规范，但是原生的Promise还提供了一些其他方法，如:

1. Promise.resolve()
2. Promise.reject()
3. Promise.prototype.catch()
4. Promise.prototype.finally()
5. Promise.all()
6. Promise.race()

下面具体说一下每个方法的实现:

> ### Promise.resolve

Promise.resolve(value) 返回一个以给定值解析后的Promise 对象.

1. 如果 value 是个 thenable 对象，返回的promise会“跟随”这个thenable的对象，采用它的最终状态
2. 如果传入的value本身就是promise对象，那么Promise.resolve将不做任何修改、原封不动地返回这个promise对象。
3. 其他情况，直接返回以该值为成功状态的promise对象。

```javascript
Promise.resolve = function (param) {
        if (param instanceof Promise) {
        return param;
    }
    return new Promise((resolve, reject) => {
        if (param && typeof param === 'object' && typeof param.then === 'function') {
            setTimeout(() => {
                param.then(resolve, reject);
            });
        } else {
            resolve(param);
        }
    });
```

thenable对象的执行加 setTimeout的原因是根据原生Promise对象执行的结果推断的，如下的测试代码，原生的执行结果为: 20  400  30;为了同样的执行顺序，增加了setTimeout延时。

测试代码:

```javascript
let p = Promise.resolve(20);
p.then((data) => {
    console.log(data);
});


let p2 = Promise.resolve({
    then: function(resolve, reject) {
        resolve(30);
    }
});

p2.then((data)=> {
    console.log(data)
});

let p3 = Promise.resolve(new Promise((resolve, reject) => {
    resolve(400)
}));
p3.then((data) => {
    console.log(data)
});
```

> ### Promise.reject

Promise.reject方法和Promise.resolve不同，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。

```javascript
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}
```

> ### Promise.prototype.catch

Promise.prototype.catch 用于指定出错时的回调，是特殊的then方法，catch之后，可以继续 .then

```javascript
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}
```

> ### Promise.prototype.finally

不管成功还是失败，都会走到finally中,并且finally之后，还可以继续then。并且会将值原封不动的传递给后面的then.

```javascript
Promise.prototype.finally = function (callback) {
    return this.then((value) => {
        return Promise.resolve(callback()).then(() => {
            return value;
        });
    }, (err) => {
        return Promise.resolve(callback()).then(() => {
            throw err;
        });
    });
}
```

> ### Promise.all

Promise.all(promises) 返回一个promise对象

1. 如果传入的参数是一个空的可迭代对象，那么此promise对象回调完成(resolve),只有此情况，是同步执行的，其它都是异步返回的。
2. 如果传入的参数不包含任何 promise，则返回一个异步完成.
3. promises 中所有的promise都promise都“完成”时或参数中不包含 promise 时回调完成。
4. 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败
5. 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组

```js
Promise.all = function (promises) {
    promises = Array.from(promises);//将可迭代对象转换为数组
    return new Promise((resolve, reject) => {
        let index = 0;
        let result = [];
        if (promises.length === 0) {
            resolve(result);
        } else {
            function processValue(i, data) {
                result[i] = data;
                if (++index === promises.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                  //promises[i] 可能是普通值
                  Promise.resolve(promises[i]).then((data) => {
                    processValue(i, data);
                }, (err) => {
                    reject(err);
                    return;
                });
            }
        }
    });
}
```

测试代码:

```javascript
var promise1 = new Promise((resolve, reject) => {
    resolve(3);
})
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values); //[3, 42, 'foo']
},(err)=>{
    console.log(err)
});

var p = Promise.all([]); // will be immediately resolved
var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
console.log(p);
console.log(p2)
setTimeout(function(){
    console.log('the stack is now empty');
    console.log(p2);
});
```

> ### Promise.race

Promise.race函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。

如果传的参数数组是空，则返回的 promise 将永远等待。

如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

```javascript
Promise.race = function (promises) {
    promises = Array.from(promises);//将可迭代对象转换为数组
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return;
        } else {
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    resolve(data);
                    return;
                }, (err) => {
                    reject(err);
                    return;
                });
            }
        }
    });
}
```

测试代码:

```javascript
Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    undefined,
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log('success ', data);
}, (err) => {
    console.log('err ',err);
});

Promise.race([
    new Promise((resolve, reject) => { setTimeout(() => { resolve(100) }, 1000) }),
    new Promise((resolve, reject) => { setTimeout(() => { resolve(200) }, 200) }),
    new Promise((resolve, reject) => { setTimeout(() => { reject(100) }, 100) })
]).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});
```

> 作者：刘小夕
> 链接：https://juejin.cn/post/6844903796129136654

## 参考文献

- [x] [Promise的源码实现（完美符合Promise/A+规范）](https://juejin.cn/post/6844903796129136654)
- [x] [understanding-promise](https://github.com/MarvinXu/understanding-promise)
- [ ] [BAT前端经典面试问题：史上最最最详细的手写Promise教程](https://juejin.cn/post/6844903625769091079)
- [ ] [100 行代码实现 Promises/A+ 规范](https://mp.weixin.qq.com/s/qdJ0Xd8zTgtetFdlJL3P1g)
- [ ] [一步一步手写完美符合PromiseA+规范的Promise](https://mp.weixin.qq.com/s/vVlR9vGcGHHtThQfprDvIg)
- [ ] [小邵教你玩转promise源码](https://juejin.cn/post/6844903655418626061)

