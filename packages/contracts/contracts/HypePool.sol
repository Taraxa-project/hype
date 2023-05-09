// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/IHypePool.sol";

import "./interfaces/IEscrow.sol";

contract HypePool is IHypePool, Pausable, Ownable, AccessControl {
    bytes32 public constant ACTIVATOR_ROLE = keccak256("ACTIVATOR_ROLE");
    address private _activator;
    address _escrowContractAddress;

    mapping(bytes32 => IHypePool.HypePool) private _pools;
    mapping(bytes32 => string) private _tokenURIs;
    // Mapping to store generated hash IDs
    mapping(bytes32 => bool) private _hashes;
    bytes32 private _latestUuid;

    constructor(address escrowContractAddress, address activator) {
        _escrowContractAddress = escrowContractAddress;
        _setupRole(ACTIVATOR_ROLE, activator);
        _activator = activator;
    }

    function getCurrentIndex() external view returns (bytes32) {
        return _latestUuid;
    }

    function poolURI(bytes32 uuid) public view returns (string memory) {
        return _tokenURIs[uuid];
    }

    function getPool(bytes32 uuid) public view returns (HypePool memory) {
        return _pools[uuid];
    }

    function _setPool(
        bytes32 uuid,
        string memory _tokenURI,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) internal virtual {
        _pools[uuid] = IHypePool.HypePool(uuid, msg.sender, false, details, rewards);
        _hashes[uuid] = true;
        _latestUuid = uuid;

        emit PoolCreated(uuid, msg.sender, _tokenURI);
        _emitPoolDetails(uuid, details);
        _emitPoolRewards(uuid, rewards);
    }

    function _emitPoolDetails(bytes32 uuid, IHypePool.Details memory details) internal virtual {
        emit PoolDetailsCreated(uuid, details.title, details.projectName, details.tokenName, details.word);
    }

    function _emitPoolRewards(bytes32 uuid, IHypePool.Rewards memory rewards) internal virtual {
        emit PoolRewardsCreated(
            uuid,
            rewards.network,
            rewards.tokenAddress,
            rewards.impressionReward,
            rewards.cap,
            rewards.startDate,
            rewards.endDate,
            rewards.duration
        );
    }

    function _setPoolURI(bytes32 uuid, string memory _tokenURI) internal virtual {
        _tokenURIs[uuid] = _tokenURI;
        emit PoolUriSet(uuid, _tokenURI);
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
        require(rewards.duration > 0, "Duration must be at least one day");
        require(rewards.startDate == 0, "Start date must be zero");
        require(rewards.endDate == 0, "End date must be zero");
        require(rewards.impressionReward > 0, "Invalid impression hype reward");

        bytes32 uuid = _generateHashId();
        require(!_hashes[uuid], "Uuid already exists");

        _setPool(uuid, uri, details, rewards);
        _setPoolURI(uuid, uri);
        return _pools[uuid];
    }

    /** @dev Activates a pool, meaning that the cap has been filled in the associated escrow contract.
     * @param uuid The id of the pool to activate.
     * Can be called only be the pool owner.
     * Short note: The escrow can be deposited by a third party (e.g. a sponsor). However, the pool owner is the only one who can activate it.
     */
    function activatePool(bytes32 uuid) external whenNotPaused {
        IHypePool.HypePool memory _pool = _pools[uuid];
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_hashes[uuid], "Pool does not exist");
        require(_pool.active == false, "Pool is already active");

        bool hasActivatorRole = hasRole(ACTIVATOR_ROLE, msg.sender);
        if (!hasActivatorRole) {
            IEscrow escrowContract = IEscrow(_escrowContractAddress);
            IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(msg.sender, uuid);
            require(_deposit.weiAmount == _pool.rewards.cap, "Deposited amount does not match pool cap");
            require(
                _deposit.tokenAddress == _pool.rewards.tokenAddress,
                "Deposited token address does not match pool token address"
            );
        }
        _pool.active = true;
        _pool.rewards.startDate = block.timestamp;
        _pool.rewards.endDate = block.timestamp + _pool.rewards.duration;
        _pools[uuid] = _pool;
        emit PoolActivated(uuid, msg.sender, _pool.rewards.startDate, _pool.rewards.endDate);
    }

    /**
     * @dev Pool deactivator method. Must be triggered when someone withdraws the pool funds from the escrow contract.
     * @param uuid The id of the pool to activate.
     */
    function deactivatePool(bytes32 uuid) external whenNotPaused onlyOwner {
        IHypePool.HypePool memory _pool = _pools[uuid];
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_pool.active == true, "Pool is already inactive");
        _pool.active = false;
        _pool.rewards.endDate = block.timestamp;
        _pools[uuid] = _pool;
        emit PoolDeactivated(uuid, msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Function to generate a unique uuid ID using block number, timestamp, and nonce
     */
    function _generateHashId() private view returns (bytes32) {
        uint256 blockNumber = block.number;
        uint256 timestamp = block.timestamp;
        uint256 nonce = 0;
        bytes32 uuid = keccak256(abi.encodePacked(blockNumber, timestamp, nonce));
        while (_hashExists(uuid)) {
            nonce++;
            uuid = keccak256(abi.encodePacked(blockNumber, timestamp, nonce));
        }
        return uuid;
    }

    /**
     * @dev Function to check if a uuid already exists
     * @param _uuid The ID of the pool to verify if exists.
     */
    function _hashExists(bytes32 _uuid) private view returns (bool) {
        return _hashes[_uuid];
    }
}
