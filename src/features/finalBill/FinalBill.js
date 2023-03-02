import React from 'react'
import { createResultsStrings } from '../../utils/functions'

export default function FinalBill({billing}) {
  console.log("FINAL BILL CALLED")
  return (
    <div>
      {createResultsStrings(billing.owers[0])}
    </div>
  )
}
