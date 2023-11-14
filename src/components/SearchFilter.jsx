import React, { useState } from "react";

function SearchFilter({ onFilterChange }) {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    onFilterChange(newFilter, statusFilter);
  };

  const handleStatusChange = (event) => {
    const newStatusFilter = event.target.value;
    setStatusFilter(newStatusFilter);
    onFilterChange(filter, newStatusFilter);
  };

  return (
    <div className="filter-controls flex p-10 gap-5 justify-center w-full">
      <div className="flex gap-2 items-center">
        <label htmlFor="disputeIdFilter">Filter by Dispute ID:</label>
        <input
          type="text"
          id="disputeIdFilter"
          value={filter}
          onChange={handleFilterChange}
          className="border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="statusFilter">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border rounded-lg px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All Status</option>
          <option value="RESOLVED">Resolved</option>
          <option value="WAITING_FOR_SELLER_RESPONSE">
            Waiting for Seller Response
          </option>
          <option value="WAITING_FOR_BUYER_RESPONSE">
            Waiting for Buyer Response
          </option>
          {/* ... autres options de statut */}
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
