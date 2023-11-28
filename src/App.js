import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import UserRegister from "./pages/User/UserRegister";

import UserLogin from "./pages/User/UserLogin";
import DashBoard from "./pages/Dashboard/DashBoard";

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
    setIsSignedIn(false)
    sessionStorage.setItem('isSignedIn', 'false')
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {
          <UserRegister signin = {signin} />
        } />
        <Route path="/login" element = {
          <UserLogin signin = {signin} />
        } />
        <Route path="/dashboard" element={
          // <Protected isSignedIn={isSignedIn}>
            <DashBoard signin={signin} signout={signout} />
          // </Protected>
        } />
      </Routes>
    </div>
  );
};

export default App;
