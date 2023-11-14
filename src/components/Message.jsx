import React from "react";

function Message({ content }) {
  const isBuyer = content.posted_by === "BUYER";
  const isSeller = content.posted_by === "SELLER";
  const isOffer = content.content.includes("OFFER DONE --");
  const messageContent = isOffer
    ? content.content.replace("OFFER DONE --", "") // Retirer "OFFER DONE --"
    : content.content;

  return (
    <div
      className={`overflow-hidden m-2 bg-white border rounded-lg shadow-md messageCard ${
        isBuyer ? "buyer" : isSeller ? "seller" : ""
      } ${isOffer ? "isOffer" : ""} w-3/4`}
    >
      <div
        className={`bg-gray-200 px-4 py-2 font-bold uppercase text-sm text-gray-700 messageContent ${
          isOffer ? "text-yellow-900" : ""
        }`}
      >
        {isOffer ? "OFFER (see Offer Details)" : content.posted_by}
      </div>
      <div className="px-4 py-2">
        <blockquote className="text-gray-800">
          <p className="messageLine">{messageContent}</p>
          <footer className="text-gray-600 text-xs">
            {content.time_posted}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

export default Message;
