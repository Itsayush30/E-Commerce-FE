import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PendingReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3344/api/v1/review/${id}`);
        if (response.data.success) {
          setReview(response.data.data[0]); // Assuming API always returns a single object
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleReject = async () => {
    try {
      await axios.post(`http://localhost:3344/api/v1/reject/${id}`);
      setRejected(true);
      // Optionally update UI or handle success message
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const handleApprove = async () => {
    try {
      // Update product using PUT request
      await axios.put(`http://localhost:3344/api/v1/products/${id}`, {
        productName: review.productName,
        price: review.price,
        image: review.image,
        productDescription: review.productDescription,
        department: review.department,
        // Add other fields as needed
      });

      // Approve review
      await axios.post(`http://localhost:3344/api/v1/approve/${id}`);
      setApproved(true);
      // Optionally update UI or handle success message
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={review.image} alt={review.productName} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{review.productName}</h2>
      <p className="text-gray-700 mb-2">{review.productDescription}</p>
      <p className="text-gray-500 mb-2">{review.department}</p>
      <p className="text-gray-500 mb-2">{review.status}</p>
      <p className="text-gray-500 mb-2">Price: {review.price}</p>
      <p className="text-gray-500 mb-2">Created At: {new Date(review.createdAt).toLocaleString()}</p>
      <p className="text-gray-500 mb-2">Updated At: {new Date(review.updatedAt).toLocaleString()}</p>
      <div className="flex justify-between mt-4">
        <button onClick={handleApprove} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Approve
        </button>
        <button onClick={handleReject} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Reject
        </button>
      </div>
      {approved && <p className="text-green-500">Above changes approved</p>}
      {rejected && <p className="text-red-500">Above changes rejected</p>}
    </div>
  );
};

export default PendingReviewDetail;
