const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const contractName = 'HnVault';
  await hre.run("compile");
  const smartContract = await hre.ethers.getContractFactory(contractName);
  const HnVault = await smartContract.deploy();
  await HnVault.deployed();
  console.log(`${contractName} deployed to: ${HnVault.address}`);

  const contractArtifacts = await artifacts.readArtifactSync(contractName);
  fs.writeFileSync('./artifacts/contractArtifacts.json',  JSON.stringify(contractArtifacts, null, 2));

  await hre.run("verify:verify", {
    address: HnVault.address,
    //constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
