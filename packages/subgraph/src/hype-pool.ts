import {
  PoolActivated,
  PoolCreated,
  PoolDetailsCreated,
  PoolRewardsCreated,
  PoolUriSet,
} from '../generated/HypePool/HypePool';
import { HypePool, HypeUri } from '../generated/schema';
import { ByteArray, ipfs, json } from '@graphprotocol/graph-ts';

export function handlePoolActivated(event: PoolActivated): void {
  const id = event.params.poolId.toString();
  const activator = event.params.activator;
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  if (activator) {
    hypepool.active = true;
  }
  hypepool.save();
}

export function handlePoolCreated(event: PoolCreated): void {
  const id = event.params.poolId.toString();
  const hypepool = new HypePool(id);
  hypepool.creator = event.params.creator;
  hypepool.active = false;
  hypepool.save();
}

export function handlePoolDetails(event: PoolDetailsCreated): void {
  const id = event.params.poolId.toString();
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
  const id = event.params.poolId.toString();
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  hypepool.network = event.params.network;
  hypepool.cap = event.params.cap;
  hypepool.tokenAddress = event.params.tokenAddress;
  hypepool.minReward = event.params.minReward;
  hypepool.impressionReward = event.params.impressionReward;
  hypepool.endDate = event.params.endDate;
  hypepool.save();
}

export function handlePoolUriSet(event: PoolUriSet): void {
  const id = event.params.poolId.toString();
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
    }
  }

  hypepool.save();
  hypeUri.save();
}
