import React, { useEffect, useState, useRef } from "react";
import Header from "../Dashboard/Header";
import ChatWindow from "./ChatWindow";
import ChatFooter from "./ChatFooter";
import Listings from "./Listings";
import axios from "axios";

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  /////////////////////////////////////////
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.1.12:3000/chat/", {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleUserClick = (chatData) => {
    // Set the selected user

    setSelectedUser(chatData.users[1]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("chat message", (newMessage) => {
        setChats((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("chat message");
      };
    }
  }, [socket]);
  /////////////////////////////////////////

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          {/* <Listings socket={socket} /> */}
          <div
            className={`h-full bg-[#FFF5E0] flex-1/5 pb-20 pl-20 pr-20 pt-5 border-t border-black`}
          >
            <div>
              <h4 className="mx-0 mb-20 mt-0">USERS</h4>
              {users.map((user) => (
                <button
                  key={user.otherUser}
                  onClick={() => setSelectedUser(user)}
                >
                  {user.otherUser}
                </button>
              ))}
            </div>

            {/* {selectedUser !== null && (
              <ChatWindow
                selectedUser={selectedUser}
                messages={chats} // Pass all chat messages
              />
            )} */}
          </div>

          <div className="flex flex-col w-full">
            {/* <ChatWindow
              messages={messages}
              lastMessageRef={lastMessageRef}
              typingStatus={typingStatus}
            /> */}
            {selectedUser !== null && (
              <ChatWindow
                selectedUser={selectedUser}
                messages={chats} // Pass all chat messages
              />
            )}
            {/* <div className="w-full">
              <ChatFooter socket={socket} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
