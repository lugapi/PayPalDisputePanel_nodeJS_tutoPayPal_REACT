import React from "react";

function DisputeCard({ dispute, onClick }) {
    return (
        <div
            className="card border rounded-lg shadow-lg bg-white"
            onClick={onClick}
        >
            <div className="p-4 min-w-[300px] disputeReactItem">
                <h5 className="text-lg font-bold">{dispute.dispute_id}</h5>
                <p
                    className={
                        dispute.status === "RESOLVED"
                            ? "text-green-600 text-sm mt-2"
                            : dispute.status.includes("WAITING") &&
                              dispute.status.includes("SELLER")
                            ? "text-red-600 text-sm mt-2"
                            : "text-yellow-600 text-sm mt-2"
                    }
                >
                    {dispute.status}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                    {dispute.dispute_amount.value}{" "}
                    {dispute.dispute_amount.currency_code}
                </p>
                <p className={"font-extrabold text-sm mt-2"}>
                    {dispute.dispute_life_cycle_stage}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                    {dispute.create_time.split("T")[0]} -{" "}
                    {dispute.create_time.split("T")[1].split(".")[0]}
                </p>
            </div>
        </div>
    );
}

export default DisputeCard;
