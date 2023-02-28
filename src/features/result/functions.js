export function splitOwersAndOwed(payersTrimmed, share) {
  let owers = [];
  let owed = [];
  for (let i = 0; i < payersTrimmed.length; i++) {
    let balance = calculateBalance(share, payersTrimmed[i].amount);
    balance < 0
      ? owed.push({ ...payersTrimmed[i], toPay: balance })
      : owers.push({ ...payersTrimmed[i], toPay: balance });
    owers.sort((a, b) => sortByAmountDesc(a, b));
    owed.sort((a, b) => sortByAmountDesc(a, b)).reverse();
  }

 
  return { owers, owed };
}

export function calculateBalance(share, paid) {
  return (share - paid).toFixed(2);
}

function sortByAmountDesc(a, b) {
    return a.amount - b.amount;
  }