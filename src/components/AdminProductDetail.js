import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminProductDetail = () => {
  const { id } = useParams(); // Retrieve the ID parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const config = {
          headers: {
            "x-access-token": token, // Add token to request headers
          },
        };
        const response = await axios.get(
          "http://localhost:3344/api/v1/products",
          config
        );

        console.log(response);

        const products = response.data;
        const foundProduct = products.data[id-1]; //as id starts from and index is from zero
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching products");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">No product found with ID: {id}</div>;
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{product.productName}</h2>
      <p className="text-gray-700 mb-4">{product.productDescription}</p>
      <p className="text-gray-800 font-bold mb-2">Price: ₹{product.price}</p>
      <img
        src={product.image}
        alt={product.productName}
        className="w-full rounded-lg"
      />
      {/* Add more details as needed */}
    </div>
  );
};

export default AdminProductDetail;
