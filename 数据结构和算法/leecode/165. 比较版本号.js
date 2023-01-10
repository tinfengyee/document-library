// https://leetcode.cn/problems/compare-version-numbers/
function compareVersion(version1, version2) {
  // ... 这里写代码实现
  let v1 = version1.split(".");
  let v2 = version2.split(".");
  let maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    let idx1 = Number(v1[i] || 0);
    let idx2 = Number(v2[i] || 0);
    if (idx1 > idx2) return 1;
    else if (idx1 < idx2) return -1;
  }
  return 0;
}
