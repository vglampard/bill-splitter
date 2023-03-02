import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Counter.module.css";
import { addPayer } from "../paymentsMade/paymentsMadeSlice";

// NOT a counter, but in fact the input component where users input a person who contributed to a total bill, and how much they paid.
export function Counter() {
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("How much?");
  const [payer, setPayer] = useState("");
  // change amount from input string to number
  const incrementValue = Number(incrementAmount) || 0;

  function handleClick() {
    // add new payer to the payers array via reducer action 
    dispatch(addPayer({ name: payer, amount: incrementValue }));
  }

  return (
    <div>
      <div className={styles.row}></div>
      <div className={styles.row}>
        <input
          aria-label="Payer name"
          value={payer}
          onChange={(e) => {setPayer(e.target.value)
          e.target.value=""}}
        />
        <input
          aria-label="Payment amount"
          type="number" pattern="[0-9]*" inputmode="numeric"
          value={incrementAmount}
          onChange={(e) => {setIncrementAmount(e.target.value);}}
        />
        <button className={styles.button} onClick={handleClick} 
        disabled={!payer}>
          Add to bill
        </button>
      </div>
    </div>
  );
}
