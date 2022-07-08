// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IHypePool {
    struct HypePool {
        uint256 id;
        address creator;
        bool active;
        string uri;
        uint256 cap;
        address token;
        uint256 minReward;
        uint256 endDate;
    }

    function createPool(
        string memory uri,
        uint256 poolCap,
        address tokenAddress,
        uint256 minHypeReward,
        uint256 endDate
    ) external returns (HypePool memory);

    function activatePool(uint256 id) external;

    function getPool(uint256 poolId) external view returns (HypePool memory);

    function getCurrentIndex() external view returns (uint256);

    event PoolCreated(
        uint256 poolId,
        address creator,
        string uri,
        uint256 poolCap,
        address poolToken,
        uint256 minHypeReward,
        uint256 endDate
    );

    event PoolActivated(uint256 poolId, address activator);
}