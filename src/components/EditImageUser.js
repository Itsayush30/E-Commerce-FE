import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("user_file", file);

    try {
      const response = await axios.post(
        "http://localhost:3344/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log(response.data);
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-md">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
      {previewURL && (
        <div className="mt-4">
          <img src={previewURL} alt="Selected" className="max-w-full h-auto" />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="mt-4 inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
