import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  OwnershipTransferred,
  Paused,
  PoolActivated,
  PoolCreated,
  PoolUriSet,
  Unpaused,
} from '../generated/HypePool/HypePool';

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address,
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('previousOwner', ethereum.Value.fromAddress(previousOwner)),
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner)),
  );

  return ownershipTransferredEvent;
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent());

  pausedEvent.parameters = new Array();

  pausedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account)),
  );

  return pausedEvent;
}

export function createPoolActivatedEvent(poolId: BigInt, activator: Address): PoolActivated {
  let poolActivatedEvent = changetype<PoolActivated>(newMockEvent());

  poolActivatedEvent.parameters = new Array();

  poolActivatedEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromUnsignedBigInt(poolId)),
  );
  poolActivatedEvent.parameters.push(
    new ethereum.EventParam('activator', ethereum.Value.fromAddress(activator)),
  );

  return poolActivatedEvent;
}

export function createPoolCreatedEvent(
  poolId: BigInt,
  creator: Address,
  uri: string,
  projectName: string,
  title: string,
  active: boolean,
  poolCap: BigInt,
  poolToken: Address,
  minHypeReward: BigInt,
  endDate: BigInt,
): PoolCreated {
  let poolCreatedEvent = changetype<PoolCreated>(newMockEvent());

  poolCreatedEvent.parameters = new Array();

  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromUnsignedBigInt(poolId)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('creator', ethereum.Value.fromAddress(creator)),
  );
  poolCreatedEvent.parameters.push(new ethereum.EventParam('uri', ethereum.Value.fromString(uri)));
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('projectName', ethereum.Value.fromString(projectName)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('title', ethereum.Value.fromString(title)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('active', ethereum.Value.fromBoolean(active)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('poolCap', ethereum.Value.fromUnsignedBigInt(poolCap)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('poolToken', ethereum.Value.fromAddress(poolToken)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('minHypeReward', ethereum.Value.fromUnsignedBigInt(minHypeReward)),
  );
  poolCreatedEvent.parameters.push(
    new ethereum.EventParam('endDate', ethereum.Value.fromUnsignedBigInt(endDate)),
  );

  return poolCreatedEvent;
}

export function createPoolUriSetEvent(poolId: BigInt, uri: string): PoolUriSet {
  let poolUriSetEvent = changetype<PoolUriSet>(newMockEvent());

  poolUriSetEvent.parameters = new Array();

  poolUriSetEvent.parameters.push(
    new ethereum.EventParam('poolId', ethereum.Value.fromUnsignedBigInt(poolId)),
  );
  poolUriSetEvent.parameters.push(new ethereum.EventParam('uri', ethereum.Value.fromString(uri)));

  return poolUriSetEvent;
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent());

  unpausedEvent.parameters = new Array();

  unpausedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account)),
  );

  return unpausedEvent;
}
