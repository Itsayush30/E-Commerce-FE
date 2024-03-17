import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendingReview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-access-token': token 
          }
        };
        const response = await axios.get('http://localhost:3344/api/v1/review/pending', config); 
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div className="m-4">
      <div className="text-center italic text-black-light font-cursive mb-6">
        “Design creates culture. Culture shapes values. Values determine the future“ - Robert Peters (Designer)
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} to={`/pendingreview/${product.id}`}>
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

export default PendingReview;
