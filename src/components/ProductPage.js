import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3344/api/v1/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="m-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product._id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <img src={product.image} alt={product.productName} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.productDescription}</p>
            <p className="text-gray-800 font-bold">&#x20B9;{product.price}</p> {/* ₹ sign */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
