import React, { useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    imgSrc: "",
    bookName: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          imgSrc: reader.result, // Base64 string
        }));
      };
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert the file to Base64
      const base64String = await convertFileToBase64(file);

      console.log(formData)
      // Post form data to /book/add along with the base64 string
      const response = await axios.post("http://10.1.183.9:3000/book/add", {
        ...formData,
        imgSrc: base64String,
      });

      console.log("Form submitted successfully:", response.data);
      // Optionally, you can handle a successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, you can handle errors
    }
  };

  // Helper function to convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file selected");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.split(",")[1]); // Extract base64 string
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="bg-[#FFF5E0] min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-xl w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Book Name:
          </label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Book Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Book Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

