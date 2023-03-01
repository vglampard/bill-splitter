import { useSelector } from "react-redux";
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";
import { splitOwersAndOwed, calculateBalance } from "../../utils/functions";
import { useState } from "react";
import FinalBill from "../finalBill/FinalBill";
import PaymentsMade from "../paymentsMade/paymentsMade";
import {
  getTotalPaid,
  tallyCheck,
  createBillingArrays,
  addPaymentRecipient,
} from "../../utils/functions";

export default function Result() {
  const payersArr = useSelector(selectPayers);
  const total = getTotalPaid(payersArr);
  const payers = payersArr.slice(1);
  const share = total / payers.length;

  // add new property to objects, 'moneyPending', using calculate balance

  let payersPending = payers.map((a) => ({
    ...a,
    moneyPending: Number(calculateBalance(share, a.amount)),
  }));
  console.log("PAYERS PENDING:", payersPending)
  // CHECK that tally of money pending is more or less 0
  // console.log("CHECK TALLY EVENS OUT:", tallyCheck(payersPending));

  // splitting functions up with button so they don't start running toe soon
  const [finalResult, setFinalResult] = useState(false);

  // Split into 3 arrays stored in billing object: owed, ower, even
  let billing = createBillingArrays(payersPending);
  // CALC CHECK PASSES

  // add recipients to each object, starting with the owers as these are aesy: they all pay to the person owed most (CHECK that this is going to that person -> the sorting might be inthe wrong direction!)

  // console.log("RECIPADDED:", addPaymentRecipient(billing) )
console.log("BILLING:", billing)

  function handleClick() {
    setFinalResult(!finalResult);
  }
  return (
    <>
      <div className="allData">
        <div className="summaryData">
          <h1>Total paid: {total}</h1>
          <h2> Each person's share: {share.toFixed(2)}</h2>
        </div>

        <div className="results">
      
        </div>
      </div>
      <div className="finalPayment">
        <h3> WHO PAYS WHO WHAT:🛠️🛠️🛠️ in progress... </h3>
        <button onClick={handleClick}>Calculate</button>
        {finalResult && <FinalBill />}
      </div>
      <PaymentsMade payers={payers} />
    </>
  );
}
