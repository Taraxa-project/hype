// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "./interfaces/IHypePool.sol";

import "./interfaces/IEscrow.sol";

contract HypePool is
    IHypePool,
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    address _escrowContractAddress;

    mapping(uint256 => HypePool) private _pools;
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address escrowContractAddress) public initializer {
        __Pausable_init();
        _escrowContractAddress = escrowContractAddress;
        __Ownable_init();
    }

    function getCurrentIndex() external view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function poolURI(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return _pools[tokenId].uri;
    }

    function getPool(uint256 tokenId)
        public
        view
        returns (HypePool memory)
    {
        return _pools[tokenId];
    }

    function createPool(string memory uri, uint256 poolCap, uint256 minHypeReward) external override returns (HypePool memory) {
        require(!PausableUpgradeable.paused(), "Contract is paused");
        require(bytes(uri).length > 0, "Missing metadata URI");
        require(poolCap > 0, "Invalid pool cap");
        require(minHypeReward > 0, "Invalid minimal hype reward");
        IEscrow escrowContract = IEscrow(_escrowContractAddress);
        uint256 _counter = _tokenIdCounter.current();
        IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(msg.sender, _counter);
        require(_deposit.weiAmount == poolCap, "Deposited amount does not match pool cap");
        _pools[_counter] = HypePool(_counter, msg.sender, uri, poolCap, _deposit.tokenAddress, minHypeReward);
        _tokenIdCounter.increment();
        emit PoolCreated(_counter, msg.sender, uri, poolCap, _deposit.tokenAddress, minHypeReward);
        return _pools[_counter];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}