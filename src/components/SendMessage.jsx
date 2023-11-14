import React, { useState } from "react";

function SendMessage({
  disputeId,
  accessToken,
  onSendMessage,
  handleBackToList,
}) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false); // État pour gérer l'état d'envoi

  const handleSendMessage = async () => {
    try {
      setSending(true); // Mettre l'état d'envoi à vrai

      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/customer/disputes/${disputeId}/send-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      if (response.ok) {
        handleBackToList();
        const jsonResponse = await response.json();
        const newMessage = {
          text: message,
          postedBy: "SELLER", // Utilisez le bon expéditeur ici
          timestamp: new Date().toISOString(),
          fromForm: true, // Marquez le message comme venant du formulaire
        };
        onSendMessage(newMessage);
        setMessage("");
      } else {
        // Gérer la réponse en cas d'erreur
      }
    } catch (error) {
      // Gérer les erreurs liées au réseau ou à fetch
    } finally {
      setSending(false); // Remettre l'état d'envoi à faux, que ce soit en cas de succès ou d'échec
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      <label
        htmlFor="message"
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        Send message
      </label>
      <textarea
        id="message"
        rows="4"
        cols="50"
        className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button
        className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendMessage}
        disabled={sending}
      >
        {sending ? "Sending..." : "Send the message"}{" "}
        {/* Afficher "Sending..." ou "Send the message" en fonction de l'état d'envoi */}
      </button>
    </div>
  );
}

export default SendMessage;
