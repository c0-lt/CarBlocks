const CarBlocksFactory = artifacts.require("CarBlocksFactory");

module.exports = async function (deployer) {
  await deployer.deploy(CarBlocksFactory, {overwrite: true});
  const instance = await CarBlocksFactory.deployed();
  console.log("Factory address : ", instance.address);

  await instance.createCarblocksCollection("Diesel");
  await instance.createCarblocksCollection("Essence");

  const addrCollection = await instance.getCarblocksCollection();

  let collection = {
    Diesel: addrCollection[0],
    Essence: addrCollection[1],
  };
  console.log(collection);
};
