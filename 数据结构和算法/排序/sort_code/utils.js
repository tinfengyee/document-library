function swap(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

function randomNum(min = 0, max = 100) {
  let num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}

function randomArr(len = 6, min = 1, max = 10) {
  if (len > max - min + 1) {
    throw new Error('range error: min to max num item less than len mum!')
  }
  let set = new Set()
  while(len !== set.size) {
    let item = randomNum(min, max)
    set.add(item)
  }
  console.log('randomArr:', set)
  return Array.from(set)
}

module.exports = {
  swap,
  randomNum,
  randomArr
}
