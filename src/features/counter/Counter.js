import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementByAmount,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { addPayer } from '../paymentsMade/paymentsMadeSlice';
import { selectPayers } from '../paymentsMade/paymentsMadeSlice';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [payer, setPayer] = useState("")
  const incrementValue = Number(incrementAmount) || 0;
console.log("BABB", addPayer("babb"))

  function handleClick(){
    console.log("action object data:", incrementValue, payer)
    dispatch(incrementByAmount(incrementValue));
  }

  return (
    <div>
      <div className={styles.row}>
      </div>
      <div className={styles.row}>
      <input
          className={styles.textbox}
          aria-label="Payer name"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add 
        </button>
        {/* <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button> */}
        {/* <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button> */}
      </div>
    </div>
  );
}
