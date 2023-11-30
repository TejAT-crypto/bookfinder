import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';

const Listings = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userChats, setUserChats] = useState({});
  const [totalUsersTalked, setTotalUsersTalked] = useState(0);

  const fetchUserListing = async () => {
    try {
      const response = await axios.get('http://172.20.10.6:3000/chat/', {
        headers: {
          "auth-token": sessionStorage.getItem('Token')
        }
      });
      setUsers(response.data); // Update the users state with the fetched data
    } catch (error) {
      console.error('Failed to fetch user listing', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
      if (window.innerWidth > 768) {
        setSidebarOpen(true); // Show sidebar in larger views
      }
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   socket.on('newUserResponse', (data) => setUsers(data));
  // }, [socket, users]);

  const handleUserClick = (user) => {
    // Set the selected user and fetch their chat
    setSelectedUser(user);
    // fetchUserListing(user);
  };


  useEffect(() => {
    // Example: Update totalUsersTalked when users change
    setTotalUsersTalked(users.length);
  }, [users]);

  useEffect(() => {

    // Fetch initial user listing from the server
    fetchUserListing();

    // Example: Listen for socket events to update users and chats
    socket.on('newUserResponse', (data) => setUsers(data));

    // Clean up socket event listeners on component unmount
    return () => {
      socket.off('newUserResponse');
    };
  }, [socket, users]);

  

  return (
    <div className={`h-full bg-[#FFF5E0] ${isMobile && !isSidebarOpen ? 'hidden' : 'flex-1/5'} pb-20 pl-20 pr-20 pt-5 border-t border-black`}>
      <div>
        {/* Hamburger icon for mobile view */}
        {isMobile && (
          <div className="lg:hidden">
            <button onClick={toggleSidebar} className="text-blue-600 text-xl">
              ☰
            </button>
          </div>
        )}

        {/* Sidebar content for larger views or mobile view when open */}
        {(isSidebarOpen || !isMobile) && (
          <div className="lg:block">
            <h4 className="mx-0 mb-20 mt-0">USERS</h4>
            <div className="mb-10 text-blue-600 text-sm">
              {/* {users.map((user) => (
                <p key={user.socketID}>{user.userName}</p>
              ))} */}
              {/* <p>Total Users Talked: {totalUsersTalked}</p> */}
              {users.map((user) => (
                <button key={user.socketID} onClick={() => handleUserClick(user)}>
                  {user.users}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedUser && (
        <ChatWindow
          userChats={userChats[selectedUser.id] || ""}  // Pass chat data for the selected user
          selectedUser={selectedUser}
          // lastMessageRef={lastMessageRef}
          // typingStatus={typingStatus}
        />
      )}
    </div>
  );
};

export default Listings;