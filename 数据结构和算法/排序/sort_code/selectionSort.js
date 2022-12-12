const { swap, randomArr } = require("./utils");

let arr = randomArr(5, 1, 10);

function selectionSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }
    swap(arr, minIndex, i);
  }
  return arr;
}

console.log(selectionSort(arr));
