// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

interface IHypePool {
    struct HypePool {
        uint256 id;
        address creator;
        string title;
        string projectName;
        string tokenName;
        string word;
        uint256 network;
        bool active;
        uint256 cap;
        address tokenAddress;
        uint256 minReward;
        uint256 impressionReward;
        uint256 endDate;
    }

    function createPool(
        string memory uri,
        string memory projectName,
        string memory title,
        string memory tokenName,
        string memory word,
        uint256 cap,
        address tokenAddress,
        uint256 network,
        uint256 minHypeReward,
        uint256 impressionReward,
        uint256 endDate
    ) external returns (HypePool memory);

    function activatePool(uint256 id) external;

    function getPool(uint256 poolId) external view returns (HypePool memory);

    function getCurrentIndex() external view returns (uint256);

    event PoolCreated(
        uint256 poolId,
        address creator,
        string uri,
        string title,
        string projectName,
        string tokenName,
        string word,
        bool active,
        uint256 cap,
        address tokenAddress,
        uint256 network,
        uint256 minReward,
        uint256 impressionReward,
        uint256 endDate
    );

    event PoolUriSet(
        uint256 poolId,
        string uri
    );

    event PoolActivated(uint256 poolId, address activator);
}
