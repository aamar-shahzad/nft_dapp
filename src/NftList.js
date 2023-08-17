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
        const response = await axios.get(`http://localhost:3000/users/${userId}/nfts`);
        setNfts(response.data);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  // Use the UpdateNft function to update the nfts state
 

  return (
    <div className="nft-list">
      {nfts.map((nft, index) => (
        <NftCard key={index} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
