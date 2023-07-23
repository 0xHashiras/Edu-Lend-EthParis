import InnerPageContainer from "@/components/common/InnerPageContainer";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { ethers } from 'ethers';
import { signIn, signOut, useSession } from "next-auth/react"

import erc20Abi from './erc20Abi.json'

// Network Sepolia:
// zkbob_sepolia:2r3UhH5Dw7rumEPfAacov3PPTsn5j7kF8TywUkpXjE42S7T3fLd5ZXGoSre4WF9
const toAddress = "0x00D8F074D2041D3d897AB2B5268d09479FA9Bf6a"
const erc20 = "0x2C74B18e2f84B78ac67428d0c7a9898515f0c46f"


export default function Page() {
    const { address } = useSelector((state) => state.user)
    const [amount, setAmount] = useState('');
    const [secret,setSceret] = useState('');
    const [withdraw_amount, setWithdraw_amount] = useState('');
    const [withdraw_secret,setWithdraw_secret] = useState('');
    const [hashArray,setHashArray] = useState([])
    const [to_address,setTo_address] = useState('');

    async function ApproveAndDepositBob() {
        addhash();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Transfer Bob
        const ERC20 = new ethers.Contract(erc20, erc20Abi, signer);
        console.log("amount: ", amount);
        let tx = await ERC20.connect(signer).transfer(toAddress, amount);
        console.log(`Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
        let receipt = await tx.wait();

    }

    async function addhash() {
        const value1Array = ethers.utils.toUtf8Bytes(secret);
        const value2Array = ethers.utils.toUtf8Bytes(amount);
        const hash = ethers.utils.keccak256(ethers.utils.concat([value1Array, value2Array]));
        setHashArray([...hashArray, hash]);
    }

    async function removehash() {
        const value1Array = ethers.utils.toUtf8Bytes(withdraw_secret);
        const value2Array = ethers.utils.toUtf8Bytes(withdraw_amount);
        const _hash = ethers.utils.keccak256(ethers.utils.concat([value1Array, value2Array]));
        if (hashArray.includes(hash)) {
            const updatedItems = hashArray.filter((hash) => hash !== _hash);
            setHashArray([...updatedItems]);
        }
        else {
            alert("No such hash exists");
        }
        
    }

    return (
        <InnerPageContainer title="Transparent Lending">
            <label>Amount to Contribute (in USDC): </label> <br/><br/>
                <input value={amount} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setAmount(e.target.value)} placeholder="input amount in wei"  id="bobAmt" size="147" defaultValue={'1'}/>
                <input value={secret} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSceret(e.target.value)} placeholder= "secret which should be provided at the time of withdraw for computation" id="secret" size="147" defaultValue={'1'}/>
            <button className="btn btn-primary" onClick={ApproveAndDepositBob}>Deposit USDC (MetaMask)</button> 
            <br/><br/><br/> d
            <label>Amount to withdraw (in USDC): </label> <br/><br/>
                <input value={withdraw_amount} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setWithdraw_amount(e.target.value)} placeholder="input amount in wei"  id="bobAmt" size="147" defaultValue={'1'}/>
                <input value={withdraw_secret} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setWithdraw_secret(e.target.value)} placeholder= "secret" id="secret" size="147" defaultValue={'1'}/>
                <input value={to_address} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setTo_address(e.target.value)} placeholder= "To Address" id="To Address" size="147" defaultValue={'1'}/>
                <button className="btn btn-primary" onClick={removehash} > sumbit withdraw request </button>
            <br/><br/><br/>
            
        </InnerPageContainer>
    )
}
