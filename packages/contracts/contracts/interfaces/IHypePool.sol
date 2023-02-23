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
        uint256 impressionReward;
        uint256 cap;
        uint256 endDate;
    }

    struct HypePool {
        bytes32 id;
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

    function activatePool(bytes32 poolId) external;

    function deactivatePool(bytes32 poolId) external;

    function getPool(bytes32 poolId) external view returns (HypePool memory);

    function getCurrentIndex() external view returns (bytes32);

    event PoolCreated(bytes32 poolId, address creator, string uri);

    event PoolDetailsCreated(bytes32 poolId,string title, string projectName, string tokenName, string word);

    event PoolRewardsCreated(
        bytes32 poolId,
        uint256 network,
        address tokenAddress,
        uint256 impressionReward,
        uint256 cap,
        uint256 endDate
    );

    event PoolUriSet(bytes32 poolId, string uri);

    event PoolActivated(bytes32 poolId, address activator);

    event PoolDeactivated(bytes32 poolId, address deactivator);
}
