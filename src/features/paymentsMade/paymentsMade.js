import React from "react";

export default function PaymentsMade({ payers }) {
  return (
    <div >
        <h2>Contributions:</h2>
      {payers.map((payer) => {
        return (
  
          <p>
            {payer.name} paid {payer.amount}
          </p>
        );
      })}
    </div>
  );
}
