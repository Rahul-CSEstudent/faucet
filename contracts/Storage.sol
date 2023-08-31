// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0; 
 
import "@openzeppelin/contracts/access/Ownable.sol"; 
 
contract SendFundsContract is Ownable { 
    constructor() {} 
 
    receive() external payable {} 
 
    function sendFunds(address payable recipient, uint256 amount) external onlyOwner { 
        require(address(this).balance >= amount, "Insufficient balance"); 
        recipient.transfer(amount); 
    } 
}