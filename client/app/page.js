"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignup from "@components/Buttons/LoginSignup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Intro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setResponse("");
    }, 2000);
  }, [response]);

  async function login() {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        passwordClient: password,
      }),
    });
    const data = await res.json();
    if (data.message === "Invalid email or password") {
      setResponse("Email/Password is incorrect!");
      setData(data);
    }

    if (data.message === 'Successfully Logged In') {
      router.push("/home");
    }

    return data;
  }
  return (
    <>
      <main>
        <section className="flex items-center justify-center gap-[6vw] flex-col h-[100vh] mx-auto w-[60vw] ">
          <div className="flex items-center justify-center flex-col gap-4">
            <Image
              alt="Logo"
              width={60}
              height={60}
              src="/logo.png"
              className=""
            />
            <h1 className="text-[20px]"> Log In With Anirealm </h1>
          </div>
          <div className="flex items-center flex-col justify-center gap-4 ">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White"
            />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White"
            />
            <LoginSignup
              buttonName="Log In"
              styles="w-[70vw] lg:w-[25vw] px-4 py-3 text-[20px] lg:text-[14px] lg:font-semibold"
              functions={login}
            />
            <div className="w-[70vw] lg:w-[25vw] flex items-center justify-between ">
              <Link
                className="hover:text-[#f4f4f4c7] transition-all "
                href="/forget"
              >
                Forget Password ?
              </Link>
              <Link
                className="hover:text-[#f4f4f4c7] transition-all"
                href="/register"
              >
                Register
              </Link>
            </div>
          </div>
          <h1 className="absolute bottom-[5vh]"> {response} </h1>
          <div>
            <LoginSignup
              styles="w-[70vw] lg:w-[25vw] px-4 py-3 text-[20px] lg:text-[14px] lg:font-semibold"
              buttonName="Continue Without Login"
              redirectHREF="/home"
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Intro;
