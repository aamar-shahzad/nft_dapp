import React, { useState, useEffect } from 'react';
import NFTModal from './NFTModal';
import NFTList from './NftList';
import './App.css';
import { ethers } from 'ethers';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState('');
  const [userId, setUserId] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);

  const openModal = (nft) => {
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNft(null);
    setIsModalOpen(false);
  };

  const createOrUpdateNFT = (nftData) => {
    if (selectedNft) {
      // Update existing NFT
      const updatedNfts = nfts.map((nft) => (nft.id === selectedNft.id ? nftData : nft));
      setNfts(updatedNfts);
    } else {
      // Create new NFT
      setNfts((prevNfts) => [...prevNfts, nftData]);
    }
    closeModal();
  };

  useEffect(() => {
    async function connectToProvider() {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethereumProvider);

        const signer = ethereumProvider.getSigner();
        const connectedAccount = await signer.getAddress();
        setAccount(connectedAccount);
      } else {
        console.error('MetaMask not found. Please install MetaMask.');
      }
    }

    connectToProvider();
  }, []);

  useEffect(() => {
    async function fetchUserId() {
      if (account) {
        try {
          const response = await fetch(`http://localhost:3000/users/id/${account}`);
          const data = await response.json();

          const userId = data.userId;

          // Fetch NFTs based on the retrieved user ID
          setUserId(userId);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    }

    fetchUserId();
  }, [account]);
  const handleUpdate = (updatedNft) => {
    console.log("hanldeupdate")
    const updatedNfts = nfts.map((nft) =>
      nft.id === updatedNft.id ? updatedNft : nft
    );
    setNfts(updatedNfts);
    // Close the edit modal if open (if you have an edit modal open)
  };
  return (
    <div className="app-container">
      <h1>NFT Collection</h1>
      {account ? (
        <>
          <button className="create-nft-button" onClick={() => openModal(null)}>
            Create NFT
          </button>
          <p>Connected Account: {account}</p>
        </>
      ) : (
        <>
   
          <button className="connect-wallet-button">Connect to wallet</button>
        </>
      )}
      <NFTList userId={userId} UpdateNft={nfts} onEditNFT={openModal} onEdit={handleUpdate} />
      {isModalOpen && (
        <NFTModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          nft={selectedNft}
          onNFTUpdated={createOrUpdateNFT}
          onNFTCreated={createOrUpdateNFT}
          userId={userId}
    
        />
      )}
    </div>
  );
};

export default App;
