import React, { useContext } from 'react'

// Icons
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from './Loader';

import { shortenAddress } from '../utils/shortenAddress';

import { TransactionContext } from '../context/TransactionContext';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-white text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);


const Welcome = () => {
  const { welcomeRef, isLoading, connectWallet, currentAccount, formData, handleFormDataChange, sendTransaction } = useContext(TransactionContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message)
      return;

    sendTransaction();
  }

  return (
    <div ref={welcomeRef} className='flex justify-center items-center w-full'>
      <div className='flex flex-col md:flex-row items-start justify-between py-12 px-4 md:p-20'>
        <div className='flex flex-1 justify-start flex-col md:mr-20'>
          <h1 className='text-5xl md:text-3xl text-gradient py-1'>
            Send Crypto <br /> Across The World
          </h1>
          <p className='text-left mt-5 w-11/12 md:w-9/12 text-base'>
            Follow the trend. Buy and sell cryptocurrencies easily on our platform.
          </p>

          {!currentAccount && <button
            type='button'
            onClick={connectWallet}
            className='btn-gradient flex flex-row justify-center items-center my-5 p-3 rounded-full cursor-pointer transition-all ease-in-out duration-300'>
            <p className='text-base text-semibold'>Connect Wallet</p>
          </button>}

          <div className='grid grid-cols-3 md:grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`${companyCommonStyles}`}>Ethereum</div>
            <div className={`${companyCommonStyles}`}>Web 3.0</div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>Blockchain</div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-start w-full flex-1 mt-10 md:mt-0'>
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 w-72 md:w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color={"#fff"} />
                </div>
                <BsInfoCircle fontSize={17} color={"#fff"} />
              </div>
              <div>
                <p className='font-light text-sm'>{shortenAddress(currentAccount)}</p>
                <p className='font-semibold text-lg mt-1'>Ethereum</p>
              </div>
            </div>
          </div>

          <div className="p-5 w-full flex flex-col justify-start items-center nav-gradient rounded-lg shadow-md">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleFormDataChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleFormDataChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleFormDataChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleFormDataChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="btn-gradient transition-all ease-in-out duration-300 text-white w-full mt-2 p-2 rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Welcome
