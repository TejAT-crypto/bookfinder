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
    <Header />
    <div className="w-full h-screen flex items-center">
      <Listings socket={socket} />
      <div className="h-full flex-4/5">
        <ChatWindow messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
        <ChatFooter socket={socket} />
      </div>
    </div>
    </>
  );
};

export default Chat;