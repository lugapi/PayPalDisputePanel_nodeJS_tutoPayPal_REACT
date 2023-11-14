// BuyerInfo.jsx

import React from "react";

function BuyerInfo({ content }) {
  console.log(content);
  return (
    <>
      <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
        <h2 className="underline">Buyer infos</h2>
        <ul>
          <li>
            <p>Merchant Email : {content.buyer.email}</p>
          </li>
          <li>
            <p>Buyer Transaction ID : {content.buyer_transaction_id}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default BuyerInfo;
