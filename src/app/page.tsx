"use client"
 
import "./page.scss"; 
import { StringHelper } from "~/core/utils/string-util.helper";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from 'ethers'
import { useEffect, useState } from "react";

export default function Home() { 
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
    
  const USDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
  const USDTAbi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function balanceOf(address) view returns (uint)',
    'function transfer(address to, uint amount)',
    'event Transfer(address indexed from, address indexed to, uint amount)'
  ];
  const [account,setAccount] = useState(StringHelper.shortenHexString('0xc12E76d70f2067d35Af70E3eE63775B26181985e'));
  const [balance,setBalance] = useState('');
  const [transferAddress, setTransferAddress] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");  
  let USDTContract!:Contract;
  
  const initEther = ()=>{ 
    return new Promise(async (resolve,reject)=>{ 
      console.log("initEther");
      if (!isConnected){
        console.log("user disconnected");
        reject({});
        return;
      }
      const ethersProvider = new BrowserProvider(walletProvider!);
      const signer = await ethersProvider.getSigner()   
      USDTContract = new Contract(USDTAddress, USDTAbi, signer); 
      setAccount(StringHelper.shortenHexString(address));
      resolve({});
    })
  }

  async function getBalance() { 
    await initEther();
    let retBalance = '0'; 
    if(USDTContract!.balanceOf){   
      const USDTBalance = await USDTContract!.balanceOf(address);
      retBalance = formatUnits(USDTBalance, 18);
    } 
    setBalance(retBalance);
  } 

  const onTransfer = async (event) => {
    event.preventDefault();  
    await initEther();
    if(USDTContract!.transfer){   
      try{ 
        await USDTContract!.transfer(address,parseInt(amount)); 
      }catch(error:any){ 
        if (error.message.includes("action=")) { 
          const actionIndex = error.message.indexOf("action=") + "action=".length;
          const endIndex = error.message.indexOf(",", actionIndex);
          const actionValue = error.message.substring(actionIndex, endIndex); 
          setErrorMessage(actionValue);
        } else { 
          setErrorMessage(error.message);
        }
      }
    } 
  };
 
  useEffect(()=>{ 
   const init = async ()=>{  
    await getBalance();
   }
   init();
  },[address, chainId, isConnected]);
  return (
    <div className='home-page'> 
      <div className="home-page-actions">
        <div className="home-page-connect"> 
          <w3m-button /> 
        </div>
        { 
          !isConnected ||
          <div className="home-page-transfer">  
            <div className="home-page-transfer-account">
              <p className="home-page-account">My account: {account}</p>
              <p className="home-page-account">My balance: {balance}</p> 
              <form onSubmit={onTransfer} className="home-page-transfer-form">
                <input className="home-page-transfer-input" placeholder="Amount" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input className="home-page-transfer-input" placeholder="Address" type="text" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} />
                { !errorMessage || <p className="home-page-transfer-error">Error message: {errorMessage}</p>}
                <button className="home-page-transfer-button">Transfer</button>
              </form>
            </div>
          </div>  
        }
      </div>
    </div>
  );
}