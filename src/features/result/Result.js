import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";

export default function Result() {
  const count = useSelector(selectCount);
  const payers = useSelector(selectPayers)
 let totalArray = payers.map((payer)=>payer.amount)
 console.log("TOTAL ARRAY:", totalArray)
 let total = totalArray.reduce((a, b)=>a+b)
 console.log("PAYERS:", payers)
 console.log("TOTAL:", total)
  return (
    <>
      {" "}
      <div>{count}</div>
      <div>{payers.map((payer)=> {console.log("PLAYER IN MAP:", payer); return <p>{payer.name}, {payer.amount}</p>})} 
      <h1>Total paid: {total}</h1></div>
    </>
  );
}
