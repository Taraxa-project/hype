// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const FEE_DATA = {
    maxFeePerGas: ethers.utils.parseUnits("10000", "gwei"),
    maxPriorityFeePerGas: ethers.utils.parseUnits("500", "gwei"),
    gasPrice: ethers.utils.parseUnits("1000", "gwei"),
  };

  // Wrap the provider so we can override fee data.
  const provider = new ethers.providers.JsonRpcProvider(process.env.TARA_TESTNET_URL);
  provider.getFeeData = async () => FEE_DATA;

  // Create the signer for the mnemonic, connected to the provider with hardcoded fee data
  const signer = new ethers.Wallet(process.env.MAINNET_PRIV_KEY || "").connect(provider);
  console.log("signer address: ", signer.address);

  // Get the contract factory connected to signer so it uses hardcoded fee data and
  // should deploy using the signer and the hardcoded fees.
  const DynamicEscrow = await ethers.getContractFactory("DynamicEscrow", signer);
  const dynamicEscrow = await upgrades.deployProxy(DynamicEscrow, ["0xc6a808A6EC3103548f0b38d32DCb6a705B734c89"]);

  await dynamicEscrow.deployed();
  console.log("DynamicEscrow deployed to:", dynamicEscrow.address);
  const HypePool = await ethers.getContractFactory("HypePool", signer);
  const hypePool = await upgrades.deployProxy(HypePool, [dynamicEscrow.address]);

  await hypePool.deployed();

  console.log("HypePool deployed to:", hypePool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
