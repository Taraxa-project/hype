import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("HypePool", function () {
  let hypePool: Contract;
  let owner: SignerWithAddress;
  let escrow: SignerWithAddress;

  this.beforeAll("Should deploy the contract", async function () {
    const [signer, add1] = await ethers.getSigners();
    owner = signer;
    escrow = add1;
    console.log(owner.address);

    const HypePool = await ethers.getContractFactory("HypePool", {
      signer: owner,
    });
    hypePool = await HypePool.connect(owner).deploy(add1.address);
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
