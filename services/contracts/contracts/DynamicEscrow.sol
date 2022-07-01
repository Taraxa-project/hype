pragma solidity ^0.8.4;
// SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "hardhat/console.sol";

contract DynamicEscrow is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    function __DynamicEscrow_init() internal onlyInitializing {
        __Ownable_init_unchained();
    }

    function __DynamicEscrow_init_unchained() internal onlyInitializing {}

    function initialize(address rewarder) public initializer {
        __DynamicEscrow_init();
        __ReentrancyGuard_init();
        _rewarder = rewarder;
    }

    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address payable;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    event Deposited(address indexed spender, uint256 weiAmount, uint256 poolId);
    event Withdrawn(
        address indexed receiver,
        uint256 weiAmount,
        uint256 poolId
    );
    event RewardCredited(
        address indexed receiver,
        uint256 weiAmount,
        uint256 poolId
    );
    struct DynamicDeposit {
        uint256 weiAmount;
        address tokenAddress;
        uint256 poolId;
    }

    struct DepositIndex {
        address payee;
        uint256 poolId;
    }

    modifier onlyRewarder() {
        require(msg.sender == _rewarder, "OnlyRewarder");
        _;
    }

    address private _rewarder;
    mapping(bytes => DynamicDeposit) private _deposits;

    /* @dev Rewards introduce the notion of reward pools. Reward pools are
     * defined by their IDs as integers and every reward accrued must be associated
     * with a reward pool. The reward pool ID is used to identify the reward itself
     * and can be used throughout multiple application.*/
    mapping(bytes => uint256) private _accruedRewards;

    /* @dev Read the configured rewarder address. */
    function getRewarder() public view returns (address) {
        return _rewarder;
    }

    /*
     * @dev Read Deposits to the escrow.
     * @param payee The payee of the deposit.
     * @param poolId The reward pool id to serach after.
     * @return The deposits for the payee and pool given as params.
     */
    function depositsOf(address payee, uint256 poolId)
        public
        view
        returns (DynamicDeposit memory)
    {
        return _deposits[abi.encode(DepositIndex(payee, poolId))];
    }

    /*
     * @dev Read the accrued rewards for a payee.
     * @param payee The payee of the reward.
     * @return The accrued rewards for the payee.
     */
    function accruedRewardsOf(address payee, uint256 poolId)
        public
        view
        returns (uint256)
    {
        return _accruedRewards[abi.encode(DepositIndex(payee, poolId))];
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
        bytes memory index = abi.encode(DepositIndex(payee, poolId));
        _accruedRewards[index] += amount;
        require(_accruedRewards[index] >= amount, "AccruedRewardOverflow");
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
        bytes memory index = abi.encode(DepositIndex(msg.sender, poolId));
        require(_accruedRewards[index] > 0, "Not enough accrued rewards");
        uint256 _amount = _accruedRewards[index];
        _accruedRewards[index] = 0;
        if (tokenAddress != address(0)) {
            IERC20Upgradeable token = ERC20Upgradeable(tokenAddress);
            token.safeTransfer(receiver, _amount);
        } else {
            payable(address(this)).sendValue(_amount);
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
    ) public payable nonReentrant {
        if (tokenAddress != address(0)) {
            IERC20Upgradeable token = ERC20Upgradeable(tokenAddress);
            uint256 balance = token.balanceOf(spender);
            require(balance >= amount, "Insufficient balance");
            token.safeTransferFrom(spender, address(this), amount);
        } else {
            require(msg.value == amount, "Invalid amount");
        }
        DynamicDeposit memory depo = DynamicDeposit(
            amount,
            tokenAddress,
            poolId
        );
        _deposits[abi.encode(DepositIndex(spender, poolId))] = depo;
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
    ) external nonReentrant {
        bytes memory index = abi.encode(DepositIndex(msg.sender, poolId));
        DynamicDeposit memory _depo = _deposits[index];
        require(_depo.weiAmount >= amount, "Not enough funds");
        if (_depo.weiAmount == amount) {
            delete _deposits[index];
        } else {
            _depo.weiAmount -= amount;
            _deposits[index].weiAmount -= amount;
        }
        if (_depo.tokenAddress == address(0)) {
            receiver.transfer(amount);
        } else {
            IERC20Upgradeable token = ERC20Upgradeable(_depo.tokenAddress);
            token.safeTransferFrom(receiver, address(this), amount);
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
