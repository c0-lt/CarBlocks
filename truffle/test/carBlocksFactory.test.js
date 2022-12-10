const CarBlocksFactory = artifacts.require("CarBlocksFactory");
const CarBlocks = artifacts.require("CarBlocks");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for CarBlocksFactory smart contract", (accounts) => {
  const admin = accounts[0];
  const user1 = accounts[1];

  function buildCarblocksFactory() {
    return CarBlocksFactory.new({from: admin});
  }

  describe("Test of the deployment phase of factory", () => {
    beforeEach(async () => {
      cbf = await buildCarblocksFactory();
    });

    it("should have an address", async () => {
      expect(cbf.address).to.be.not.null;
    });

    it("should deploy a new CarBlocks contract with symbol CBK and energyType Hybrid", async () => {
      await cbf.createCarblocksCollection("Hybrid");
      const addr = await cbf.getCarblocksCollection();
      console.log("Deployed contract address : ", addr);
      const collection = await CarBlocks.at(addr[0]);
      expect(await collection.symbol.call()).to.be.equal("CBK");
      expect(await collection.energyType.call()).to.be.equal("Hybrid");
    });
  });
});
