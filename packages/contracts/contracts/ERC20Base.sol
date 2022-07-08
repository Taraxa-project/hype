// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Example class - a mock class using delivering from ERC20
contract ERC20Base is ERC20 {
    constructor(uint256 initialBalance) ERC20("Basic", "BSC") {
        _mint(msg.sender, initialBalance);
    }
}

