import InnerPageContainer from "@/components/common/InnerPageContainer";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { ethers } from 'ethers';
import { signIn, signOut, useSession } from "next-auth/react"

import bobAbi from './bobAbi.json'
import depositQueueAbi from './depositQueueAbi.json'

// Network Sepolia:
// zkbob_sepolia:2r3UhH5Dw7rumEPfAacov3PPTsn5j7kF8TywUkpXjE42S7T3fLd5ZXGoSre4WF9
const toZkAddress = "2r3UhH5Dw7rumEPfAacov3PPTsn5j7kF8TywUkpXjE42S7T3fLd5ZXGoSre4WF9"
const bob = "0x2C74B18e2f84B78ac67428d0c7a9898515f0c46f"
const depositQueueAddr = "0xE3Dd183ffa70BcFC442A0B9991E682cA8A442Ade"


export default function Page() {
    const { address } = useSelector((state) => state.user)
    const [handler, setHandler] = useState('');
    const [option, setOption] = useState('')
    const [amount, setAmount] = useState('')

    const toZkAddress = "2r3UhH5Dw7rumEPfAacov3PPTsn5j7kF8TywUkpXjE42S7T3fLd5ZXGoSre4WF9"
    const bob = "0x2C74B18e2f84B78ac67428d0c7a9898515f0c46f"
    const depositQueueAddr = "0xE3Dd183ffa70BcFC442A0B9991E682cA8A442Ade"

    async function ApproveAndDepositBob() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        // Approve Bob
        const BOB20 = new ethers.Contract(bob, bobAbi, signer);
        console.log("amount: ", amount);
        let tx = await BOB20.connect(signer).approve(depositQueueAddr, amount);
        console.log(`Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
        let receipt = await tx.wait();

        //Submit to deposit queue
        const depositQueue = new ethers.Contract(depositQueueAddr, depositQueueAbi, signer);
        tx = await depositQueue.connect(signer)["directDeposit(address,uint256,string)"](signer.getAddress(), amount, toZkAddress.toString());
        console.log(`Tx: https://sepolia.etherscan.io/tx/${tx.hash}`);
        receipt = await tx.wait();

    }

    return (
        <InnerPageContainer title="Anonymous Lending">
            <label>Amount to Contribute (in BoB): </label> <br/><br/>
                <input value={amount} type="text" onChange={(e) => setAmount(e.target.value)}  id="bobAmt" size="147" defaultValue={'1'}/>
            <br/><br/><br/>
            <button onClick={ApproveAndDepositBob}>Deposit Bob (MetaMask)</button> 
            <br/><br/><br/>
        </InnerPageContainer>
    )
}
