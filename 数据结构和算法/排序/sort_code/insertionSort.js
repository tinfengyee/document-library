// 两种方法都是为了记住当前元素，一个是使用下标，一个是使用临时变量。
const { swap, randomArr } = require("./utils");

let arr = randomArr(5, 1, 10);

function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    // target 保存当前操作元素下标
    let target = i;
    for (let j = i - 1; j >= 0; j--) {
      if (arr[target] < arr[j]) {
        swap(arr, target, j);
        target = j;
      } else {
        break;
      }
    }
  }
  return arr;
}

function insertionSort2(arr) {
  const len = arr.length;
  let temp;
  for (let i = 1; i < len; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && temp < arr[j - 1]) {
      // 让较大的元素一个个往后移动
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

console.log(insertionSort2(arr));
