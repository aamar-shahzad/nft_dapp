import React, { useState } from 'react';
import NFTModal from './NFTModal';
import NFTList from './NftList';
import './App.css';
import { useWeb3React } from '@web3-react/core';
import injectedConnector from './WalletConnector'; // Import the injected (MetaMask) connector
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'; // Import WalletConnect connector

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nfts, setNfts] = useState([]);
  const { activate, active, account } = useWeb3React(); // Web3React hook

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createNFT = (nftData) => {
    setNfts((prevNfts) => [...prevNfts, nftData]);
    closeModal(); // Close the modal after creating NFT
  };

  const connectWallet = async (connector) => {
    try {
      await activate(connector);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Create WalletConnect connector instance
  const walletConnectConnector = new WalletConnectConnector({
    rpc: { 1: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' }, // Replace with your Infura project ID
    qrcode: true,
  });

  return (
    <div className="app-container">
      <h1>NFT Collection</h1>
      {active ? (
        <>
          <button className="create-nft-button" onClick={openModal}>
            Create NFT
          </button>
          <p>Connected Account: {account}</p>
        </>
      ) : (
        <>
          <button className="connect-wallet-button" onClick={() => connectWallet(injectedConnector)}>
            Connect MetaMask
          </button>
          <button className="connect-wallet-button" onClick={() => connectWallet(walletConnectConnector)}>
            Connect WalletConnect
          </button>
        </>
      )}
      {!isModalOpen && <NFTList nfts={nfts} />}
      {isModalOpen && (
        <NFTModal isOpen={isModalOpen} closeModal={closeModal} onNFTCreated={createNFT} />
      )}
    </div>
  );
};

export default App;
