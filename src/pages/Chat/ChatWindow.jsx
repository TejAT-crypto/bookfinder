import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatWindow = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <>
      <header className="w-full h-10vh flex items-center justify-between p-20 bg-gray-200">
        <p>Hangout with Colleagues</p>
        <button className=" p-10 w-150 border-none outline-none bg-red-600 cursor-pointer text-white mb-10" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="w-full h-80vh bg-white p-20 overflow-y-scroll">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="text-sm" key={message.id}>
              <p className="text-right">You</p>
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