

require("@nomiclabs/hardhat-waffle");



module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet:{
      url: "https://eth-rinkeby.alchemyapi.io/v2/snWMPrXOI9OkgqFdoxs9ode9oE6MdHaL",
      accounts: ['c3f7590157bb813780fed994ecac9408927e0ee9d14b75760ba7b79400e1a936']
    }
  }
};
