import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';

const Listings = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);

  // Fetch user listings
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://10.1.123.86:3000/chat/', {
          headers: {
            'auth-token': sessionStorage.getItem('Token')
          }
        });
        console.log("users:", response.data)
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection
  const handleUserClick = async (userId) => {
    console.log("user id: ", userId)
    console.log("users ids: ", userId.users[1])

    setSelectedUser(userId.users[1]);
    console.log("user selected", selectedUser);
    try {
      const response = await axios.get(`http://10.1.123.86:3000/chat/messages`, {
        headers: { 'auth-token': sessionStorage.getItem('Token') }
      });
      setChats({
        ...chats,
        [userId]: response.data.messages
      });
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  

  // WebSocket logic to update chats
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

   console.log(users);

  return (
    <div className={`h-full bg-[#FFF5E0] flex-1/5} pb-20 pl-20 pr-20 pt-5 border-t border-black`}>
      {/* <div> */}
        {/* Hamburger icon for mobile view */}
        {/* {isMobile && (
          <div className="lg:hidden">
            <button onClick={toggleSidebar} className="text-blue-600 text-xl">
              ☰
            </button>
          </div>
        )} */}

        {/* Sidebar content for larger views or mobile view when open */}
        {/* {(isSidebarOpen || !isMobile) && (
          <div className="lg:block">
            <h4 className="mx-0 mb-20 mt-0">USERS</h4>
            <div className="mb-10 text-blue-600 text-sm">
              {/* {users.map((user) => (
                <p key={user.socketID}>{user.userName}</p>
              ))} */}
              {/* <p>Total Users Talked: {totalUsersTalked}</p> */}
              {users.map((user) => (
                <button key={user} onClick={() => handleUserClick(user)}>
                  {user.users}
                </button>
              ))}
      {selectedUser && (
        <ChatWindow
          selectedUser={selectedUser}
          messages={chats[selectedUser]}
        />
      )}
    </div>
  );
};

export default Listings;

{/* 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatWindow from './ChatWindow';

const Listings = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState({});

  // Fetch user listings
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://10.1.123.86:3000/chat/', {
          headers: {
            'auth-token': sessionStorage.getItem('Token')
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection
  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    try {
      const response = await axios.get(`http://10.1.123.86:3000/chat/messages/${userId}`, {
        headers: { 'auth-token': sessionStorage.getItem('Token') }
      });
      setChats({
        ...chats,
        [userId]: response.data.messages
      });
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  

  // WebSocket logic to update chats
  useEffect(() => {
    if (socket) {
      socket.on('chat message', (newMessage) => {
        setChats(prevChats => ({
          ...prevChats,
          [newMessage.chatId]: [...(prevChats[newMessage.chatId] || []), newMessage]
        }));
      });
    }

    return () => {
      if (socket) {
        socket.off('chat message');
      }
    };
  }, [socket, chats]);

  return (
    <div className="listings-container">
      <h2>User Listings</h2>
      <ul>
        {users.map(user => (
          // Ensure user has a unique and valid identifier
          <button key={user._id} onClick={() => handleUserClick(user.users[0])}>
            {user.users[0]} {/* Adjust this if necessary based on your user data structure */}
//           </button>
//         ))}
//       </ul>

//       {selectedUser && (
//         <ChatWindow
//           selectedUser={selectedUser}
//           messages={chats[selectedUser] || []}
//         />
//       )}
//     </div>
//   );
// };

// export default Listings; */}





//   const [users, setUsers] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userChats, setUserChats] = useState({});
//   const [totalUsersTalked, setTotalUsersTalked] = useState(0);

//   const fetchUserListing = async () => {
//     try {
//       const response = await axios.get('http://10.1.123.86:3000/chat/', {
//         headers: {
//           "auth-token": sessionStorage.getItem('Token')
//         }
//       });
//       setUsers(response.data); // Update the users state with the fetched data
//     } catch (error) {
//       console.error('Failed to fetch user listing', error);
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
//       if (window.innerWidth > 768) {
//         setSidebarOpen(true); // Show sidebar in larger views
//       }
//     };

//     // Initial check on mount
//     handleResize();

//     // Event listener for window resize
//     window.addEventListener('resize', handleResize);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   // useEffect(() => {
//   //   socket.on('newUserResponse', (data) => setUsers(data));
//   // }, [socket, users]);

//   const handleUserClick = (user) => {
//     // Set the selected user and fetch their chat
//     setSelectedUser(user);
//     // fetchUserListing(user);
//   };


//   useEffect(() => {
//     // Example: Update totalUsersTalked when users change
//     setTotalUsersTalked(users.length);
//   }, [users]);

//   useEffect(() => {

//     // Fetch initial user listing from the server
//     fetchUserListing();

//     // Example: Listen for socket events to update users and chats
//     socket.on('newUserResponse', (data) => setUsers(data));

//     // Clean up socket event listeners on component unmount
//     return () => {
//       socket.off('newUserResponse');
//     };
//   }, [socket, users]);

  
