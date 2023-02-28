import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";
import { splitOwersAndOwed, calculateBalance } from "./functions";

export default function Result() {
  const payers = useSelector(selectPayers);
  let totalArray = payers.map((payer) => payer.amount);
  let total = totalArray.reduce((a, b) => a + b);
  const payersTrimmed = payers.slice(1);
  const share = total / payersTrimmed.length;

  let owersAndOwedRef = splitOwersAndOwed (payersTrimmed, share)
  console.log("OWERS/OWED:", owersAndOwedRef)
 ;


 function whoPaysWho(owersAndOwedRef){
// all in person.name in oaor pay person.amount to owed[0].name
let owersRes = owersAndOwedRef.owers.map((person)=>({...person, pays: owersAndOwedRef.owed[0].name}))
console.log("DID IT WORK", owersRes)
 }
 whoPaysWho(owersAndOwedRef);

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
        <h3> {Object.keys(owersAndOwedRef.owers)}</h3>
      </div>
      <div className="paidData">
          {payersTrimmed.map((payer) => {
            return (
              <p>
                {payer.name} paid {payer.amount}
              </p>
            );
          })}
        </div>
    </>
  );
}
