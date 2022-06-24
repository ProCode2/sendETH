import React from 'react'
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import logo from "../images/sendETH.png"

const Footer = () => {
  const { contactRef } = useContext(TransactionContext);
  return (
    <div ref={contactRef} className="w-full flex md:justify-center justify-between items-center flex-col py-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-center">Come join us and hear for the unexpected miracle</p>
        <p className="text-white text-sm text-center font-medium mt-2">example@example.com</p>
      </div>

      <div className="sm:w-[90%] w-full h-[0.25px] bg-white mt-5 " />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs"> &copy; Pradipta Ghoshal 2022</p>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
}


export default Footer
