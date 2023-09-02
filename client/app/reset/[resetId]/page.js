"use client";
import React, {useState} from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoginSignup from "@components/Buttons/LoginSignup";
const Reset = () => {
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter()
  const params = useParams();
  const { resetId } = params;

  const forgetEmail = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/reset', {
        method:'Post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newPassword: password,
          token : resetId
        })
      })
      let data = await res.json();
      if( data.message === 'Successfully Changed Password!' ) {
        setResponse('Password Changed Successfully!')
        router.push('/')
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <section className="flex items-center justify-center gap-[6vw] flex-col h-[100vh] mx-auto w-[60vw] ">
      <div className="flex items-center justify-center flex-col gap-4">
        <Image src="/logo.png" width={60} height={60} />
        <h1 className="text-[20px]">Enter new password : </h1>
        <br />
        <input
          placeholder="Keep in mind, next time!"
          type="email"
          onChange={(e) => {
            setPassword(e.target.value);
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
  );
};

export default Reset;
