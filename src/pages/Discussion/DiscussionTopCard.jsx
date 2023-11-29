import React from 'react'
import cover from "../../assets/cover.png";


const DiscussionTopCard = () => {
  return (
    <>
      <div className="relative w-56 h-56 rounded-md">
        <img
          src={cover}
          alt="Author"
          className="absolute object-cover z-0 w-full h-full rounded-md opacity-30"
        />
        <div className="absolute z-10 bottom-0 mx-2 text-white">
          <p className="text-lg font-bold">This is title</p>
          <p className="text-base">This is subtitle</p>
        </div>
      </div>
    </>
  );
}

export default DiscussionTopCard