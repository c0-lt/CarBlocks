const CarBlocksFactory = artifacts.require("CarBlocksFactory");

module.exports = function (deployer) {
  deployer.deploy(CarBlocksFactory);
};
