const CarBlocks = artifacts.require("CarBlocks");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for CarBlocks smart contract", (accounts) => {
  const admin = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmeCgSRsv1J1KDTz6gctSXc2Y8jwqkGqvqGfp9Tja8WpNX/multipla.json";
  let cb;

  function buildCarblocks() {
    return CarBlocks.new({from: admin});
  }

  async function mintCB(to) {
    return await cb.mintCarblock(
      to,
      1670177418,
      "1234",
      "Fiat",
      "Multipla",
      tokenURI,
      0,
      {from: to}
    );
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
      expect(await cb.name.call()).to.be.equal("Carblocks");
    });
  });

  describe("Test of NFT minting", () => {
    let tokenID = 0;
    beforeEach(async () => {
      cb = await buildCarblocks();
      // .call will instantly return the tokenID but will not save anything in BCK
      // for that, we need to call mintCarblock directly. So we need to "execute" it twice
      tokenID = await cb.mintCarblock.call(
        user1,
        1670177418,
        "1234",
        "Fiat",
        "Multipla",
        tokenURI,
        0,
        {from: user1}
      );
      await mintCB(user1);
    });

    it("should have a balance of 1", async () => {
      let balance = await cb.balanceOf(user1);
      expect(balance).to.be.bignumber.equal(BN(1));
    });

    it("should have an owner with address : " + user1, async () => {
      //console.log("tokenID : ", tokenID.toString());
      let ownerAddress = await cb.ownerOf(tokenID);
      expect(ownerAddress).to.equal(user1);
    });

    it("should have this tokenURI : " + tokenURI, async () => {
      expect(await cb.tokenURI(tokenID)).to.equal(tokenURI);
    });

    it("should emit Transfer event", async () => {
      const eventEmitted = await mintCB(user1);
      await expectEvent(eventEmitted, "Transfer", {
        from: "0x0000000000000000000000000000000000000000",
        to: user1,
        tokenId: BN(2),
      });
    });
  });

  describe("Test of carblock access functions", () => {
    beforeEach(async () => {
      cb = await buildCarblocks();
      await mintCB(user1);
      await mintCB(user1);
      await mintCB(user1);
      await mintCB(user2);
    });

    it("should get an array of 3 carblocks", async () => {
      let carblocks = await cb.getCarblocks(user1);
      expect(carblocks.length.toString()).to.be.bignumber.equal(BN(3));
    });

    it("should get one carblock corresponding to a Fiat", async () => {
      let carblock = await cb.getCarblock(1);
      console.log(carblock);
      expect(carblock.car.brand).to.equal("Fiat");
    });
  });

  describe.only("Test of maintenances access functions", () => {
    before(async () => {
      cb = await buildCarblocks();
      await mintCB(user1);
      await mintCB(user1);
      await mintCB(user1);
    });

    it("should add a new maintenance for user with tokenId : 1", async () => {
      await cb.addMaintenance(1, 1670177428, 0, 10000, "ipfs://billUrl", {
        from: user1,
      });
      let maintenance = await cb.getMaintenances(1, {from: user1});
      expect(maintenance.length.toString()).to.be.bignumber.equal(BN(1));
    });

    it("should get a maintenances for 10000 kilometers", async () => {
      let maintenances = await cb.getMaintenances(1, {from: user1});
      console.log(maintenances);
      expect(maintenances[0].kilometers.toString()).to.be.bignumber.equal(
        BN(10000)
      );
    });
  });
});
