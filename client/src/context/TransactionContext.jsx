import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
}


export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([])
  const welcomeRef = useRef(null);
  const servicesRef = useRef(null);
  const transactionsRef = useRef(null);
  const contactRef = useRef(null);

  const handleFormDataChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const getAllTransactions = async () => {
    try {
      // check if metamask is installed
      if (!ethereum) return alert("Please install Metamask extension.");

      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(transaction => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() + 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletConnected = async () => {
    try {
      // check if metamask is installed
      if (!ethereum) return alert("Please install Metamask extension.");

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length)
        setCurrentAccount(accounts[0]);
      else
        console.log("No accounts found")

      getAllTransactions();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }

  }

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const count = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", count)
    } catch (error) {

    }
  }

  const connectWallet = async () => {
    try {
      // check if metamask is installed
      if (!ethereum) return alert("Please install Metamask extension.");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  // send transaction
  const sendTransaction = async () => {
    try {
      // check if metamask is installed
      if (!ethereum) return alert("Please install Metamask extension.");
      const { addressTo, amount, keyword, message } = formData;
      console.log({ currentAccount, addressTo, amount, keyword, message })
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex
        }]
      })

      const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);

      setLoading(true);
      console.log(`Loading: ${transactionHash.hash}`);
      await transactionHash.wait();
      setLoading(false);
      console.log(`Success: ${transactionHash.hash}`);

      const count = await transactionContract.getTransactionCount();

      setTransactionCount(count.toNumber());

    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  }

  useEffect(() => {
    checkIfWalletConnected();
  }, [])
  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleFormDataChange, sendTransaction, transactions, isLoading, welcomeRef, servicesRef, transactionsRef, contactRef }}>
      {children}
    </TransactionContext.Provider>
  )
}
