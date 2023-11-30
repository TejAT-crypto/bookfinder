import React from "react";
import {
  MdHome,
  MdOutlineTrendingUp,
  MdCollectionsBookmark,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Header from "../Dashboard/Header";
import DiscussionTopCard from "./DiscussionTopCard";
import DiscussionCard from "./DiscussionCard";

const Discussion = () => {
  return (
    <>
      <Header />
      <div className="overflow-hidden flex flex-row">
        <div className="flex w-1/5 bg-gray-200 h-full justify-center">
          <div className="flex flex-col w-full">
            <div className="grid m-4 mt-8 justify-center">
              <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                <div className="flex items-center">
                  <Link to="/dashboard">
                    <MdHome className="" />
                  </Link>
                </div>
                <div className="">
                  <p className="">Home</p>
                </div>
              </div>
              <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                <div className="flex items-center">
                  <Link to="/dashboard">
                    <MdOutlineTrendingUp className="" />
                  </Link>
                </div>
                <div className="">
                  <p className="">Trending</p>
                </div>
              </div>
            </div>
            <hr className="my-4 mx-4 border-t-2 border-gray-500" />
            <div className="relative">
              <h1 className="absolute ml-5 text-2xl">GENRES</h1>
              <div className="grid m-4 mt-10 justify-center">
                <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                  <div className="flex items-center">
                    <Link to="/dashboard">
                      <MdCollectionsBookmark className="" />
                    </Link>
                  </div>
                  <div className="">
                    <p className="">Fiction</p>
                  </div>
                </div>
                <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                  <div className="flex items-center">
                    <Link to="/dashboard">
                      <MdCollectionsBookmark className="" />
                    </Link>
                  </div>
                  <div className="">
                    <p className="">Romance</p>
                  </div>
                </div>
                <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                  <div className="flex items-center">
                    <Link to="/dashboard">
                      <MdCollectionsBookmark className="" />
                    </Link>
                  </div>
                  <div className="">
                    <p className="">Thriller</p>
                  </div>
                </div>
                <div className="my-2 flex space-x-2 px-2 justify-items-left text-black text-xl">
                  <div className="flex items-center">
                    <Link to="/dashboard">
                      <MdCollectionsBookmark className="" />
                    </Link>
                  </div>
                  <div className="">
                    <p className="">Novel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-600 h-full w-full">
          <div className="flex flex-row m-4 space-x-4">
            <DiscussionTopCard />
            <DiscussionTopCard />
            <DiscussionTopCard />
            <DiscussionTopCard />
          </div>
          <div className="flex flex-col text-white m-4 mr-4 rounded-md h-fit space-y-8">
            <DiscussionCard />
            <DiscussionCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion;
