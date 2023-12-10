import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatWindow = ({ socket, selectedUser, messages }) => {
 const navigate = useNavigate();
 const [chatMessages, setChatMessages] = useState(messages);
 const [chats, setChats] = useState([])

 console.log(selectedUser)

 useEffect(() => {
    if (selectedUser) {
      const fetchData = async () => {
        try {
          const chatId = selectedUser.chatId;
          const response = await axios.get(`https://se-project-backend-bbf.onrender.com/chat/messages/${chatId}`, {
            headers: {
              'auth-token': sessionStorage.getItem('Token')
            }
          });
  
          // Check if response.data[0]?.messages is defined and iterable
          console.log(response.data)
          setChats(response.data);
          console.log(chats)
  
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };
  
      fetchData();
    }
  }, [selectedUser]);

 useEffect(() => {
 if (socket) {
   socket.on('chat message', (newMessage) => {
     setChats((prevMessages) => [...prevMessages, newMessage]);
   });

   return () => {
     socket.off('chat message');
   };
 }
}, [socket]);


// console.log("messages", chatMessages);
const handleLeaveChat = () => {
  localStorage.removeItem('userName');
  navigate('/dashboard');
  window.location.reload();
};

 return (
   <>
     <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black">
       {chats.map((message) =>
         message.name === sessionStorage.getItem('username') ? (
           <div className="text-sm" key={message.id}>
           <p>{message.username}</p>
             <div className="bg-green-300 max-w-300 p-10 rounded-md ml-auto text-base">
               <p>{message.message}</p>
             </div>
           </div>
         ) : (
           <div className="text-sm" key={message.id}>
             <p>{message.username}</p>
             <div className="bg-red-200 w-300 p-10 rounded-md text-base">
               <p>{message.message}</p>
             </div>
           </div>
         )
       )}
       {/* <button onClick={handleLeaveChat}>Leave Chat</button> */}
     </div>
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
