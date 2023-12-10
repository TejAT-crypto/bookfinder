import React, { useState, useEffect } from "react";
import StarRating from "./ratings";
import axios from "axios";
import { MdLocationOn, MdBookmarkBorder } from "react-icons/md";

const BookCard = ({ book,bookIds }) => {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState('available');

  console.log("Book Id: ", book._id);
  console.log("Book Ids: ", bookIds);

  const requestBook = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.12:3000/chat/sendRequest",
        {
          bookId: book._id,
          otherUserId: book.userid,
        },
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      setStatus(response.data.status);
      console.log(response.data);
      console.log(status);
    } catch (err) {
      console.log(err);
    }
  };

  // const getBookStatus = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://192.168.1.12:3000/chat/allChatRequests",
  //       {
  //         headers: {
  //           "auth-token": sessionStorage.getItem("Token"),
  //         },
  //       }
  //     );
  //     console.log("Response data: ",response.data);
  //     const unique = response.data.filter(
  //       (v, i, a) => a.findIndex((t) => t.bookId._id === v.bookId._id) === i
  //     );
  //     const bookIds = unique.map((book) => book.bookId._id);
  //     console.log("Book Ids: ",bookIds);
  //     console.log("Unique: ",unique);
  //     setStatus(response.data);
  //     console.log(status)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getBookStatus();
  // },[])



  useEffect(() => {
    const reverseGeocode = async () => {
      const { coordinates } = book.location;

      try {
          const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coordinates[1]}+${coordinates[0]}&key=a632785c704b458890f2dcc00463ea27`);
          const data = await response.json();
          const results = data.results;
          console.log(results)
      
          if (results[0]) {
            setAddress(results[0].components.state_district);
          }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    reverseGeocode();
  }, [book.location]);
  return (
    <div className="flex space-x-4 p-4 ">
      <div className="w-80  bg-opacity-50 rounded-2xl shadow-2xl overflow-hidden bg-[#FFF5E0]">
        <div className="h-72 overflow-hidden py-5 bg-[#fbf3e7]">
          <img
            className="h-full w-full object-contain"
            src={`data:image/png;base64,${book.bookimage.data}`}
            // https://www.gkpublications.com/wp-content/uploads/2023/11/Dummy-book.jpg
            alt={book.name}
          />
        </div>

        <div className="bg-[#FFF5E0]">
          <div className="px-4 py-2 bg-[#C70039] bg-opacity-80 h-1/2 text-white text-xl font-semibold mb-2 text-left">
            <p className="">{book.title}</p>
            {book.author}
          </div>
          <div className="flex items-center justify-between text-md text-black">
            <p className="flex items-center ml-3">
              <MdLocationOn className="text-lg" />{" "}
              <span className="ml-1 mr-5"> {address}</span>
            </p>
            {/* <p className="flex items-center mr-3">
              <StarRating rating={book.ratings} /> <span> {book.noofratings} reviews</span>
            </p> */}
          </div>

          <p className="text-black mx-2 px-2 py-2">{book.description}</p>
        </div>

        <div className="flex items-center justify-center px-4 py-4 bg-[#FFF5E0]">
        {
          bookIds && bookIds.find((id) => id === book._id) ? (
            <button
            className="bg-gray-500 bg-opacity-80 text-white px-12 py-2 rounded-md disable"
          >
            Pending
          </button>
          ) : (
            <button
            className="bg-[#C70039] bg-opacity-80 text-white px-12 py-2 rounded-md"
            onClick={() => requestBook()}
          >
            Get a Book
          </button>
          )
        }
          <button className="text-[#C70039] text-opacity-80 py-2 px-2 rounded-lg text-3xl ml-6 border shadow">
            <MdBookmarkBorder />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
