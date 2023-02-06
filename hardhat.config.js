require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ethers = require("ethers");
const credentials = require("./credentials.js");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.18",
  networks: {
    local: {
      url: `http://127.0.0.1:8545/`,
      accounts: [credentials.privateKey],
    },
    goerli: {
        url: `https://eth-goerli.alchemyapi.io/v2/${credentials.alchemy}`,
        accounts: [credentials.privateKey],
      },
    fork: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${credentials.alchemy}`,
        accounts: [credentials.privateKey],
    },
    },
  etherscan: {
    apiKey: credentials.etherscan,
  },
};
