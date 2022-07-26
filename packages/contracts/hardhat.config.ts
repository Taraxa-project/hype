import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-docgen";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mainnet: {
      chainId: 1,
      url: process.env.TARA_MAINNET_URL || "",
      accounts: process.env.MAINNET_PRIV_KEY !== undefined ? [process.env.MAINNET_PRIV_KEY] : [],
      gas: 10000000,
      gasPrice: 10000000,
      allowUnlimitedContractSize: true,
    },
    testnet: {
      chainId: 2,
      url: process.env.TARA_TESTNET_URL || "",
      accounts: process.env.MAINNET_PRIV_KEY !== undefined ? [process.env.MAINNET_PRIV_KEY] : [],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier: 20,
      allowUnlimitedContractSize: true,
    },
    devnet: {
      chainId: 3,
      url: process.env.TARA_DEVNET_URL || "",
      accounts: process.env.MAINNET_PRIV_KEY !== undefined ? [process.env.MAINNET_PRIV_KEY] : [],
      gas: 2100000,
      gasPrice: 8000000000,
      gasMultiplier: 20,
      allowUnlimitedContractSize: true,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
};

export default config;
