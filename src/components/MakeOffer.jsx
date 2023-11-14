import React, { useState } from "react";

function MakeOffer({ disputeId, accessToken, onSendOffer, handleBackToList }) {
  const [offerAmount, setOfferAmount] = useState("");
  const [offerType, setOfferType] = useState("REFUND");
  const [note, setNote] = useState(""); // Ajoutez un état pour la note
  const [sending, setSending] = useState(false);

  const handleSendOffer = async () => {
    try {
      setSending(true);

      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/customer/disputes/${disputeId}/make-offer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            note: "OFFER DONE -- " + note, // Utilisez la note depuis l'état
            offer_amount: {
              currency_code: "USD",
              value: offerAmount,
            },
            offer_type: offerType,
          }),
        }
      );

      if (response.ok) {
        handleBackToList();
        const jsonResponse = await response.json();
        onSendOffer(jsonResponse);
        setOfferAmount("");
        setOfferType("REFUND");
        setNote(""); // Réinitialisez la note après l'envoi
      } else {
        // Gérer la réponse en cas d'erreur
      }
    } catch (error) {
      // Gérer les erreurs liées au réseau ou à fetch
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      <label
        htmlFor="offerAmount"
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        Offer Amount
      </label>
      <input
        id="offerAmount"
        type="text"
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={offerAmount}
        onChange={(e) => setOfferAmount(e.target.value)}
        placeholder="Enter offer amount"
        required
      />

      <label
        htmlFor="offerType"
        className="block mt-3 mb-2 font-medium text-gray-900 dark:text-white"
      >
        Offer Type
      </label>
      <select
        id="offerType"
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={offerType}
        onChange={(e) => setOfferType(e.target.value)}
        required
      >
        <option value="REFUND">Refund</option>
        {/* Ajoutez d'autres options en fonction de vos besoins */}
      </select>

      <label
        htmlFor="note"
        className="block mt-3 mb-2 font-medium text-gray-900 dark:text-white"
      >
        Note
      </label>
      <textarea
        id="note"
        className="block p-2.5 w-full h-32 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={note}
        onChange={(e) => setNote(e.target.value)} // Mettez à jour la note en fonction de la saisie de l'utilisateur
        placeholder="Enter offer note"
        required
      ></textarea>

      <button
        className="my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendOffer}
        disabled={sending}
      >
        {sending ? "Sending..." : "Send the offer"}
      </button>
    </div>
  );
}

export default MakeOffer;
