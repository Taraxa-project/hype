pragma solidity 0.8.18;
// SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Address.sol';
import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/security/Pausable.sol';

import './DynamicEscrowBase.sol';

contract DynamicEscrow is
    DynamicEscrowBase,
    Ownable,
    Pausable,
    ReentrancyGuard
{
    using Address for address payable;

    constructor(address trustedAccountAddress) {
        _trustedAccountAddress = trustedAccountAddress;
    }

    address private _trustedAccountAddress;

    /* @dev Reads the configured trusted wallet address. */
    function getTrustedAccount() public view returns (address) {
        return _trustedAccountAddress;
    }

    function setHypePoolAddress(address _hypePool) external onlyOwner {
        _setHypePoolAddress(_hypePool);
    }

    /**
     * @dev Deposit tokens to the escrow.
     * @notice The caller of this method must first have enough approval from spender to the escrow contract deposit the tokens.
     * @param spender The address of the spender.
     * @param poolId The pool id of the deposit target reward pool.
     * @param amount The amount of tokens to deposit.
     * @param tokenAddress The address of the token to deposit.
     * modifier payable: The method can be called with TARA.
     */
    function deposit(
        address spender,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress
    ) public payable nonReentrant whenNotPaused {
        _deposit(spender, poolId, amount, tokenAddress);
    }

    /**
     * @dev Claims the given amount of tokens from the escrow.
     * @notice The caller of this method can be anyone who wants to redeem tokens.
     * @param receiver The address to receive the tokens.
     * @param poolId The reward pool id of which the tokens are withdrawn.
     * @param amount The amount of tokens to withdraw.
     * @param tokenAddress the reward token address of the pool
     * @param nonce the nonce given by the hype backend
     */
    function claim(
        address payable receiver,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress,
        uint256 nonce,
        bytes memory sig
    ) external nonReentrant whenNotPaused {
        bytes32 hash = _hash(receiver, amount, nonce);

        require(
            ECDSA.recover(hash, sig) == _trustedAccountAddress,
            'Claim: Invalid signature'
        );
        _claim(receiver, poolId, amount, tokenAddress, nonce);
    }

    /**
     * @dev Withdraws the given amount of tokens from the escrow.
     * @notice The caller of this method must be the owner of the escrow deposit.
     * The withdrawal can be made to a differnet address than the one specified in the deposit.
     * @param receiver The address to receive the tokens.
     * @param poolId The reward pool id of which the tokens are withdrawn.
     * @param amount The amount of tokens to withdraw.
     */
    function withdraw(
        address payable receiver,
        bytes32 poolId,
        uint256 amount
    ) external nonReentrant whenNotPaused {
        _withdraw(receiver, poolId, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
