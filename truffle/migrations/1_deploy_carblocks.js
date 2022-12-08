const CarBlocks = artifacts.require("CarBlocks");

module.exports = function (deployer) {
  deployer.deploy(CarBlocks, "Hybrid");
};
