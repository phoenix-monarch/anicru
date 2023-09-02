"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginSignup from "@components/Buttons/LoginSignup";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  const forgetEmail = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/forget', {
        method:'Post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      let data = await res.json();
      if(data.message === 'Email does not exists!') {
        setResponse('Email does not exists!')
      }else{
        setResponse('Check your inbox for reset link & close this page')
      }
      console.log()
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <section className="flex items-center justify-center gap-[6vw] flex-col h-[100vh] mx-auto w-[60vw] ">
        <div className="flex items-center justify-center flex-col gap-4">
          <Image src="/logo.png" width={60} height={60} />
          <h1 className="text-[20px]">Enter your Email ID : </h1>
          <br />
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[70vw] lg:w-[25vw] px-4 py-3 outline outline-primary rounded-md lg:text-[14px] text-[20px] outline-[2px] text-White"
          />
          <LoginSignup
            buttonName="Submit"
            styles="w-[70vw] lg:w-[25vw] py-2"
            functions={forgetEmail}
          />
        </div>
        <h1 className="absolute bottom-[5vh]"> {response} </h1>
      </section>
    </>
  );
};

export default Forget;
