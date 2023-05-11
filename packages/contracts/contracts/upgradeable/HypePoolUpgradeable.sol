// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import '../interfaces/IHypePool.sol';
import '../interfaces/IEscrow.sol';

contract HypePoolUpgradeable is
    IHypePool,
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    AccessControlUpgradeable
{
    bytes32 public constant ACTIVATOR_ROLE = keccak256('ACTIVATOR_ROLE');
    address private _activator;
    address _escrowContractAddress;

    mapping(bytes32 => IHypePool.HypePool) private _pools;
    mapping(bytes32 => string) private _tokenURIs;
    // Mapping to store generated hash IDs
    mapping(bytes32 => bool) private _hashes;
    bytes32 private _latestHash;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address escrowContractAddress,
        address activator
    ) public initializer {
        require(
            escrowContractAddress != address(0),
            'Escrow contract address cannot be zero address'
        );
        require(
            activator != address(0),
            'Activator address cannot be zero address'
        );
        __Pausable_init();
        _escrowContractAddress = escrowContractAddress;
        __Ownable_init();
        _setupRole(ACTIVATOR_ROLE, activator);
        _activator = activator;
    }

    function getCurrentIndex() external view returns (bytes32) {
        return _latestHash;
    }

    function poolURI(bytes32 hash) public view returns (string memory) {
        return _tokenURIs[hash];
    }

    function getPool(bytes32 hash) public view returns (HypePool memory) {
        return _pools[hash];
    }

    function _setPool(
        bytes32 hash,
        string memory _tokenURI,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards
    ) internal virtual {
        _pools[hash] = IHypePool.HypePool(
            hash,
            msg.sender,
            false,
            details,
            rewards
        );
        _hashes[hash] = true;
        _latestHash = hash;

        emit PoolCreated(hash, msg.sender, _tokenURI);
        _emitPoolDetails(hash, details);
        _emitPoolRewards(hash, rewards);
    }

    function _emitPoolDetails(
        bytes32 hash,
        IHypePool.Details memory details
    ) internal virtual {
        emit PoolDetailsCreated(
            hash,
            details.title,
            details.projectName,
            details.tokenName,
            details.word
        );
    }

    function _emitPoolRewards(
        bytes32 hash,
        IHypePool.Rewards memory rewards
    ) internal virtual {
        emit PoolRewardsCreated(
            hash,
            rewards.network,
            rewards.tokenAddress,
            rewards.impressionReward,
            rewards.cap,
            rewards.startDate,
            rewards.duration,
            rewards.endDate
        );
    }

    function _setPoolURI(
        bytes32 hash,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[hash] = _tokenURI;
        emit PoolUriSet(hash, _tokenURI);
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
    ) external override whenNotPaused returns (HypePool memory) {
        require(bytes(uri).length > 0, 'Missing metadata URI');
        require(rewards.cap > 0, 'Invalid pool cap');
        require(rewards.duration > 0, 'Duration must be at least one day');
        require(rewards.startDate == 0, 'Start date must be zero');
        require(rewards.endDate == 0, 'End date must be zero');
        require(rewards.impressionReward > 0, 'Invalid impression hype reward');

        bytes32 hash = _generateHashId();
        require(!_hashes[hash], 'Hash already exists');

        _setPool(hash, uri, details, rewards);
        _setPoolURI(hash, uri);
        return _pools[hash];
    }

    /** @dev Activates a pool, meaning that the cap has been filled in the associated escrow contract.
     * @param hash The id of the pool to activate.
     * Can be called only be the pool owner.
     * Short note: The escrow can be deposited by a third party (e.g. a sponsor). However, the pool owner is the only one who can activate it.
     */
    function activatePool(bytes32 hash) external whenNotPaused {
        IHypePool.HypePool memory _pool = _pools[hash];
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_hashes[hash], 'Pool does not exist');
        require(_pool.active == false, 'Pool is already active');

        bool hasActivatorRole = hasRole(ACTIVATOR_ROLE, msg.sender);

        if (!hasActivatorRole) {
            IEscrow escrowContract = IEscrow(_escrowContractAddress);
            IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(
                msg.sender,
                hash
            );
            require(
                _deposit.weiAmount == _pool.rewards.cap,
                'Deposited amount does not match pool cap'
            );
            require(
                _deposit.tokenAddress == _pool.rewards.tokenAddress,
                'Deposited token address does not match pool token address'
            );
        }

        _pool.active = true;
        _pool.rewards.startDate = block.timestamp;
        _pool.rewards.endDate = block.timestamp + _pool.rewards.duration;
        _pools[hash] = _pool;
        emit PoolActivated(
            hash,
            msg.sender,
            _pool.rewards.startDate,
            _pool.rewards.endDate
        );
    }

    /**
     * @dev Pool deactivator method. Must be triggered b when someone withdraws the pool funds from the escrow contract.
     * @param hash The id of the pool to activate.
     */
    function deactivatePool(bytes32 hash) external whenNotPaused onlyOwner {
        IHypePool.HypePool memory _pool = _pools[hash];
        require(_pool.rewards.impressionReward != 0, "Pool doesn't exist");
        require(_pool.active == true, 'Pool is already inactive');
        _pool.active = false;
        _pool.rewards.endDate = block.timestamp;
        _pools[hash] = _pool;
        emit PoolDeactivated(hash, msg.sender);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Function to generate a unique hash ID using block number, timestamp, and nonce
     */
    function _generateHashId() private view returns (bytes32) {
        uint256 blockNumber = block.number;
        uint256 timestamp = block.timestamp;
        uint256 nonce = 0;
        bytes32 hash = keccak256(
            abi.encodePacked(blockNumber, timestamp, nonce)
        );
        while (_hashExists(hash)) {
            nonce++;
            hash = keccak256(abi.encodePacked(blockNumber, timestamp, nonce));
        }
        return hash;
    }

    /**
     * @dev Function to check if a hash already exists
     * @param _hash The ID of the pool to verify if exists.
     */
    function _hashExists(bytes32 _hash) private view returns (bool) {
        return _hashes[_hash];
    }
}
