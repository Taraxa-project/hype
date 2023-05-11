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
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) external whenNotPaused returns (IHypePool.HypePool memory) {
        return _createPool(uri, details, rewards);
    }

    function activatePool(bytes32 uuid) external whenNotPaused {
        return _activatePool(uuid);
    }

    function deactivatePool(
        bytes32 uuid
    ) external whenNotPaused onlyOwner {
        return _deactivatePool(uuid);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
