// import React, { useState, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import "../../App.css";
// import Header from "./Header";
// import dashimg from "../../assets/dashboard_img.svg"
// import BookCard from '../Card/BookCard';
// import dummyBooks from "./dummy";

// const DashBoard = (props) => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(false);
//   const [uniqueID, setUniqueID] = useState("");
//   const signin = props.signin;
//   const[books, setBooks] = useState([]);

//   const getBooks = async () => {
//     try {
//       // Post form data to /book/add along with the base64 string
//       const response = await axios.get("http://localhost:3000/book/", {
//           headers: {
//             'auth-token': sessionStorage.getItem('Token')
//           }
//         });

//       console.log("Form submitted successfully:", response.data);
//       setBooks(response.data)

//       // Optionally, you can handle a successful submission
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       // Optionally, you can handle errors
//     }
//   }
//   React.useEffect(() => {
//     getBooks();
//   }, [])

//   const handleSearch = (searchTerm) => {
//     // Filter books based on the search term
//     const filteredBooks = dummyBooks.filter((book) =>
//       book.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Update state with filtered books
//     setBooks(filteredBooks);
//   };

//   return (
//     <>
//       <Header onSearch={handleSearch} />
//       <section className="relative h-screen bg-cover bg-center">
//         <div className="flex flex-col">
//           <div className="relative w-full flex flex-row mx-auto mb-10 lg:py-0 animate-slide-in-2 overflow-hidden">
//             <div className="relative md:w-1/2 flex flex-col items-center">
//               <p className="font-light text-[4.5rem] p-4 md:ml-20 w-10/12 text-left">Connect, Share and Discuss</p>
//               <p className="text-[1.25rem] p-2 pl-6 pr-6 md:ml-20 w-10/12 text-left">"Book Buddy Finder" is a web-based application designed to connect book enthusiasts in their local area. It facilitates the exchange of books, building of friendships, and creation of discussions among the community of readers.</p>
//             </div>
//             <div className="relative flex-shrink-0 md:w-1/2 overflow-hidden">
//               <img
//                 src={dashimg}
//                 alt="Author"
//                 className="absolute object-cover mt-20"
//               />
//             </div>
//           </div>
//           {/* Mapping Books */}
//       <div className="flex flex-wrap justify-around">
//       {books.length > 0 ? (
//           books.map((book, index) => <BookCard key={index} book={book} />)
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default DashBoard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Header from "./Header";
import dashimg from "../../assets/dashboard_img.svg";
import BookCard from "../Card/BookCard";

const DashBoard = (props) => {
  const [books, setBooks] = useState([]);
  const [bookIds, setBookIds] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/book/", {
        headers: {
          "auth-token": sessionStorage.getItem("Token"),
        },
      });
      console.log(response.data);

      const booksWithGeocoding = await Promise.all(
        response.data.map(async (book) => {
          const { coordinates } = book.location;

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${coordinates[1]}+${coordinates[0]}&key=c3b00ecf40ec49aa9c4c6a0cd85629c1`
            );
            const data = await response.json();
            const results = data.results;

            const town = results[0].formatted;

            // Update the location field in the book object
            const updatedBook = { ...book, town };
            return updatedBook;
          } catch (error) {
            console.error("Error fetching geocoding data:", error);
            return book; // Return the original book if there's an error
          }
        })
      );

      setBooks(booksWithGeocoding);
      console.log(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const getBookStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/chat/allChatRequests",
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      console.log("Response data: ",response.data);
      const unique = response.data.filter(
        (v, i, a) => a.findIndex((t) => t.bookId._id === v.bookId._id) === i
      );
      const bookids = unique.map((book) => book.bookId._id);
      setBookIds(bookids);
      console.log("Book ids: ",bookids);
      console.log("Unique: ",unique);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getBooks();
    getBookStatus();
  }, []);

  useEffect(() => {
    console.log("Updated Books:", books);
  }, [books]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, load all books
      getBooks(); // Assuming you have a state or variable holding all the original books
    } else {
      // Filter books based on the search term
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Update state with filtered books
      setBooks(filteredBooks);
      // // Filter books based on the search term
      // const filteredBooks = books.filter((book) =>
      //   book.title.toLowerCase().includes(searchTerm.toLowerCase())
      // );

      // // Update state with filtered books
      // setBooks(filteredBooks);
    }
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <section className="relative h-screen bg-cover bg-center">
        <div className="flex flex-col">
          <div className="relative w-full flex flex-row mx-auto mb-10 lg:py-0 animate-slide-in-2 overflow-hidden">
            <div className="relative md:w-1/2 flex flex-col items-center">
              <p className="font-light text-[4.5rem] p-4 md:ml-20 w-10/12 text-left">
                Connect, Share and Discuss
              </p>
              <p className="text-[1.25rem] p-2 pl-6 pr-6 md:ml-20 w-10/12 text-left">
                "Book Buddy Finder" is a web-based application designed to
                connect book enthusiasts in their local area. It facilitates the
                exchange of books, building of friendships, and creation of
                discussions among the community of readers.
              </p>
            </div>
            <div className="relative flex-shrink-0 md:w-1/2 overflow-hidden">
              <img
                src={dashimg}
                alt="Author"
                className="absolute object-cover mt-20"
              />
            </div>
          </div>
          {/* Mapping Books */}
          <div className="flex flex-wrap justify-around">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  key={index}
                  className="w-1/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mb-4"
                >
                  <BookCard book={book} bookIds={bookIds} />
                </div>
              ))
            ) : books.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
