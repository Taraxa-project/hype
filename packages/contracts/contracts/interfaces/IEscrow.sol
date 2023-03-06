// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

interface IEscrow {
    struct DynamicDeposit {
        uint256 weiAmount;
        address tokenAddress;
        bytes32 poolId;
    }

    event Deposited(address indexed spender, uint256 weiAmount, bytes32 poolId);
    event Withdrawn(address indexed receiver, uint256 weiAmount, bytes32 poolId);
    event Claimed(address indexed receiver, uint256 weiAmount, bytes32 poolId);

    function depositsOf(address payee, bytes32 poolId) external view returns (DynamicDeposit memory);

    function deposit(address spender, bytes32 poolId, uint256 amount, address tokenAddress) external payable;

    function withdraw(address payable receiver, bytes32 poolId, uint256 amount) external;

    function claim(
        address payable receiver,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress,
        uint256 nonce,
        bytes memory sig
    ) external;
}
