// scripts/deploy.js
const { ethers } = require('hardhat');

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    const SimpleERC721 = await ethers.deployContract('NFT');
    // const simpleERC721 = await SimpleERC721.deploy();

    // Wait for the contract to be mined and confirm the deployment
    await SimpleERC721.waitForDeployment();

    console.log('NFT contract deployed to:', SimpleERC721.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
