import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './NFTModal.css'; // Import your CSS file for styling

Modal.setAppElement('#root'); // Set the root element

const NFTModal = ({ isOpen, closeModal, onNFTCreated }) => {
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    // Add more fields as needed
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNftData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/nfts', nftData); // Replace with your API URL
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
        <h2>Create NFT</h2>
        <form>
          <label>Name:</label>
          <input type="text" name="name" value={nftData.name} onChange={handleInputChange} />
          <label>Description:</label>
          <textarea
            name="description"
            value={nftData.description}
            onChange={handleInputChange}
          ></textarea>
          {/* Add more input fields as needed */}
          <button type="button" onClick={handleSubmit}>
            Create
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
