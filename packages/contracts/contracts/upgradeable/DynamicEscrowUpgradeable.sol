pragma solidity 0.8.18;
// SPDX-License-Identifier: UNLICENSED

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '../DynamicEscrowBase.sol';

contract DynamicEscrowUpgradeable is
    DynamicEscrowBase,
    Initializable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable
{
    function __DynamicEscrow_init() internal onlyInitializing {
        __Ownable_init_unchained();
    }

    function __DynamicEscrow_init_unchained() internal onlyInitializing {}

    function initialize(address trustedAccountAddress) public initializer {
        __DynamicEscrow_init();
        __ReentrancyGuard_init();
         _trustedAccountAddress = trustedAccountAddress;
    }

    using AddressUpgradeable for address payable;

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
        super._deposit(spender, poolId, amount, tokenAddress);
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
            ECDSAUpgradeable.recover(hash, sig) == _trustedAccountAddress,
            'Claim: Invalid signature'
        );
        super._claim(receiver, poolId, amount, tokenAddress, nonce);
    }

    function withdraw(
        address payable receiver,
        bytes32 poolId,
        uint256 amount
    ) external nonReentrant whenNotPaused {
        super._withdraw(receiver, poolId, amount);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}
