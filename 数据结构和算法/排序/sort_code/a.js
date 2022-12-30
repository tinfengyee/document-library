function add(a, b) {
  const maxLen = Math.max(
    a.toString().split(".")[1].length,
    b.toString().split(".")[1].length
  );
  
  const base = 10 ** maxLen;
  const bigA = base * a
  const bigB = base * b
  return (bigA + bigB) / base
    
  // const bigA = BigInt(base * a);
  // const bigB = BigInt(base * b);
  // console.log(bigA)
  // console.log(bigB)
  
  
  // const bigRes = (bigA + bigB) / BigInt(base); // 如果是 (1n + 2n) / 10n 是等于 0n的。。。
  // console.log(bigRes)
  
  // return Number(bigRes);
}
console.log(add('0.1', '0.22'));
