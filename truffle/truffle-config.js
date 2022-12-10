require("dotenv").config();
const mnemonic = process.env["MNEMONIC"];
const infuraProjectId = process.env["INFURA_PROJECT_ID"];

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {phrase: `${process.env.MNEMONIC}`},
          providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_ID}`,
        }),
      network_id: 5, // Goerli's network id
      //from: "0x8273A917a5092683434ef06eBFCb7C8c1Ca9E468", //TODO: QCO we need to update that address when we will deploy on Goerli
      //   chain_id: 5,         // Goerli's chain id
      //   //gas: 5500000,        // Gas limit used for deploys. => LEAVE UNCOMMENTED !
      //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      //gasPrice: 1,
      token: "ETH",
      showTimeSpent: true,
      coinmarketcap: `${process.env.COINMARKETCAP_API_KEY}`,
    },
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          //evmVersion: "byzantium",
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
