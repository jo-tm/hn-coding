const hre = require('hardhat');
const assert = require('chai').assert;

describe('HnVault', () => {
  let vault;
  let rebalancer;

  beforeEach(async function () {
    const contractName = 'HnVault';
    await hre.run("compile");
    const smartContract = await hre.ethers.getContractFactory(contractName);
    vault = await smartContract.deploy();
    await vault.deployed();
    console.log(`${contractName} deployed to: ${vault.address}`);
    const contractName2 = 'Rebalancer';
    const smartContract2 = await hre.ethers.getContractFactory(contractName2);
    rebalancer = await smartContract2.deploy(vault.address);
    await rebalancer.deployed();
    console.log(`${contractName2} deployed to: ${rebalancer.address}`);
  });

  it('Should return the correct version', async () => {
    const version = await vault.version();
    assert.equal(version,1);
  });

  it('Should return zero DAI balance', async () => {
    const daiBalance = await vault.getDaiBalance();
    console.log( daiBalance);
    assert.equal(daiBalance,0);
  }); 

  it('Should Rebalance The Portfolio ', async () => {
    const accounts = await hre.ethers.getSigners();
    const owner = accounts[0];
    console.log('Transfering ETH From Owner Address', owner.address);
    await owner.sendTransaction({
      to: vault.address,
      value: ethers.utils.parseEther('0.01'),
    });
    await vault.wrapETH();
    await vault.updateEthPriceUniswap();
    await rebalancer.rebalance(ethers.utils.parseEther('50.0'));
    const daiBalance = await vault.getDaiBalance();
    console.log('Rebalanced DAI Balance',daiBalance.toString());
    assert.isAbove(daiBalance,0);
  });

});
