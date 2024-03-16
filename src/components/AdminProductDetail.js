import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminProductDetail = () => {
  const { id } = useParams(); // Retrieve the ID parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
        const foundProduct = products.data[id-1];
        if (foundProduct) {
          setProduct(foundProduct);
          setEditedProduct({ ...foundProduct }); // Initialize editedProduct state with product data
        } else {
          setError("Product not found");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const config = {
        headers: {
          "x-access-token": token, // Add token to request headers
        },
      };
      const response = await axios.put(
        `http://localhost:3344/api/v1/products/${id}`,
        editedProduct,
        config
      );

      console.log(response);

      setProduct(editedProduct); // Update product state with edited product details
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

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
      <div>
        <h2 className="text-2xl font-semibold mb-4">{product.productName}</h2>
        {isEditing ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              className="w-full p-2 border rounded-md"
              type="text"
              id="productName"
              name="productName"
              value={editedProduct.productName}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          <p className="text-gray-700 mb-4">{product.productDescription}</p>
        )}
        {isEditing ? (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
              Product Description
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              id="productDescription"
              name="productDescription"
              rows="4"
              value={editedProduct.productDescription}
              onChange={handleInputChange}
            ></textarea>
          </div>
        ) : (
          <p className="text-gray-700 mb-4">{product.productDescription}</p>
        )}
        <p className="text-gray-800 font-bold mb-2">Price: ₹{product.price}</p>
        <img src={product.image} alt={product.productName} className="w-full rounded-lg" />
        {/* Add more details as needed */}
      </div>
      <div className="mt-4">
        {isEditing ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProductDetail;
