pragma solidity 0.8.14;
// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "hardhat/console.sol";
import "../interfaces/IEscrow.sol";
import "../interfaces/IHypePool.sol";

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
abstract contract ERC20Basic {
    function totalSupply() public virtual returns (uint256);

    function balanceOf(address who) public virtual returns (uint256);

    function transfer(address to, uint256 value) public virtual;
}

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
abstract contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) public virtual returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual;

    function approve(address spender, uint256 value) public virtual;
}

contract DynamicEscrowUpgradeable is IEscrow, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    function __DynamicEscrow_init() internal onlyInitializing {
        __Ownable_init_unchained();
    }

    function __DynamicEscrow_init_unchained() internal onlyInitializing {}

    function initialize(address rewarder) public initializer {
        __DynamicEscrow_init();
        __ReentrancyGuard_init();
        _rewarder = rewarder;
    }

    using AddressUpgradeable for address payable;
    event Deposited(address indexed spender, uint256 weiAmount, uint256 poolId);
    event Withdrawn(address indexed receiver, uint256 weiAmount, uint256 poolId);
    event RewardCredited(address indexed receiver, uint256 weiAmount, uint256 poolId);

    modifier onlyRewarder() {
        require(msg.sender == _rewarder, "OnlyRewarder");
        _;
    }

    address private _rewarder;

    /* @dev Deposits always need to be tied to a pool. For now there is no check if
     * the pool exists because it would limit the contract, but its something worth to ideate on.
     */
    mapping(uint256 => mapping(address => IEscrow.DynamicDeposit)) private _deposits;

    /* @dev Rewards introduce the notion of reward pools. Reward pools are
     * defined by their IDs as integers and every reward accrued must be associated
     * with a reward pool. The reward pool ID is used to identify the reward itself
     * and can be used throughout multiple applications.*/
    mapping(uint256 => mapping(address => uint256)) private _accruedRewards;

    /* @dev Reads the configured rewarder address. */
    function getRewarder() public view returns (address) {
        return _rewarder;
    }

    /*
     * @dev Read Deposits to the escrow.
     * @param payee The payee of the deposit.
     * @param poolId The reward pool id to serach after.
     * @return The deposits for the payee and pool given as params.
     */
    function depositsOf(address payee, uint256 poolId) public view override returns (IEscrow.DynamicDeposit memory) {
        return _deposits[poolId][payee];
    }

    /*
     * @dev Read the accrued rewards for a payee.
     * @param payee The payee of the reward.
     * @return The accrued rewards for the payee.
     */
    function accruedRewardsOf(address payee, uint256 poolId) public view returns (uint256) {
        return _accruedRewards[poolId][payee];
    }

    /*
     * @dev Store the sent amount as rewards to be withdrawn.
     * @param payee The destination address of the funds.
     * @param weiAmount The amount of wei to deposit.
     * modifier onlyRewarder Only the rewarder can call this function.
     */
    function accrueRewardFor(
        address payee,
        uint256 poolId,
        uint256 amount
    ) public onlyRewarder nonReentrant {
        _accruedRewards[poolId][payee] += amount;
        require(_accruedRewards[poolId][payee] >= amount, "AccruedRewardOverflow");
        emit RewardCredited(payee, amount, poolId);
    }

    /*
     * @dev Redeem the accrued rewards for a receiver.
     * @param receiver The receiver of the funds.
     * @param tokenAddress The address of the token to be redeemed.
     * @param poolId The reward pool id to serach after.
     */
    function redeemRewards(
        address receiver,
        address tokenAddress,
        uint256 poolId
    ) public nonReentrant {
        require(_accruedRewards[poolId][msg.sender] > 0, "Not enough accrued rewards");
        uint256 _amount = _accruedRewards[poolId][msg.sender];
        _accruedRewards[poolId][msg.sender] = 0;
        if (tokenAddress != address(0)) {
            ERC20 token = ERC20(tokenAddress);
            token.transfer(receiver, _amount);
        } else {
            payable(receiver).sendValue(_amount);
        }
        emit Withdrawn(receiver, _amount, poolId);
    }

    /**
     * @dev Deposit tokens to the escrow.
     * @notice The caller of this method must first have enough approval from spender to the escrow contract deposit the tokens.
     * @param spender The address of the spender.
     * @param poolId The pool id of the deposit target reward pool.
     * @param amount The amount of tokens to deposit.
     * @param tokenAddress The address of the token to deposit.
     * modifier payable: The method can be called with TARA.
     */
    function deposit(
        address spender,
        uint256 poolId,
        uint256 amount,
        address tokenAddress
    ) public payable override nonReentrant {
        if (tokenAddress != address(0)) {
            ERC20 token = ERC20(tokenAddress);
            uint256 balance = token.balanceOf(spender);
            require(balance >= amount, "Insufficient balance");
            token.transferFrom(spender, address(this), amount);
        } else {
            require(msg.value == amount, "Invalid amount");
        }
        IEscrow.DynamicDeposit memory depo = IEscrow.DynamicDeposit(amount, tokenAddress, poolId);
        _deposits[poolId][spender] = depo;
        emit Deposited(spender, amount, poolId);
    }

    /**
     * @dev Withdraws the given amount of tokens from the escrow.
     * @notice The caller of this method must be the owner of the escrow deposit.
     * The withdrawal can be made to a differnet address than the one specified in the deposit.
     * @param receiver The address to receive the tokens.
     * @param poolId The reward pool id of which the tokens are withdrawn.
     * @param amount The amount of tokens to withdraw.
     */
    function withdraw(
        address payable receiver,
        uint256 poolId,
        uint256 amount
    ) external override nonReentrant {
        require(_deposits[poolId][msg.sender].weiAmount >= amount, "Not enough funds");
        if (_deposits[poolId][msg.sender].weiAmount == amount) {
            delete _deposits[poolId][msg.sender];
        } else {
            _deposits[poolId][msg.sender].weiAmount -= amount;
        }
        if (_deposits[poolId][msg.sender].tokenAddress == address(0)) {
            receiver.transfer(amount);
        } else {
            ERC20 token = ERC20(_deposits[poolId][msg.sender].tokenAddress);
            token.transferFrom(address(this), receiver, amount);
        }
        emit Withdrawn(receiver, amount, poolId);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}
