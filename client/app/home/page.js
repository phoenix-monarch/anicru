"use client";
import React, { useEffect, useState } from "react";
import NavigationMenu from "@components/Semantic/NavigationMenu";
import Navbar from "@components/Semantic/Navbar";
import { spotlightAnimes } from "@client-api/Home";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import WatchNow from "@components/Buttons/WatchNow";
import "swiper/css";

const Home = () => {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await spotlightAnimes();
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {/* Background For Mobile */}
      <div className=" w-full h-[40vh] absolute top-[20vh] z-[-10] lg:hidden ">
        <div className=" absolute w-[30vw] left-[10vh] rounded-full h-[30vw] bg-primary  blur-[50px] "></div>
        <div className=" absolute w-[25vw] rounded-full left-[20vw] bottom-[10vh] h-[25vw] bg-blue-400 blur-[50px]  "></div>
        <div className=" absolute w-[30vw] left-[45vw] bottom-[10vh] rounded-full h-[30vw] bg-purple-400  blur-[50px] "></div>
      </div>
      {/* Navigation Bar for Anirealm */}
      <Navbar />
      {/* Slider Components */}
      <section className="flex items-center gap-[8vw]">
        <Swiper spaceBetween={20} slidesPerView={1}>
          {data.map((e, i) => (
            <>
              <SwiperSlide key={i}>
                <Image
                  alt="hero-image"
                  priority={true}
                  width={1200}
                  height={0}
                  src={e.poster}
                  className="w-[90%] h-[30vh] object-cover rounded-lg mx-auto"
                />
                <div className="px-[6vw]">
                  <h1 className="my-[3vw]"> {e.name} </h1>
                  <div className="flex items-center gap-[15px] my-[3vw] text-[14px] text-primary ">
                    <p> {e.otherInfo[2]} </p>
                    <p> {e.otherInfo[0]} </p>
                    <p> {e.otherInfo[1]} </p>
                    <p> {e.otherInfo[3]} </p>
                  </div>
                  <p className="max-h-[40px] text-[14px] ">{e.description}</p>
                </div>
              </SwiperSlide>
              <WatchNow BtnName="Watch Now" />
            </>
          ))}
        </Swiper>
      </section>
      <NavigationMenu />
    </>
  );
};

export default Home;
