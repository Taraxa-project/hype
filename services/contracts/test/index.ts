import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { network } from "hardhat";
import { HypePool } from "../typechain";

describe("HypePool", function () {
  let hypePool: HypePool;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let owner: SignerWithAddress;
  let tokenId: BigNumberish;

  this.beforeAll("Should deploy the contract", async function () {
    const [signer] = await ethers.getSigners();
    owner = signer;
    console.log(owner.address);

    const HypePool = await ethers.getContractFactory("HypePool", {
      signer: owner,
    });
    hypePool = await HypePool.deploy();
    const result = await hypePool.deployed();

    expect(result).not.to.be.undefined;
  });

  it("the contract owner should be the zero address since it was not specified", async () => {
    const cOwner = await hypePool.owner();
    console.log(cOwner);
    expect(cOwner).to.equal(zeroAddress);
  });

  it("should mint a HypePool", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const metadata = "https://hypeapp.io/hype/12.json";

    const mint = await hypePool
      .connect(addr1)
      .safeMint(addr1.address, metadata);
    expect(mint).not.to.be.undefined;

    tokenId = mint.value;

    const balanceOf = await hypePool.balanceOf(addr1.address);
    expect(balanceOf).to.equal(1);
  });

  it("should fail a hype transfer even after approval", async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const approval = await hypePool.connect(addr1).approve(addr2.address, tokenId);
    await expect(hypePool.connect(addr2).transferFrom(addr1.address, addr2.address, tokenId)).to.be.revertedWith('HypePools are non-transferable');
  });
});
