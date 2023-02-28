import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";

export default function Result() {
  const payers = useSelector(selectPayers);
  let totalArray = payers.map((payer) => payer.amount);
  let total = totalArray.reduce((a, b) => a + b);
  const payersTrimmed = payers.slice(1);
  const share = total / payersTrimmed.length;

  function calculateBalance(share, paid) {
    return (share - paid).toFixed(2);
  }

  function splitOwersAndOwed(payersTrimmed, share) {
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
  let owersAndOwedRef = splitOwersAndOwed(payersTrimmed, share);
  console.log("OWERS AND OWED:", owersAndOwedRef);

  return (
    <>
      <div className="allData">
        <div className="summaryData">
          <h1>Total paid: {total}</h1>
          <h2> Each owes: {share.toFixed(2)}</h2>
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
                  {payer.name} owed: {calculateBalance(share, payer.amount)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
