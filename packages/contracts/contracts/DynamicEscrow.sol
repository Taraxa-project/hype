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

    function deposit(
        address spender,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress
    ) public payable nonReentrant whenNotPaused {
        _deposit(spender, poolId, amount, tokenAddress);
    }

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
