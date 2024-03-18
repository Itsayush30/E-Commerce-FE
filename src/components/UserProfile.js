import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusCount = () => {
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from local storage
        const userToken = localStorage.getItem('userToken');
        
        // Set request headers with the token for authentication
        const config = {
          headers: {
            'x-access-token': userToken
          }
        };
        
        // Fetch data from the API using Axios
        const response = await axios.get('http://localhost:3344/api/v1/userprofile', config);
        
        // Extract data from the response
        const data = response.data.data;
        
        // Calculate counts for each status
        const pendingCount = data.filter(product => product.status === 'pending').length;
        const approvedCount = data.filter(product => product.status === 'approved').length;
        const rejectedCount = data.filter(product => product.status === 'rejected').length;
        
        // Update the state with the counts
        setCounts({
          pending: pendingCount,
          approved: approvedCount,
          rejected: rejectedCount
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Status Counts of Reviews submitted</h2>
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
