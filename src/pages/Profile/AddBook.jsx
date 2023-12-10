// import React, { useState } from "react";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";

// const BookForm = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         imgSrc: "",
//         bookName: "",
//         description: "",
//     });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Post form data to /book/add
//       console.log(formData)
//       const response = await axios.post("http://192.168.1.12:3000/book/add", formData);
//       console.log("Form submitted successfully:", response.data);
//       navigate("/profile")
//       // Optionally, you can handle a successful submission
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Optionally, you can handle errors
//     }
//   };

//   return (
//     <div className="bg-[#FFF5E0] min-h-screen w-full flex items-center justify-center">
//       <form
//         className="bg-white p-6 rounded shadow-xl w-1/3"
//         onSubmit={handleSubmit}
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 text-lg font-bold mb-2">
//             Book Name:
//           </label>
//           <input
//             type="text"
//             name="bookName"
//             value={formData.bookName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-lg font-bold mb-2">
//             Book Image Source:
//           </label>
//           <input
//             type="text"
//             name="imgSrc"
//             value={formData.imgSrc}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         {/* <div className="mb-4">
//           <label className="block text-gray-700 text-lg font-bold mb-2">
//             Author Name:
//           </label>
//           <input
//             type="text"
//             name="authorName"
//             value={formData.authorName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div> */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-lg font-bold mb-2">
//             Book Description:
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BookForm;

import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const BookForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    author: "",
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

  console.log(file);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert the file to Base64
      // const base64String = await convertFileToBase64(file);

      console.log(formData);
      // Post form data to /book/add along with the base64 string
      const response = await axios.post(
        "http://192.168.1.12:3000/book/add",
        {
          ...formData,
          image: file,
        },
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      navigate("/profile");
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
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Book Name:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            Author Name:
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
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

export default BookForm;
