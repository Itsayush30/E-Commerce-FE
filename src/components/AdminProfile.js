import React, { useState, useEffect } from "react";
import axios from "axios";

const StatusCount = () => {
  const [counts, setCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const config = {
          headers: {
            "x-access-token": adminToken,
          },
        };

        const adminProfileResponse = await axios.get(
          "http://localhost:3344/api/v1/adminprofile",
          config
        );

        const adminProfileData = adminProfileResponse.data.data;

        const approvedCount = adminProfileData.filter(
          (product) => product.status === "approved"
        ).length;

        const rejectedCount = adminProfileData.filter(
          (product) => product.status === "rejected"
        ).length;

        // Fetch pending count separately
        const pendingResponse = await axios.get(
          "http://localhost:3344/api/v1/review/count",
          config
        );
        const pendingCount = pendingResponse.data.data;

        setCounts({
          approved: approvedCount,
          rejected: rejectedCount,
          pending: pendingCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Reviewed Changes Status Count
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-200 p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold text-blue-800 mb-2">Pending</p>
          <p className="text-xl text-blue-900">{counts.pending}</p>
        </div>
        <div className="bg-green-200 p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold text-green-800 mb-2">Approved</p>
          <p className="text-xl text-green-900">{counts.approved}</p>
        </div>
        <div className="bg-red-200 p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold text-red-800 mb-2">Rejected</p>
          <p className="text-xl text-red-900">{counts.rejected}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusCount;
