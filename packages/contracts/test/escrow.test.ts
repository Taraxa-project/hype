import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import * as ethUtil from "ethereumjs-util";
import * as abi from "ethereumjs-abi";
import { DynamicEscrow, HypePool, HypeToken } from "../typechain";
import * as dotenv from "dotenv";

dotenv.config();

describe("DynamicEscrow", function () {
  let dynamicEscrow: DynamicEscrow;
  let hypePool: HypePool;
  let initialAddress: string;
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  let rewarder: SignerWithAddress;
  let depositorOne: SignerWithAddress;
  let depositorTwo: SignerWithAddress;
  let trustedWallet: SignerWithAddress;
  let owner: SignerWithAddress;
  let erc20: HypeToken;
  let fakeErc20: HypeToken;
  let depositorOnePoolId: string;
  let ownerPoolId: string;

  const ZERO_TIMESTAMP = 0;
  const ZERO_DURATION = 0;
  const TEN_DAYS_TIMESTAMP = 10 * 24 * 60 * 60;
  const NON_ZERO_TIMESTAMP = new Date().getTime();

  const halfEth = ethers.utils.parseEther("0.5");
  const oneEth = ethers.utils.parseEther("1");
  const twoEth = ethers.utils.parseEther("2");
  const onePointEightEth = twoEth.sub(ethers.utils.parseEther("0.2"));
  const initBalance = ethers.utils.parseEther("10000");

  this.beforeAll(
    `=========================================
  SCENARIO: GENESIS
  Should deploy all the contracts
  =============================================`,
    async () => {
      console.log("Owner address deploys a sample ERC20");
      const [signer, depositor1, depositor2, dep3, trustedAddress] = await ethers.getSigners();
      depositorOne = depositor1;
      depositorTwo = depositor2;
      rewarder = dep3;
      owner = signer;

      console.log(`Owner address is : ${signer.address}`);
      console.log(`Depositor one address is : ${depositor1.address}`);
      console.log(`Depositor two address is : ${depositor2.address}`);
      console.log(`Rewarder address is : ${rewarder.address}`);

      const BaseERC20 = await ethers.getContractFactory("HypeToken", {
        signer: owner,
      });

      erc20 = await BaseERC20.deploy(initBalance);
      const result = await erc20.deployed();
      expect(result).not.to.be.undefined;
      expect(result.address).not.to.be.undefined;
      const balanceOfOwner = await erc20.balanceOf(owner.address);
      expect(balanceOfOwner.toString()).to.equal(initBalance.toString());

      console.log("Owner address deploys a second sample ERC20");

      fakeErc20 = await BaseERC20.deploy(initBalance);
      const res = await erc20.deployed();
      expect(res).not.to.be.undefined;
      expect(res.address).not.to.be.undefined;
      const balanceOfOwner2 = await erc20.balanceOf(owner.address);
      expect(balanceOfOwner2.toString()).to.equal(initBalance.toString());

      console.log("Owner address deploys the dynamicEscrow and the hypePool contracts");

      const DynamicEscrow = await ethers.getContractFactory("DynamicEscrow", {
        signer: owner,
      });
      trustedWallet = trustedAddress;
      console.log("new wallet address is: ", trustedWallet.address);
      console.log("owner address is: ", owner.address);

      dynamicEscrow = await DynamicEscrow.connect(owner).deploy(rewarder.address, trustedWallet.address);
      const escrowDeployed = await dynamicEscrow.deployed();

      initialAddress = dynamicEscrow.address;
      console.log("DynamicEscrow deployed to: ", initialAddress);
      expect(escrowDeployed).not.to.be.undefined;
      expect(escrowDeployed.address).to.be.equal(initialAddress);

      console.log("the contract owner should be the owner signer's address");
      const cOwner = await dynamicEscrow.owner();
      expect(cOwner).to.equal(owner.address);

      console.log("The rewarder address should be the provided account");
      const rewarderFromContract = await dynamicEscrow.getRewarder();
      expect(rewarderFromContract).to.equal(rewarder.address);

      console.log("The trusted address should be the provided account");
      const trustedAccountFromContract = await dynamicEscrow.getTrustedAccount();
      expect(trustedAccountFromContract).to.equal(trustedWallet.address);

      console.log("Deploys the HypePool contract too");
      const HypePool = await ethers.getContractFactory("HypePool", {
        signer: owner,
      });
      hypePool = await HypePool.deploy(dynamicEscrow.address);
      const poolDeployed = await hypePool.deployed();
      expect(poolDeployed).not.to.be.undefined;
      expect(poolDeployed.address).to.be.equal(hypePool.address);
    }
  );

  it(`
  ===============================================
  SCENARIO: Basic creation and validations
  ===========================================
  Depositor One Creates Pool 0 with the defined amount`, async () => {
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
      impressionReward: ethers.utils.parseEther("0.05"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(currentPoolIndex, depositorOne.address, "https://pool.data.json");
    const afterPoolIndex = await hypePool.getCurrentIndex();
    expect(afterPoolIndex).to.equal(currentPoolIndex);
  });

  it(`Then DepositorOne deposits 1 ETH into escrow for pool 0 and emits Deposited event`, async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(0);

    const currentPoolIndex = await hypePool.getCurrentIndex();
    const deposit = await dynamicEscrow
      .connect(depositorOne)
      .deposit(depositorOne.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorOne.address, oneEth, currentPoolIndex);
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const deposits = await dynamicEscrow.connect(depositorOne).depositsOf(depositorOne.address, currentPoolIndex);
    expect(deposits[0]).to.be.equal(oneEth);
  });

  it(`Then DepositorOne tries to deposit 1 ETH into escrow for pool 0 again and fails`, async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const deposits = await dynamicEscrow.connect(depositorOne).depositsOf(depositorOne.address, currentPoolIndex);
    expect(deposits[0]).to.be.equal(oneEth);
    const deposit = dynamicEscrow
      .connect(depositorOne)
      .deposit(depositorOne.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.be.revertedWith("A deposit was already made for this pool");
  });

  it("Finally, depositor one activates pool 0", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const activation = await hypePool.connect(depositorOne).activatePool(currentPoolIndex);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(currentPoolIndex, depositorOne.address);
  });

  it("Depositor one creates pool 1", async () => {
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
      impressionReward: ethers.utils.parseEther("0.05"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    const secondaryCreation = await hypePool
      .connect(depositorOne)
      .createPool("https://pool.data.json", details, rewards);
    expect(secondaryCreation).not.to.be.undefined;
    const currentPoolIndex = await hypePool.getCurrentIndex();
    await expect(secondaryCreation)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(currentPoolIndex, depositorOne.address, "https://pool.data.json");
    const afterPoolIndex = await hypePool.getCurrentIndex();
    expect(afterPoolIndex).to.equal(currentPoolIndex);
  });

  it("Checks data validations, fails all pool creations", async () => {
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
      impressionReward: ethers.utils.parseEther("0.03"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    await expect(hypePool.connect(depositorOne).createPool("", details, rewards)).to.be.revertedWith(
      "Missing metadata URI"
    );
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        tokenAddress: zeroAddress,
        network: 843,
        cap: ethers.utils.parseEther("0.0"),
        impressionReward: ethers.utils.parseEther("0.0"),
        startDate: ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: ZERO_TIMESTAMP,
      })
    ).to.be.revertedWith("Invalid pool cap");
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        tokenAddress: zeroAddress,
        network: 843,
        cap: oneEth,
        impressionReward: ethers.utils.parseEther("0.0"),
        startDate: ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: ZERO_TIMESTAMP,
      })
    ).to.be.revertedWith("Invalid impression hype reward");
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        impressionReward: ethers.utils.parseEther("0.03"),
        startDate: NON_ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: ZERO_TIMESTAMP,
      })
    ).to.be.revertedWith("Start date must be zero");
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        impressionReward: ethers.utils.parseEther("0.03"),
        startDate: ZERO_TIMESTAMP,
        duration: ZERO_DURATION,
        endDate: ZERO_TIMESTAMP,
      })
    ).to.be.revertedWith("Duration must be at least one day");
    await expect(
      hypePool.connect(depositorOne).createPool("as", details, {
        cap: oneEth,
        tokenAddress: zeroAddress,
        network: 843,
        impressionReward: ethers.utils.parseEther("0.03"),
        startDate: ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: NON_ZERO_TIMESTAMP,
      })
    ).to.be.revertedWith("End date must be zero");
  });

  it("DepositorTwo deposits 1 ETH into escrow for pool 1 and emits Deposited event, then withdraws", async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);
    const currentPoolIndex = await hypePool.getCurrentIndex();

    const balanceOfInit = await depositorTwo.getBalance();
    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(depositorTwo.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorTwo.address, oneEth, currentPoolIndex);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);

    const balanceOfAfter = await depositorTwo.getBalance();
    const greaterThan = balanceOfInit.gt(balanceOfAfter);
    expect(greaterThan).to.be.true;
    const depositOf = await dynamicEscrow.depositsOf(depositorTwo.address, currentPoolIndex);
    expect(depositOf[0]).to.be.equal(oneEth);

    const withdrawal = await dynamicEscrow
      .connect(depositorTwo)
      .withdraw(depositorTwo.address, currentPoolIndex, oneEth);
    expect(withdrawal).not.to.be.undefined;
    await expect(withdrawal)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(depositorTwo.address, oneEth, currentPoolIndex);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const balanceAfterWithdrawal = await depositorTwo.getBalance();
    const lt = balanceOfAfter.lt(balanceAfterWithdrawal);
    expect(lt).to.be.true;
    const depositOfAfter = await dynamicEscrow.depositsOf(depositorTwo.address, currentPoolIndex);
    expect(depositOfAfter[0]).to.be.equal(ethers.utils.parseEther("0"));
    const newPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(newPoolIndex);
  });

  it("DepositorTwo deposits 1 ETH again into escrow for pool 1 and emits Deposited event, then withdraws in two batches", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);
    const balanceOfInit = await depositorTwo.getBalance();
    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(depositorTwo.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorTwo.address, oneEth, currentPoolIndex);

    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);

    const balanceOfAfter = await depositorTwo.getBalance();
    const greaterThan = balanceOfInit.gt(balanceOfAfter);
    expect(greaterThan).to.be.true;
    const depositOf = await dynamicEscrow.depositsOf(depositorTwo.address, currentPoolIndex);
    expect(depositOf[0]).to.be.equal(oneEth);
    const withdrawal1 = await dynamicEscrow
      .connect(depositorTwo)
      .withdraw(depositorTwo.address, currentPoolIndex, halfEth);
    expect(withdrawal1).not.to.be.undefined;
    await expect(withdrawal1)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(depositorTwo.address, halfEth, currentPoolIndex);

    const withdrawal2 = await dynamicEscrow
      .connect(depositorTwo)
      .withdraw(depositorTwo.address, currentPoolIndex, halfEth);
    expect(withdrawal2).not.to.be.undefined;
    await expect(withdrawal2)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(depositorTwo.address, halfEth, currentPoolIndex);
    console.log("deposit for dep2 is: ", await dynamicEscrow.provider.getBalance(dynamicEscrow.address));
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(ethers.utils.parseEther("1"));

    const balanceAfterWithdrawal = await depositorTwo.getBalance();
    const lt = balanceOfAfter.lt(balanceAfterWithdrawal);
    expect(lt).to.be.true;
    const depositOfAfter = await dynamicEscrow.depositsOf(depositorTwo.address, currentPoolIndex);
    console.log("deposit for dep2 is: ", depositOfAfter[0]);
    expect(depositOfAfter[0]).to.be.equal(ethers.utils.parseEther("0"));
    const newPoolIndex = await hypePool.getCurrentIndex();
    expect(currentPoolIndex).to.equal(newPoolIndex);
  });

  it("DepositorTwo deposits 1 ETH again into escrow for pool 1 and fails", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(oneEth);

    const deposit = await dynamicEscrow
      .connect(depositorTwo)
      .deposit(depositorTwo.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorTwo.address, oneEth, currentPoolIndex);
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(twoEth);
  });

  it("DepositorTwo activates the pool", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const activation = hypePool.connect(depositorTwo).activatePool(currentPoolIndex);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(currentPoolIndex, depositorTwo.address);
  });

  it("DepositorTwo generates a signature for a claim of 0.1 ETH for an address, depositor one claims, emits Claimed event", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const value = BigNumber.from("100000000000000000");
    const nonce = (await ethers.provider.getTransactionCount(depositorTwo.address)) + 1;
    const addr = depositorTwo.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_5}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const claiming = await dynamicEscrow
      .connect(depositorTwo)
      .claim(depositorTwo.address, currentPoolIndex, value, zeroAddress, nonce, hash);
    await expect(claiming).to.emit(dynamicEscrow, "Claimed").withArgs(depositorTwo.address, value, currentPoolIndex);
  });

  it("DepositorTwo generates a signature for a claim of 0.1 ETH for an address different than his, depositor one claims, emits Claimed event", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const value = BigNumber.from("100000000000000000");
    const nonce = (await ethers.provider.getTransactionCount(depositorTwo.address)) + 1;
    const addr = rewarder.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_5}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const claiming = await dynamicEscrow
      .connect(depositorOne)
      .claim(addr, currentPoolIndex, value, zeroAddress, nonce, hash);
    await expect(claiming).to.emit(dynamicEscrow, "Claimed").withArgs(addr, value, currentPoolIndex);
  });

  it("DepositorTwo generates an invalid signature for a claim of 1 ERC20 for an address, despitor one claim fails", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const value = ethers.utils.parseEther("1");
    const nonce = (await ethers.provider.getTransactionCount(depositorOne.address)) + 1;
    const addr = depositorOne.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_1}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const claiming = dynamicEscrow
      .connect(depositorOne)
      .claim(depositorOne.address, currentPoolIndex, value, zeroAddress, nonce, hash);
    await expect(claiming).to.be.revertedWith("Claim: Invalid signature");
  });

  it(`=========================================================
  SCENARIO: ERC20
  ===========================================================
  Owner address creates Pool 2`, async () => {
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
      impressionReward: ethers.utils.parseEther("1"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    const createPool = await hypePool.connect(owner).createPool("https://pool.data.json", details, rewards);
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(currentPoolIndex, owner.address, "https://pool.data.json");
  });

  it("Owner address deposits 13 fake ERC20 into Escrow Pool 2, checks validity", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const allowance = await fakeErc20.approve(dynamicEscrow.address, ethers.utils.parseEther("13"));
    expect(allowance).not.to.be.undefined;
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(owner.address, currentPoolIndex, ethers.utils.parseEther("13"), fakeErc20.address);
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("13"), currentPoolIndex);
    const deposits = await dynamicEscrow.depositsOf(owner.address, currentPoolIndex);
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(currentPoolIndex);
    expect(tokenAddress).to.be.equal(fakeErc20.address);
  });

  it("Owner tries to activate pool 2 with the fake ERC20 payment, gets reverted", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    expect(hypePool.connect(owner).activatePool(currentPoolIndex)).to.be.revertedWith(
      "Deposited token address does not match pool token address"
    );
  });

  it("Owner withdraws the tokens as he cannot activate the pool", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const depositIs = await dynamicEscrow.depositsOf(owner.address, currentPoolIndex);
    const { weiAmount, poolId, tokenAddress } = depositIs;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(currentPoolIndex);
    expect(tokenAddress).to.be.equal(fakeErc20.address);

    const withdrawal2 = dynamicEscrow
      .connect(owner)
      .withdraw(owner.address, currentPoolIndex, ethers.utils.parseEther("13"));
    expect(withdrawal2).not.to.be.undefined;
    await expect(withdrawal2)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(owner.address, ethers.utils.parseEther("13"), currentPoolIndex);
  });

  it("Owner address deposits 13 ERC20 into Escrow Pool 2, checks validity", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const allowance = await erc20.approve(dynamicEscrow.address, ethers.utils.parseEther("13"));
    expect(allowance).not.to.be.undefined;
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(owner.address, currentPoolIndex, ethers.utils.parseEther("13"), erc20.address);
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("13"), currentPoolIndex);
    const deposits = await dynamicEscrow.depositsOf(owner.address, currentPoolIndex);
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(currentPoolIndex);
    expect(tokenAddress).to.be.equal(erc20.address);
  });

  it("Owner tries to activate pool 2 with the right ERC20 payment, succeeds", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const activation = await hypePool.connect(owner).activatePool(currentPoolIndex);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(currentPoolIndex, owner.address);
  });

  it("Owner withdraws the funds from pool2, Withdrawn event is emitted", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const tokensOfOwnerBefore = await erc20.balanceOf(owner.address);
    const withdrawal = await dynamicEscrow
      .connect(owner)
      .withdraw(owner.address, currentPoolIndex, ethers.utils.parseEther("13"));
    await expect(withdrawal)
      .to.emit(dynamicEscrow, "Withdrawn")
      .withArgs(owner.address, ethers.utils.parseEther("13"), currentPoolIndex);
    const tokensOfOwnerAfter = await erc20.balanceOf(owner.address);
    const diff = tokensOfOwnerAfter.sub(tokensOfOwnerBefore);
    expect(diff).to.be.equal(ethers.utils.parseEther("13"));
  });

  it("Deactivates the pool, emits PoolDeactivated event", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const poolBefore = await hypePool.getPool(currentPoolIndex);
    expect(poolBefore.active).to.be.true;
    const deactivation = await hypePool.connect(owner).deactivatePool(currentPoolIndex);
    await expect(deactivation).to.emit(hypePool, "PoolDeactivated").withArgs(currentPoolIndex, owner.address);
  });

  it(`================================================================
  SCENARIO: Multiple pools for the same token and depositor
  ================================================================
  Depositor One Creates Pool 3 with the defined amount`, async () => {
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
      impressionReward: ethers.utils.parseEther("0.05"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
    expect(createPool).not.to.be.undefined;
    const currentPoolIndex = await hypePool.getCurrentIndex();
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(currentPoolIndex, depositorOne.address, "https://pool.data.json");
  });

  it(`Then DepositorOne deposits 1 ETH into escrow for pool 3 and emits Deposited event`, async () => {
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(onePointEightEth);
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const deposit = await dynamicEscrow
      .connect(depositorOne)
      .deposit(depositorOne.address, currentPoolIndex, oneEth, zeroAddress, {
        value: oneEth,
      });
    expect(deposit).not.to.be.undefined;
    await expect(deposit).to.emit(dynamicEscrow, "Deposited").withArgs(depositorOne.address, oneEth, currentPoolIndex);
    expect(await dynamicEscrow.provider.getBalance(dynamicEscrow.address)).to.equal(onePointEightEth.add(oneEth));
  });

  it("Finally, depositor one activates pool 3", async () => {
    const currentPoolIndex = await hypePool.getCurrentIndex();
    const activation = await hypePool.connect(depositorOne).activatePool(currentPoolIndex);
    depositorOnePoolId = currentPoolIndex;
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(currentPoolIndex, depositorOne.address);
  });

  it("Tests data retrieval from depositor one's POW", async () => {
    const getPoolOne = await hypePool.connect(depositorOne).getPool(depositorOnePoolId);
    expect(getPoolOne).not.to.be.undefined;
    expect(getPoolOne.id).to.equal(depositorOnePoolId);
    expect(getPoolOne.creator).to.equal(depositorOne.address);
    expect(getPoolOne.rewards.tokenAddress).to.equal(zeroAddress);

    const getPoolUri = await hypePool.connect(depositorOne).poolURI(depositorOnePoolId);
    expect(getPoolUri).to.equal("https://pool.data.json");
  });

  it("Tests data retrieval from depositor two's POW", async () => {
    const getPoolOne = await hypePool.connect(depositorTwo).getPool(depositorOnePoolId);
    expect(getPoolOne).not.to.be.undefined;
    expect(getPoolOne.id).to.equal(depositorOnePoolId);
    expect(getPoolOne.creator).to.equal(depositorOne.address);
    expect(getPoolOne.rewards.tokenAddress).to.equal(zeroAddress);

    const getPoolUri = await hypePool.connect(depositorTwo).poolURI(depositorOnePoolId);
    expect(getPoolUri).to.equal("https://pool.data.json");
  });

  it(`The owner pauses the pool contract, all state modifiers should revert`, async () => {
    const pause = await hypePool.connect(owner).pause();
    await expect(pause).to.emit(hypePool, "Paused").withArgs(owner.address);

    it("Pool creation should revert", async () => {
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
        impressionReward: ethers.utils.parseEther("0.05"),
        startDate: ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: ZERO_TIMESTAMP,
      };
      const createPool = await hypePool.connect(depositorOne).createPool("https://pool.data.json", details, rewards);
      const currentPoolIndex = await hypePool.getCurrentIndex();
      await expect(createPool).to.be.revertedWith("Pausable: paused");
      const activation = await hypePool.connect(depositorOne).activatePool(currentPoolIndex);
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
        impressionReward: ethers.utils.parseEther("0.05"),
        startDate: ZERO_TIMESTAMP,
        duration: TEN_DAYS_TIMESTAMP,
        endDate: ZERO_TIMESTAMP,
      };
      expect(hypePool.connect(depositorOne).createPool("", details, rewards)).to.be.revertedWith(
        "Missing metadata URI"
      );
      const activation = await hypePool.connect(depositorOne).activatePool(depositorOnePoolId);
      expect(activation).to.be.revertedWith("Pool is already active");
    });
  });

  it(`=========================================================
  SCENARIO: ERC20 claims
  ===========================================================
  Owner address creates Pool 4`, async () => {
    const details = {
      projectName: "project name test claim",
      title: "title",
      tokenName: "TARA",
      word: "testnet",
    };
    const rewards = {
      cap: ethers.utils.parseEther("13"),
      tokenAddress: erc20.address,
      network: 843,
      impressionReward: ethers.utils.parseEther("1"),
      startDate: ZERO_TIMESTAMP,
      duration: TEN_DAYS_TIMESTAMP,
      endDate: ZERO_TIMESTAMP,
    };
    const createPool = await hypePool.connect(owner).createPool("https://pool.data.json", details, rewards);
    const currentPoolIndex = await hypePool.getCurrentIndex();
    ownerPoolId = currentPoolIndex;
    expect(createPool).not.to.be.undefined;
    await expect(createPool)
      .to.emit(hypePool, "PoolCreated")
      .withArgs(currentPoolIndex, owner.address, "https://pool.data.json");
  });

  it("Owner address deposits 13 ERC20 into Escrow Pool 2, checks validity", async () => {
    const allowance = await erc20.approve(dynamicEscrow.address, ethers.utils.parseEther("13"));
    expect(allowance).not.to.be.undefined;
    const allowanceOfContract = await erc20.allowance(owner.address, dynamicEscrow.address);
    expect(allowanceOfContract).to.be.equal(ethers.utils.parseEther("13"));
    const deposit = await dynamicEscrow
      .connect(owner)
      .deposit(owner.address, ownerPoolId, ethers.utils.parseEther("13"), erc20.address);
    expect(deposit).not.to.be.undefined;
    await expect(deposit)
      .to.emit(dynamicEscrow, "Deposited")
      .withArgs(owner.address, ethers.utils.parseEther("13"), ownerPoolId);
    const deposits = await dynamicEscrow.depositsOf(owner.address, ownerPoolId);
    const { weiAmount, poolId, tokenAddress } = deposits;
    expect(weiAmount).to.be.equal(ethers.utils.parseEther("13"));
    expect(poolId).to.be.equal(ownerPoolId);
    expect(tokenAddress).to.be.equal(erc20.address);
  });

  it("Owner tries to activate pool 2 with the right ERC20 payment, succeeds", async () => {
    const activation = await hypePool.connect(owner).activatePool(ownerPoolId);
    expect(activation).not.to.be.undefined;
    await expect(activation).to.emit(hypePool, "PoolActivated").withArgs(ownerPoolId, owner.address);
  });

  it("Owner generates a signature for a claim of 1 ERC20 for an address, depositor one claims, emits Claimed event", async () => {
    const value = oneEth;
    const nonce = (await ethers.provider.getTransactionCount(depositorOne.address)) + 1;
    const addr = depositorOne.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_5}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const balanceBefore = await erc20.balanceOf(depositorOne.address);

    const claiming = await dynamicEscrow
      .connect(depositorOne)
      .claim(depositorOne.address, ownerPoolId, value, erc20.address, nonce, hash);
    await expect(claiming).to.emit(dynamicEscrow, "Claimed").withArgs(depositorOne.address, value, ownerPoolId);

    const balanceAfter = await erc20.balanceOf(depositorOne.address);
    expect(balanceAfter.sub(balanceBefore)).eq(oneEth);
  });

  it("Owner generates a signature for a claim of 1 ERC20 for an address different than his, depositor one claims, emits Claimed event", async () => {
    const value = ethers.utils.parseEther("1");
    const nonce = (await ethers.provider.getTransactionCount(depositorOne.address)) + 1;
    const addr = depositorTwo.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_5}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const balanceBefore = await erc20.balanceOf(depositorTwo.address);
    const claiming = await dynamicEscrow
      .connect(depositorOne)
      .claim(depositorTwo.address, ownerPoolId, value, erc20.address, nonce, hash);
    await expect(claiming).to.emit(dynamicEscrow, "Claimed").withArgs(depositorTwo.address, value, ownerPoolId);
    const balanceAfter = await erc20.balanceOf(depositorTwo.address);
    expect(balanceAfter.sub(balanceBefore)).eq(oneEth);
  });

  it("Owner generates an invalid signature for a claim of 1 ERC20 for an address, despitor one claim fails", async () => {
    const value = ethers.utils.parseEther("1");
    const nonce = (await ethers.provider.getTransactionCount(depositorOne.address)) + 1;
    const addr = depositorOne.address;

    const encodedPayload = abi.soliditySHA3(["address", "uint", "uint"], [addr, value.toString(), nonce]);

    const { v, r, s } = ethUtil.ecsign(encodedPayload, Buffer.from(`${process.env.TEST_KEY_1}`, "hex"));
    const hash = ethUtil.toRpcSig(v, r, s);

    const balanceBefore = await erc20.balanceOf(depositorOne.address);

    const claiming = dynamicEscrow
      .connect(depositorOne)
      .claim(depositorOne.address, ownerPoolId, value, erc20.address, nonce, hash);
    await expect(claiming).to.be.revertedWith("Claim: Invalid signature");

    const balanceAfter = await erc20.balanceOf(depositorOne.address);
    expect(balanceAfter.sub(balanceBefore)).eq(BigNumber.from("0"));
  });
});
