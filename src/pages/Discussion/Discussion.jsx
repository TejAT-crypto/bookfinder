import React from "react";
import Header from "../Dashboard/Header";

const Discussion = () => {
  return (
    <>
      <Header />
      <div className="relative h-screen flex flex-row">
        <div className="w-1/4 bg-gray-200 h-full"></div>
        <div className="w-1/2 bg-gray-600 h-full"></div>
        <div className="w-full bg-gray-900 h-full"></div>
      </div>
    </>
  );
};

export default Discussion;
