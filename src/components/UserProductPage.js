import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const config = {
          headers: {
            "x-access-token": userToken,
          },
        };
        const response = await axios.get(
          "http://localhost:3344/api/v1/products",
          config
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center italic text-black-light font-cursive">
          “Design creates culture. Culture shapes values. Values determine the
          future“ - Robert Peters (Designer)
        </div>
        <div>
          <Link
            to="/userprofile"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Team Member Profile
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} to={`/userproduct/${product.id}`}>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg cursor-pointer">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {product.productName}
                </h3>
                <h4 className="text-lg font-medium mb-2">
                  {product.department}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {product.productDescription}
                </p>
                <p className="text-gray-800 font-bold">
                  &#x20B9;{product.price}
                </p>{" "}
                {/* ₹ sign */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserProductPage;
