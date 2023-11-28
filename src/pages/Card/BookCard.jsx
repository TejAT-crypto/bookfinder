// card.jsx

import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md">
      <img
        className="h-48 w-full object-cover md:h-64"
        src={book.imageUrl}
        alt={book.name}
      />

      <div className="px-4 py-2">
        <div className="text-xl font-semibold text-gray-800">{book.name}</div>
        <div className="text-sm text-gray-600">
          <p>{`${book.ratings} ⭐️ | ${book.location}`}</p>
        </div>
        <p className="text-gray-700 mt-2">{book.description}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Get a Book
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
          Bookmark
        </button>
      </div>
    </div>
  );
};

export default BookCard;
