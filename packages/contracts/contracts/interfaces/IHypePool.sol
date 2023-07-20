// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

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
        uint256 startDate;
        uint256 endDate;
        uint256 duration;
        uint256 firstLeaderRewards;
        uint256 secondLeaderRewards;
        uint256 thirdLeaderRewards;
    }

    struct HypePool {
        bytes32 id;
        address creator;
        bool active;
        Details details;
        Rewards rewards;
    }

    function getPool(bytes32 poolId) external view returns (HypePool memory);

    function getPoolRewards(
        bytes32 poolId
    ) external view returns (Rewards memory);

    function getCurrentIndex() external view returns (bytes32);

    event PoolCreated(bytes32 poolId, address creator, string uri);

    event PoolDetailsCreated(
        bytes32 poolId,
        string title,
        string projectName,
        string tokenName,
        string word
    );

    event PoolRewardsCreated(
        bytes32 poolId,
        uint256 network,
        address tokenAddress,
        uint256 impressionReward,
        uint256 cap,
        uint256 startDate,
        uint256 endDate,
        uint256 duration,
        uint256 firstLeaderRewards,
        uint256 secondLeaderRewards,
        uint256 thirdLeaderRewards
    );

    event PoolUriSet(bytes32 poolId, string uri);

    event PoolActivated(
        bytes32 poolId,
        address activator,
        uint256 startDate,
        uint256 endDate
    );

    event PoolDeactivated(bytes32 poolId, address deactivator);
}
