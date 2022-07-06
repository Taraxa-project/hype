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

    CountersUpgradeable.Counter private _poolIds;

    address _escrowContractAddress;

    mapping(uint256 => IHypePool.HypePool) private _pools;

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
        return _poolIds.current();
    }

    function poolURI(uint256 tokenId) public view returns (string memory) {
        return _pools[tokenId].uri;
    }

    function getPool(uint256 tokenId) public view returns (HypePool memory) {
        return _pools[tokenId];
    }

    function createPool(
        string memory uri,
        uint256 poolCap,
        address tokenAddress,
        uint256 minHypeReward,
        uint256 endDate
    ) external override whenNotPaused returns (HypePool memory) {
        require(bytes(uri).length > 0, "Missing metadata URI");
        require(poolCap > 0, "Invalid pool cap");
        require(
            endDate > block.timestamp,
            "End date must be after current block time"
        );
        require(minHypeReward > 0, "Invalid minimal hype reward");
        uint256 _counter = _poolIds.current();
        _pools[_counter] = HypePool(
            _counter,
            msg.sender,
            false,
            uri,
            poolCap,
            tokenAddress,
            minHypeReward,
            endDate
        );
        _poolIds.increment();
        emit PoolCreated(
            _counter,
            msg.sender,
            uri,
            poolCap,
            tokenAddress,
            minHypeReward,
            endDate
        );
        return _pools[_counter];
    }

    function activatePool(uint256 id) external whenNotPaused {
        IHypePool.HypePool memory _pool = _pools[id];
        require(_pool.minReward != 0, "Pool doesn't exist");
        require(_pool.active == false, "Pool is already active");
        IEscrow escrowContract = IEscrow(_escrowContractAddress);
        IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(
            msg.sender,
            id
        );
        require(
            _deposit.weiAmount == _pool.cap,
            "Deposited amount does not match pool cap"
        );
        _pool.active = true;
        _pools[id] = _pool;
        emit PoolActivated(id, msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
