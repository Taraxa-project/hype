// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import HypePool from "../artifacts/contracts/HypePool.sol/HypePool.json";
dotenv.config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signer = new ethers.Wallet(process.env.MAINNET_PRIV_KEY || "", ethers.provider);
  console.log("signer address: ", signer.address);

  const txHash = "0x047829bb70944eb30a690121f1d11c5cf214ff062d6f1de7a9387e378f3755fe";
  const txReceipt = await ethers.provider.getTransactionReceipt(txHash);
  const tx = await ethers.provider.getTransaction(txHash);
  console.log(tx);
  const hypeI = new ethers.utils.Interface(HypePool.abi);
  const txDataAscii = await hypeI.parseTransaction(tx);
  console.log(txDataAscii);
  console.log("==============================");
  console.log(txReceipt);
  //   Get the contract factory connected to signer so it uses hardcoded fee data and
  //   should deploy using the signer and the hardcoded fees.
  //   const DynamicEscrow = await ethers.getContractFactory("DynamicEscrow");
  //   const deployFunc = DynamicEscrow.connect(signer).deploy(signer.address, {
  //     gasLimit: 100000000,
  //     gasPrice: 100000000,
  //   });

  //   console.log(deployFunc);
  //   const dynamicEscrow = await deployFunc;

  //   await dynamicEscrow.deployed();
  //   console.log("DynamicEscrow deployed to:", dynamicEscrow.address);
  //   const HypePool = await ethers.getContractFactory("HypePool");
  //   const hypePool = await HypePool.connect(signer).deploy(dynamicEscrow.address, {
  //     gasLimit: 100000000,
  //     gasPrice: 100000000,
  //   });

  //   await hypePool.deployed();

  //   console.log("HypePool deployed to:", hypePool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
