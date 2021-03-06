import React, {useState, useEffect} from 'react';

import { ethers } from "ethers";

import { contractABI, contractAddress } from '../utils/constant';

export const TransactionContext = React.createContext();
const {ethereum} = window;

const getEthereumContext =()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract =  new ethers.Contract(contractAddress, contractABI, signer);
    console.log(
        {
            provider,
            signer,
            transactionContract
        }
    )
}


export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                // getAllTransactions();
            }else{
                console.log("No account found");
            }
            console.log(accounts);
        }catch(error){
            console.log(error);
            throw new Error("No Ethereum object");
        }
    }
    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

        }catch(error){
            console.log(error);
            throw new Error("No Ethereum object");
        }
    }
    useEffect(()=>{
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{connectWallet}}>
        {children}
        </TransactionContext.Provider>
    )
}