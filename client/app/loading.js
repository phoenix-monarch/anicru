import React from "react";
import Image from "next/image";
const loading = () => {
  return (
    <main className="grid place-items-center h-[100vh]">
      <Image src="/logo.png" width={40} height={40} alt="Loader" className="animate-ping" />
    </main>
  );
};

export default loading;
