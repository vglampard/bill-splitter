import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";

export default function Result() {
  const count = useSelector(selectCount);
  const payers = useSelector(selectPayers);
  let totalArray = payers.map((payer) => payer.amount);
  let total = totalArray.reduce((a, b) => a + b);
  const payersTrimmed = payers.slice(1)

  const share = total / (payersTrimmed.length);
  function calculateBalance(share, paid) {
    return share-paid}
  return (
    <>
      {" "}
      <div>{count}</div>
      <div>
   
        {payersTrimmed.map((payer) => {
          return (
            <p>
              {payer.name}, {payer.amount}
            </p>
          );
        })}
        <h1>Total paid: {total}</h1>
        <h2> Each owes: {share.toFixed(2)}</h2>
        {payersTrimmed.map((payer)=>{
          return (
            <p>{payer.name}: {(share-payer.amount).toFixed(2)}</p>
          )
          })}
      </div>
    </>
  );
}
