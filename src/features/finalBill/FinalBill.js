import React from 'react'
import { createResultsStringsOwerEven, createResultsStringsOwed } from '../../utils/functions'
import "./finalBill.css"

export default function FinalBill(billing) {
  console.log("FINAL BILL CALLED", billing.billing.owers)
  return (
    <div className="final-bill">
        <h2>Settle it:</h2>
      {createResultsStringsOwerEven(billing.billing.owers[0])}
      {createResultsStringsOwerEven(billing.billing.even[0])}
      {createResultsStringsOwed(billing.billing.owed[0])}
    </div>
  )
}
