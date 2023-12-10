import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import Header from "./Header";
import dashimg from "../../assets/dashboard_img.svg";
import BookCard from "../Card/BookCard";

const DashBoard = (props) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://10.1.124.13:3000/book/", {
        headers: {
          'auth-token': sessionStorage.getItem('Token')
        }
      });

      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter books based on the search term
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update state with filtered books
    setFilteredBooks(filteredBooks);
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
                connect book enthusiasts in their local area. It facilitates
                the exchange of books, building of friendships, and creation of
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
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
