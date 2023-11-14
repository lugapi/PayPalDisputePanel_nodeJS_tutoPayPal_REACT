import React from "react";

function DisputeInfo({ content }) {
    console.log(content.dispute_id);
    return (
        <>
            <div className="flex flex-col p-2 bg-white border rounded-lg shadow-md">
                <h2 className="underline">Dispute infos</h2>
                <ul>
                    <li>
                        <p>Dispute ID : {content.dispute_id}</p>
                    </li>
                    <li>
                        <p> Create time : {content.create_time}</p>
                    </li>
                    <li>
                        <p>Status : {content.status}</p>
                    </li>
                    <li>
                        <p>Reason : {content.reason}</p>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default DisputeInfo;
