import React from 'react'
import { createResultsStringsOwerEven, createResultsStringsOwed } from '../../utils/functions'

export default function FinalBill(billing) {
  console.log("FINAL BILL CALLED", billing.billing.owers)
  return (
    <div>
      {createResultsStringsOwerEven(billing.billing.owers[0])}
      {createResultsStringsOwerEven(billing.billing.even[0])}
      {createResultsStringsOwed(billing.billing.owed[0])}
    </div>
  )
}
