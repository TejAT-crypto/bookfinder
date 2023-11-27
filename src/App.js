import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import UserRegister from "./pages/User/UserRegister";

import UserLogin from "./pages/User/UserLogin";

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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {
          <UserRegister signin = {signin} />
        } />
        <Route path="/login" element = {
          <UserLogin signin = {signin} />
        } />
      </Routes>
    </div>
  );
};

export default App;
