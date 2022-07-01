// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";


interface IHypePool {
    struct HypePool {
        CountersUpgradable.Counter poolId;
        address creator;
        string uri;
        uint256 poolCap;
        address poolToken;
        uint256 minHypeReward;
    }

    function createPool(string memory uri, uint256 poolCap, uint256 minHypeReward) external;
    function getPool(uint256 poolId) external view returns (HypePool memory);
}