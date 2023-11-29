// import React, { useState } from 'react';


// const Header = () => {

//     const [isSearchOpen, setIsSearchOpen] = useState(false);

//     const toggleSearch = () => {
//         console.log("Button Clicked!");
//         setIsSearchOpen(!isSearchOpen);
//     };

//     const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

//     const toggleMobileSearch = () => {
//         setIsMobileSearchOpen(!isMobileSearchOpen);
//     };

//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };


//     return (
//         // <nav class="bg-[#fff5e0]">
//         //     <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         //         <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
//         //             <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
//         //             <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#141E46]">BBF</span>
//         //         </a>
//         //         <div class="flex">
//         //             <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded={isMobileSearchOpen}
//         //         onClick={toggleMobileSearch} class="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-400 rounded-lg text-sm p-2.5 me-1">
//         //                 <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//         //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//         //                 </svg>
//         //                 <span class="sr-only">Search</span>
//         //             </button>
//         //             {/* <div class="relative hidden md:block">
//         //                 <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//         //                     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//         //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//         //                     </svg>
//         //                     <span class="sr-only">Search icon</span>
//         //                 </div> */}

//         //                 <div className={`relative ${isMobileSearchOpen ? 'block' : 'hidden'} md:hidden`}>
//         //         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//         //             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//         //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//         //             </svg>
//         //             <span className="sr-only">Search icon</span>
//         //         </div>
//         //         <input
//         //             type="text"
//         //             id="search-navbar-mobile"
//         //             className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#fff5e0] focus:ring-blue-500 focus:border-blue-500"
//         //             placeholder="Search..."
//         //         />
//         //     {/* </div> */}
//         //                 {/* <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#fff5e0] focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." /> */}
//         //             </div>
//         //         </div>
//         //         <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//         //             <button type="button" class="flex text-sm bg-[#fff5e0] rounded-full md:me-0" id="user-menu-button" aria-expanded="true" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
//         //                 <span class="sr-only">Open user menu</span>
//         //                 <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
//         //             </button>

//         //             <div class="z-50 hidden my-4 text-base list-none bg-[#fff5e0] divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
//         //                 <div class="px-4 py-3">
//         //                     <span class="block text-sm text-gray-900">Bonnie Green</span>
//         //                     <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
//         //                 </div>
//         //                 <ul class="py-2" aria-labelledby="user-menu-button">
//         //                     <li>
//         //                         <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-[#C70039]">Dashboard</a>
//         //                     </li>
//         //                     <li>
//         //                         <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-[#C70039]">Settings</a>
//         //                     </li>
//         //                     <li>
//         //                         <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-[#C70039]">Earnings</a>
//         //                     </li>
//         //                     <li>
//         //                         <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-[#C70039]">Sign out</a>
//         //                     </li>
//         //                 </ul>
//         //             </div>
//         //             <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-400" aria-controls="navbar-user" aria-expanded="false">
//         //                 <span class="sr-only">Open main menu</span>
//         //                 <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//         //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
//         //                 </svg>
//         //             </button>
//         //         </div>
//         //         <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
//         //             <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#fff5e0] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#fff5e0] dark:bg-[#fff5e0]">
//         //                 <li>
//         //                     <a href="#" class="block py-2 px-3 text-blue-500 bg-blue-700 rounded md:bg-transparent md:text-[#141E46] md:hover:text-[#141E46] md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
//         //                 </li>
//         //                 <li>
//         //                     <a href="#" class="block py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:hover:bg-transparent md:hover:text-[#141E46] md:p-0">About</a>
//         //                 </li>
//         //                 <li>
//         //                     <a href="#" class="block py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:hover:bg-transparent md:hover:text-[#141E46] md:p-0 ">Services</a>
//         //                 </li>
//         //                 <li>
//         //                     <a href="#" class="block py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:hover:bg-transparent md:hover:text-[#141E46] md:p-0  ">Pricing</a>
//         //                 </li>
//         //                 <li>
//         //                     <a href="#" class="block py-2 px-3 text-blue-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#141E46] md:p-0">Contact</a>
//         //                 </li>
//         //             </ul>
//         //         </div>
//         //     </div>
//         // </nav>

//         <nav className="bg-[#fff5e0]">
//             <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                 <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
//                     <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
//                     <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#141E46]">BBF</span>
//                 </a>
//                 <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//                     <button
//                         type="button"
//                         onClick={toggleMobileMenu}
//                         className="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg text-sm p-2.5 me-1"
//                     >
//                         <svg
//                             className="w-5 h-5"
//                             aria-hidden="true"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 20 20"
//                         >
//                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                         </svg>
//                         <span className="sr-only">Toggle Menu</span>
//                     </button>

//                     <div
//                         className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
//                     >
//                         <div className="relative">
//                             <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                                 <svg
//                                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                                     aria-hidden="true"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 20 20"
//                                 >
//                                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                                 </svg>
//                                 <span className="sr-only">Search icon</span>
//                             </div>
//                             <input
//                                 type="text"
//                                 id="search-navbar-mobile"
//                                 className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#fff5e0] focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Search..."
//                             />
//                         </div>

//                         <div className="flex flex-col mt-4">
//                             {/* Add your other menu items here */}
//                             <a href="#" className="py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:p-0 ">
//                                 About
//                             </a>
//                             <a href="#" className="py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:p-0 ">
//                                 Services
//                             </a>
//                             <a href="#" className="py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:p-0 ">
//                                 Pricing
//                             </a>
//                             <a href="#" className="py-2 px-3 text-blue-500 rounded hover:text-[#141E46] md:p-0 ">
//                                 Contact
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//                 </div>
//                 </nav>
//     );
// }

// export default Header;
// src/components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-[#fff5e0] text-[#141E46] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Logo</div>
                <div className="hidden md:flex space-x-4 items-center">
                    {/* <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-2 py-1 bg-[#fff5e0] text-[#141E46] rounded-md border border-gray-300 focus:outline-none focus:border-[#141E46]"
                        />
                        <button className="ml-2 bg-[#141E46] px-3 py-1 rounded-md text-white">
                            Search
                        </button>
                    </div> */}
                    <div className="relative">
  <input
    type="text"
    placeholder="Search"
    className="pl-12 py-2 pr-10 bg-[#fff5e0] text-[#141E46] rounded-md border border-gray-300 focus:outline-none focus:border-[#141E46]"
  />
  <svg
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 10C15 14.4183 11.4183 18 7 18C2.58172 18 0 14.4183 0 10C0 5.58172 2.58172 2 7 2C11.4183 2 15 5.58172 15 10Z"
    />
  </svg>
</div>



                    <Link to="/discussion">Discussion</Link>
                    <Link to="/chat">Chat</Link>
                    <Link to="/activity">Activity</Link>
                    <button className="ml-2">
                        <Link to="/profile">
                            <img
                                src="path/to/profile-picture.jpg"  // Replace with the actual path to the user's profile picture
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
                            // Set opacity to 0 after animation when the menu is closed
                            setMobileMenuOpen(false);
                        }
                    }}
                >
                    <div className="flex flex-col space-y-2 text-[#141E46]">
                        <div className="items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-2 py-1 bg-[#fff5e0] text-[#141E46] rounded-md border border-gray-300 focus:outline-none focus:border-[#141E46]"
                            />
                            <button className="ml-2 bg-[#141E46] px-3 py-1 rounded-md text-white">
                                Search
                            </button>
                        </div>
                        {/* <button className="ml-2">
                            <Link to="/profile">
                                <img
                                    src="path/to/profile-picture.jpg"
                                    alt="Profile"
                                    className="rounded-full h-8 w-8"
                                />
                            </Link>
                        </button> */}

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

