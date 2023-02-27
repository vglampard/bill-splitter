import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "../counter/counterSlice";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";

export default function Result() {
  const count = useSelector(selectCount);
  const payers = useSelector(selectPayers)
 
 console.log("PATYERS:", payers)
  return (
    <>
      {" "}
      <div>{count}</div>
      <div>Payers: {payers}</div>
    </>
  );
}
