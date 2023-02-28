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

  let owersAndOwedRef = splitOwersAndOwed(payersTrimmed, share);

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
                  {payer.name} is owed: {calculateBalance(share, payer.amount)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
