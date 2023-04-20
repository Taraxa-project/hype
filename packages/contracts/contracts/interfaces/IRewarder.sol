pragma solidity 0.8.18;

// SPDX-License-Identifier: UNLICENSED

interface IRewarder {
    function getRewarder() external view returns (address);

    function accruedRewardsOf(address payee, uint256 poolId) external view returns (uint256);

    function accrueRewardFor(address payee, uint256 poolId, uint256 amount) external;

    function redeemRewards(address receiver, address tokenAddress, uint256 poolId) external;
}
