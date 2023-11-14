import React from "react";

function RefreshButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
    >
      Refresh dispute list
    </button>
  );
}

export default RefreshButton;
