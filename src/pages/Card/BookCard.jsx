// card.jsx

import React from 'react';
import StarRating from './ratings';
import { MdLocationOn, MdBookmarkBorder } from "react-icons/md";


const BookCard = ({ book }) => {
  return (
    <div className="flex space-x-4 p-4 ">
      <div className="w-80  bg-opacity-50 rounded-2xl shadow-2xl overflow-hidden bg-[#FFF5E0]">
        <div className="h-72 overflow-hidden py-5 bg-[#fbf3e7]">
          <img
            className="h-full w-full object-contain"
            src={book.imageUrl}
            alt={book.name}
          />
        </div>

        <div className="bg-[#FFF5E0]">
          <div className="px-4 py-2 bg-[#C70039] bg-opacity-80 h-[3.13rem] text-white text-xl font-semibold mb-2 text-left">
            {book.name}
          </div>
          <div className="flex items-center justify-between text-md text-black">
            <p className="flex items-center ml-3">
              <MdLocationOn className='text-lg' /> <span className='ml-1 mr-5'> {book.location}</span>
            </p>
            <p className="flex items-center mr-3">
              <StarRating rating={book.ratings} /> <span> {book.noofratings} reviews</span>
            </p>
          </div>

          <p className="text-black mx-2 px-2 py-2">{book.description}</p>
        </div>

        <div className="flex items-center justify-center px-4 py-4 bg-[#FFF5E0]">
          <button className="bg-[#C70039] bg-opacity-80 text-white px-12 py-2 rounded-md">
            Get a Book
          </button>
          <button className="text-[#C70039] text-opacity-80 py-2 px-2 rounded-lg text-3xl ml-6 border shadow">
            <MdBookmarkBorder  />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
