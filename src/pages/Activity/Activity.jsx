import { React, useState } from "react";
import Header from "../Dashboard/Header";
import bookImage from "../../assets/cover.png";

const Activity = () => {
  const [isListOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  return (
    <>
      <Header />
      <div className="flex justify-start">
        <div className="flex flex-col justify-start w-full">
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
          <div className="flex flex-col m-4">
            <h1 className="text-2xl underline text-left">
              Requested Books for Lend
            </h1>
            <div className="bg-[#FFF5E0] h-full w-full">
              <div className="flex flex-row">
                <div className="flex m-4 ml-8 w-auto justify-items-start">
                  <img
                    className="h-20 w-20 object-cover rounded-md"
                    src={bookImage}
                    alt="book"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center items-baseline">
                  <div className="font-medium text-2xl">
                    The Psychology of Money
                  </div>
                  <div>Morgan Housel</div>
                </div>
                <div className="flex items-center m-4 space-x-4">
                  <button
                    type="button"
                    onClick={toggleList}
                    className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
                  >
                    View
                  </button>
                  {isListOpen && (
                    <button
                      type="button"
                      onClick={toggleList}
                      className="bg-[#c70039] text-white rounded-md p-3 px-5 font-medium"
                    >
                      Decline all
                    </button>
                  )}
                </div>
              </div>
            </div>
            {isListOpen && (
              <div className="flex flex-row justify-items-start ml-10 bg-[#ececec]">
                <ul className="space-y-2 w-full">
                  <li className="flex flex-row w-full">
                    <div className="flex m-4 ">
                      <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        className="rounded-full h-12 w-12 object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-start justify-center">
                      <p className="text-base font-semibold">Rucha</p>
                      <p className="text-sm">20 days ago</p>
                    </div>
                    <div className="flex flex-row space-x-4 m-4">
                      <button
                        type="button"
                        onClick={toggleList}
                        className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={toggleList}
                        className="bg-[#c70039] text-white rounded-md p-3 px-5 font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
