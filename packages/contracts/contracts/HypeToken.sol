// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Example class - a mock class using delivering from ERC20
contract HypeToken is ERC20 {
    constructor(uint256 initialBalance) ERC20("Hype Token", "HYPE") {
        _mint(msg.sender, initialBalance);
    }
}
