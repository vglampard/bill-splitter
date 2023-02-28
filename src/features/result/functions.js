export function splitOwersAndOwed(payersTrimmed, share) {
    let owers = [];
    let owed = [];
    for (let i = 0; i < payersTrimmed.length; i++) {
      calculateBalance(share, payersTrimmed[i].amount) < 0
        ? owed.push(payersTrimmed[i])
        : owers.push(payersTrimmed[i]);
      owers.sort((a, b) => sortByAmountDesc(a, b));
      owed.sort((a, b) => sortByAmountDesc(a, b)).reverse();
    }
    function sortByAmountDesc(a, b) {
      return a.amount - b.amount;
    }
    return { owers, owed };
  }

  export function calculateBalance(share, paid) {
    return (share - paid).toFixed(2);
  }