'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import {GoHome, GoSearch, GoHistory} from 'react-icons/go'
import {LiaSwatchbookSolid, LiaUser} from 'react-icons/lia'
const NavigationMenu = () => {
    const router = useRouter();
    function redirect(link) {
        router.push(link)
    }
  return (
    <>
        <menu className='fixed bottom-0 backdrop-blur-[20px] py-[2vh] flex items-center justify-center gap-[10vw] w-full'> 
            <div onClick={() => redirect('/home')}  className='flex items-center flex-col cursor-pointer '>
                <GoHome size={25}/>
                <p className='text-[12px]'>Home</p>
            </div>
            <div onClick={() =>redirect('/search')}  className='flex items-center flex-col cursor-pointer '>
                <GoSearch size={25}/>
                <p className='text-[12px]'>Search</p>
            </div>
            <div onClick={() =>redirect('/watch')}  className='flex items-center flex-col cursor-pointer '>
                <LiaSwatchbookSolid size={25}/>
                <p className='text-[12px]'>Watch List</p>
            </div>
            <div onClick={() =>redirect('/history')}  className='flex items-center flex-col cursor-pointer '>
                <GoHistory size={25}/>
                <p className='text-[12px]'>History</p>
            </div>
            <div onClick={() =>redirect('/profile')}  className='flex items-center flex-col cursor-pointer '>
                <LiaUser size={25}/>
                <p className='text-[12px]'>Profile</p>
            </div>
        </menu>
    </>
  )
}

export default NavigationMenu