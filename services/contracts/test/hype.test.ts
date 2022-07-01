import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumberish, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { network } from "hardhat";
import { HypePool } from "../typechain";

describe("HypePool", function () {
  let hypePool: Contract;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let owner: SignerWithAddress;
  let escrow: SignerWithAddress;
  let tokenId: BigNumberish;

  this.beforeAll("Should deploy the contract", async function () {
    const [signer, add1] = await ethers.getSigners();
    owner = signer;
    escrow = add1;
    console.log(owner.address);

    const HypePool = await ethers.getContractFactory("HypePool", {
      signer: owner,
    });
    hypePool = await upgrades.deployProxy(HypePool, [add1.address]);
    const result = await hypePool.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).to.be.equal(hypePool.address);
  });

  it("the contract owner should be the owner address", async () => {
    const cOwner = await hypePool.owner();
    console.log(cOwner);
    expect(cOwner).to.equal(owner.address);
  });

  it("Tests pausability", async () => {
    const paused = await hypePool.paused();
    expect(paused).to.equal(false);
    await hypePool.connect(owner).pause();
    const paused2 = await hypePool.paused();
    expect(paused2).to.equal(true);
    await hypePool.connect(owner).unpause();
    const paused3 = await hypePool.paused();
    expect(paused3).to.equal(false);
    
    expect(hypePool.connect(escrow).pause()).to.be.reverted;
  });
});
