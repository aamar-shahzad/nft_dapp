import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './NFTModal.css';

Modal.setAppElement('#root');

const NFTModal = ({ isOpen, closeModal, nft, onNFTUpdated, onNFTCreated,userId}) => {
  const [nftData, setNftData] = useState({
    name: nft ? nft.name : '', // Use nft.name if available, otherwise use an empty string
    description: nft ? nft.description : '', // Use nft.description if available, otherwise use an empty string
    // Add more fields as needed
    user:{
      id:userId
    }
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNftData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/nfts/${nft.id}`, nftData);
      // onNFTUpdated(response.data)
onNFTUpdated(response.data)
      closeModal();
    } catch (error) {
      console.error('Error updating NFT:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/nfts', nftData);
      onNFTCreated(response.data);
      closeModal();
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Create NFT Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>{nft ? 'Edit NFT' : 'Create NFT'}</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="name" value={nftData.name} onChange={handleInputChange} />
          <label>Description:</label>
          <textarea
            name="description"
            value={nftData.description}
            onChange={handleInputChange}
          ></textarea>
          <button type="button" onClick={nft ? handleUpdate : handleSubmit}>
            {nft ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default NFTModal;
