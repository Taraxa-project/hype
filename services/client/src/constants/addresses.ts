import { AddressType } from '../utils';

export const hypeAddress: AddressType =
  (`${process.env.REACT_APP_HYPE_ADDRESS}` as AddressType) || null;
export const escrowAddress: AddressType =
  (`${process.env.REACT_APP_ESCROW_ADDRESS}` as AddressType) || null;
export const ethEscrowAddress: AddressType =
  (`${process.env.REACT_APP_ETH_ESCROW_ADDRESS}` as AddressType) || null;
