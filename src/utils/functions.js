export function calculateBalance(share, paid) {
  return (share - paid).toFixed(2);
}

export function sortByAmountDesc(a, b) {
    return a.amount - b.amount;
  }

export function getTotalPaid(payers){
  let payments = payers.map((payer)=>payer.amount)
  return payments.reduce((a, b)=> a+b)
}

export function getShare(payers, total){
return total/payers.length;
}

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

export function tallyCheck(payers){
  let tallyArray = payers.map((payer)=> payer.moneyPending)
  return tallyArray.reduce((a, b)=>(a+b)).toFixed(3) 
}

export function createBillingArrays(payersPending){
  let billing ={
    owers: [],
    owed: [],
    even: []
  }
  billing.owers.push(payersPending.filter(payer=> payer.moneyPending>0))
  billing.owed.push(payersPending.filter(payer=> payer.moneyPending<0))
  billing.even.push(payersPending.filter(payer=> payer.moneyPending===0))
  return billing;
}


export function addPaymentRecipient(billing){
 
billing.owers.forEach((payer)=>{payer.recipient = billing.owed[0][0].name} )
billing.even.forEach((payer)=>{payer.recipient = "nobody"} )
return billing
}