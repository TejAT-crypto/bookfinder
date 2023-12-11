import React from "react";
import bookImage from "../../assets/cover.png";
import { IoMdHeartEmpty, IoIosSend, IoMdSend } from "react-icons/io";
import { MdOutlineChat } from "react-icons/md";

const DiscussionCard = () => {
  return (
    <>
      <div className="flex flex-col bg-black w-full h-full rounded-lg">
        <div className="mt-4 w-full">
          <div className="relative flex flex-row items-center space-x-2 w-full h-full">
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Author"
                className="w-10 h-10 object-cover rounded-full ml-4"
              />
            </div>
            <div className="text-white text-lg">
              <p className="">Neilay Bhatt</p>
            </div>
            <div className="text-white ">
              <p className="inline-block align-bottom">˙</p>
            </div>
            <div className="text-white text-sm">
              <p className="">2 Days ago</p>
            </div>
            <div className="absolute top-0 right-4 text-white text-2xl">
              <p className="">˙˙˙</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-left m-4">
          <p className="text-white text-2xl font-bold">This is title.</p>
          <p className="text-white">This is subtitle.</p>
        </div>
        <div className="flex flex-col">
          <img
            src={bookImage}
            alt=""
            className="object-cover h-80 rounded-md mx-4"
          />
        </div>
        <div className="flex flex-row space-x-4 m-4 text-2xl">
          <IoMdHeartEmpty />
          <MdOutlineChat />
          <IoIosSend />
        </div>
        <div className="relative flex flex-row bg-[#fff5e0] h-10 m-4 mt-0 mb-8 items-center rounded-md">
          <p className="text-black ml-2">Add a comment...</p>
          <IoMdSend className="absolute right-2 text-black text-2xl" />
        </div>
      </div>
    </>
  );
};

export default DiscussionCard;
