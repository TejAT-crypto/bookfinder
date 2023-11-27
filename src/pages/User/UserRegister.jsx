import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../../App.css";
import img from "../../assets/image_1.png";

const UserRegister = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [userInfo, setUserInfo] = useState(false);
  const [uniqueID, setUniqueID] = useState("");
  const signin = props.signin;

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
    <section className="relative h-screen bg-cover bg-center">
      <img
        src={img}
        alt="Author"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative w-full h-full flex flex-row mx-auto md:h-screen lg:py-0 animate-slide-in-2 overflow-hidden z-0">
        <div className="relative flex-shrink-0 w-0 md:w-1/2"></div>
        <div className="relative flex-shrink-0 w-full md:w-1/2 overflow-hidden">
          <div
            className="relative flex h-screen items-center justify-center bg-gray-700 bg-opacity-75 rounded-3xl md:rounded-tl-3xl md:rounded-bl-3xl md:rounded-r-none overflow-hidden"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='700' height='700' viewBox='0 0 700 700' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M131.25 0H568.75C591.956 0 614.212 9.21873 630.622 25.6282C647.031 42.0376 656.25 64.2936 656.25 87.5V612.5C656.25 635.706 647.031 657.962 630.622 674.372C614.212 690.781 591.956 700 568.75 700H131.25C108.044 700 85.7876 690.781 69.3782 674.372C52.9687 657.962 43.75 635.706 43.75 612.5V568.75H87.5V612.5C87.5 624.103 92.1094 635.231 100.314 643.436C108.519 651.641 119.647 656.25 131.25 656.25H568.75C580.353 656.25 591.481 651.641 599.686 643.436C607.891 635.231 612.5 624.103 612.5 612.5V87.5C612.5 75.8968 607.891 64.7688 599.686 56.5641C591.481 48.3594 580.353 43.75 568.75 43.75H131.25C119.647 43.75 108.519 48.3594 100.314 56.5641C92.1094 64.7688 87.5 75.8968 87.5 87.5V131.25H43.75V87.5C43.75 64.2936 52.9687 42.0376 69.3782 25.6282C85.7876 9.21873 108.044 0 131.25 0V0Z' fill='%23FF6969'/%3E%3Cpath d='M43.75 218.75V196.875C43.75 191.073 46.0547 185.509 50.157 181.407C54.2594 177.305 59.8234 175 65.625 175C71.4266 175 76.9906 177.305 81.093 181.407C85.1953 185.509 87.5 191.073 87.5 196.875V218.75H109.375C115.177 218.75 120.741 221.055 124.843 225.157C128.945 229.259 131.25 234.823 131.25 240.625C131.25 246.427 128.945 251.991 124.843 256.093C120.741 260.195 115.177 262.5 109.375 262.5H21.875C16.0734 262.5 10.5094 260.195 6.40704 256.093C2.30468 251.991 0 246.427 0 240.625C0 234.823 2.30468 229.259 6.40704 225.157C10.5094 221.055 16.0734 218.75 21.875 218.75H43.75ZM43.75 350V328.125C43.75 322.323 46.0547 316.759 50.157 312.657C54.2594 308.555 59.8234 306.25 65.625 306.25C71.4266 306.25 76.9906 308.555 81.093 312.657C85.1953 316.759 87.5 322.323 87.5 328.125V350H109.375C115.177 350 120.741 352.305 124.843 356.407C128.945 360.509 131.25 366.073 131.25 371.875C131.25 377.677 128.945 383.241 124.843 387.343C120.741 391.445 115.177 393.75 109.375 393.75H21.875C16.0734 393.75 10.5094 391.445 6.40704 387.343C2.30468 383.241 0 377.677 0 371.875C0 366.073 2.30468 360.509 6.40704 356.407C10.5094 352.305 16.0734 350 21.875 350H43.75ZM43.75 481.25V459.375C43.75 453.573 46.0547 448.009 50.157 443.907C54.2594 439.805 59.8234 437.5 65.625 437.5C71.4266 437.5 76.9906 439.805 81.093 443.907C85.1953 448.009 87.5 453.573 87.5 459.375V481.25H109.375C115.177 481.25 120.741 483.555 124.843 487.657C128.945 491.759 131.25 497.323 131.25 503.125C131.25 508.927 128.945 514.491 124.843 518.593C120.741 522.695 115.177 525 109.375 525H21.875C16.0734 525 10.5094 522.695 6.40704 518.593C2.30468 514.491 0 508.927 0 503.125C0 497.323 2.30468 491.759 6.40704 487.657C10.5094 483.555 16.0734 481.25 21.875 481.25H43.75Z' fill='%23FF6969'/%3E%3C/svg%3E\")",
              backgroundSize: "75%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute overflow-hidden w-3/4 md:w-1/2 h-10/12 p-0 space-y-4 md:space-y-6 md:p-8 flex justify-center">
              <div className="relative w-1/2 h-full md:w-full md:ml-0 flex flex-col justify-center">
                <form
                  className="space-y-4 lg:space-y-6"
                  onSubmit={handleSubmit(submit)}
                >
                  <div>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="items-center justify-center border-b-2 border-[#FFF5E0] bg-transparent text-[#FFF5E0] placeholder-[#FFF5E0] text-xs sm:text-base w-10/12 pb-0 md:pb-1 outline-none"
                      placeholder="Username"
                      {...register("username")}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="items-center justify-center border-b-2 border-[#FFF5E0] bg-transparent text-[#FFF5E0] placeholder-[#FFF5E0] text-xs sm:text-base w-10/12 pb-0 md:pb-1 outline-none"
                      placeholder="E-mail"
                      {...register("email")}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="items-center justify-center border-b-2 border-[#FFF5E0] bg-transparent text-[#FFF5E0] placeholder-[#FFF5E0] text-xs sm:text-base w-10/12 pb-0 md:pb-1 outline-none"
                      {...register("password")}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="items-center justify-center bg-[#FFF5E0] text-xs sm:text-sm rounded-lg w-1/2 p-1 md:p-1.5 outline-none"
                  >
                    Register
                  </button>
                </form>
                <div className="flex flex-row justify-center mt-2 text-xs md:text-base">
                  <p className="text-white">Have an Account?</p>
                  <a href="" className="ml-2 text-[#AFD7FF] hover:underline">
                    {" "}
                    Login{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRegister;
