// import React, { useState } from "react";
// import { MdSend } from "react-icons/md";

// const ChatFooter = ({ socket, selectedUser }) => {
//   const [message, setMessage] = useState("");

//   console.log(selectedUser) // Now this should correctly log the selected user object

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() && sessionStorage.getItem("username")) {
//       socket.emit("send-msg", {
//         message: message,
//         chatId: selectedUser._id // Assuming the chat ID is stored in `_id` field
//       });
//     }
//     setMessage("");
//   };
//   return (
//     <div className="p-4 bg-[#FFF5E0] border-l border-black w-full">
//       <form
//         className="w-full h-full flex items-center justify-between"
//         onSubmit={handleSendMessage}
//       >
//         <input
//           type="text"
//           placeholder="Write message"
//           className="w-full h-full rounded-lg border border-black outline-none px-4 py-2 mr-2 bg-[#FFF5E0]"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           // onKeyDown={handleTyping}
//         />
//         {/* <button className="w-150 bg-green-500 p-10 border-none outline-none text-white cursor-pointer hover:bg-green-300">SEND</button> */}
//         <button className="rounded-lg p-2 border border-black outline-none text-black cursor-pointer hover:text-gray-300 hover:bg-black">
//           <MdSend />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatFooter;


import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import axios from "axios";

const ChatFooter = ({ socket, selectedUser }) => {
  const [message, setMessage] = useState("");

  // Debugging selected user

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && sessionStorage.getItem("username")) {

      console.log("Sending message to backend:", message, "to chat ID:", selectedUser.chatId);
      // Ensure you are emitting the correct data structure
      socket.emit("send-msg", {
        message: message,
        chatId: selectedUser.chatId,
        senderId: selectedUser._id // Replace 'chatId' with the correct property from selectedUser
      });
    }
    setMessage("");
  };

  // socket.on('send-msg', (data) => {
  //   console.log('Received message on the frontend:', data);
  //   // Update your chat window with the new message
  // });

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  
  //   if (message.trim() && sessionStorage.getItem("username") && selectedUser) {
  //     try {
  //       const response = await axios.post(
  //         "http://192.168.1.12:3000/chat/sendMessage",
  //         {
  //           message: message,
  //           chatId: selectedUser.chatId,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "auth-token": sessionStorage.getItem("Token"),
  //           },
  //         }
  //       );
  
  //       // Handle the response if needed
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //       // Handle the error as needed
  //     }
  //   }
  
  //   setMessage("");
  // };

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
        />
        <button className="rounded-lg p-2 border border-black outline-none text-black cursor-pointer hover:text-gray-300 hover:bg-black">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
