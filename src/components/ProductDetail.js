import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Retrieve the ID parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3344/api/v1/products');
        const products = response.data;
        console.log(products.data[id])
        const foundProduct = products.data[id];
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found with ID: {id}</div>;
  }

  return (
    <div>
      <h2>{product.productName}</h2>
      <p>{product.productDescription}</p>
      <p>Price: ₹{product.price}</p>
      <img src={product.image} alt={product.productName} />
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
