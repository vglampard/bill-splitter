import { useSelector } from "react-redux";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";
import { splitOwersAndOwed, calculateBalance } from "../../utils/functions";
import { useState } from "react";
import FinalBill from "../finalBill/FinalBill";
import PaymentsMade from "../paymentsMade/paymentsMade";
import { getTotalPaid, tallyCheck, createBillingArrays } from "../../utils/functions";

export default function Result() {
  const payersArr = useSelector(selectPayers)
const total = getTotalPaid(payersArr)
  const payers = payersArr.slice(1)
  const share = total / payers.length;

  // add new property to objects, 'moneyPending', using calculate balance

let payersPending = payers.map((a)=>({...a, moneyPending: Number(calculateBalance(share, a.amount))}))

// CHECK that tally of money pending is more or less 0
console.log("CHECK TALLY EVENS OUT:", tallyCheck(payersPending))

  // splitting functions up with button so they don't start running toe soon 
  const [finalResult, setFinalResult] = useState(false)
  
  // Split into 3 arrays stored in billing object: owed, ower, even
  let billing = createBillingArrays(payersPending)
// CALC CHECK PASSES

console.log("BILLING OBJ:",billing )

  let owersAndOwedRef = splitOwersAndOwed (payers, share)
  console.log("OWERS/OWED:", owersAndOwedRef)
 ;

 function whoPaysWho(owersAndOwedRef, share, total){
  // find out the amount owed[0] is paid DONE
  // subtract from that the amount they are owed
  // the rest goes to the next person 

// all in person.name in oaor pay person.amount to owed[0].name
let owersRes = owersAndOwedRef.owers.map((person)=>({...person, pays: owersAndOwedRef.owed[0].name}))
let totalPaidToFirst = owersRes.map((ower)=>ower.toPay)
console.log("HERE", totalPaidToFirst)
// STUCK HERE

// take kitty, sum of all money transferred. owed[0] receives kitty. kitty is set to kitty-share; owed[0] pays owed[1] the current value of kitty; continues until kitty is between 0 and 1 (pound)
let kitty = totalPaidToFirst
for (let i=0; i<owersAndOwedRef.owed.length; i++){
  console.log("Kitty before deduction:", kitty)
kitty -= share;
console.log("Kitty after deduction:", kitty)
owersAndOwedRef.owed[i].toPay = kitty;
owersAndOwedRef.owed[i].pays = owersAndOwedRef.owed[i+1]
if(kitty<=1) break;
}
console.log("OWERSRES", owersRes)
console.log("OWEDRES", owersAndOwedRef.owed)
// return owersRes
 }

function handleClick(){whoPaysWho(owersAndOwedRef, share, total); setFinalResult(!finalResult)}
  return (
    <>
      <div className="allData">
        <div className="summaryData">
          <h1>Total paid: {total}</h1>
          <h2> Each person's share: {share.toFixed(2)}</h2>
        </div>
       
        <div className="results">
          <div className="owesData">
            {owersAndOwedRef.owers.map((payer) => {
              return (
                <p>
                  {payer.name} owes: {calculateBalance(share, payer.amount)}
                </p>
              );
            })}
          </div>
          <div className="owedData">
            {owersAndOwedRef.owed.map((payer) => {
              return (
                <p>
                  {payer.name} is owed: {Math.abs(calculateBalance(share, payer.amount))}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="finalPayment">
        <h3> WHO PAYS WHO WHAT:🛠️🛠️🛠️ in progress... </h3>
        <button onClick={handleClick}>Calculate</button>
        {finalResult && <FinalBill/>}
      </div>
     <PaymentsMade payers = {payers}/>
    </>
  );
}
