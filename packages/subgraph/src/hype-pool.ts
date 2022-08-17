import { PoolActivated, PoolCreated, PoolUriSet } from '../generated/HypePool/HypePool';
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
  hypepool.projectName = event.params.projectName;
  hypepool.title = event.params.title;
  hypepool.active = event.params.active;
  hypepool.cap = event.params.poolCap;
  hypepool.token = event.params.poolToken;
  hypepool.minReward = event.params.minHypeReward;
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
    }
  }

  hypepool.save();
  hypeUri.save();
}
