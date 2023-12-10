import React, { useState } from "react";
import { MdSend } from "react-icons/md";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () =>
    socket.emit("typing", `${sessionStorage.getItem("username")} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("username")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="p-4 bg-[#FFF5E0] border-l border-black w-full">
      <form
        className="w-full h-full flex items-center justify-between"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Write message"
          className="w-full h-full rounded-lg border border-black outline-none px-4 py-2 mr-2 bg-[#FFF5E0]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // onKeyDown={handleTyping}
        />
        {/* <button className="w-150 bg-green-500 p-10 border-none outline-none text-white cursor-pointer hover:bg-green-300">SEND</button> */}
        <button className="rounded-lg p-2 border border-black outline-none text-black cursor-pointer hover:text-gray-300 hover:bg-black">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
