// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const EditProfile = () => {
//   const fileInputRef = useRef(null);
//   const [profilePhoto, setProfilePhoto] = useState('');
//   const navigate = useNavigate();

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile) {
//       try {
//         const formData = new FormData();
//         formData.append('photo', selectedFile);
//         console.log(formData)

//         // Make a POST request to /profile/upload-picture
//         await axios.put('http://10.1.124.13:3000/profile/upload-picture', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'auth-token': sessionStorage.getItem('Token'),
//           },
//         });
//         navigate("/profile")

//         // // Fetch updated data after uploading
//         // const updatedDataResponse = await axios.get('http://10.1.124.13:3000/profile/get-updated-data', {
//         //   headers: {
//         //     'auth-token': sessionStorage.getItem('Token'),
//         //   },
//         // });

//         // console.log('Updated data:', updatedDataResponse.data);

//         // You can update the state with the new data if needed
//         // setUserData(updatedDataResponse.data);

//         // Assuming there's a state for the updated photo
//         // setProfilePhoto(updatedDataResponse.data.photo);
//       } catch (error) {
//         console.error('Error uploading photo:', error);
//       }
//     }
//   };
//   const handleClick = () => {
//     // Trigger the file input when the "Change Profile Picture" div is clicked
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="text-center mt-8">
//       <div
//         className="w-48 h-48 mx-auto cursor-pointer border border-gray-300 rounded-full overflow-hidden"
//         onClick={handleClick}
//       >
//         {profilePhoto ? (
//           <img
//             src={profilePhoto}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
//             Change Profile Picture
//           </div>
//         )}
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/*"
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default EditProfile;

import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const BookForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile) {
//       const reader = new FileReader();
//       reader.readAsDataURL(selectedFile);
//       reader.onload = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           imgSrc: reader.result, // Base64 string
//         }));
//       };
//     }

//     setFile(selectedFile);
//   };

// const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile) {
//       resizeImage(selectedFile)
//         .then((resizedImage) => {
//           setFormData((prevData) => ({
//             ...prevData,
//             image: resizedImage,
//           }));
//         })
//         .catch((error) => {
//           console.error("Error resizing image:", error);
//         });
//     }

//     setFile(selectedFile);
//   };

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (selectedFile) {
    setFormData((prevData) => ({
      ...prevData,
      image: selectedFile,
    }));
  }

  setFile(selectedFile);
};


  console.log(file)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert the file to Base64
      // const base64String = await convertFileToBase64(file);

      console.log(formData)
      // Post form data to /book/add along with the base64 string
      const response = await axios.put("http://10.1.124.13:3000/profile/upload-picture", {
        ...formData,
        image: file,
      }, {
              headers: {
                'auth-token': sessionStorage.getItem('Token'),
                'Content-Type': 'multipart/form-data',
              }
            });

      console.log("Form submitted successfully:", response.data);
      navigate("/profile")
      // Optionally, you can handle a successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally, you can handle errors
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the canvas dimensions to the new size
          canvas.width = 300; // Set your desired width
          canvas.height = (300 * img.height) / img.width; // Maintain the aspect ratio

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the canvas content to base64
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality as needed
          resolve(resizedBase64);
        };

        img.onerror = (error) => {
          reject(error);
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };


  // Helper function to convert file to Base64
  // const convertFileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (!file) {
  //       reject("No file selected");
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       resolve(reader.result.split(",")[1]); // Extract base64 string
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  return (
    <div className="bg-[#FFF5E0] min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-xl w-1/3"
        onSubmit={handleSubmit}
      >
      <p className="font-bold text-2xl mb-4">
        Change Profile Picture
      </p>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;


