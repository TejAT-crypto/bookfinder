import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import UserRegister from "./pages/User/UserRegister";

import UserLogin from "./pages/User/UserLogin";
import DashBoard from "./pages/Dashboard/DashBoard";
import Discussion from "./pages/Discussion/Discussion";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import Activity from "./pages/Activity/Activity";
import AddBook from "./pages/Profile/AddBook";
import EditProfile from "./pages/Profile/EditProfile";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://192.168.1.12:3000");

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(
    sessionStorage.getItem("isSignedIn") === "true"
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  const signin = () => {
    setIsSignedIn(true);
    sessionStorage.setItem("isSignedIn", "true");
  };

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const signout = () => {
    setIsSignedIn(false);
    sessionStorage.setItem("isSignedIn", "false");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserRegister signin={signin} />} />
        <Route path="/login" element={<UserLogin signin={signin} />} />
        <Route
          path="/dashboard"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <DashBoard signin={signin} signout={signout} />
            // </Protected>
          }
        />
        <Route
          path="/chat"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <Chat signin={signin} signout={signout} socket={socket} />
            // </Protected>
          }
        />
        <Route
          path="/discussion"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <Discussion signin={signin} signout={signout} />
            // </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <Profile signin={signin} signout={signout} />
            // </Protected>
          }
        />
        <Route
          path="/activity"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <Activity signin={signin} signout={signout} />
            // </Protected>
          }
        />
        <Route
          path="/addBook"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <AddBook signin={signin} signout={signout} />
            // </Protected>
          }
        />
        <Route
          path="/editProfile"
          element={
            // <Protected isSignedIn={isSignedIn}>
            <EditProfile signin={signin} signout={signout} />
            // </Protected>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
