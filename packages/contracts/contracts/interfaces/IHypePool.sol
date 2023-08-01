// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

interface IHypePool {
    struct Details {
        string title;
        string projectName;
        string tokenName;
        string campaignWord;
    }

    struct Rewards {
        uint256 network;
        address tokenAddress;
        uint256 impressionReward;
        uint256 cap;
        uint256 startDate;
        uint256 endDate;
        uint256 duration;
    }

    struct HypePool {
        bytes32 id;
        address creator;
        string uri;
        Details details;
        Rewards rewards;
        uint256[] leaderRewards;
    }

    function getPool(bytes32 poolId) external view returns (HypePool memory);

    function doesPoolExist(bytes32 uuid) external view returns (bool);

    function getPoolRewards(
        bytes32 poolId
    ) external view returns (Rewards memory);

    function getCurrentIndex() external view returns (bytes32);

    event PoolCreated(bytes32 poolId, address creator, string uri);

    event PoolDetailsAndRewardsCreated(
        bytes32 poolId,
        string title,
        string projectName,
        string tokenName,
        string campaignWord,
        uint256 network,
        address tokenAddress,
        uint256 impressionReward,
        uint256 cap,
        uint256 startDate,
        uint256 endDate,
        uint256 duration,
        uint256[] leaderRewards
    );

    event PoolActivated(
        bytes32 poolId,
        address activator,
        uint256 startDate,
        uint256 endDate
    );

    event PoolDeactivated(bytes32 poolId, address deactivator);
}
