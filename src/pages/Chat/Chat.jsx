import React, { useEffect, useState, useRef } from 'react';
import Header from '../Dashboard/Header';
import ChatWindow from './ChatWindow';
import ChatFooter from './ChatFooter';
import Listings from './Listings';

const Chat = ({ socket }) => {

  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);


  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Listings socket={socket} />

          <div className="flex flex-col w-full">
            <ChatWindow messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
            <ChatFooter socket={socket} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Chat;