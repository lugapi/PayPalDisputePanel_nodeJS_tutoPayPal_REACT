import React, { useState } from "react";

function HistoryInfo({ history }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayHistory = showAll ? history : history.slice(0, 3);

  return (
    <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
      <h2 className="underline">Dispute History</h2>
      {history && history.length > 0 ? (
        <ol className="list-decimal m-5">
          {displayHistory.map((event, index) => (
            <li className="p-2" key={index}>
              <p className="text-sm">
                {event.date} : <br />
                {event.actor} - {event.event_type}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No history available for this dispute.</p>
      )}
      {history.length > 3 && (
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={toggleShowAll}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default HistoryInfo;
