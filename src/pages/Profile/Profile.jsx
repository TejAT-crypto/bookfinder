import { MdStar, MdStarBorder, MdStarHalf } from "react-icons/md";

import React, { useEffect, useState, useRef } from "react";
import Header from "../Dashboard/Header";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [location, setLocation] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [lendedBooks, setLendedBooks] = useState([]);
  const [activity, setActivity] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profilePhoto, setProfilePhoto] = useState("");
  // https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

  // const handleFileChange = (e) => {
  //   navigate('/editProfile')
  // };

  const handleClick = () => {
    // Trigger the file input when the image is clicked
    navigate("/editProfile");
  };

  const reverseGeocoding = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=a632785c704b458890f2dcc00463ea27`
    );
    const data = await response.json();
    const results = data.results;

    if (results[0]) {
      setLocation(results[0].formatted);
      // const addressComponents = results[0].address_components;
      // for (let i = 0; i < addressComponents.length; i++) {
      //   if (addressComponents[i].types.includes('locality')) {
      //     console.log(addressComponents[i].long_name);
      //     return addressComponents[i].long_name;
      //   }
      // }
    }

    throw new Error("Could not find city name");
  };

  const addBook = (data) => {
    try {
      axios.post("http://192.168.1.12:3000/book/add", data, {
        headers: {
          "auth-token": sessionStorage.getItem("Token"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.12:3000/profile/user",
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      console.log(response.data);
      setProfile(response.data.user);
      setProfilePhoto(response.data.image);
    } catch (err) {
      console.log(err);
    }
    // const books = await fetchUserBooks();
  };
  console.log(profile);
  // console.log(profilePhoto);

  const fetchUserBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://192.168.1.12:3000/book/uploads",
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const fetchUserActivity = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://192.168.1.12:3000/book/activity",
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      console.log("data: ", response.data);
      console.log("size of len books: ", response.data.lendedBooks.length);
      setActivity(response.data);
      setBorrowedBooks(response.data.borrowedBooks);
      setLendedBooks(response.data.lendedBooks);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  console.log("books are: ", books);

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const geoJson = {
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
          };

          try {
            const response = await axios.put(
              "http://192.168.1.12:3000/profile/location",
              geoJson,
              {
                headers: {
                  "auth-token": sessionStorage.getItem("Token"),
                },
              }
            );
            const reverseGeoData = await reverseGeocoding(
              position.coords.latitude,
              position.coords.longitude
            );

            if (reverseGeoData && reverseGeoData.results.length > 0) {
              const formattedAddress = reverseGeoData.results[0].formatted;
              console.log("Formatted address:", formattedAddress);
            }
            console.log("GeoJSON sent:", response.data);
          } catch (error) {
            console.error("Error sending GeoJSON:", error);
          }
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(
    () => {
      fetchUserDetails();
      fetchUserBooks();
      fetchUserActivity();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Header profilePhoto={profilePhoto} />
      <div className="bg-[#FFF5E0] flex flex-row pt-4 min-h-screen">
        <div className="w-1/3">
          <div className="flex flex-col">
            <img
              src={`data:image/png;base64,${profilePhoto}`}
              alt="Author"
              className="w-48 h-48 object-cover rounded-full mx-auto cursor-pointer transition-all transform hover:scale-105 border-4 border-white"
              onClick={handleClick}
            />
            <div className="flex flex-row m-4 justify-center text-2xl text-yellow-400">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStarHalf />
              <MdStarBorder />
              <p className="text-black ml-2 text-lg">212 reviews</p>
            </div>
            <div className="flex flex-col bg-white rounded-xl m-4 p-4 pl-6">
              <div className="space-y-2">
                <div className="flex flex-row justify-left space-x-2">
                  <p className="font-bold text-xl">Name:</p>
                  <p className="text-xl font-light">{profile.username}</p>
                </div>
                <div className="flex flex-row justify-left space-x-2">
                  <p className="font-bold text-xl">Address:</p>
                  <p className="text-xl font-light">
                    {location ? <p>{location}</p> : <p>Loading...</p>}
                  </p>
                  {/* <p className="text-xl font-light">1234</p> */}
                </div>
                <button
                  className="rounded-lg bg-[#141E46] text-white font-bold text-md justify-center p-1.5"
                  onClick={getLocation}
                >
                  Change Location
                </button>
                <div className="flex flex-row justify-left space-x-2">
                  <p className="font-bold text-xl">Books for Lend:</p>
                  <p className="text-xl font-light">20</p>
                </div>
                <div className="flex flex-row justify-left space-x-2">
                  <p className="font-bold text-xl">Rating(Out of 5):</p>
                  <p className="text-xl font-light">{profile.userRating}</p>
                </div>
                <div className="flex flex-row justify-left space-x-2">
                  <p className="font-bold text-xl">Total Exchange:</p>
                  <p className="text-xl font-light">22</p>
                </div>
              </div>
              {/* <button className="flex flex-row rounded-xl bg-[#141E46] text-white font-bold text-xl justify-center p-3 mt-8" onClick={() => {
                // navigate("/editProfile");
              }}>
                Edit Profile
              </button> */}
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen">
          <div className="flex flex-col h-full">
            <div className="flex justify-end mr-4 ml-8">
              <button className="w-fit bg-[#141E46] text-white rounded-lg px-4 py-2 text-lg">
                Book History
              </button>
            </div>

            <div className="bg-white rounded-lg mb-4 mr-4 mt-2 ml-8">
              <div className="flex flex-col justify-left text-left space-y-4 m-4">

                {Loading && <p>Loading...</p>}

                {!Loading & !(borrowedBooks.length === 0 & lendedBooks.length === 0) &&
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-[#C70039]">Borrowed Books</h2>
                      {borrowedBooks.length === 0 && <p className="text-xl">You have not borrowed any books yet</p>}
                      <ul>
                        {borrowedBooks.length > 0 && borrowedBooks.map((book) => (
                          <li className="flex space-x-2 items-center text-xl" key={book.id}>
                            {/* Render details of each borrowed book */}
                            <p className="font-bold mr-2"> {book.title} </p> by <p className="font-bold mr-2"> {book.author}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-[#C70039]">Lended Books</h2>
                      {lendedBooks.length === 0 && <p className="text-xl">You not lended any books yet</p>}
                      <ul>
                        {lendedBooks.length > 0 && lendedBooks.map((book) => (
                          <li className="flex space-x-2 items-center text-xl" key={book.id}>
                            {/* Render details of each lended book */}
                            <p className="font-bold mr-2"> {book.title} </p> by <p className="font-bold mr-2"> {book.author}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>}
                {!Loading & (borrowedBooks.length === 0 & lendedBooks.length === 0) &&
                  (<p className="text-xl text-red-500">No activity yet</p>)
                }

                {/* <p>Transaction 1</p>
                <p>Transaction 2</p>
                <p>Transaction 3</p>
                <p>Transaction 4</p>
                <p>Transaction 5</p>
                <p>Transaction 6</p>
                <p>Transaction 7</p> */}
              </div>
            </div>
            <div className="ml-8 mx-4 mt-8">
              <div className="relative mb-4">
                <div className="flex flex-row items-center">
                  <div className="">
                    <p className="text-2xl font-semibold">
                      Books that you have Added will be shown here
                    </p>
                  </div>
                  <button
                    className="absolute right-0 w-fit bg-[#141E46] text-white rounded-lg px-4 py-2 text-lg"
                    onClick={() => {
                      navigate("/addBook");
                    }}
                  >
                    Add Book
                  </button>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-col justify-left text-left space-y-4 m-4">
                  {!Loading ? (
                    books.map((book) => (
                      <p className="text-xl font-bold">{book.title}</p>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                  {/* <p>Book 1</p>
                  <p>Book 2</p>
                  <p>Book 3</p>
                  <p>Book 4</p>
                  <p>Book 5</p>
                  <p>Book 6</p>
                  <p>Book 7</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
