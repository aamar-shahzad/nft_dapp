import React, { useState } from 'react';
import './NftCard.css';
import NFTModal from './NFTModal';
import { ethers } from 'ethers';
const NftCard = ({ nft, onEdit ,onMint}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleMint = async (nftId) => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contractAddress = "0x61facedb68ad837da9d888d4ba17eeef03bcf611"
        const contractAbi = "0x61facedb68ad837da9d888d4ba17eeef03bcf611"

        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        // Call the mint function on your smart contract
        const mintTransaction = await contract.mint(nftId);

        // Wait for the transaction to be mined
        await mintTransaction.wait();

        // Call the onMint callback to update the minting status
        onMint(nftId);

        console.log('Minting successful');
      } else {
        console.error('MetaMask not detected or not connected.');
      }
    } catch (error) {
      console.error('Error minting NFT:',error);
    }
  };
  return (
    <div className="nft-card">
      <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
      <h2 className="nft-title">{nft.name}</h2>
      <p className="nft-description">{nft.description}</p>
      {nft.isMinted ? (
        <p className="nft-status">Minted</p>
      ) : (
        <div className="button-container">
          <button className="action-button edit-button" onClick={openEditModal}>
            Edit
          </button>
          <button className="action-button mint-button" onClick={() => handleMint(nft.id)}>Mint</button>
        </div>
      )}

      {isEditModalOpen && (
        <NFTModal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          nft={nft} // Pass the nft data to prepopulate the modal
          onNFTUpdated={onEdit} // Add an onNFTUpdated handler
        />
      )}
    </div>
  );
};

export default NftCard;
