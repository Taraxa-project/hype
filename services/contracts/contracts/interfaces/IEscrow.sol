// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IEscrow {
    struct DynamicDeposit {
        uint256 weiAmount;
        address tokenAddress;
        uint256 poolId;
    }

    function depositsOf(address payee, uint256 poolId)
        external
        view
        returns (DynamicDeposit memory);

    function deposit(
        address spender,
        uint256 poolId,
        uint256 amount,
        address tokenAddress
    ) external payable;

    function withdraw(
        address payable receiver,
        uint256 poolId,
        uint256 amount
    ) external;
}
