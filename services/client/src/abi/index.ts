import DynamicEscrow from 'hype-contracts/artifacts/contracts/DynamicEscrow.sol/DynamicEscrow.json';
import HypePool from 'hype-contracts/artifacts/contracts/HypePool.sol/HypePool.json';
import ERC20 from 'hype-contracts/artifacts/contracts/ERC20Base.sol/ERC20Base.json';
import DynamicEscrowUpgradeable from 'hype-contracts/artifacts/contracts/upgradeable/DynamicEscrowUpgradeable.sol/DynamicEscrowUpgradeable.json';
import HypePoolUpgradeable from 'hype-contracts/artifacts/contracts/upgradeable/HypePoolUpgradeable.sol/HypePoolUpgradeable.json';
import IEscrow from 'hype-contracts/artifacts/contracts/interfaces/IEscrow.sol/IEscrow.json';
import IHypePool from 'hype-contracts/artifacts/contracts/interfaces/IHypePool.sol/IHypePool.json';
import IRewarder from 'hype-contracts/artifacts/contracts/interfaces/IRewarder.sol/IRewarder.json';

const contracts = {
  DynamicEscrow,
  DynamicEscrowUpgradeable,
  HypePool,
  HypePoolUpgradeable,
  ERC20,
};

const interfaces = {
  IEscrow,
  IHypePool,
  IRewarder,
};
const exp = { contracts, interfaces };

export default exp;
