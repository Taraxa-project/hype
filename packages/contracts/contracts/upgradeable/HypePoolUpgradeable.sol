// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '../HypePoolBase.sol';

contract HypePoolUpgradeable is
    HypePoolBase,
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address escrowContractAddress,
        address activator
    ) public initializer {
        __Pausable_init();
        __Ownable_init();
        initializeBase(escrowContractAddress, activator);
    }

    function createPool(
        string memory uri,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) external whenNotPaused returns (HypePool memory) {
        return _createPool(uri, details, rewards);
    }

    function activatePool(bytes32 uuid) external whenNotPaused {
        return _activatePool(uuid);
    }

    function deactivatePool(bytes32 uuid) external whenNotPaused onlyOwner {
        return _deactivatePool(uuid);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
