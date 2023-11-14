// FakeDisputeCard.jsx

import React from 'react';

function FakeDisputeCard() {
    return (
        <div
            className="card border rounded-lg shadow-lg bg-white fakeDisputeCard"
        >
            <div className="p-4 min-w-[300px] disputeReactItem">
                <h5 className="text-lg font-bold">ID XXX</h5>
                <p className="text-gray-600 text-sm mt-2">
                    XXX XXX
                </p>
                <p>
                    STAGE
                </p>
                <p className="text-gray-400 text-xs mt-2">
                    CREATE TIME
                </p>
            </div>
        </div>
    );
}

export default FakeDisputeCard;
