// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}
