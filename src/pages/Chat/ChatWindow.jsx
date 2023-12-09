import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatWindow = ({ selectedUser, messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/dashboard');
    window.location.reload();
  };

  console.log("Chat Messages:", messages);

  return (
    <>
      <div className="w-full h-full bg-[#FFF5E0] p-20 overflow-hidden border border-black">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="text-sm" key={message.id}>
              {/* <p className="text-right">You</p> */}
              <div className="bg-green-300 max-w-300 p-10 rounded-md ml-auto text-base">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="text-sm" key={message.id}>
              <p>{message.name}</p>
              <div className="bg-red-200 w-300 p-10 rounded-md text-base">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="fixed bottom-50 font-sm italic">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatWindow;

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
