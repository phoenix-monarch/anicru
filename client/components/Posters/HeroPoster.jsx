import React from 'react'
import Image from 'next/image'
const HeroPoster = ({href}) => {
  return (
        <Image  
        src={href}
        alt='Banner-Images'
        width={1200}
        height={0}
        className='object-cover w-full h-[30vh] lg:h-[auto] md:h-[auto] rounded-2xl'
    />
  )
}

export default HeroPoster