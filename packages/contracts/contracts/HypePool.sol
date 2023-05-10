// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import './HypePoolBase.sol';

contract HypePool is HypePoolBase, Pausable, Ownable {
    constructor(address escrowContractAddress, address activator) {
        initializeBase(escrowContractAddress, activator);
    }

    function createPool(
        string memory uri,
        IHypePoolBase.Details memory details,
        IHypePoolBase.Rewards memory rewards
    ) external whenNotPaused returns (IHypePoolBase.HypePool memory) {
        return super._createPool(uri, details, rewards);
    }

    function activatePool(bytes32 uuid) external whenNotPaused {
        return super._activatePool(uuid);
    }

    function deactivatePool(
        bytes32 uuid
    ) external whenNotPaused onlyOwner {
        return super._deactivatePool(uuid);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
