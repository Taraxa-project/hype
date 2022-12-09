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
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) internal virtual {
        _pools[tokenId] = IHypePool.HypePool(tokenId, msg.sender, false, details, rewards);
        emit PoolCreated(tokenId, msg.sender, _tokenURI);
        _emitPoolDetails(tokenId, details);
        _emitPoolRewards(tokenId, rewards);
    }

    function _emitPoolDetails(uint256 tokenId, IHypePool.Details memory details) internal virtual {
        emit PoolDetailsCreated(tokenId, details.title, details.projectName, details.tokenName, details.word);
    }

    function _emitPoolRewards(uint256 tokenId, IHypePool.Rewards memory rewards) internal virtual {
        emit PoolRewardsCreated(
            tokenId,
            rewards.network,
            rewards.tokenAddress,
            rewards.impressionReward,
            rewards.cap,
            rewards.endDate
        );
    }

    function _setPoolURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
        emit PoolUriSet(tokenId, _tokenURI);
    }

    /** @dev Creates a Hype Pool after the necessary checks.
     * @param uri The URI of the Hype Pool Metadata.
     * @param details Hype title, word, token name, Project's name.
     * @param rewards Network, Token address, min reward, impression reward, ap, end date
     */
    function createPool(
        string memory uri,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) external override whenNotPaused returns (IHypePool.HypePool memory) {
        require(bytes(uri).length > 0, "Missing metadata URI");
        require(rewards.cap > 0, "Invalid pool cap");
        require(rewards.endDate > block.timestamp, "End date must be after current block time");
        require(rewards.impressionReward > 0, "Invalid impression hype reward");
        uint256 _counter = _poolIds.current();
        _setPool(_counter, uri, details, rewards);
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
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_pool.active == false, "Pool is already active");
        IEscrow escrowContract = IEscrow(_escrowContractAddress);
        IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(msg.sender, id);
        require(_deposit.weiAmount == _pool.rewards.cap, "Deposited amount does not match pool cap");
        require(
            _deposit.tokenAddress == _pool.rewards.tokenAddress,
            "Deposited token address does not match pool token address"
        );
        _pool.active = true;
        _pools[id] = _pool;
        emit PoolActivated(id, msg.sender);
    }

    /**
     * @dev Pool deactivator method. Must be triggered b when someone withdraws the pool funds from the escrow contract.
     * @param id The id of the pool to activate.
     */
    function deactivatePool(uint256 id) external whenNotPaused onlyOwner {
        IHypePool.HypePool memory _pool = _pools[id];
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_pool.active == true, "Pool is already inactive");
        _pool.active = false;
        _pools[id] = _pool;
        emit PoolDeactivated(id, msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
