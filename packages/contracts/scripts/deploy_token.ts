import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const totalSupply = "10000000000000000000000"; // 10000 * 1e18
  const HypeToken = await ethers.getContractFactory("HypeToken");
  console.log("Deploying HypeToken...");
  const token = await HypeToken.deploy(totalSupply, {
    gasLimit: 100000000,
    gasPrice: 0,
  });
  await token.deployed();
  console.log("HypeToken deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
