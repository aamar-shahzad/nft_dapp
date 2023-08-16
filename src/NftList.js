import React, { useState, useEffect } from 'react';
import NftCard from './NftCard';
import axios from 'axios';

const NftList = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchNfts();
  }, []);

  const fetchNfts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/nfts'); // Replace with your API URL
      setNfts(response.data);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };
console.log("nft",nfts)
  return (
    <div className="nft-list">
      {nfts.map((nft, index) => (
        <NftCard key={index} nft={nft} />
      ))}
    </div>
  );
};

export default NftList;
