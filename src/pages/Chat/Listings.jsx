import React, { useState, useEffect } from 'react';

const Listings = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="h-full bg-gray-200 flex-1/5 p-20 border-r border-gray-300">
      <h2>Open Chat</h2>
      <div>
        <h4 className="my-30 mx-0 mb-20 mt-0">ACTIVE USERS</h4>
        <div className="mb-10 text-blue-600 text-sm">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listings;