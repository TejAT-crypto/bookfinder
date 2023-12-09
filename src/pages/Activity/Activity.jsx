import React from "react";
import Header from "../Dashboard/Header";

const Activity = () => {
  return (
    <>
      <Header />
      <div className="">
        <div className="flex flex-col justify-start">
          <div className="flex flex-row space-x-8 m-4 items-end">
            <h1 className="text-2xl text-center underline">
              Add a book for lend by clicking this button
            </h1>
            <button
              className="bg-[#141e46] text-white rounded-md p-3 font-medium"
              type="button"
            >
              Lend a Book
            </button>
          </div>
          <div className="flex flex-col space-x-8 m-4 items-end">
            <h1 className="text-2xl text-center underline">
              Requested Books for Lend
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
