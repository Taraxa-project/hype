// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.14;

import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "../interfaces/IHypePool.sol";
import "../interfaces/IEscrow.sol";

contract HypePoolUpgradeable is IHypePool, Initializable, PausableUpgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _poolIds;

    address _escrowContractAddress;

    mapping(uint256 => IHypePool.HypePool) private _pools;
    mapping(uint256 => string) private _tokenURIs;

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
        string memory tokenName,
        string memory word,
        uint256 cap,
        address tokenAddress,
        address network,
        uint256 minReward,
        uint256 impressionReward,
        uint256 endDate
    ) internal virtual {
        _pools[tokenId] = IHypePool.HypePool(
            tokenId,
            msg.sender,
            title,
            projectName,
            tokenName,
            word,
            network,
            false,
            cap,
            tokenAddress,
            minReward,
            impressionReward,
            endDate
        );
        emit PoolCreated(
            tokenId,
            msg.sender,
            _tokenURI,
            title,
            projectName,
            tokenName,
            word,
            false,
            cap,
            tokenAddress,
            network,
            minReward,
            impressionReward,
            endDate
        );
    }

    function _setPoolURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
        emit PoolUriSet(tokenId, _tokenURI);
    }

     /** @dev Creates a Hype Pool after the necessary checks.
     * @param uri The URI of the Hype Pool Metadata.
     * @param projectName Project's name & potential variations separated by commas.
     * @param title Example: Hype App Pool, Cool NFT.
     * @param tokenName Project's token name (if any).
     * @param word Example: someone hyping Taraxa's testnet launch must include the word “testnet“ in their social message.
     * @param cap Total rewards for the pool.
     * @param tokenAddress The address of the token to be used in the Hype Pool as reward.
     * @param network Identify which blockchain network the reward tokens reside on, e.g., Taraxa, Ethereum
     * @param minReward The minimum reward that can be redeemed for a Hype.
     * @param impressionReward Reward per 1,000 impressions.
     * @param endDate The end date of the reward period.
     */
    function createPool(
       string memory uri,
        string memory projectName,
        string memory title,
        string memory tokenName,
        string memory word,
        uint256 cap,
        address tokenAddress,
        address network,
        uint256 minReward,
        uint256 impressionReward,
        uint256 endDate
    ) external override whenNotPaused returns (HypePool memory) {
        require(bytes(uri).length > 0, "Missing metadata URI");
        require(cap > 0, "Invalid pool cap");
        require(endDate > block.timestamp, "End date must be after current block time");
        require(minReward > 0, "Invalid minimal hype reward");
        uint256 _counter = _poolIds.current();
        _setPool(
            _counter,
            uri,
            projectName,
            title,
            tokenName,
            word,
            cap,
            tokenAddress,
            network,
            minReward,
            impressionReward,
            endDate
        );
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
        require(_deposit.tokenAddress == _pool.tokenAddress, "Deposited token address does not match pool token address");
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
