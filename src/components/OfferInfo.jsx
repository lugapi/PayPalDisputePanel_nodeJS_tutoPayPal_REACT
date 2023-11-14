import React from "react";

function OfferInfo({ offer }) {
  return (
    <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
      <h2 className="underline">Offer Details</h2>
      {offer ? (
        <>
          {offer.buyer_requested_amount && (
            <p>
              Buyer Requested Amount: {offer.buyer_requested_amount.value}{" "}
              {offer.buyer_requested_amount.currency_code}
            </p>
          )}
          {offer.seller_offered_amount && (
            <p>
              Seller Offered Amount: {offer.seller_offered_amount.value}{" "}
              {offer.seller_offered_amount.currency_code}
            </p>
          )}
          {offer.offer_type && <p>Offer Type: {offer.offer_type}</p>}
          {offer.history && offer.history.length > 0 ? (
            <>
              <h3>Offer History</h3>
              <ul>
                {offer.history.map((event, index) => (
                  <li key={index}>
                    {event.offer_amount && (
                      <p>
                        {event.offer_time} - {event.actor} - {event.event_type}{" "}
                        - {event.offer_amount.value}{" "}
                        {event.offer_amount.currency_code}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No offer history available for this dispute.</p>
          )}
        </>
      ) : (
        <p>No offer available for this dispute.</p>
      )}
    </div>
  );
}

export default OfferInfo;
