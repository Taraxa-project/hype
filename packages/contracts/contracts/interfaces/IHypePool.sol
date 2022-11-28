// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

interface IHypePool {
    struct Details {
        string title;
        string projectName;
        string tokenName;
        string word;
    }

    struct Rewards {
        uint256 network;
        address tokenAddress;
        uint256 minReward;
        uint256 impressionReward;
        uint256 cap;
        uint256 endDate;
    }

    struct HypePool {
        uint256 id;
        address creator;
        bool active;
        Details details;
        Rewards rewards;
    }

    function createPool(
        string memory uri,
        Details memory details,
        Rewards memory rewards
    ) external returns (HypePool memory);

    function activatePool(uint256 id) external;

    function getPool(uint256 poolId) external view returns (HypePool memory);

    function getCurrentIndex() external view returns (uint256);

    event PoolCreated(uint256 poolId, address creator, string uri);

    event PoolDetailsCreated(uint256 poolId,string title, string projectName, string tokenName, string word);

    event PoolRewardsCreated(
        uint256 poolId,
        uint256 network,
        address tokenAddress,
        uint256 minReward,
        uint256 impressionReward,
        uint256 cap,
        uint256 endDate
    );

    event PoolUriSet(uint256 poolId, string uri);

    event PoolActivated(uint256 poolId, address activator);
}
