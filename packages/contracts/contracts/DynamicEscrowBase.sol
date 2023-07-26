pragma solidity 0.8.18;
// SPDX-License-Identifier: UNLICENSED
import './interfaces/IEscrow.sol';
import './interfaces/IHypePool.sol';

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
    function allowance(
        address owner,
        address spender
    ) public virtual returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual;

    function approve(address spender, uint256 value) public virtual;

    function decreaseAllowance(address spender, uint256 value) public virtual;
}

contract DynamicEscrowBase is IEscrow {
    address private _hypePoolAddress;
    /* @dev Deposits always need to be tied to a pool. For now there is no check if
     * the pool exists because it would limit the contract, but its something worth to ideate on.
     */
    mapping(bytes32 => mapping(address => IEscrow.DynamicDeposit))
        private _deposits;

    /**
     * @dev Log of claimed hashes. No hash should be claimable twice
     */
    mapping(bytes32 => uint256) private _claimed;

    function canWithdraw(bytes32 poolId) internal view returns (bool) {
        IHypePool hypePool = IHypePool(_hypePoolAddress);
        if (!hypePool.doesPoolExist(poolId)) {
            return false;
        }
        uint256 poolEndDate = hypePool.getPoolRewards(poolId).endDate;
        return (block.timestamp > poolEndDate + 1 weeks);
    }

    function _setHypePoolAddress(address hypePool) internal {
        _hypePoolAddress = hypePool;
    }

    /*
     * @dev Read Deposits to the escrow.
     * @param payee The payee of the deposit.
     * @param poolId The reward pool id to serach after.
     * @return The deposits for the payee and pool given as params.
     */
    function depositsOf(
        address payee,
        bytes32 poolId
    ) public view returns (IEscrow.DynamicDeposit memory) {
        return _deposits[poolId][payee];
    }

    /**
     * @dev Deposit tokens to the escrow.
     * @notice The caller of this method must first have enough approval from spender to the escrow contract deposit the tokens.
     * @param spender The address of the spender.
     * @param poolId The pool id of the deposit target reward pool.
     * @param amount The amount of tokens to deposit.
     * @param tokenAddress The address of the token to deposit.
     */
    function _deposit(
        address spender,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress
    ) internal {
        IEscrow.DynamicDeposit memory depoBefore = _deposits[poolId][spender];
        require(
            depoBefore.weiAmount == 0,
            'A deposit was already made for this pool'
        );
        if (tokenAddress != address(0)) {
            ERC20 token = ERC20(tokenAddress);
            uint256 balance = token.balanceOf(spender);
            require(balance >= amount, 'Insufficient balance');

            // Check if the allowance is enough
            uint256 allowance = token.allowance(spender, address(this));
            require(
                allowance >= amount,
                'Contract not allowed to spend enough tokens'
            );

            token.transferFrom(spender, address(this), amount);
        } else {
            require(msg.value == amount, 'Invalid amount');
        }

        IEscrow.DynamicDeposit memory depo = IEscrow.DynamicDeposit(
            amount,
            tokenAddress,
            poolId
        );
        _deposits[poolId][spender] = depo;
        require(
            _deposits[poolId][spender].weiAmount != 0,
            'Failed to save deposit on chain!'
        );
        emit Deposited(spender, amount, poolId);
    }

    /**
     * @dev Claims the given amount of tokens from the escrow.
     * @notice The caller of this method can be anyone who wants to redeem tokens.
     * @param receiver The address to receive the tokens.
     * @param poolId The reward pool id of which the tokens are withdrawn.
     * @param amount The amount of tokens to withdraw.
     * @param tokenAddress the reward token address of the pool
     * @param nonce the nonce given by the hype backend
     */
    function _claim(
        address payable receiver,
        bytes32 poolId,
        uint256 amount,
        address tokenAddress,
        uint256 nonce
    ) internal {
        bytes32 hash = _hash(receiver, amount, nonce);
        require(_claimed[hash] == 0, 'Claim: Hash already claimed');

        _claimed[hash] = amount;
        if (tokenAddress == address(0)) {
            receiver.transfer(amount);
        } else {
            ERC20 token = ERC20(tokenAddress);
            token.transfer(receiver, amount);
        }
        emit Claimed(receiver, amount, poolId);
    }

    /**
     * @dev Withdraws the given amount of tokens from the escrow.
     * @notice The caller of this method must be the owner of the escrow deposit.
     * The withdrawal can be made to a differnet address than the one specified in the deposit.
     * @param receiver The address to receive the tokens.
     * @param poolId The reward pool id of which the tokens are withdrawn.
     * @param amount The amount of tokens to withdraw.
     */
    function _withdraw(
        address payable receiver,
        bytes32 poolId,
        uint256 amount
    ) internal {
        require(
            canWithdraw(poolId),
            'Withdraw: Pool has not yet ended or grace period not passed'
        );

        IEscrow.DynamicDeposit storage depo = _deposits[poolId][msg.sender];
        address contractAddress = depo.tokenAddress;

        require(depo.weiAmount >= amount, 'Not enough funds');
        if (depo.weiAmount == amount) {
            delete _deposits[poolId][msg.sender];
        } else {
            depo.weiAmount -= amount;
        }
        if (contractAddress == address(0)) {
            receiver.transfer(amount);
        } else {
            ERC20 token = ERC20(contractAddress);
            token.transfer(receiver, amount);
        }
        emit Withdrawn(receiver, amount, poolId);
    }

    function _hash(
        address _address,
        uint256 _value,
        uint256 _nonce
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_address, _value, _nonce));
    }
}
