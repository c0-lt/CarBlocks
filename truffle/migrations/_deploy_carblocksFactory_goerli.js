const CarBlocksFactory = artifacts.require("CarBlocksFactory");

module.exports = async function (deployer) {
  await deployer.deploy(CarBlocksFactory, {overwrite: false});
  const instance = await CarBlocksFactory.deployed();
  console.log("Factory address : ", instance.address);
  let collection = await instance.createCarblocksCollection("Hybrid");
  console.log(collection);
  let sc = await instance.carblocksCollection.call(0);
  console.log("Address of collection Hybrid : ", sc);
};
