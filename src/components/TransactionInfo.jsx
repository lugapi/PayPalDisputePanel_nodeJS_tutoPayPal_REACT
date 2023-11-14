// TransactionInfo.jsx

import React from "react";

function TransactionInfo({ content }) {
  return (
    <>
      <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
        <h2 className="underline">Transaction infos</h2>
        <ul>
          <li>
            <p>
              Amount : {content.gross_amount.value}{" "}
              {content.gross_amount.currency_code}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default TransactionInfo;
