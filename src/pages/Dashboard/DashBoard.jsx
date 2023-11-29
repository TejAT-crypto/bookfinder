import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../App.css";
import Header from "./Header";
import dashimg from "../../assets/dashboard_img.svg"
import BookCard from '../Card/BookCard';
import dummyBooks from "./dummy";


const DashBoard = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [userInfo, setUserInfo] = useState(false);
  const [uniqueID, setUniqueID] = useState("");
  const signin = props.signin;
  const[books, setBooks] = useState([]);

  const submit = async (data) => {
    axios
      .post("http://10.1.72.9:3000/auth/login", data)
      .then((res) => {
        console.log(res);
        const tokenToSet = res.data ? res.data.token : "";
        if (tokenToSet === undefined) {
          return;
        }
        console.log(tokenToSet);
        sessionStorage.setItem(
          "Token",
          tokenToSet.substring(7, tokenToSet.length)
        );
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("role", res && res.data ? res.data.role : "");
        sessionStorage.setItem(
          "UserDetails",
          res && res.data ? JSON.stringify(res.data.profile) : {}
        );
        setUniqueID(res && res.data ? res.data.uuid : "");
        if (res.data.isNew) {
          signin();
          setUserInfo(true);
          sessionStorage.setItem("newUser", true);
        } else {
          signin();
          navigate("/dashboard");
          reset();
        }
      })
      .catch((err) => {
        navigate("/");
      });
  };

  return (
    <>
      <Header />
      <section className="relative h-screen bg-cover bg-center">
        <div className="flex flex-col">
          <div className="relative w-full flex flex-row mx-auto mb-10 lg:py-0 animate-slide-in-2 overflow-hidden">
            <div className="relative md:w-1/2 flex flex-col items-center">
              <p className="font-light text-[4.5rem] p-4 md:ml-20 w-10/12 text-left">Connect, Share and Discuss</p>
              <p className="text-[1.25rem] p-2 pl-6 pr-6 md:ml-20 w-10/12 text-left">"Book Buddy Finder" is a web-based application designed to connect book enthusiasts in their local area. It facilitates the exchange of books, building of friendships, and creation of discussions among the community of readers.</p>
            </div>
            <div className="relative flex-shrink-0 md:w-1/2 overflow-hidden">
              <img
                src={dashimg}
                alt="Author"
                className="absolute object-cover mt-20"
              />
            </div>
          </div>
          {/* Mapping Books */}
      <div className="flex flex-wrap justify-around">
        {dummyBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
