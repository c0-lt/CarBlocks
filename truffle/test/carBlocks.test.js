const CarBlocks = artifacts.require("CarBlocks");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for CarBlocks smart contract", (accounts) => {
  const admin = accounts[0];
  const user1 = accounts[1];
  const energyType = "Hybrid";
  const tokenURI =
    "https://gateway.pinata.cloud/ipfs/QmeCgSRsv1J1KDTz6gctSXc2Y8jwqkGqvqGfp9Tja8WpNX/multipla.json";

  function buildCarblocks() {
    return CarBlocks.new(energyType, {from: admin});
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
      // .call will instantely return the tokenID but will not save anything in bck
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
      await cb.mintCarblock(
        user1,
        1670177418,
        "1234",
        "Fiat",
        "Multipla",
        tokenURI,
        0,
        {from: user1}
      );
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
      const eventEmitted = await cb.mintCarblock(
        user1,
        1670177418,
        "1234",
        "Fiat",
        "Multipla",
        tokenURI,
        0,
        {from: user1}
      );
      await expectEvent(eventEmitted, "Transfer", {
        from: "0x0000000000000000000000000000000000000000",
        to: user1,
        tokenId: BN(2),
      });
    });
  });
});
