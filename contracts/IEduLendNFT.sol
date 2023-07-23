// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IEduLendNFT{
    enum Status{ Ongoing, Completed, Defaulted};

    function updateAdmin(address _admin) external{} 

    function safeMint(address to, uint256 _courseId, uint256 _deadline) public {}

    function updateStatus(uint256 _tokenId, Status status ) public{}
    
    function getTokenIdStatus(uint256 _tokenId) public view returns(string memory status){}
       
}