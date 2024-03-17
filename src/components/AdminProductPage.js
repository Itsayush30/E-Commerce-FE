import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [pendingReviewCount, setPendingReviewCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const config = {
          headers: {
            'x-access-token': token // Add token to request headers
          }
        };
        const response = await axios.get('http://localhost:3344/api/v1/products', config); // Pass config with token in request
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    const fetchPendingReviewCount = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const config = {
          headers: {
            'x-access-token': token // Add token to request headers
          }
        };
        const response = await axios.get('http://localhost:3344/api/v1/review/count', config);
        const count = response.data.data;
        setPendingReviewCount(count);
      } catch (error) {
        console.error('Error fetching pending review count:', error);
      }
    };
    fetchPendingReviewCount();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="m-4">
      <div className="text-center italic text-black-light font-cursive mb-6">
        “Design creates culture. Culture shapes values. Values determine the future“ - Robert Peters (Designer)
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/pendingreview" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pending Review ({pendingReviewCount})
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} to={`/adminproduct/${product.id}`}>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg cursor-pointer">
              <img src={product.image} alt={product.productName} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                <h4 className="text-lg font-medium mb-2">{product.department}</h4>
                <p className="text-gray-600 text-sm mb-4">{product.productDescription}</p>
                <p className="text-gray-800 font-bold">&#x20B9;{product.price}</p> {/* ₹ sign */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminProductPage;
