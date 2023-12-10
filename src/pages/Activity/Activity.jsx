// import React, { useEffect, useState } from "react";
// import Header from "../Dashboard/Header";
// import axios from "axios";

// const Activity = () => {
//   const [activity, setActivity] = useState([]);

//   // Use a single state to track the ID of the currently open book
//   const [openBookId, setOpenBookId] = useState();

//   const toggleList = (bookId) => {
//     setOpenBookId(bookId);
//     // console.log("bookId is set: ",bookId);
//   };

//   const fetchActivity = async () => {
//     try {
//       const response = await axios.get(
//         "http://192.168.1.12:3000/chat/allChatRequests",
//         {
//           headers: {
//             "auth-token": sessionStorage.getItem("Token"),
//           },
//         }
//       );
//       console.log(response.data);
//       const unique = response.data.filter(
//         (v, i, a) => a.findIndex((t) => t.bookId._id === v.bookId._id) === i
//       );
//       setActivity(unique);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const acceptRequest = async (bookId) => {
//     console.log("Result is: ", bookId);
//     try {
//       const response = await axios.post(
//         "http://192.168.1.12:3000/chat/acceptRequest",
//         {
//           bookId: bookId,
//         },
//         {
//           headers: {
//             "auth-token": sessionStorage.getItem("Token"),
//           },
//         }
//       );
//       console.log(response);
//     }
//     catch (err) {
//       console.log(err);
//     }
//   };
  

//   useEffect(() => {
//     fetchActivity();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="flex justify-start">
//         <div className="flex flex-col justify-start w-full">
//           <div className="flex flex-row space-x-8 m-4 items-end">
//             <h1 className="text-2xl text-center underline">
//               Add a book for lend by clicking this button
//             </h1>
//             <button
//               className="bg-[#141e46] text-white rounded-md p-3 font-medium"
//               type="button"
//             >
//               Lend a Book
//             </button>
//           </div>
//           <div className="flex flex-col m-4">
//             <h1 className="text-2xl underline text-left">
//               Requested Books for Lend
//             </h1>
//             {activity.map((book) => (
//               <div className="bg-[#FFF5E0] h-full w-full" key={book.id}>
//                 <div className="flex flex-row">
//                   <div className="flex m-4 ml-8 w-auto justify-items-start">
//                     <img
//                       className="h-20 w-20 object-cover rounded-md"
//                       src={"../../assets/cover.png"}
//                       alt="book"
//                     />
//                   </div>
//                   <div className="flex flex-1 flex-col justify-center items-baseline">
//                     <div className="font-medium text-2xl">
//                       {book.bookId.title}
//                     </div>
//                     <div>{book.bookId.author}</div>
//                   </div>
//                   <div className="flex items-center m-4 space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => toggleList(book.bookId._id)}
//                       className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//                 {openBookId === book.bookId._id && (
//                   <div className="flex flex-row justify-items-start ml-10 bg-[#ececec]">
//                     <ul className="space-y-2 w-full">
//                       <li key={`list-${book.id}`} className="flex flex-row w-full">
//                         <div className="flex m-4 ">
//                           <img
//                             src="https://icon-library.com/images/default-user-icon/default-user-icon-9.jpg"
//                             alt="Profile"
//                             className="rounded-full h-12 w-12 object-cover"
//                           />
//                         </div>
//                         <div className="flex flex-1 flex-col items-start justify-center">
//                           <p className="text-base font-semibold">{book.requestingUserId}</p>
//                           {/* <p className="text-sm">20 days ago</p> */}
//                         </div>
//                         <div className="flex flex-row space-x-4 m-4">
//                           <button
//                             type="button"
//                             className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
//                             onClick={() => acceptRequest(book._id)}
//                           >
//                             Accept
//                           </button>
//                           <button
//                             type="button"
//                             className="bg-[#c70039] text-white rounded-md p-3 px-5 font-medium"
//                           >
//                             Decline
//                           </button>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Activity;



import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header";
import axios from "axios";

const Activity = () => {
  const [activity, setActivity] = useState([]);
  const [openBookId, setOpenBookId] = useState();
  const [loading, setLoading] = useState(false);

  const toggleList = (bookId) => {
    setOpenBookId((prevOpenBookId) =>
      prevOpenBookId === bookId ? null : bookId
    );
  };

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://192.168.1.12:3000/chat/allChatRequests",
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      console.log(response.data);
      const unique = response.data.filter(
        (v, i, a) => a.findIndex((t) => t.bookId._id === v.bookId._id) === i
      );
      setLoading(false);
      setActivity(unique);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async (id,bookId) => {
    console.log("Id is: ", id);
    console.log("BookId is: ", bookId);
    try {
      const response = await axios.post(
        "http://192.168.1.12:3000/chat/acceptRequest",
        {
          chatRequestId: id,
          bookId: bookId,
        },
        {
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );
      fetchActivity();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const declineRequest = async (id) => {
    console.log("Id is: ", id);
    try {
      const response = await axios.delete(
        "http://192.168.1.12:3000/chat/declineRequest",
        {
          data: {
            chatRequestId: id,
          },
          headers: {
            "auth-token": sessionStorage.getItem("Token"),
          },
        }
      );      
      console.log(response.data);
      fetchActivity();
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-start">
        <div className="flex flex-col justify-start w-full">
          <div className="flex flex-row space-x-8 m-4 items-end">
            <h1 className="text-2xl text-center underline">
              Add a book for lend by clicking this button
            </h1>
            <button
              className="bg-[#141e46] text-white rounded-md p-3 font-medium"
              type="button"
            >
              Lend a Book
            </button>
          </div>
          <div className="flex flex-col m-4">
            <h1 className="text-2xl underline text-left">
              Requested Books for Lend
            </h1>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              activity.map((book) => (
                <div className="bg-[#FFF5E0] h-full w-full" key={book.bookId._id}>
                  <div className="flex flex-row">
                    <div className="flex m-4 ml-8 w-auto justify-items-start">
                      <img
                        className="h-20 w-20 object-cover rounded-md"
                        src={"../../assets/cover.png"}
                        alt="book"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center items-baseline">
                      <div className="font-medium text-2xl">
                        {book.bookId.title}
                      </div>
                      <div>{book.bookId.author}</div>
                    </div>
                    <div className="flex items-center m-4 space-x-4">
                      <button
                        type="button"
                        onClick={() => toggleList(book.bookId._id)}
                        className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
                      >
                        {openBookId === book.bookId._id ? "Close" : "View"}
                      </button>
                    </div>
                  </div>
                  {openBookId === book.bookId._id && (
                    <div className="flex flex-row justify-items-start ml-10 bg-[#ececec]">
                      <ul className="space-y-2 w-full">
                        <li
                          key={`list-${book.id}`}
                          className="flex flex-row w-full"
                        >
                          <div className="flex m-4 ">
                            <img
                              src="https://icon-library.com/images/default-user-icon/default-user-icon-9.jpg"
                              alt="Profile"
                              className="rounded-full h-12 w-12 object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col items-start justify-center">
                            <p className="text-base font-semibold">
                              {book.requestingUserId}
                            </p>
                          </div>
                          <div className="flex flex-row space-x-4 m-4">
                            <button
                              type="button"
                              className="bg-[#141e46] text-white rounded-md p-3 px-5 font-medium"
                              onClick={() =>
                                acceptRequest(book._id, book.bookId._id)
                              }
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="bg-[#c70039] text-white rounded-md p-3 px-5 font-medium"
                              onClick={() =>
                                declineRequest(book._id)
                              }
                            >
                              Decline
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
} 

export default Activity;
