import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";
import { splitOwersAndOwed, calculateBalance } from "./functions";
import { useState } from "react";
import FinalBill from "../finalBill/FinalBill";

export default function Result() {
  const payers = useSelector(selectPayers);
  let totalArray = payers.map((payer) => payer.amount);
  let total = totalArray.reduce((a, b) => a + b);
  const payersTrimmed = payers.slice(1);
  const share = total / payersTrimmed.length;
  const [finalResult, setFinalResult] = useState(false)

  let owersAndOwedRef = splitOwersAndOwed (payersTrimmed, share)
  console.log("OWERS/OWED:", owersAndOwedRef)
 ;


 function whoPaysWho(owersAndOwedRef, share, total){
// all in person.name in oaor pay person.amount to owed[0].name
let owersRes = owersAndOwedRef.owers.map((person)=>({...person, pays: owersAndOwedRef.owed[0].name}))

// take kitty, sum of all money transferred. owed[0] receives kitty. kitty is set to kitty-share; owed[0] pays owed[1] the current value of kitty; continues until kitty is between 0 and 1 (pound)
let kitty = total
for (let i=0; i<owersAndOwedRef.owed.length; i++){
kitty -= share;
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
      {/* <div className="paidData">
          {payersTrimmed.map((payer) => {
            return (
              <p>
                {payer.name} paid {payer.amount}
              </p>
            );
          })}
        </div> */}
    </>
  );
}
