// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers, upgrades } from 'hardhat';
import * as dotenv from 'dotenv';
import { BigNumber } from 'ethers';
dotenv.config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // const FEE_DATA = {
  //   maxFeePerGas: ethers.BigNumber.from("10000000"),
  //   maxPriorityFeePerGas: ethers.BigNumber.from("10000000"),
  //   gasPrice: ethers.BigNumber.from("10000000"),
  // };

  // Wrap the provider so we can override fee data.
  const provider = new ethers.providers.FallbackProvider([ethers.provider], 1);
  // provider.getFeeData = async () => FEE_DATA;
  provider.estimateGas = async (tx) => BigNumber.from('10000000');

  console.log(await provider.getFeeData());

  console.log('hardhat network id is:', hre.network.config.chainId);
  console.log('config is now:', hre.network.config);
  // Create the signer for the mnemonic, connected to the provider with hardcoded fee data
  const signer = new ethers.Wallet(
    process.env.MAINNET_PRIV_KEY || '',
    provider,
  );
  console.log('signer address: ', signer.address);

  // Get the contract factory connected to signer so it uses hardcoded fee data and
  // should deploy using the signer and the hardcoded fees.
  const DynamicEscrow = await ethers.getContractFactory(
    'DynamicEscrowUpgradeable',
    signer,
  );

  let dynamicEscrow;
  try {
    dynamicEscrow = await upgrades.deployProxy(
      DynamicEscrow,
      ['0xc6a808A6EC3103548f0b38d32DCb6a705B734c89'],
      {
        kind: 'transparent',
        initializer: 'initialize',
      },
    );

    await dynamicEscrow.deployed();
    console.log('DynamicEscrow deployed to:', dynamicEscrow.address);
  } catch (error) {
    console.error(error);
    console.log('==============================');
    console.error(dynamicEscrow);
  }
  const HypePool = await ethers.getContractFactory(
    'HypePoolUpgradeable',
    signer,
  );
  let hypePool;
  try {
    hypePool = await upgrades.deployProxy(
      HypePool,
      [dynamicEscrow?.address, signer.address],
      {
        kind: 'transparent',
        initializer: 'initialize',
      },
    );

    await hypePool.deployed();

    console.log('HypePool deployed to:', hypePool.address);

    if (dynamicEscrow) {
      // Updating the DynamicEscrow contract with the address of HypePool
      await dynamicEscrow.setHypePoolAddress(hypePool.address);
      console.log('DynamicEscrow updated with HypePool address');
    }
  } catch (error) {
    console.error(error);
    console.log('==============================');
    console.error(hypePool);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
