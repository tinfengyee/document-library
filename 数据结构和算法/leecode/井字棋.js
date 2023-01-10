/*
题目：对于一个给定的井字棋棋盘，请设计一个高效算法判断当前玩家是否获胜。

给定一个二维数组board，代表当前棋盘，其中元素为1的代表是当前玩家的棋子，为0表示没有棋子，为-1代
表是对方玩家的棋子。
测试样例：
[[1,0,1],[1,-1,-1],[1,-1,0]]
返回：true
*/
let arr = [
  [1, 0, 1],
  [0, 1, -1],
  [0, -1, 0],
];

function gameCheck(arr) {
  const len = arr.length; // 行数
  // 列和行判断
  for (let i = 0; i < len; i++) {
    let rowCount = 0;
    let colCount = 0;
    for (let j = 0; j < len; j++) {
      rowCount += arr[i][j];
      colCount += arr[j][i];
    }
    if (rowCount === len || colCount === len) {
      return true;
    }
  }

  // 对角线判断
  let angleMain = 0;
  let angleSub = 0;
  for (let i = 0; i < len; i++) {
    angleMain += arr[i][i];
    angleSub += arr[i][len - 1 - i];
  }
  if (angleMain === len || angleSub === len) {
    return true;
  }

  return false;
}

console.log(gameCheck(arr));
