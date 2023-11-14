import React from "react";

function AllowedActionInfo({ content }) {
  if (!content.links || content.links.length === 0) {
    return null; // Si les liens sont absents ou vides, ne rien afficher
  }

  return (
    <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
      <h2 className="underline">Allowed actions</h2>
      <ul>
        {content.links.map((link, index) => (
          <li key={index}>
            <p>
              {link.rel} (Method: {link.method})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllowedActionInfo;
