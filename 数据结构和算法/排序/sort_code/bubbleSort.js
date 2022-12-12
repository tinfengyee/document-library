const { swap, randomArr } = require("./utils");

let arr = randomArr(10, 0, 20);

function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let isSort = true;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSort = false;
      }
    }
    if (isSort) break;
  }
  return arr;
}

console.log(bubbleSort(arr));
