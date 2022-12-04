const CarBlocks = artifacts.require("CarBlocks");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for CarBlocks smart contract", (accounts) => {
  const admin = accounts[0];

  function buildCarblocks() {
    return CarBlocks.new({from: admin});
  }

  describe("Test of the deployment phase", () => {
    beforeEach(async () => {
      cb = await buildCarblocks();
    });

    it("should have an address", async () => {
      expect(cb.address).to.be.not.null;
    });

    it("should have a symbol", async () => {
      expect(await cb.symbol.call()).to.be.equal("CBK");
    });

    it("should have a name", async () => {
      expect(await cb.name.call()).to.be.equal("Carblock");
    });
  });

  /*it("should read newly written values", async () => {
    /*const simpleStorageInstance = await SimpleStorage.deployed();
    var value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 0, "0 wasn't the initial value");
  });*/
});
