'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
 
const projectId = 'example_project'
 
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}
 
const metadata = {
    name: 'Example DApp',
    description: 'Example DApp',  
    url: '', 
    icons: ['']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
  enableAnalytics: true 
})

export function Web3ModalProvider({ children }) {
  return children
}