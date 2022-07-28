// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "./interfaces/IHypePool.sol";

import "./interfaces/IEscrow.sol";

contract HypePool is IHypePool, Pausable, Ownable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _poolIds;

    address _escrowContractAddress;

    mapping(uint256 => IHypePool.HypePool) private _pools;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address escrowContractAddress) {
        _escrowContractAddress = escrowContractAddress;
    }

    function getCurrentIndex() external view returns (uint256) {
        return _poolIds.current();
    }

    function poolURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function getPool(uint256 tokenId) public view returns (HypePool memory) {
        return _pools[tokenId];
    }

    function _setPool(
        uint256 tokenId,
        string memory _tokenURI,
        string memory projectName,
        string memory title,
        uint256 poolCap,
        address tokenAddress,
        uint256 minHypeReward,
        uint256 endDate
    ) internal virtual {
        _pools[tokenId] = IHypePool.HypePool(
            tokenId,
            msg.sender,
            projectName,
            title,
            false,
            poolCap,
            tokenAddress,
            minHypeReward,
            endDate
        );
        emit PoolCreated(tokenId, msg.sender, _tokenURI, projectName, title, false, poolCap, tokenAddress, minHypeReward, endDate);
    }

    function _setPoolURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
        emit PoolUriSet(tokenId, _tokenURI);
    }

    /** @dev Creates a Hype Pool after the necessary checks.
     * @param uri The URI of the Hype Pool Metadata.
     * @param poolCap The cap of the Hype Pool.
     * @param tokenAddress The address of the token to be used in the Hype Pool as reward.
     * @param minHypeReward The minimum reward that can be redeemed for a Hype.
     * @param endDate The end date of the reward period.
     */
    function createPool(
        string memory uri,
        string memory projectName,
        string memory title,
        uint256 poolCap,
        address tokenAddress,
        uint256 minHypeReward,
        uint256 endDate
    ) external override whenNotPaused returns (IHypePool.HypePool memory) {
        require(bytes(uri).length > 0, "Missing metadata URI");
        require(poolCap > 0, "Invalid pool cap");
        require(endDate > block.timestamp, "End date must be after current block time");
        require(minHypeReward > 0, "Invalid minimal hype reward");
        uint256 _counter = _poolIds.current();
        _setPool(_counter, uri, projectName, title, poolCap, tokenAddress, minHypeReward, endDate);
        _setPoolURI(_counter, uri);
        _poolIds.increment();
        return _pools[_counter];
    }

    /** @dev Activates a pool, meaning that the cap has been filled in the associated escrow contract.
     * @param id The id of the pool to activate.
     * Can be called only be the pool owner.
     * Short note: The escrow can be deposited by a third party (e.g. a sponsor). However, the pool owner is the only one who can activate it.
     */
    function activatePool(uint256 id) external whenNotPaused {
        IHypePool.HypePool memory _pool = _pools[id];
        require(_pool.minReward != 0, "Pool doesn't exist");
        require(_pool.active == false, "Pool is already active");
        IEscrow escrowContract = IEscrow(_escrowContractAddress);
        IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(msg.sender, id);
        require(_deposit.weiAmount == _pool.cap, "Deposited amount does not match pool cap");
        require(_deposit.tokenAddress == _pool.token, "Deposited token address does not match pool token address");
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
