// DisputeDetail.jsx

import React, { useState } from "react";
import MessageThread from "./MessageThread";
import DisputeInfo from "./DisputeInfo";
import SellerInfo from "./SellerInfo";
import BuyerInfo from "./BuyerInfo";
import TransactionInfo from "./TransactionInfo";
import AllowedActionInfo from "./AllowedActionInfo";
import HistoryInfo from "./HistoryInfo";
import OfferInfo from "./OfferInfo";
import SendMessage from "./SendMessage";
import MakeOffer from "./MakeOffer";

function DisputeDetail({ dispute, accessToken, handleBackToList }) {
  const [isSendMessageOpen, setSendMessageOpen] = useState(false);
  const [isMakeOfferOpen, setMakeOfferOpen] = useState(false);

  const isSendMessageAllowed = dispute.detail.links.some(
    (link) => link.rel === "send_message"
  );
  const isSendOfferAllowed = dispute.detail.links.some(
    (link) => link.rel === "make_offer"
  );

  const [messages, setMessages] = useState(dispute.detail.messages);

  const handleSendMessage = async (response) => {
    // Adapt the response to match the structure of existing messages
    const newMessage = {
      content: response.text,
      posted_by: response.postedBy,
      time_posted: response.timestamp,
    };

    // Update the list of messages with the new message
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // You can update the UI or perform any other necessary actions
  };

  const handleSendOffer = async (response) => {
    // // Adapt the response to match the structure of existing messages
    // const newMessage = {
    //     content: response.text,
    //     posted_by: response.postedBy,
    //     time_posted: response.timestamp,
    // };

    // // Update the list of messages with the new message
    // const updatedMessages = [...messages, newMessage];
    // setMessages(updatedMessages);

    // // You can update the UI or perform any other necessary actions
    console.log("handleSendOffer", response);
  };

  return (
    <div className="dispute-detail flex justify-center flex-wrap">
      <div className="flex flex-col sidebar w-1/3 order-first md:order-1">
        {/* <h2>Dispute Details</h2> */}
        <div className="dispute-info flex flex-col gap-5 p-5">
          <DisputeInfo content={dispute} />
          <SellerInfo content={dispute.detail.disputed_transactions[0]} />
          <BuyerInfo content={dispute.detail.disputed_transactions[0]} />
          <TransactionInfo content={dispute.detail.disputed_transactions[0]} />
          <AllowedActionInfo content={dispute.detail} />
        </div>
      </div>
      <div className="flex w-1/3 order-2 md:order-3">
        <div className="dispute-messages flex flex-col w-full">
          <div className="messageThread flex flex-col w-full">
            <MessageThread messages={messages} />
          </div>
          <div className="send-message flex flex-col w-full">
            <div className="flex gap-2 w-full p-5 justify-around">
              {isSendMessageAllowed && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  onClick={() => {
                    setSendMessageOpen(!isSendMessageOpen);
                    if (isMakeOfferOpen) {
                      setMakeOfferOpen(false);
                    }
                  }}
                >
                  {isSendMessageOpen ? "Close" : "Send Message"}
                </button>
              )}
              {isSendOfferAllowed && (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                  onClick={() => {
                    setMakeOfferOpen(!isMakeOfferOpen);
                    if (isSendMessageOpen) {
                      setSendMessageOpen(false);
                    }
                  }}
                >
                  {isMakeOfferOpen ? "Close" : "Make Offer"}
                </button>
              )}
            </div>
            <div className="actions">
              <div
                className={`${
                  isSendMessageOpen ? "" : "hidden"
                } border p-2 mb-2 rounded-lg`}
              >
                {isSendMessageAllowed && (
                  <SendMessage
                    accessToken={accessToken}
                    disputeId={dispute.detail.dispute_id}
                    onSendMessage={handleSendMessage}
                    handleBackToList={handleBackToList}
                  />
                )}
              </div>
              <div
                className={`${
                  isMakeOfferOpen ? "" : "hidden"
                } border p-2 mb-2 rounded-lg`}
              >
                {isSendOfferAllowed && (
                  <MakeOffer
                    accessToken={accessToken}
                    disputeId={dispute.detail.dispute_id}
                    onSendOffer={handleSendOffer}
                    handleBackToList={handleBackToList}
                  />
                )}
              </div>
            </div>
            {/* Ajoutez des titres pour ouvrir/fermer les formulaires */}
          </div>
        </div>
      </div>
      <div className="history-info flex flex-col gap-5 p-5 w-1/3 order-last md:order-2">
        {" "}
        {/* Ajoutez cette section */}
        <HistoryInfo history={dispute.detail.history} />
        <OfferInfo offer={dispute.detail.offer} />
      </div>
      {/* Ajoutez d'autres sections pour afficher les autres informations du litige */}
    </div>
  );
}

export default DisputeDetail;
