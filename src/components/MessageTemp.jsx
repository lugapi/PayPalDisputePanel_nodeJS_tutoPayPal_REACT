// MessageTemp.jsx

import React from "react";

function MessageTemp({ text, postedBy, timestamp }) {
  return (
    <div className="message">
      <p className="message-content">{text}</p>
      <div className="message-meta">
        <span className="message-posted-by">{postedBy}</span>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
}

export default MessageTemp;
