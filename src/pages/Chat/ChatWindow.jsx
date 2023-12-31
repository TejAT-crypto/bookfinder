import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatFooter from "./ChatFooter";
import { IoMdInformationCircleOutline } from "react-icons/io";

const ChatWindow = ({ socket, selectedUser, messages }) => {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState(messages);
  const [chats, setChats] = useState([]);
  const [profileimg, setProfileimg] = useState("");
  console.log("window: ", socket)

  console.log("selected user is: ", selectedUser);

  useEffect(() => {
    if (selectedUser) {
      const fetchData = async () => {
        try {
          const chatId = selectedUser.chatId;
          const response = await axios.get(
            `http://192.168.1.12:3000/chat/messages/${chatId}`,
            {
              headers: {
                "auth-token": sessionStorage.getItem("Token"),
              },
            }
          );

          // Check if response.data[0]?.messages is defined and iterable
          console.log(response.data);
          setChats(response.data.chats);
          setProfileimg(response.data.image);
          console.log(profileimg);
          console.log(chats);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchData();
    }
  }, [selectedUser]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("chat message", (newMessage) => {
  //       setChats((prevMessages) => [...prevMessages, newMessage]);
  //     });

  //     return () => {
  //       socket.off("chat message");
  //     };
  //   }
  // }, [socket]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on("send-msg", handleNewMessage);

      return () => {
        socket.off("send-msg", handleNewMessage);
      };
    }
  }, [socket]);

  // console.log("messages", chatMessages);
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/dashboard");
    window.location.reload();
  };

  // socket.on('send-msg', (data) => {
  //   console.log('Received message on the frontend:', data);
  //   // Update your chat window with the new message
  // });

  return (
    <>
      <div className="flex flex-row w-full border-b-2 border-black space-x-2 items-center relative">
        <div className="m-4 ml-2">
          <img
            className="rounded-full h-12 w-12 object-cover"
            src={`data:image/png;base64,${profileimg}`}
          />
        </div>
        <div className="">
          <p className="text-xl font-medium">{selectedUser.otherUser}</p>
        </div>
        <div className="absolute right-0">
          <IoMdInformationCircleOutline className="h-6 w-6 mr-6" />
        </div>
      </div>
      {/* <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black"> */}
      {/* <div className="flex flex-1 flex-col justify-end px-4 overflow-scroll">
        {chats.map((message) =>
          message.user === sessionStorage.getItem("userId") ? (
            <div className="text-sm" key={message.id}>
              <p>{message.username}</p>
              <div className="bg-green-300 max-w-300 p-4 rounded-md ml-auto text-base w-fit my-2">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm" key={message.id}>
              <p>{message.username}</p>
              <div className="bg-red-200 w-300 p-4 rounded-md text-base w-fit my-2">
                <p>{message.message}</p>
              </div>
            </div>
          )
        )}
      </div> */}
      <div className="flex flex-1 flex-col justify-end px-4 overflow-scroll">
        {chatMessages.map((message) => (
          <div className="text-sm" key={message.id}>
            <p>{message.username}</p>
            <div
              className={`${
                message.user === sessionStorage.getItem("userId")
                  ? "bg-green-300 ml-auto"
                  : "bg-red-200"
              } max-w-300 p-4 rounded-md text-base w-fit my-2`}
            >
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <ChatFooter socket={socket} selectedUser={selectedUser} />
      </div>
      {/* <button onClick={handleLeaveChat}>Leave Chat</button> */}
      {/* </div> */}
    </>
  );
};

export default ChatWindow;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ChatWindow = ({ selectedUser, messages, lastMessageRef, typingStatus }) => {
//   const navigate = useNavigate();

//   const handleLeaveChat = () => {
//     localStorage.removeItem('userName');
//     navigate('/dashboard');
//     window.location.reload();
//   };

//   console.log("Chat Messages:", messages);

//   return (
//     <>
//       <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black">
//         {messages.map((message) =>
//           message.name === localStorage.getItem('userName') ? (
//             <div className="text-sm" key={message.id}>
//               {/* <p className="text-right">You</p> */}
//               <div className="bg-green-300 max-w-300 p-10 rounded-md ml-auto text-base">
//                 <p>{message.text}</p>
//               </div>
//             </div>
//           ) : (
//             <div className="text-sm" key={message.id}>
//               <p>{message.name}</p>
//               <div className="bg-red-200 w-300 p-10 rounded-md text-base">
//                 <p>{message.text}</p>
//               </div>
//             </div>
//           )
//         )}

//         <div className="fixed bottom-50 font-sm italic">
//           <p>{typingStatus}</p>
//         </div>
//         <div ref={lastMessageRef} />
//       </div>
//     </>
//   );
// };

// export default ChatWindow;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ChatWindow = ({ userChats, selectedUser, lastMessageRef, typingStatus }) => {
//   const navigate = useNavigate();

//   const handleLeaveChat = () => {
//     localStorage.removeItem('userName');
//     navigate('/dashboard');
//     window.location.reload();
//   };

//   const chatData = userChats[selectedUser.id] || {};
//   const { users = [], messages = [] } = chatData;

//   return (
//     <>
//       <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black">
//         {messages.map((message) => (
//           <div className="text-sm" key={message.timestamp}>
//             <p>User ID: {users.find((userId) => userId !== localStorage.getItem('userId'))}</p>
//             {message.user === localStorage.getItem('userId') ? (
//               <div className="bg-green-300 max-w-300 p-10 rounded-md ml-auto text-base">
//                 <p>{message.message}</p>
//               </div>
//             ) : (
//               <div className="bg-red-200 w-300 p-10 rounded-md text-base">
//                 <p>{message.message}</p>
//               </div>
//             )}
//           </div>
//         ))}

//         <div className="fixed bottom-50 font-sm italic">
//           <p>{typingStatus}</p>
//         </div>
//         <div ref={lastMessageRef} />
//       </div>
//     </>
//   );
// };

// export default ChatWindow;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ChatWindow = ({ userChats, selectedUser, lastMessageRef, typingStatus }) => {
//   const navigate = useNavigate();

//   const handleLeaveChat = () => {
//     localStorage.removeItem('userName');
//     navigate('/dashboard');
//     window.location.reload();
//   };

//   const chatData = userChats[selectedUser] || {};
//   const { users = [], messages = [] } = chatData;

//   return (
//     <>
//       <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black">
//         {messages.length > 0 ? (
//           messages.map((message) => (
//             <div className="text-sm" key={message.timestamp}>
//               <p>User ID: {users.find((userId) => userId !== localStorage.getItem('userId'))}</p>
//               {message.user === localStorage.getItem('userId') ? (
//                 <div className="bg-green-300 max-w-300 p-10 rounded-md ml-auto text-base">
//                   <p>{message.message}</p>
//                 </div>
//               ) : (
//                 <div className="bg-red-200 w-300 p-10 rounded-md text-base">
//                   <p>{message.message}</p>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No messages available for this user.</p>
//         )}

//         <div className="fixed bottom-50 font-sm italic">
//           <p>{typingStatus}</p>
//         </div>
//         <div ref={lastMessageRef} />
//       </div>
//     </>
//   );
// };

// export default ChatWindow;
