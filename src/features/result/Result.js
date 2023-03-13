import { useSelector } from "react-redux";
import {useState} from 'react'
import { selectPayers } from "../paymentsMade/paymentsMadeSlice";
import React from "react";
import "./results.css";
import { calculateBalance } from "../../utils/functions";
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
  const [billing, setBilling] = useState({})
  const [contributors, setContributors] = useState(false)
  // add new property to objects, 'moneyPending', using calculate balance

  let payersPending = payers.map((a) => ({
    ...a,
    moneyPending: Number(calculateBalance(share, a.amount)),
  }));
  console.log("PAYERS PENDING:", payersPending);

  // splitting functions up with button so they don't start running toe soon
  const [finalResult, setFinalResult] = useState(false);

  // CALC CHECK PASSES

  // add recipients to each object, starting with the owers as these are aesy: they all pay to the person owed most (CHECK that this is going to that person -> the sorting might be inthe wrong direction!)

  function generateBill() {
    // CHECK that tally of money pending is more or less 0
    console.log("CHECK TALLY EVENS OUT:", tallyCheck(payersPending));
    // Split into 3 arrays stored in billing object: owed, ower, even
    let billing = createBillingArrays(payersPending);
    console.log("BILLING:", billing);
  addPaymentRecipient(billing);
    setBilling(billing);
    setFinalResult(!finalResult);
  }

function toggleContributors(){
setContributors(!contributors)
}

  return (
    <>
      <div className="allData">
        <div className="summaryData">
          <h2>Total paid: {total}</h2>
          {!isNaN(share) && <h3> Each should pay: {share.toFixed(2)}</h3>}
        </div>

        <div className="results">
          <button onClick={toggleContributors}>See contributors </button>
          <button onClick={generateBill}>Calculate bill </button>
        </div>
      </div>
  
      {contributors && <PaymentsMade payers={payers} />}
      {finalResult && <FinalBill billing = {billing}/>}
</>
  );
}
