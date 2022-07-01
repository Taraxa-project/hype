import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { ERC20Base } from "../typechain";

describe("DynamicEscrow", function () {
  let dynamicEscrow: Contract;
  let hypePool: Contract;
  let initialAddress: string;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let rewarder: SignerWithAddress;
  let depositorOne: SignerWithAddress;
  let depositorTwo: SignerWithAddress;
  let owner: SignerWithAddress;
  let erc20: ERC20Base;
  
  
  const POOL_ZERO = BigNumber.from("0");
  const POOL_ONE = BigNumber.from("1");
  const POOL_TWO = BigNumber.from("2");

  const oneEth = ethers.utils.parseEther("1");
  const twoEth = ethers.utils.parseEther("2");
  const threeEth = ethers.utils.parseEther("3");
  const initBalance = ethers.utils.parseEther("10000");

  this.beforeAll("Should deploy the contract", async function () {
    const [signer, depositor1, depositor2, dep3] = await ethers.getSigners();
    depositorOne = depositor1;
    depositorTwo = depositor2;
    rewarder = dep3;
    owner = signer;

    const DynamicEscrow = await ethers.getContractFactory("DynamicEscrow", {
      signer: owner,
    });
    dynamicEscrow = await upgrades.deployProxy(DynamicEscrow, [
      rewarder.address,
    ]);
    const result = await dynamicEscrow.deployed();
    initialAddress = dynamicEscrow.address;
    console.log("DynamicEscrow deployed to: ", initialAddress);
    expect(result).not.to.be.undefined;
    expect(result.address).to.be.equal(initialAddress);
  });

  it("the contract owner should be the zero address since it was not specified", async () => {
    const cOwner = await dynamicEscrow.owner();
    expect(cOwner).to.equal(owner.address);
  });

  it("The rewarder address should be the provided account", async () => {
    const rewarderFromContract = await dynamicEscrow.getRewarder();
    expect(rewarderFromContract).to.equal(rewarder.address);
  });

  it("Deploys the HypePool contract too", async () => {
    const HypePool = await ethers.getContractFactory("HypePool", {
      signer: owner,
    });
    hypePool = await upgrades.deployProxy(HypePool, [dynamicEscrow.address]);
    const result = await hypePool.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).to.be.equal(hypePool.address);
  });

  it(`DepositorOne deposits 1 ETH into escrow for pool 1 and emits Deposited event`, async () => {
    expect(
      await dynamicEscrow.provider.getBalance(dynamicEscrow.address)
    ).to.equal(0);

    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ZERO);
    const deposit = await dynamicEscrow
      .connect(depositorOne)
      .deposit(
        depositorOne.address,
        POOL_ZERO,
        oneEth,
        zeroAddress,
        { value: oneEth }
      );
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(
        depositorOne.address,
        oneEth,
        POOL_ZERO
      );
    expect(
      await dynamicEscrow.provider.getBalance(dynamicEscrow.address)
    ).to.equal(oneEth);
  });

  it("Then Creates Pool 1 with the defined amount", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ZERO);
    const createPool = await hypePool
      .connect(depositorOne)
      .createPool("https://pool.data.json", oneEth, ethers.utils.parseEther("0.03"));
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(POOL_ZERO, depositorOne.address, "https://pool.data.json", oneEth, zeroAddress, ethers.utils.parseEther("0.03"));
  });

  it("Depositor one tries to create a pool with depositor two's payment", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ONE);
    expect(hypePool
      .connect(depositorOne)
      .createPool("https://pool.data.json", oneEth, ethers.utils.parseEther("0.03"))).to.be.revertedWith("Deposited amount does not match pool cap");
  });

  it('Checks data valitaions', async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ONE);
    expect(hypePool
      .connect(depositorOne)
      .createPool("", oneEth, ethers.utils.parseEther("0.03"))).to.be.revertedWith("Missing metadata URI");

    expect(hypePool
      .connect(depositorOne)
      .createPool("as", oneEth, ethers.utils.parseEther("0.0"))).to.be.revertedWith("Invalid pool cap");

    expect(hypePool
      .connect(depositorOne)
      .createPool("as", oneEth, ethers.utils.parseEther("0.03"))).to.be.revertedWith("Invalid minimal hype reward");
  });

  it("DepositorTwo deposits 1 ETH into escrow for pool 2 and emits Deposited event, then withdraws", async () => {
    expect(
      await dynamicEscrow.provider.getBalance(dynamicEscrow.address)
    ).to.equal(oneEth);

    const balanceOfInit = await depositorTwo.getBalance();
    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(
        depositorTwo.address,
        POOL_ONE,
        oneEth,
        zeroAddress,
        { value: oneEth }
      );
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(
        depositorTwo.address,
        oneEth,
        POOL_ONE
      );

    expect(
      await dynamicEscrow.provider.getBalance(dynamicEscrow.address)
    ).to.equal(twoEth);

    const balanceOfAfter = await depositorTwo.getBalance();
    const greaterThan = balanceOfInit.gt(balanceOfAfter);
    expect(greaterThan).to.be.true;
    const depositOf = await dynamicEscrow.depositsOf(
      depositorTwo.address,
      POOL_ONE
    );
    expect(depositOf[0]).to.be.equal(oneEth);
    const withdrawal = await dynamicEscrow
      .connect(depositorTwo)
      .withdraw(
        depositorTwo.address,
        POOL_ONE,
        oneEth,
      );
    expect(withdrawal).not.to.be.undefined;
    await expect(withdrawal)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(
        depositorTwo.address,
        oneEth,
        POOL_ONE
      );

    expect(
      await dynamicEscrow.provider.getBalance(dynamicEscrow.address)
    ).to.equal(oneEth);

    const balanceAfterWithdrawal = await depositorTwo.getBalance();
    const lt = balanceOfAfter.lt(balanceAfterWithdrawal);
    expect(lt).to.be.true;
    const depositOfAfter = await dynamicEscrow.depositsOf(
      depositorTwo.address,
      POOL_ONE
    );
    expect(depositOfAfter[0]).to.be.equal(ethers.utils.parseEther("0"));
  });

  it("Deploys a sample ERC20", async () => {
    const BaseERC20 = await ethers.getContractFactory("ERC20Base", {
      signer: owner,
    });
    
    erc20 = await BaseERC20.deploy(initBalance);
    const result = await erc20.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).not.to.be.undefined;
    const balanceOfOwner = await erc20.balanceOf(owner.address);
    expect(balanceOfOwner.toString()).to.equal(initBalance.toString());
  });

  it("Deposits 13 ERC20 into Escrow Pool 3, checks validity", async () => {
    const allowance = await erc20.approve(
      dynamicEscrow.address,
      ethers.utils.parseEther("13")
    );
    expect(allowance).not.to.be.undefined;
    const allowanceOfContract = await erc20.allowance(
      owner.address,
      dynamicEscrow.address
    );
    expect(allowanceOfContract).to.be.equal(ethers.utils.parseEther("13"));
    const balanceOfOwnerBefore = await erc20.balanceOf(owner.address);
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(
        owner.address,
        POOL_TWO,
        ethers.utils.parseEther("13"),
        erc20.address
      );
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(
        owner.address,
        ethers.utils.parseEther("13"),
        POOL_TWO
      );
    const balanceOfOwner = await erc20.balanceOf(owner.address);
    expect(ethers.utils.parseEther("13")).to.be.equal(
      balanceOfOwnerBefore.sub(balanceOfOwner)
    );
    const deposits = await dynamicEscrow.depositsOf(
      owner.address,
      POOL_TWO
    );
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(POOL_TWO);
    expect(tokenAddress).to.be.equal(erc20.address);
  });

  it("depositorTwo gets 3 ERC20 token worth of rewards, checks onlyRewarder modifier", async () => {
    const rewarderCall = await dynamicEscrow
      .connect(rewarder)
      .accrueRewardFor(
        depositorTwo.address,
        POOL_TWO,
        threeEth
      );
    expect(rewarderCall).not.to.be.undefined;
    await expect(rewarderCall)
      .to.emit(dynamicEscrow, "RewardCredited")
      .withArgs(
        depositorTwo.address,
        threeEth,
        POOL_TWO
      );
    const accruedForDepTwo = await dynamicEscrow.accruedRewardsOf(
      depositorTwo.address,
      POOL_TWO
    );
    expect(accruedForDepTwo).to.be.equal(threeEth);

    await expect(
      dynamicEscrow
        .connect(depositorTwo)
        .accrueRewardFor(
          depositorTwo.address,
          POOL_TWO,
          threeEth
        )
    ).to.be.revertedWith(`OnlyRewarder`);
  });

  it("depositorTwo redeems all ERC20 token rewards: should be 3 tokens", async () => {
    const balance = await erc20.balanceOf(depositorTwo.address);
    console.log("balance is: ", balance.toString());
    expect(ethers.utils.parseEther("0")).to.be.equal(balance);
    const giveOutRewardsFrom = await dynamicEscrow
      .connect(depositorTwo)
      .redeemRewards(depositorTwo.address, erc20.address, POOL_TWO);

    await expect(giveOutRewardsFrom)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(
        depositorTwo.address,
        threeEth,
        POOL_TWO
      );
    const balanceAfter = await erc20.balanceOf(depositorTwo.address);
    expect(balanceAfter).to.be.equal(threeEth);
    await expect(
      dynamicEscrow
        .connect(depositorOne)
        .redeemRewards(depositorOne.address, erc20.address, POOL_TWO)
    ).to.be.revertedWith("Not enough accrued rewards");
  });

});
