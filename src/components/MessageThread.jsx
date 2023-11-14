// MessageThread.jsx

import React from "react";
import Message from "./Message";
import MessageTemp from "./MessageTemp"; // Ajoutez l'import

function MessageThread({ messages }) {
  return (
    <div className="messageThread flex flex-col w-full">
      <h3>Messages</h3>
      {messages && messages.length > 0 ? (
        <>
          {messages.map((message, index) =>
            message.fromForm ? ( // Si le message provient du formulaire
              <MessageTemp
                key={index}
                text={message.text}
                posted_by={message.postedBy}
                timestamp={message.timestamp}
              />
            ) : (
              <Message key={index} content={message} />
            )
          )}
        </>
      ) : (
        <p>No messages available for this dispute.</p>
      )}
    </div>
  );
}

export default MessageThread;
