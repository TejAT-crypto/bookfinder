import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-[#fff5e0] text-[#141E46] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 pr-36">
                        Logo
                    </div>

                    {/* Search bar */}
                    
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="I'm looking for"
                            className="pl-4 py-2 pr-10 bg-[#fff5e0] text-[#141E46] rounded-xl border border-gray-300 focus:outline-none focus:border-[#141E46] w-96"
                        />
                        <MdOutlineSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer" />
                    </div>

                    {/* Navigation Links */}
                    <Link to="/dashboard" className="px-5 pl-64 text-blue-500 hover:text-blue-700">Home</Link>
                    <Link to="/discussion" className="px-5 text-blue-500 hover:text-blue-700">Discussion</Link>
                    <Link to="/chat" className="px-5 text-blue-500 hover:text-blue-700">Chat</Link>
                    <Link to="/activity" className="px-5 text-blue-500 hover:text-blue-700">Activity</Link>

                    {/* Profile Button */}
                    <button className="ml-2 px-5">
                        <Link to="/profile">
                            <img
                                src="path/to/profile-picture.jpg"
                                alt="Profile"
                                className="rounded-full h-8 w-8"
                            />
                        </Link>
                    </button>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu}>
                        <svg
                            className="w-6 h-6 transition-transform duration-300 transform focus:outline-none focus:ring focus:border-blue-300 text-[#141E46]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="md:hidden bg-[#fff5e0] p-2 mt-2 transition-opacity duration-300 opacity-100 text-[#141E46]"
                    onAnimationEnd={() => {
                        if (!isMobileMenuOpen) {
                            setMobileMenuOpen(false);
                        }
                    }}
                >
                    <div className="flex flex-col space-y-2 text-[#141E46]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-4 py-2 pr-10 bg-[#fff5e0] text-[#141E46] rounded-md border border-gray-300 focus:outline-none focus:border-[#141E46]"
                            />
                            <MdOutlineSearch className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer" />
                        </div>
                        <Link to="/dashboard">Home</Link>
                        <Link to="/discussion">Discussion</Link>
                        <Link to="/chat">Chat</Link>
                        <Link to="/activity">Activity</Link>
                        <Link to="/profile">Profile</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

