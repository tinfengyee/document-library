## 数组扁平化（又称数组降维）

MDN：`flat()` 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```javascript
const test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// flat不传参数时，默认扁平化一层
test.flat()
// ["a", "b", "c", "d", ["e", ["f"]], "g"]

// flat传入一个整数参数，整数即扁平化的层数
test.flat(2)
// ["a", "b", "c", "d", "e", ["f"], "g"]

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
test.flat(Infinity)
// ["a", "b", "c", "d", "e", "f", "g"]

// 传入 <=0 的整数将返回原数组，不扁平化
test.flat(0)
test.flat(-1)
// ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]

// 如果原数组有空位，flat()方法会跳过空位。
["a", "b", "c", "d",,].flat()
// ["a", "b", "c", "d"]
```

`Array.prototype.flat()` 总结：

- `Array.prototype.flat()` 用于将嵌套的数组扁平化，成为一维数组。该方法返回一个新的数组，对原数据没有影响
- 不传参数时，默认扁平化一层；传入一个整数时，这个整数代码想要扁平化的层数
- 传入 `<=0` 的整数将不进行扁平化，返回原数组
- `Infinity` 关键字作为参数时，无论是多少层嵌套，都会转为一维数组
- 另外，注意：如果原数组有空位，`Array.prototype.flat()`会跳过空位

### 实现

```js
const test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];

function flatDeep(arr, depth = 1) {
  if (depth > 0) {
    return Array.isArray(arr)
      ? arr.reduce((prev, cur) => [...prev, ...flatDeep(cur, depth - 1)], [])
      : arr;
  } else {
    return arr;
  }
}

console.log(flatDeep(test, 2));

```

### 方法一：使用 reduce 方法

一次性扁平化所有：

```javascript
function flattenDeep(arr) { 
    return Array.isArray(arr)
      ? arr.reduce( (acc, cur) => [...acc, ...flattenDeep(cur)] , []) // 1
      : [arr] // 2
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
flattenDeep(test)
// ["a", "b", "c", "d", "e", "f", "g"]

//1.相当于acc.push(...flat(cur)) return acc;
//2. ...flat(cur)进去可能不是数组,故用[arr]括起来, 不括不可以，不然'df'会被分成两个元素
```

实现 `flat` 函数：

```javascript
function flat(arr, depth = 1) {
    return depth > 0
        ? arr.reduce((acc, cur) => {
        if(Array.isArray(cur)) {
            return [...acc, ...flat(cur, depth-1)]
        }
        return [...acc, cur]
    } , [])
      : arr
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
// 不传参数时，默认扁平化一层
flat(test)
// ["a", "b", "c", "d", ["e", ["f"]], "g"]

// 传入一个整数参数，整数即扁平化的层数
flat(test, 2)
// ["a", "b", "c", "d", "e", ["f"], "g"]

// Infinity 关键字作为参数时，无论多少层嵌套，都会转为一维数组
flat(test, Infinity)
// ["a", "b", "c", "d", "e", "f", "g"]

// 传入 <=0 的整数将返回原数组，不扁平化
flat(test, 0)
flat(test, -10)
// ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]];

// 如果原数组有空位，flat()方法会跳过空位。
var arr = ["a", "b", "c", "d",,]
flat(arr)
// ["a", "b", "c", "d"]
```

### 方法二：栈

一次性降维所有

```javascript
function flattenDeep(arr) {
  const result = [] 
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr]
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop() 
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val) 
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val)
    }
  }
  return result
}

// 测试
var test = ["a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
flattenDeep(animals)
// ["a", "b", "c", "d", "e", "f", "g"]
```

自己写的

```javascript
var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

function flat(arr, depth = 1) {
  return depth > 0 ? 
  (Array.isArray(arr) ? arr.reduce((prev, cur) => {
    // prev.push(...flat(cur, depth - 1))
    // arr.reduce((prev, cur) => [...prev, ...flatDeep(cur, depth - 1)], [])
    return prev.concat(flat(cur, depth - 1))
  }, []) : arr) : arr
}
console.log(flat(arr1, Infinity));

// forEach 遍历数组会自动跳过空元素
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr, depth)
  // 返回递归结果
  return result;
}
```

### 数组去重

#### 方式一：Set（ES6）

```javascript
function unique(arr) {
    return Array.from(new Set(arr))
}
// 或者
var unique = arr => [...new Set(arr)]

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```

#### 方式二：reduce

```javascript
function unique (arr) {
    return arr.sort().reduce((acc, cur) => {
     if (acc.length === 0 || acc[acc.length - 1] !== cur) {
         acc.push(cur);
     }
     return acc
 }, [])}
;

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```

#### 方法三：filter

```javascript
function unique(arr) { 
    return arr.filter( (element, index, array) => {
     return array.indexOf(element) === index
 })
}

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
```