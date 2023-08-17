require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths:{
    artifacts:"../src/contracts"
  },
  networks: {
    hardhat: {
      chainId: 31337, // Ensure this matches the expected chain ID
    },
  },
};
