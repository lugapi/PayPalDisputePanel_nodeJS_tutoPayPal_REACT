/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import "./styles.css";
import dotenv from 'dotenv';
import DisputeCard from "./components/DisputeCard";
import DisputeDetail from "./components/DisputeDetail";
import FakeDisputeCard from "./components/FakeDisputeCard";
import SearchFilter from "./components/SearchFilter";
import RefreshButton from "./components/RefreshButton";

const base = "https://api-m.sandbox.paypal.com";

function App() {
  const generateAccessToken = async () => {
    try {
      console.log('Attempting to fetch access token with credentials:', {
        client_id: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        client_secret: process.env.REACT_APP_PAYPAL_CLIENT_SECRET,
      });
  
      const auth = Buffer.from(
        process.env.REACT_APP_PAYPAL_CLIENT_ID + ":" + process.env.REACT_APP_PAYPAL_CLIENT_SECRET
      ).toString("base64");
  
      console.log('Encoded authorization:', auth);
  
      if (!process.env.REACT_APP_PAYPAL_CLIENT_ID || !process.env.REACT_APP_PAYPAL_CLIENT_ID) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };
  
  const disputesPerPage = process.env.REACT_APP_PAYPAL_NUMBER_DISPUTES_DISPLAYED;

  const [disputes, setDisputes] = useState([]);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [visibleDisputes, setVisibleDisputes] = useState([]);
  const [bearer, setBearer] = useState(null);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [visibleDisputesCount, setVisibleDisputesCount] =
    useState(disputesPerPage);
  const [showFilter, setShowFilter] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  async function fetchAccessToken() {
    return await generateAccessToken();
  }

  async function fetchDisputes(bearer) {
    try {
      const url = `${base}/v1/customer/disputes/`;
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + bearer);

      const listDispute = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await listDispute.json();
      return data.items;
    } catch (error) {
      console.error("Error fetching disputes:", error);
      throw error;
    }
  }

  async function fetchVisibleDisputeDetails(bearer, disputes, count) {
    const visibleDisputes = disputes.slice(0, count);

    const visibleDisputeDetails = await Promise.all(
      visibleDisputes.map((dispute) =>
        getDisputeDetail(bearer, dispute.dispute_id)
      )
    );

    visibleDisputes.forEach((dispute, index) => {
      dispute.detail = visibleDisputeDetails[index];
    });

    return visibleDisputes;
  }

  async function fetchData() {
    try {
      const fetchedBearer = await fetchAccessToken();
      setBearer(fetchedBearer);

      const disputesData = await fetchDisputes(fetchedBearer);
      setDisputes(disputesData);

      if (disputesData.length <= disputesPerPage) {
        setShowFilter(true);
      }

      const visibleDisputesData = await fetchVisibleDisputeDetails(
        fetchedBearer,
        disputesData,
        disputesPerPage
      );

      setVisibleDisputes(visibleDisputesData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    function handlePopState(event) {
      if (event.state && event.state.view === "disputeDetail") {
        setSelectedDispute(null);
      }
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const refreshDisputes = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };
  const applyFilter = (disputes, filter) => {
    const upperCaseFilter = filter.toUpperCase();
    return disputes.filter((dispute) =>
      dispute.dispute_id.toUpperCase().includes(upperCaseFilter)
    );
  };

  const applyFilterByStatus = (disputes, status) => {
    let filteredDisputes = disputes;

    if (status !== "") {
      filteredDisputes = filteredDisputes.filter(
        (dispute) => dispute.status === status
      );
    }

    if (selectedFilter !== "") {
      filteredDisputes = filteredDisputes.filter((dispute) =>
        dispute.dispute_id.includes(selectedFilter)
      );
    }

    return filteredDisputes.slice(0, visibleDisputesCount);
  };

  const handleSearchFilterChange = (newFilter, newStatusFilter) => {
    setSelectedFilter(newFilter);
    setSelectedStatus(newStatusFilter);

    const newFilteredDisputes = applyFilter(disputes, newFilter);
    const newVisibleDisputes = applyFilterByStatus(
      newFilteredDisputes,
      newStatusFilter
    );

    setVisibleDisputesCount(disputesPerPage);

    if (newStatusFilter === "") {
      setVisibleDisputes(newFilteredDisputes);
      setShowLoadMoreButton(false); // Hide the "See more disputes" button
    } else {
      setVisibleDisputes(newVisibleDisputes);
      setShowLoadMoreButton(true); // Show the "See more disputes" button
    }

    console.log("new filter", newStatusFilter);
  };

  const loadMoreDisputes = async (bearer) => {
    setLoadingMore(true);
    const nextVisibleCount = visibleDisputesCount + disputesPerPage;

    const nextVisibleDisputes = disputes.slice(
      visibleDisputesCount,
      nextVisibleCount
    );

    // Load detail for additional disputes
    const visibleDisputeDetails = await Promise.all(
      nextVisibleDisputes.map((dispute) =>
        getDisputeDetail(bearer, dispute.dispute_id)
      )
    );

    nextVisibleDisputes.forEach((dispute, index) => {
      dispute.detail = visibleDisputeDetails[index];
    });

    setVisibleDisputesCount(nextVisibleCount);
    setVisibleDisputes([...visibleDisputes, ...nextVisibleDisputes]);
    setLoadingMore(false);
    setShowFilter(true);
  };

  async function getDisputeDetail(bearer, disputeId) {
    try {
      const url = `${base}/v1/customer/disputes/${disputeId}`;
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + bearer);

      const disputeDetail = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await disputeDetail.json();
      return data;
    } catch (error) {
      console.error("Error fetching dispute detail:", error);
    }
  }

  const viewDisputeDetail = (dispute) => {
    setSelectedDispute(dispute);
    window.history.pushState({ view: "disputeDetail" }, "");
  };

  const renderVisibleDisputes = () => {
    return visibleDisputes.map((dispute) => (
      <DisputeCard
        key={dispute.dispute_id}
        dispute={dispute}
        onClick={() => viewDisputeDetail(dispute)}
      />
    ));
  };

  const renderLoadingDisputes = () => {
    const fakeDisputeCards = Array.from({ length: disputesPerPage }, (_, i) => (
      <FakeDisputeCard key={`fake-${i}`} />
    ));

    return <>{fakeDisputeCards}</>;
  };

  const handleBackToList = async () => {
    if (selectedDispute) {
      // Rechargez les détails du litige spécifique pour mettre à jour les données
      const updatedDisputeDetail = await getDisputeDetail(
        bearer,
        selectedDispute.dispute_id
      );

      const updatedVisibleDisputes = visibleDisputes.map((dispute) => {
        if (dispute.dispute_id === selectedDispute.dispute_id) {
          dispute.detail = updatedDisputeDetail;
        }
        return dispute;
      });

      setVisibleDisputes(updatedVisibleDisputes);
    }
  };

  // console.log("Visible disputes:", visibleDisputes);

  return (
    <div className="container mx-auto sm:px-4">
      {/* ... Votre code existant ... */}
      {isLoading ? (
        <div className="flex flex-wrap disputeReactList gap-10 justify-evenly">
          {renderLoadingDisputes()}
        </div>
      ) : selectedDispute ? (
        <>
          <button
            className="bg-blue-600 text-white rounded-md border-r border-gray-100 my-2 py-2 px-3 font-medium dark:text-blue-500 hover:text-black hover:bg-blue-500"
            onClick={() => {
              setSelectedDispute(null);
              setSelectedFilter(selectedFilter);
            }}
          >
            <div className="flex flex-row align-middle">
              <svg
                className="w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-2 dark:text-white">Back to List</p>
            </div>
          </button>{" "}
          <div className="card border rounded-lg shadow-lg bg-white">
            <DisputeDetail
              accessToken={bearer}
              dispute={selectedDispute}
              handleBackToList={handleBackToList}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="filterAndRefresh flex items-center gap-5 justify-center w-full">
            {showFilter && (
              <div className="filters flex">
                <SearchFilter
                  onFilterChange={handleSearchFilterChange}
                  selectedStatus={selectedStatus}
                  selectedFilter={selectedFilter}
                />
              </div>
            )}
            {!isLoading && (
              <div>
                <RefreshButton onClick={refreshDisputes} />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-wrap disputeReactList gap-5 justify-evenly">
              {renderVisibleDisputes()}
              {isLoadingMore && renderLoadingDisputes()}
            </div>
            <div>
              {visibleDisputes.length < disputes.length &&
                showLoadMoreButton &&
                selectedStatus === "" && (
                  <button
                    onClick={() => loadMoreDisputes(bearer)}
                    disabled={isLoadingMore}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    See more disputes
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
