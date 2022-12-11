const CarBlocks = artifacts.require("CarBlocks");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for CarBlocks smart contract", (accounts) => {
  const admin = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];
  const energyType = "Hybrid";
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmeCgSRsv1J1KDTz6gctSXc2Y8jwqkGqvqGfp9Tja8WpNX/multipla.json";

  function buildCarblocks() {
    return CarBlocks.new(energyType, {from: admin});
  }

  async function mintCB(_to, _isForSale) {
    return await cb.mintCarblock(
      _to,
      1670177418,
      ["1234", "Fiat", "Multipla", tokenURI],
      0,
      _isForSale,
      {from: _to}
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
      expect(await cb.name.call()).to.be.equal("CarBlock");
    });
  });

  describe("Test of NFT minting", () => {
    let tokenID = 0;
    beforeEach(async () => {
      cb = await buildCarblocks();
      // .call will instantly return the tokenID but will not save anything in bck
      // for that, we need to call mintCarblock directly. So we need to "execute" it twice
      tokenID = await cb.mintCarblock.call(
        user1,
        1670177418,
        ["1234", "Fiat", "Multipla", tokenURI],
        0,
        false,
        {from: user1}
      );
      await mintCB(user1, false);
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
      expect(await cb.tokenURI(1)).to.equal(tokenURI);
    });

    it("Should emit Transfer event", async () => {
      const eventEmitted = await mintCB(user1, false);
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
      await mintCB(user1, false);
      await mintCB(user1, false);
      await mintCB(user1), false;
      await mintCB(user2), false;
    });

    it("should get an array of 3 carblocks", async () => {
      let carblocks = await cb.getCarblocks({from: user1});
      expect(carblocks.length.toString()).to.be.bignumber.equal(BN(3));
    });

    it("should get one carblock corresponding to a Fiat", async () => {
      let carblock = await cb.getCarblock(1, {from: user1});
      expect(carblock.car.brand).to.equal("Fiat");
    });

    it("should check if user has a specific car (brand + model)", async () => {
      let hasCar = await cb.hasCar("Fiat", "Multipla", {from: user1});
      expect(hasCar).to.be.true;
      hasCar = await cb.hasCar("Fiat", "Punto", {from: user1});
      expect(hasCar).to.be.false;
    });
  });

  describe("Test of maintenances access functions", () => {
    before(async () => {
      cb = await buildCarblocks();
      await mintCB(user1, false);
      await mintCB(user1, false);
      await mintCB(user1), false;
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
      expect(maintenances[0].kilometers.toString()).to.be.bignumber.equal(
        BN(10000)
      );
    });
  });

  describe("Test of NFT transfer", () => {
    before(async () => {
      cb = await buildCarblocks();
      await mintCB(user1, false);
      await mintCB(user1, false);
      await mintCB(user1, false);
    });

    it("should transfer a token from user 1 to user 2 ", async () => {
      expect(await cb.ownerOf(1)).to.equal(user1);
      //console.log("USERS : ", await cb.users(user1, 0));
      //Note : switch transferCarblockNFT to public for this test case
      await cb.transferCarblockNFT(user2, 1, {from: user1});
      await cb.transferCarblockNFT(user2, 2, {from: user1});
      expect(await cb.ownerOf(1)).not.to.equal(user1);
      expect(await cb.ownerOf(1)).to.equal(user2);
    });
  });

  describe("Test of NFT marketplace", () => {
    before(async () => {
      cb = await buildCarblocks();
      await mintCB(user1, true);
      await mintCB(user1, true);
      await mintCB(user1, true);
    });

    it("should get a list of 3 NFT for sale", async () => {
      let sale = await cb.getCarblocksForSale();
      expect(sale.length.toString()).to.be.bignumber.equal(BN(3));
    });

    it("should set a price of 10000 for a NFT", async () => {
      await cb.setPrice(1, 10000, {from: user1});
      let carblock = await cb.getCarblock(1, {from: user1});
      expect(await carblock.price).to.be.bignumber.equal(BN(10000));
    });
  });

  describe("Test of offers management", () => {
    beforeEach(async () => {
      cb = await buildCarblocks();
      await mintCB(user1, true);
      await mintCB(user1, true);
    });

    it("should make an offer", async () => {
      await cb.makeOffer(1, 10, user1, {from: user2});
      let offers = await cb.getOffers(1, {from: user1});
      expect(offers[0].price).to.be.bignumber.equal(BN(10));
      expect(offers[0].user).to.be.equal(user2);
      expect(offers[0].recipient).to.be.equal(user1);
    });

    it("should not make an offer if recipient is not owner", async () => {
      await expectRevert(
        cb.makeOffer(1, 10, accounts[3], {from: user2}),
        "Err: recipient not owner of NFT"
      );
    });

    it("should reject an offer", async () => {
      await cb.makeOffer(1, 10, user1, {from: user2});
      await cb.makeOffer(2, 15, user1, {from: user2});

      await cb.rejectOffer(2, user2, {from: user1});
      let offers = await cb.getOffers(1, {from: user1});
      expect(offers.length.toString()).to.be.bignumber.equal(BN(1));
    });

    it("should check if offer has been made", async () => {
      await cb.makeOffer(1, 10, user1, {from: user2});
      expect(await cb.hasMadeOffer(1, {from: user2})).to.be.true;
    });

    it("should accept an offer", async () => {
      await cb.makeOffer(1, 10, user1, {from: user2});
      await cb.acceptOffer(1, user2, {from: user1});
      expect(await cb.ownerOf(1)).to.equal(user2);
    });

    it("should get an offer", async () => {
      await cb.makeOffer(1, 10, user1, {from: user2});
      expect((await cb.getOffer(1, {from: user2})).user).to.equal(user2);
    });
  });
});
