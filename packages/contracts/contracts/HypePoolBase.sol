// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import './interfaces/IHypePool.sol';
import './interfaces/IEscrow.sol';

import './AccessControl.sol';

contract HypePoolBase is IHypePool, AccessControl {
    bytes32 public constant ACTIVATOR_ROLE = keccak256('ACTIVATOR_ROLE');
    address private _activator;
    address private _escrowContractAddress;

    mapping(bytes32 => IHypePool.HypePool) private _pools;
    // Mapping to store generated hash IDs
    bytes32 private _latestUuid;

    function initializeBase(
        address escrowContractAddress,
        address activator
    ) internal virtual {
        require(
            escrowContractAddress != address(0),
            'Escrow contract address cannot be zero address'
        );
        require(
            activator != address(0),
            'Activator address cannot be zero address'
        );
        _escrowContractAddress = escrowContractAddress;
        super.addRole(ACTIVATOR_ROLE, activator);
        _activator = activator;
    }

    function getCurrentIndex() external view returns (bytes32) {
        return _latestUuid;
    }

    function doesPoolExist(bytes32 uuid) public view returns (bool) {
        IHypePool.HypePool memory _pool = _pools[uuid];
        return _pool.creator != address(0);
    }

    function poolURI(bytes32 uuid) public view returns (string memory) {
        return _pools[uuid].uri;
    }

    function getPool(bytes32 uuid) public view returns (HypePool memory) {
        return _pools[uuid];
    }

    /**
     * @dev Check if a pool is active. A pool is active if its end date is not null and its end date is still in the future.
     * @param uuid The ID of the pool to check.
     * @return A boolean indicating if the pool is active.
     */
    function isActive(bytes32 uuid) public view returns (bool) {
        IHypePool.HypePool memory _pool = _pools[uuid];
        return (_pool.rewards.endDate != 0 &&
            _pool.rewards.endDate > block.timestamp);
    }

    /**
     * @dev Check if a pool is expired. A pool is expired if its end date is not null and its end date is in the past.
     * @param uuid The ID of the pool to check.
     * @return A boolean indicating if the pool is expired.
     */
    function isExpired(bytes32 uuid) public view returns (bool) {
        IHypePool.HypePool memory _pool = _pools[uuid];
        return (_pool.rewards.endDate != 0 &&
            _pool.rewards.endDate < block.timestamp);
    }

    /**
     * @dev Check if a pool is in its grace period. A pool is in its grace period if its end date is in the past and the current timestamp is less than its end date + 1 week.
     * @param uuid The ID of the pool to check.
     * @return A boolean indicating if the pool is in its grace period.
     */
    function isGracePeriod(bytes32 uuid) public view returns (bool) {
        IHypePool.HypePool memory _pool = _pools[uuid];
        return (_pool.rewards.endDate != 0 &&
            _pool.rewards.endDate < block.timestamp &&
            block.timestamp < _pool.rewards.endDate + 1 weeks);
    }

    function getPoolRewards(
        bytes32 uuid
    ) public view returns (IHypePool.Rewards memory) {
        HypePool memory pool = getPool(uuid);
        return pool.rewards;
    }

    function _setPool(
        bytes32 uuid,
        string memory uri,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards,
        uint256[] memory leaderRewards
    ) internal virtual {
        _pools[uuid] = IHypePool.HypePool(
            uuid,
            msg.sender,
            uri,
            details,
            rewards,
            leaderRewards
        );
        _latestUuid = uuid;
        emit PoolCreated(uuid, msg.sender, uri);
    }

    /** @dev Creates a Hype Pool after the necessary checks.
     * @param uri The URI of the Hype Pool Metadata.
     * @param details Hype title, campaign word, token name, Project's name.
     * @param rewards Network, Token address, min reward, impression reward, ap, end date
     */
    function _createPool(
        string memory uri,
        IHypePool.Details memory details,
        IHypePool.Rewards memory rewards,
        uint256[] memory leaderRewards
    ) internal returns (IHypePool.HypePool memory) {
        require(bytes(uri).length > 0, 'Missing metadata URI');
        require(rewards.cap > 0, 'Invalid pool cap');
        require(rewards.duration > 0, 'Duration must be at least one day');
        require(rewards.startDate == 0, 'Start date must be zero');
        require(rewards.endDate == 0, 'End date must be zero');
        require(rewards.impressionReward > 0, 'Invalid impression hype reward');

        bytes32 uuid = _generateHashId();
        require(!doesPoolExist(uuid), 'Uuid already exists');

        _setPool(uuid, uri, details, rewards, leaderRewards);
        return _pools[uuid];
    }

    /** @dev Activates a pool, meaning that the cap has been filled in the associated escrow contract.
     * @param uuid The id of the pool to activate.
     * Can be called only be the pool owner.
     * Short note: The escrow can be deposited by a third party (e.g. a sponsor). However, the pool owner is the only one who can activate it.
     */
    function _activatePool(bytes32 uuid) internal {
        IHypePool.HypePool memory _pool = _pools[uuid];
        require(doesPoolExist(uuid), 'Pool does not exist');
        require(!isActive(uuid), 'Pool is already active');

        bool hasActivatorRole = super.hasRole(ACTIVATOR_ROLE, msg.sender);
        if (!hasActivatorRole) {
            IEscrow escrowContract = IEscrow(_escrowContractAddress);
            IEscrow.DynamicDeposit memory _deposit = escrowContract.depositsOf(
                msg.sender,
                uuid
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
        _pool.rewards.startDate = block.timestamp;
        _pool.rewards.endDate = block.timestamp + _pool.rewards.duration;
        _pools[uuid] = _pool;
        emit PoolActivated(
            uuid,
            msg.sender,
            _pool.rewards.startDate,
            _pool.rewards.endDate
        );
    }

    /**
     * @dev Pool deactivator method. Must be triggered when someone withdraws the pool funds from the escrow contract.
     * @param uuid The id of the pool to activate.
     */
    function _deactivatePool(bytes32 uuid) internal {
        IHypePool.HypePool memory _pool = _pools[uuid];
        require(doesPoolExist(uuid), 'Pool does not exist');
        require(isActive(uuid) == true, 'Pool is already inactive');
        _pool.rewards.endDate = block.timestamp - 7 days;
        _pools[uuid] = _pool;
        emit PoolDeactivated(uuid, msg.sender);
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
        while (doesPoolExist(hash)) {
            nonce++;
            hash = keccak256(abi.encodePacked(blockNumber, timestamp, nonce));
        }
        return hash;
    }
}
