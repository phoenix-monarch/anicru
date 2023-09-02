"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignup from "@components/Buttons/LoginSignup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [checkOTP, setCheckOTP] = useState("");
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [border1, setBorder1] = useState("");
  const [border2, setBorder2] = useState("");
  const [border3, setBorder3] = useState("");
  const [message, setMessage] = useState();

  const route = useRouter();

  async function register() {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    let data = await response.json();
    if (data.message === "Email already Exists!") {
      setMessage("Email already Exists!");
    }
    setOTP(data);
    return data;
  }

  useEffect(()=>{
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  },[message])

  async function verify() {
    const response = await fetch("http://localhost:3000/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otp.otp,
      }),
    });

    let data = await response.json();
  }

  return (
    <main>
      {otp && otp.otp ? (
        <section className="flex items-center justify-center gap-[6vw] flex-col h-[100vh] mx-auto w-[60vw]">
          <div className="flex items-center justify-center flex-col gap-4">
            <Image
              alt="Logo"
              width={60}
              height={60}
              src="/logo.png"
              className=""
            />
            <h1 className="text-[20px] text-center">
              {" "}
              Enter the OTP below to Register :{" "}
            </h1>
            <input
              type="text"
              placeholder="6 Digit OTP"
              className="outline-none border-2 border-primary px-4 py-2 text-[20px] rounded-xl "
              onChange={(e) => setCheckOTP(e.target.value)}
            />
            <h1 className="text-[14px] font-regular text-primary text-center">
              {response}
            </h1>
            <LoginSignup
              buttonName="Register"
              functions={async () => {
                if (checkOTP && checkOTP === otp.otp) {
                  setResponse("You are Successfully Registered!");
                  await verify();
                  route.push("/");
                } else {
                  setResponse("Entered OTP is not correct!");
                }
              }}
              styles="text-[20px]"
            />
          </div>
        </section>
      ) : (
        <section className="flex items-center justify-center gap-[6vw] flex-col h-[100vh] mx-auto w-[60vw] ">
          <div className="flex items-center justify-center flex-col gap-4">
            <Image
              alt="Logo"
              width={60}
              height={60}
              src="/logo.png"
              className=""
            />
            <h1 className="text-[20px]"> Sign Up With Anirealm </h1>
          </div>
          <div className="flex items-center flex-col justify-center gap-4 ">
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value === "") {
                  setBorder1("outline-red-400");
                } else {
                  setBorder1("");
                }
              }}
              placeholder="Name"
              className={`w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White ${border1} `}
            />
            <input
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value === "") {
                  setBorder2("outline-red-400");
                } else {
                  setBorder2("");
                }
              }}
              placeholder="Email (abc@domain)"
              className={`w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White ${border2} `}
            />
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value === "") {
                  setBorder3("outline-red-400");
                } else {
                  setBorder3("");
                }
              }}
              placeholder="Password (A-Z, a-z, Special Chars)"
              className={`w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White ${border3} `}
            />
            <LoginSignup
              buttonName={
                buttonClick
                  ?
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline mr-3 w-4 h-4 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="blue"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                  : "Register"
              }
              functions={() => {
                register();
                setButtonClick((prev) => !prev);
              }}
              styles="w-[70vw] lg:w-[25vw] px-4 py-3 text-[20px] lg:text-[14px] lg:font-semibold"
            />
            <div className="w-[70vw] lg:w-[25vw] flex items-center justify-between">
              <Link className="hover:text-[#f4f4f4c7] transition-all " href="/">
                Already Registered? Login
              </Link>
            </div>
              <h1 className=" absolute bottom-[5vh]">{message}</h1>
          </div>
          <div>
            <LoginSignup
              styles="w-[70vw] lg:w-[25vw] px-4 py-3 text-[20px] lg:text-[14px] lg:font-semibold"
              buttonName="Continue Without Register"
              redirectHREF="/home"
            />
          </div>
        </section>
      )}
    </main>
  );
};

export default Register;
