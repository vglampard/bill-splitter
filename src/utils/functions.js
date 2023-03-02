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
  billing.even.push(payersPending.filter(payer=> payer.moneyPending===0));

 billing.owed[0] = billing.owed[0].sort((a,b)=> (a.moneyPending-b.moneyPending))
  return billing;
}


export function addPaymentRecipient(billing){
 
if(billing.owers[0].length>1){billing.owers[0].forEach((payer)=>{payer.recipient = billing.owed[0][0].name} )}
billing.even[0].forEach((payer)=>{payer.recipient = "nobody"} )
const totalOwedArr = billing.owers[0].map((ower)=>ower.moneyPending)
const totalOwed = totalOwedArr.reduce((a, b)=> a+b)
console.log("TOTAL OWED:", totalOwed)
handDownPay(billing.owed[0], totalOwed)
return billing
}

// could tweak paid > 0,5 here because rounding error mean fractional pos value here will break the function
export function handDownPay(owed, paid){
for (let i=0; i<owed.length; i++){
  paid+= owed[i].moneyPending;
  owed[i].toPay = paid>0.5? owed[i+1].name : "nobody"
  console.log("paid over:", paid)
}

console.log("OWED WITH RECIP:", owed)
console.log("remainder:", paid)
}