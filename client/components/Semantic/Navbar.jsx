import React from 'react'
import Image from 'next/image'
const Navbar = () => {
    return (
        <nav className="py-[7vw] lg:py-[2vw] ">
            <Image src="/logo.png" alt='logo' width={60} height={60} className="mx-auto" />
        </nav>
    )
}

export default Navbar