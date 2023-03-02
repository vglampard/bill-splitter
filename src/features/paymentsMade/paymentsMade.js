import React from 'react'

export default function PaymentsMade({payers}) {
  return (
    <div>{payers.map((payer) => {
        return (
          <p>
            {payer.name} paid {payer.amount}
          </p>
        );
      })}</div>
  )
}
