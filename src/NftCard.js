import React from 'react';
import './NftCard.css';

const NftCard = ({ nft }) => {
  return (
    <div className="nft-card">
      <img src={nft.image} alt={nft.name} className="nft-image" />
      <h2 className="nft-title">{nft.name}</h2>
      <p className="nft-description">{nft.description}</p>
      {nft.isMinted ? (
        <p className="nft-status">Minted</p>
      ) : (
        <button className="edit-button">Edit</button>
      )}
    </div>
  );
};

export default NftCard;
