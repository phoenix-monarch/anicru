import React from 'react'
import Image from 'next/image'
const HomeCards = ({href, functions}) => {
  return (
        <Image  
        src={href}
        alt='Banner-Images'
        width={120}
        height={200}
        className='rounded-lg h-[180px] my-[3vw]'
        onClick={functions}
    />
  )
}

export default HomeCards