// SellerInfo.jsx

import React from "react";

function SellerInfo({ content }) {
    console.log(content);
    return (
        <>
            <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
                <h2 className="underline">Seller infos</h2>
                <ul>
                    <li>
                        <p>Merchant ID : {content.seller.merchant_id}</p>
                    </li>
                    <li>
                        <p>Merchant Email : {content.seller.email}</p>
                    </li>
                    <li>
                        <p>
                            Seller Transaction ID :{" "}
                            {content.seller_transaction_id}
                        </p>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SellerInfo;
