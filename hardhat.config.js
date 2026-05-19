require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/your-api-key",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
