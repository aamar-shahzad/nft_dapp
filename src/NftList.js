import React, { useState, useEffect } from 'react';
import NftCard from './NftCard';
import axios from 'axios';

const NftList = ({ userId, UpdateNft }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchNfts();
  }, [userId, UpdateNft]); // Include UpdateNft in the dependency array

  const fetchNfts = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/users/${userId}/nfts`);
        setNfts(response.data);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };
  const handleMint = async (nftId) => {
    // Minting logic...

    // After minting, update the status of the NFT on the API
    try {
      const response = await axios.patch(`http://localhost:5000/nfts/${nftId}/status`, {
        isMinted: true // Update the status value as needed
      });

      console.log('NFT status updated:', response.data);

      // Call the onMint callback to update the minting status in the UI
    await fetchNfts()
    } catch (error) {
      console.error('Error updating NFT status:', error);
    }
  };
  // Use the UpdateNft function to update the nfts state
 

  return (
    <div className="nft-list">
      {nfts.map((nft, index) => (
        <NftCard key={index} nft={nft} onMint={handleMint} />
      ))}
    </div>
  );
};

export default NftList;
