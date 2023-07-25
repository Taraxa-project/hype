import {
  PoolActivated,
  PoolCreated,
  PoolDetailsCreated,
  PoolRewardsCreated,
  PoolUriSet,
} from '../generated/HypePool/HypePool';
import { HypeIds, HypePool, HypeUri } from '../generated/schema';
import { BigInt, ethereum, ipfs, json } from '@graphprotocol/graph-ts';

const DEFAULT_HYPE_IDS = '1';

export function handlePoolActivated(event: PoolActivated): void {
  const id = event.params.poolId;
  const activator = event.params.activator;
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  if (activator) {
    hypepool.status = 'STARTED';
    hypepool.startDate = event.params.startDate;
    hypepool.endDate = event.params.endDate;
    let hypeids = HypeIds.load(DEFAULT_HYPE_IDS);
    if (hypeids && hypeids.ids) {
      hypeids.ids.push(id);
    }
  }
  hypepool.save();
}

export function handlePoolCreated(event: PoolCreated): void {
  const id = event.params.poolId;
  const hypepool = new HypePool(id);
  hypepool.creator = event.params.creator;
  hypepool.uri = event.params.uri;
  hypepool.remainingFunds = BigInt.zero();
  hypepool.status = 'CREATED';
  hypepool.save();
}

export function handlePoolDetails(event: PoolDetailsCreated): void {
  const id = event.params.poolId;
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  hypepool.projectName = event.params.projectName;
  hypepool.title = event.params.title;
  hypepool.tokenName = event.params.tokenName;
  hypepool.word = event.params.word;
  hypepool.save();
}

export function handlePoolRewards(event: PoolRewardsCreated): void {
  const id = event.params.poolId;
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  hypepool.network = event.params.network;
  hypepool.cap = event.params.cap;
  hypepool.remainingFunds = BigInt.zero();
  hypepool.tokenAddress = event.params.tokenAddress;
  hypepool.impressionReward = event.params.impressionReward;
  hypepool.startDate = event.params.startDate;
  hypepool.duration = event.params.duration;
  hypepool.endDate = event.params.endDate;
  hypepool.save();
}

export function handlePoolUriSet(event: PoolUriSet): void {
  const id = event.params.poolId;
  const uri = event.params.uri;

  let hypepool = HypePool.load(id);
  let hypeUri = HypeUri.load(id);

  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  if (!hypeUri) {
    hypeUri = new HypeUri(id);
  }

  if (uri) {
    hypepool.uri = uri;
    hypeUri.uri = uri;
  }

  let ipfsData = ipfs.cat(uri);
  if (ipfsData) {
    let value = json.fromBytes(ipfsData).toObject();
    if (value) {
      const description = value.get('description');
      if (description) {
        hypepool.description = description.toString();
      }
      const projectDescription = value.get('projectDescription');
      if (projectDescription) {
        hypepool.projectDescription = projectDescription.toString();
      }
      const imageUri = value.get('imageUri');
      if (imageUri) {
        hypepool.imageUri = imageUri.toString();
      }
    }
  }

  hypepool.save();
  hypeUri.save();
}

export function handleBlock(block: ethereum.Block): void {
  let blockNumber = block.number.toI32();
  if (blockNumber === 1) {
    let hypeIds = new HypeIds(DEFAULT_HYPE_IDS);
    hypeIds.ids = [];
    hypeIds.save();
  }

  if (blockNumber % 1000 === 0) {
    // Do something every 1000 blocks.
    let hypeIds = HypeIds.load(DEFAULT_HYPE_IDS);
    if (hypeIds && hypeIds.ids && hypeIds.ids.length > 0) {
      for (let i = 0; i < hypeIds.ids.length; i++) {
        let hypepool = HypePool.load(hypeIds.ids[i]);
        if (hypepool) {
          if (hypepool.remainingFunds.equals(BigInt.zero())) {
            hypepool.status = 'EXPIRED';
            // Remove pool from array of pool ids
            hypeIds.ids.splice(i, 1);
            hypeIds.save();
          }
          if (
            hypepool
              .endDate!.plus(BigInt.fromI32(604800))
              .gt(BigInt.fromI32(block.timestamp.toI32())) &&
            hypepool.endDate!.lt(BigInt.fromI32(block.timestamp.toI32()))
          ) {
            // If the current time is after the pool's end date, but before the end of the grace period (end date + 1 week), set status to GRACE_PERIOD
            hypepool.status = 'GRACE_PERIOD';
          }
          if (
            hypepool
              .endDate!.plus(BigInt.fromI32(604800))!
              .lt(BigInt.fromI32(block.timestamp.toI32()))
          ) {
            // Remove pool from array of pool ids
            hypeIds.ids.splice(i, 1);
            hypeIds.save();
          }
          hypepool.save();
        }
      }
    }
  }
}
