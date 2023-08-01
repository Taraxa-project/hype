import {
  PoolActivated,
  PoolCreated,
  PoolDetailsAndRewardsCreated,
} from '../generated/HypePool/HypePool';
import { HypeIds, HypePool } from '../generated/schema';
import { BigInt, ipfs, json } from '@graphprotocol/graph-ts';

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
  const uri = event.params.uri;

  const hypepool = new HypePool(id);
  hypepool.creator = event.params.creator;
  hypepool.uri = uri;
  hypepool.remainingFunds = BigInt.zero();
  hypepool.status = 'CREATED';

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
}

export function handlePoolDetailsAndRewards(event: PoolDetailsAndRewardsCreated): void {
  const id = event.params.poolId;
  let hypepool = HypePool.load(id);
  if (!hypepool) {
    hypepool = new HypePool(id);
  }
  hypepool.projectName = event.params.projectName;
  hypepool.title = event.params.title;
  hypepool.tokenName = event.params.tokenName;
  hypepool.campaignWord = event.params.campaignWord;
  hypepool.network = event.params.network;
  hypepool.cap = event.params.cap;
  hypepool.remainingFunds = BigInt.zero();
  hypepool.tokenAddress = event.params.tokenAddress;
  hypepool.impressionReward = event.params.impressionReward;
  hypepool.startDate = event.params.startDate;
  hypepool.duration = event.params.duration;
  hypepool.endDate = event.params.endDate;
  hypepool.leaderRewards = event.params.leaderRewards;
  hypepool.save();
}
