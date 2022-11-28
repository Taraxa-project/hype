import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { HypeToken } from "../typechain";

describe("DynamicEscrowUpgradeable", function () {
  let dynamicEscrow: Contract;
  let hypePool: Contract;
  let initialAddress: string;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let rewarder: SignerWithAddress;
  let depositorOne: SignerWithAddress;
  let depositorTwo: SignerWithAddress;
  let owner: SignerWithAddress;
  let erc20: HypeToken;
  let fakeErc20: HypeToken;

  const POOL_ZERO = BigNumber.from("0");
  const POOL_ONE = BigNumber.from("1");
  const POOL_TWO = BigNumber.from("2");
  const POOL_THREE = BigNumber.from("3");
  const POOL_FOUR = BigNumber.from("4");
  const SAMPLE_DATE = BigNumber.from(
    (new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).getTime() / 1000).toFixed(0).toString()
  );
  const PAST_DATE = BigNumber.from(
    (new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).getTime() / 1000).toFixed(0).toString()
  );

  const halfEth = ethers.utils.parseEther("0.5");
  const oneEth = ethers.utils.parseEther("1");
  const twoEth = ethers.utils.parseEther("2");
  const threeEth = ethers.utils.parseEther("3");
  const initBalance = ethers.utils.parseEther("10000");

  this.beforeAll(
    `=========================================
  SCENARIO: GENESIS
  Should deploy the contract
  =============================================`,
    async function () {
      const [signer, depositor1, depositor2, dep3] = await ethers.getSigners();
      depositorOne = depositor1;
      depositorTwo = depositor2;
      rewarder = dep3;
      owner = signer;

      const DynamicEscrow = await ethers.getContractFactory("DynamicEscrowUpgradeable", {
        signer: owner,
      });
      dynamicEscrow = await upgrades.deployProxy(DynamicEscrow, [rewarder.address]);
      const result = await dynamicEscrow.deployed();
      initialAddress = dynamicEscrow.address;
      console.log("DynamicEscrow deployed to: ", initialAddress);
      expect(result).not.to.be.undefined;
      expect(result.address).to.be.equal(initialAddress);
    }
  );

  it("the contract owner should be the owner signer's address", async () => {
    const cOwner = await dynamicEscrow.owner();
    expect(cOwner).to.equal(owner.address);
  });

  it("The rewarder address should be the provided account", async () => {
    const rewarderFromContract = await dynamicEscrow.getRewarder();
    expect(rewarderFromContract).to.equal(rewarder.address);
  });

  it("Deploys the HypePool contract too", async () => {
    const HypePool = await ethers.getContractFactory("HypePoolUpgradeable", {
      signer: owner,
    });
    hypePool = await upgrades.deployProxy(HypePool, [dynamicEscrow.address]);
    const result = await hypePool.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).to.be.equal(hypePool.address);
  });

  it(`===============================================
  SCENARIO: Basic creation and validations
  ===========================================
  Depositor One Creates Pool 0 with the defined amount`, async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ZERO);
    const details = {
      projectName: "project name test",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: oneEth,
      tokenAddress: zeroAddress,
      network: 843,
      minReward: ethers.utils.parseEther("0.03"),
      impressionReward: ethers.utils.parseEther("0.05"),
      endDate: SAMPLE_DATE,
    };
    const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(POOL_ZERO, depositorOne.address, "https://pool.data.json");
    const afterPoolIndex = await hypePool.getCurrentIndex();
    expect(afterPoolIndex).to.equal(POOL_ONE);
  });

  it(`Then DepositorOne deposits 1 ETH into escrow for pool 0 and emits Deposited event`, async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(0);

    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ONE);
    const deposit = await dynamicEscrow
      .connect(depositorOne)
      .deposit(depositorOne.address, POOL_ZERO, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorOne.address, oneEth, POOL_ZERO);
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);
  });

  it("Finally, depositor one activates pool 0", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ONE);
    const activation = await hypePool.connect(depositorOne).activatePool(POOL_ZERO);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(POOL_ZERO, depositorOne.address);
  });

  it("Depositor one creates pool 1", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_ONE);
    const details = {
      projectName: "project name test",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: oneEth,
      tokenAddress: zeroAddress,
      network: 843,
      minReward: ethers.utils.parseEther("0.03"),
      impressionReward: ethers.utils.parseEther("0.05"),
      endDate: SAMPLE_DATE,
    };
    const secondaryCreation = await hypePool
      .connect(depositorOne)
      .createPool("https://pool.data.json", details, rewards);
    expect(secondaryCreation).not.to.be.undefined;
    await expect(secondaryCreation)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(POOL_ONE, depositorOne.address, "https://pool.data.json");
    const afterPoolIndex = await hypePool.getCurrentIndex();
    expect(afterPoolIndex).to.equal(POOL_TWO);
  });

  it("Checks data validations, fails all pool creations", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("Pool index is: ", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
    const details = {
      projectName: "project name test",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: oneEth,
      tokenAddress: zeroAddress,
      network: 843,
      minReward: ethers.utils.parseEther("0.03"),
      impressionReward: ethers.utils.parseEther("0.03"),
      endDate: SAMPLE_DATE,
    };
    await expect(hypePool.connect(depositorOne).createPool("", details, rewards)).to.be.revertedWith(
      "Missing metadata URI"
    );
    console.log("Pool index is: ", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        tokenAddress: zeroAddress,
        network: 843,
        cap: ethers.utils.parseEther("0.0"),
        minReward: ethers.utils.parseEther("0.0"),
        impressionReward: ethers.utils.parseEther("0.0"),
        endDate: SAMPLE_DATE,
      })
    ).to.be.revertedWith("Invalid pool cap");
    console.log("Pool index is: ", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        tokenAddress: zeroAddress,
        network: 843,
        cap: oneEth,
        minReward: ethers.utils.parseEther("0.0"),
        impressionReward: ethers.utils.parseEther("0.1"),
        endDate: SAMPLE_DATE,
      })
    ).to.be.revertedWith("Invalid minimal hype reward");
    console.log("Pool index is: ", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
    console.log("date is", PAST_DATE);
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        minReward: ethers.utils.parseEther("0.03"),
        impressionReward: ethers.utils.parseEther("0.03"),
        endDate: PAST_DATE,
      })
    ).to.be.revertedWith("End date must be after current block time");
    console.log("Pool index is: ", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
  });

  it("DepositorTwo deposits 1 ETH into escrow for pool 1 and emits Deposited event, then withdraws", async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const balanceOfInit = await depositorTwo.getBalance();
    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(depositorTwo.address, POOL_ONE, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorTwo.address, oneEth, POOL_ONE);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);

    const balanceOfAfter = await depositorTwo.getBalance();
    const greaterThan = balanceOfInit.gt(balanceOfAfter);
    expect(greaterThan).to.be.true;
    const depositOf = await dynamicEscrow.depositsOf(depositorTwo.address, POOL_ONE);
    expect(depositOf[0]).to.be.equal(oneEth);
    const withdrawal = await dynamicEscrow.connect(depositorTwo).withdraw(depositorTwo.address, POOL_ONE, oneEth);
    expect(withdrawal).not.to.be.undefined;
    await expect(withdrawal).to.emit(dynamicEscrow, "Withdrawn").withArgs(depositorTwo.address, oneEth, POOL_ONE);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const balanceAfterWithdrawal = await depositorTwo.getBalance();
    const lt = balanceOfAfter.lt(balanceAfterWithdrawal);
    expect(lt).to.be.true;
    const depositOfAfter = await dynamicEscrow.depositsOf(depositorTwo.address, POOL_ONE);
    expect(depositOfAfter[0]).to.be.equal(ethers.utils.parseEther("0"));
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("currentPoolIndex", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
  });

  it("DepositorTwo deposits 1 ETH again into escrow for pool 1 and emits Deposited event, then withdraws in two batches", async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const balanceOfInit = await depositorTwo.getBalance();
    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(depositorTwo.address, POOL_ONE, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorTwo.address, oneEth, POOL_ONE);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);

    const balanceOfAfter = await depositorTwo.getBalance();
    const greaterThan = balanceOfInit.gt(balanceOfAfter);
    expect(greaterThan).to.be.true;
    const depositOf = await dynamicEscrow.depositsOf(depositorTwo.address, POOL_ONE);
    expect(depositOf[0]).to.be.equal(oneEth);
    const withdrawal1 = await dynamicEscrow.connect(depositorTwo).withdraw(depositorTwo.address, POOL_ONE, halfEth);
    expect(withdrawal1).not.to.be.undefined;
    await expect(withdrawal1).to.emit(dynamicEscrow, "Withdrawn").withArgs(depositorTwo.address, halfEth, POOL_ONE);

    const withdrawal2 = await dynamicEscrow.connect(depositorTwo).withdraw(depositorTwo.address, POOL_ONE, halfEth);
    expect(withdrawal2).not.to.be.undefined;
    await expect(withdrawal2).to.emit(dynamicEscrow, "Withdrawn").withArgs(depositorTwo.address, halfEth, POOL_ONE);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const balanceAfterWithdrawal = await depositorTwo.getBalance();
    const lt = balanceOfAfter.lt(balanceAfterWithdrawal);
    expect(lt).to.be.true;
    const depositOfAfter = await dynamicEscrow.depositsOf(depositorTwo.address, POOL_ONE);
    expect(depositOfAfter[0]).to.be.equal(ethers.utils.parseEther("0"));
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("currentPoolIndex", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
  });

  it(`=========================================================
  SCENARIO: ERC20
  ===========================================================
  Owner address deploys a sample ERC20`, async () => {
    const BaseERC20 = await ethers.getContractFactory("HypeToken", {
      signer: owner,
    });

    erc20 = await BaseERC20.deploy(initBalance);
    const result = await erc20.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).not.to.be.undefined;
    const balanceOfOwner = await erc20.balanceOf(owner.address);
    expect(balanceOfOwner.toString()).to.equal(initBalance.toString());
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("currentPoolIndex", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
  });

  it("Owner address deploys a second sample ERC20", async () => {
    const BaseERC20 = await ethers.getContractFactory("HypeToken", {
      signer: owner,
    });

    fakeErc20 = await BaseERC20.deploy(initBalance);
    const result = await erc20.deployed();
    expect(result).not.to.be.undefined;
    expect(result.address).not.to.be.undefined;
    const balanceOfOwner = await erc20.balanceOf(owner.address);
    expect(balanceOfOwner.toString()).to.equal(initBalance.toString());
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("currentPoolIndex", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
  });

  it("Owner address creates Pool 2", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    console.log("currentPoolIndex", currentPoolIndex);
    expect(currentPoolIndex).to.equal(POOL_TWO);
    const details = {
      projectName: "project name test",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: ethers.utils.parseEther("13"),
      tokenAddress: erc20.address,
      network: 843,
      minReward: ethers.utils.parseEther("1"),
      impressionReward: ethers.utils.parseEther("1"),
      endDate: SAMPLE_DATE,
    };
    const createPool = await hypePool.connect(owner).createPool("https://pool.data.json", details, rewards);
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(POOL_TWO, owner.address, "https://pool.data.json");
  });

  it("Owner address deposits 13 fake ERC20 into Escrow Pool 2, checks validity", async () => {
    const allowance = await fakeErc20.approve(dynamicEscrow.address, ethers.utils.parseEther("13"));
    expect(allowance).not.to.be.undefined;
    const allowanceOfContract = await fakeErc20.allowance(owner.address, dynamicEscrow.address);
    expect(allowanceOfContract).to.be.equal(ethers.utils.parseEther("13"));
    const balanceOfOwnerBefore = await fakeErc20.balanceOf(owner.address);
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(owner.address, POOL_TWO, ethers.utils.parseEther("13"), fakeErc20.address);
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("13"), POOL_TWO);
    const balanceOfOwner = await fakeErc20.balanceOf(owner.address);
    expect(ethers.utils.parseEther("13")).to.be.equal(balanceOfOwnerBefore.sub(balanceOfOwner));
    const deposits = await dynamicEscrow.depositsOf(owner.address, POOL_TWO);
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(POOL_TWO);
    expect(tokenAddress).to.be.equal(fakeErc20.address);
  });

  it("Owner tries to activate pool 2 with the fake ERC20 payment, gets reverted", async () => {
    expect(hypePool.connect(owner).activatePool(POOL_TWO)).to.be.revertedWith(
      "Deposited token address does not match pool token address"
    );
  });

  it("Owner address deposits 13 ERC20 into Escrow Pool 2, checks validity", async () => {
    const allowance = await erc20.approve(dynamicEscrow.address, ethers.utils.parseEther("13"));
    expect(allowance).not.to.be.undefined;
    const allowanceOfContract = await erc20.allowance(owner.address, dynamicEscrow.address);
    expect(allowanceOfContract).to.be.equal(ethers.utils.parseEther("13"));
    const balanceOfOwnerBefore = await erc20.balanceOf(owner.address);
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(owner.address, POOL_TWO, ethers.utils.parseEther("13"), erc20.address);
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("13"), POOL_TWO);
    const balanceOfOwner = await erc20.balanceOf(owner.address);
    expect(ethers.utils.parseEther("13")).to.be.equal(balanceOfOwnerBefore.sub(balanceOfOwner));
    const deposits = await dynamicEscrow.depositsOf(owner.address, POOL_TWO);
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(POOL_TWO);
    expect(tokenAddress).to.be.equal(erc20.address);
  });

  it("Owner tries to activate pool 2 with the right ERC20 payment, succeeds", async () => {
    const activation = await hypePool.connect(owner).activatePool(POOL_TWO);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(POOL_TWO, owner.address);
  });

  it("depositorTwo gets 3 ERC20 token worth of rewards, checks onlyRewarder modifier", async () => {
    const rewarderCall = await dynamicEscrow
      .connect(rewarder)
      .accrueRewardFor(depositorTwo.address, POOL_TWO, threeEth);
    expect(rewarderCall).not.to.be.undefined;
    await expect(rewarderCall)
      .to.emit(dynamicEscrow, "RewardCredited")
      .withArgs(depositorTwo.address, threeEth, POOL_TWO);
    const accruedForDepTwo = await dynamicEscrow.accruedRewardsOf(depositorTwo.address, POOL_TWO);
    expect(accruedForDepTwo).to.be.equal(threeEth);

    await expect(
      dynamicEscrow.connect(depositorTwo).accrueRewardFor(depositorTwo.address, POOL_TWO, threeEth)
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
      .withArgs(depositorTwo.address, threeEth, POOL_TWO);
    const balanceAfter = await erc20.balanceOf(depositorTwo.address);
    expect(balanceAfter).to.be.equal(threeEth);
    await expect(
      dynamicEscrow.connect(depositorOne).redeemRewards(depositorOne.address, erc20.address, POOL_TWO)
    ).to.be.revertedWith("Not enough accrued rewards");
  });

  it(`================================================================
  SCENARIO: Multiple pools for the same token and depositor
  ================================================================
  Depositor One Creates Pool 3 with the defined amount`, async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_THREE);
    const details = {
      projectName: "project name test",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: oneEth,
      tokenAddress: zeroAddress,
      network: 843,
      minReward: ethers.utils.parseEther("0.03"),
      impressionReward: ethers.utils.parseEther("0.05"),
      endDate: SAMPLE_DATE,
    };
    const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(POOL_THREE, depositorOne.address, "https://pool.data.json");
  });

  it(`Then DepositorOne deposits 1 ETH into escrow for pool 3 and emits Deposited event`, async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const deposit = await dynamicEscrow
      .connect(depositorOne)
      .deposit(depositorOne.address, POOL_THREE, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorOne.address, oneEth, POOL_THREE);
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);
  });

  it("Finally, depositor one activates pool 3", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(POOL_FOUR);
    const activation = await hypePool.connect(depositorOne).activatePool(POOL_THREE);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(POOL_THREE, depositorOne.address);
  });

  it("Tests data retrieval from depositor one's POW", async () => {
    const getPoolOne = await hypePool.connect(depositorOne).getPool(POOL_ONE);
    expect(getPoolOne).not.to.be.undefined;
    expect(getPoolOne.id).to.equal(POOL_ONE);
    expect(getPoolOne.creator).to.equal(depositorOne.address);
    expect(getPoolOne.rewards.tokenAddress).to.equal(zeroAddress);

    const getPoolUri = await hypePool.connect(depositorOne).poolURI(POOL_ONE);
    expect(getPoolUri).to.equal("https://pool.data.json");
  });
  it("Tests data retrieval from depositor two's POW", async () => {
    const getPoolOne = await hypePool.connect(depositorTwo).getPool(POOL_ONE);
    expect(getPoolOne).not.to.be.undefined;
    expect(getPoolOne.id).to.equal(POOL_ONE);
    expect(getPoolOne.creator).to.equal(depositorOne.address);
    expect(getPoolOne.rewards.tokenAddress).to.equal(zeroAddress);

    const getPoolUri = await hypePool.connect(depositorTwo).poolURI(POOL_ONE);
    expect(getPoolUri).to.equal("https://pool.data.json");
  });

  it(`The owner pauses the pool contract, all state modifiers should revert`, async () => {
    const pause = await hypePool.connect(owner).pause();
    await expect(pause).to.emit(hypePool, "Paused").withArgs(owner.address);

    it("Pool creation should revert", async () => {
      const currentPoolIndex = await hypePool.getCurrentIndex();
      expect(currentPoolIndex).to.equal(BigNumber.from("4"));
      const details = {
        projectName: "project name test",
        title: "title",
        tokenName: "TARA",
        word: "testnet",
      };
      const rewards = {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        minReward: ethers.utils.parseEther("0.03"),
        impressionReward: ethers.utils.parseEther("0.05"),
        endDate: SAMPLE_DATE,
      };
      const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
      await expect(createPool).to.be.revertedWith("Pausable: paused");
      const activation = await hypePool.connect(depositorOne).activatePool(BigNumber.from("4"));
      expect(activation).to.be.revertedWith("Pausable: paused");
    });
  });

  it("Non-owner address tries to unpause then pause, fails", async () => {
    const unpause = hypePool.connect(depositorOne).unpause();
    await expect(unpause).to.be.revertedWith("Ownable: caller is not the owner");
    const pause = hypePool.connect(depositorOne).pause();
    await expect(pause).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it(`The owner resumes the pool contract, all state modifiers should apply as before`, async () => {
    const pause = await hypePool.connect(owner).unpause();
    await expect(pause).to.emit(hypePool, "Unpaused").withArgs(owner.address);

    it("Pool creation should revert", async () => {
      const currentPoolIndex = await hypePool.getCurrentIndex();
      expect(currentPoolIndex).to.equal(BigNumber.from("4"));
      const details = {
        projectName: "project name test",
        title: "title",
        tokenName: "TARA",
        word: "testnet",
      };
      const rewards = {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        minReward: ethers.utils.parseEther("0.03"),
        impressionReward: ethers.utils.parseEther("0.05"),
        endDate: SAMPLE_DATE,
      };
      expect(hypePool.connect(depositorOne).createPool("", details, rewards)).to.be.revertedWith(
        "Missing metadata URI"
      );
      const activation = await hypePool.connect(depositorOne).activatePool(BigNumber.from("1"));
      expect(activation).to.be.revertedWith("Pool is already active");
    });
  });
});
