// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

interface IEscrow {
    struct DynamicDeposit {
        uint256 weiAmount;
        address tokenAddress;
    }

    event Deposited(address indexed spender, uint256 weiAmount, bytes32 poolId);
    event Withdrawn(
        address indexed receiver,
        uint256 weiAmount,
        bytes32 poolId
    );
    event Claimed(address indexed receiver, uint256 weiAmount, bytes32 poolId);

    function depositsOf(
        address payee,
        bytes32 poolId
    ) external view returns (DynamicDeposit memory);

}
