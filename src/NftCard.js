import React, { useState } from 'react';
import './NftCard.css';
import NFTModal from './NFTModal';
import { ethers } from 'ethers';
import NFTABI from './contracts/contracts/NFT.sol/NFT.json'

const NftCard = ({ nft, onEdit ,onMint}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false); // Add this line

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleMint = async (nftId) => {
    try {
      setIsMinting(true);
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length === 0) {
                console.error('No accounts available');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();

            console.log('Signer address:', signerAddress);

            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            const contractAbi = NFTABI.abi;
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            const mintTransaction = await contract.safeMint(signerAddress, nftId);

            console.log('Mint transaction:',await mintTransaction.wait());

            onMint(nftId);
          

            console.log('Minting successful');
            setIsMinting(false); // Reset the state to indicate minting is finished

        } else {
          setIsMinting(false); // Reset the state to indicate minting is finished

            console.error('MetaMask not detected or not connected.');
        }
    } catch (error) {
      setIsMinting(false); // Reset the state to indicate minting is finished

        console.error('Error minting NFT:', error);
    }
};

  return (
    <div className="nft-card">
      <img src={nft.imageUrl} alt={nft.name} className="nft-image" />
      <h2 className="nft-title">{nft.name}</h2>
      <p className="nft-description">{nft.description}</p>
      {nft.isMinted ? (
         <>
         <p className="nft-status">Minted</p>
         <p className="nft-owner">Owner: {nft.userAccount}</p>
       </>
        
      ) : (
        <div className="button-container">
          <button className="action-button edit-button" onClick={openEditModal}>
            Edit
          </button>
          <button
  className="action-button mint-button"
  onClick={() => handleMint(nft.id)}
  disabled={isMinting} // Disable the button when minting is ongoing
>
  {isMinting ? 'Minting...' : 'Mint'}
</button>
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
