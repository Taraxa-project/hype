// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
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
    event Deposited(
        address indexed spender,
        uint256 weiAmount,
        CountersUpgradeable.Counter poolId
    );
    event Withdrawn(
        address indexed receiver,
        uint256 weiAmount,
        CountersUpgradeable.Counter poolId
    );

    struct DynamicDeposit {
        uint256 weiAmount;
        address tokenAddress;
        CountersUpgradeable.Counter poolId;
    }

    struct DepositIndex {
        address payee;
        CountersUpgradeable.Counter poolId;
    }

    modifier onlyRewarder() {
        require(msg.sender == _rewarder);
        _;
    }

    address _rewarder;
    mapping(bytes => DynamicDeposit) private _deposits;
    mapping(address => uint256) private _accruedRewards;

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
        return _deposits[abi.encode(DepositIndex(payee, CountersUpgradeable.Counter(poolId)))];
    }

    /*
     * @dev Read the accrued rewards for a payee.
     * @param payee The payee of the reward.
     * @return The accrued rewards for the payee.
     */
    function accruedRewardsOf(address payee) public view returns (uint256) {
        return _accruedRewards[payee];
    }

    /*
     * @dev Store the sent amount as rewards to be withdrawn.
     * @param payee The destination address of the funds.
     * @param weiAmount The amount of wei to deposit.
     * modifier onlyRewarder Only the rewarder can call this function.
     */
    function accrueRewardFor(address payee, uint256 amount)
        public
        onlyRewarder
    {
        _accruedRewards[payee] += amount;
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
    ) public nonReentrant() {
        require(_accruedRewards[receiver] >= 0);
        uint256 _amount = _accruedRewards[receiver];
        _accruedRewards[receiver] = 0;
        if (tokenAddress != address(0)) {
            IERC20Upgradeable token = ERC20Upgradeable(tokenAddress);
            token.transfer(receiver, _accruedRewards[receiver]);
        } else {
            payable(address(this)).sendValue(_amount);
        }
        emit Withdrawn(receiver, _amount, CountersUpgradeable.Counter(poolId));
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
    ) public payable {
        if (tokenAddress != address(0)) {
            IERC20Upgradeable token = ERC20Upgradeable(tokenAddress);
            uint256 balance = token.balanceOf(spender);
            require(balance >= amount, "Insufficient balance");
            token.safeTransferFrom(spender, address(this), amount);
        }
        CountersUpgradeable.Counter memory _id = CountersUpgradeable.Counter(poolId);
        DynamicDeposit memory depo = DynamicDeposit(amount, spender, _id);
        _deposits[abi.encode(DepositIndex(spender, _id))] = depo;
        emit Deposited(spender, amount, _id);
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
        address receiver,
        uint256 poolId,
        uint256 amount
    ) public nonReentrant() {
        CountersUpgradeable.Counter memory _id = CountersUpgradeable.Counter(poolId);
        bytes memory index = abi.encode(DepositIndex(msg.sender, _id));
        DynamicDeposit memory _depo = _deposits[index];

        require(_depo.weiAmount >= amount, "Not enough funds");
        if (_depo.weiAmount == amount) {
            delete _deposits[index];
        } else {
            _depo.weiAmount -= amount;
            _deposits[index] = _depo;
        }
        if (_depo.tokenAddress == address(0)) {
            payable(receiver).sendValue(amount);
        } else {
            IERC20Upgradeable token = ERC20Upgradeable(_depo.tokenAddress);
            token.safeTransferFrom(address(this), receiver, amount);
        }
        emit Withdrawn(receiver, amount, _id);
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}
