import React from "react";

const DiscussionCard = () => {
  return (
    <>
      <div className="relative flex flex-col w-full">
        <div className="absolute top-2 left-4">
          <div className="flex flex-row justify-center items-center space-x-2">
            <div className="">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Author"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <div className="text-white">
              <p className="">Neilay Bhatt</p>
            </div>
            <div className="text-white ">
              <p className="inline-block align-bottom">˙</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussionCard;
