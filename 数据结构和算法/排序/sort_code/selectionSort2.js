const { swap, randomArr } = require("./utils");

let arr = randomArr(5, 1, 10);

function selectionSort2(arr) {
  const { length } = arr;
  for (let i = 0; i < length / 2; i++) {
    let min = i,
      max = i;
    for (let j = i + 1; j < length - i; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
      if (arr[j] > arr[max]) {
        max = j;
      }
    }
    // [arr[i], arr[min]] = [arr[min], arr[i]];
    swap(arr, i, min)
    // 如果最大值的下标等于 i，也就是说 arr[i] 就是最大值
    // 由于 arr[i] 是当前遍历轮次的首位，它已经和 arr[minIndex] 交换了
    // 所以最大值的下标需要跟踪到 arr[i] 最新的下标 minIndex。
    /**
     * 如 数组 [18, 3, 9, 1, 5]
     * 第一轮 min = 3, max = 0, 经过 min 和 i 交换， 此时 18 已经在下标 3 的位置了，所以需要 max = min
     */
    if (max === i) {
      max = min;
    }

    // [arr[length - i - 1], arr[max]] = [arr[max], arr[length - i - 1]];
    swap(arr, length - i - 1, max)
  }
  return arr;
}

console.log(selectionSort2(arr));