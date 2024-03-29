import { Claimed, Deposited, Withdrawn } from '../generated/DynamicEscrow/DynamicEscrow';
import { ClaimedEvent, DepositedEvent, HypePool, WithdrawnEvent } from '../generated/schema';
import { BigInt } from '@graphprotocol/graph-ts';

export function handleClaimed(event: Claimed): void {
  const id = event.params.poolId;
  const receiver = event.params.receiver;
  const amount = event.params.weiAmount;
  let hypepool = HypePool.load(id);
  if (hypepool && hypepool.endDate) {
    hypepool.remainingFunds = hypepool.remainingFunds.minus(amount);
    if (hypepool.remainingFunds.equals(BigInt.zero())) {
      hypepool.status = 'ENDED';
    }
    if (
      hypepool
        .endDate!.plus(BigInt.fromI32(604800))
        .gt(BigInt.fromI32(event.block.timestamp.toI32())) &&
      hypepool.endDate!.lt(BigInt.fromI32(event.block.timestamp.toI32()))
    ) {
      // If the current time is after the pool's end date, but before the end of the grace period (end date + 1 week), set status to EXPIRED
      hypepool.status = 'EXPIRED';
    }
    hypepool.save();
  }

  const claimedEvent = new ClaimedEvent(event.transaction.hash.toHexString());
  claimedEvent.receiver = receiver;
  claimedEvent.poolId = id;
  claimedEvent.weiAmount = amount;
  claimedEvent.save();
}

export function handleDeposited(event: Deposited): void {
  const id = event.params.poolId;
  const spender = event.params.spender;
  const amount = event.params.weiAmount;
  let hypepool = HypePool.load(id);
  if (hypepool) {
    hypepool.remainingFunds = hypepool.remainingFunds.plus(amount);
    hypepool.status = 'FUNDED';
    hypepool.save();
  }

  const depositedEvent = new DepositedEvent(event.transaction.hash.toHexString());
  depositedEvent.spender = spender;
  depositedEvent.poolId = id;
  depositedEvent.weiAmount = amount;
  depositedEvent.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  const id = event.params.poolId;
  const receiver = event.params.receiver;
  const amount = event.params.weiAmount;
  let hypepool = HypePool.load(id);
  if (hypepool) {
    hypepool.remainingFunds = hypepool.remainingFunds.minus(amount);
    if (hypepool.remainingFunds.equals(BigInt.zero())) {
      hypepool.status = 'ENDED';
    }
    hypepool.save();
  }

  const withdrawnEvent = new WithdrawnEvent(event.transaction.hash.toHexString());
  withdrawnEvent.receiver = receiver;
  withdrawnEvent.poolId = id;
  withdrawnEvent.weiAmount = amount;
  withdrawnEvent.save();
}
