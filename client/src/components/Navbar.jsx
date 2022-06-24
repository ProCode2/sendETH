import React from 'react'
import { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

// bottom navigation bar
const Navbar = () => {
  const { welcomeRef, servicesRef, transactionsRef, contactRef } = useContext(TransactionContext);
  return (
    <div className='nav-white-glassmorphism nav-gradient shadow-md fixed bottom-10 left-2 right-2 mx-auto h-12 px-4 rounded-full overflow-hidden max-w-max z-50'>
      <ul className='w-full h-full nav-text-shadow flex justify-center items-center text-sm soft-text-color max-w-max'>
        <li onClick={() => welcomeRef.current.scrollIntoView({ behavior: "smooth" })} className='flex-1 nav-text-shadow flex justify-center items-center border-r-2 w-32 cursor-pointer soft-border-color'>Welcome</li>
        <li onClick={() => servicesRef.current.scrollIntoView({ behavior: "smooth" })} className='flex-1 nav-text-shadow flex justify-center items-center border-r-2 w-32 cursor-pointer soft-border-color'>Services</li>
        <li onClick={() => transactionsRef.current.scrollIntoView({ behavior: "smooth" })} className='flex-1 nav-text-shadow flex justify-center items-center border-r-2 w-32 cursor-pointer soft-border-color'>Transactions</li>
        <li onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth" })} className='flex-1 nav-text-shadow flex justify-center items-center w-32 cursor-pointer'>Contact</li>
      </ul >
    </div >
  )
}

export default Navbar
