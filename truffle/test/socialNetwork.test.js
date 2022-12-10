const SocialNetwork = artifacts.require("SocialNetwork");
const {BN, expectRevert, expectEvent} = require("@openzeppelin/test-helpers");
const {expect} = require("chai");

contract("Test cases for SocialNetwork smart contract", (accounts) => {
  const admin = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  function buildSocialNetwork() {
    return SocialNetwork.new({from: admin});
  }

  describe("Test of the deployment phase", () => {
    beforeEach(async () => {
      sn = await buildSocialNetwork();
    });

    it("should have an address", async () => {
      expect(sn.address).to.be.not.null;
    });
  });

  describe("Test of message management", () => {
    beforeEach(async () => {
      sn = await buildSocialNetwork();
    });

    it("should send a message", async () => {
      await sn.sendMessage(1, user2, "hello world", {
        from: user1,
      });

      let chat = await sn.getChat(1, user2, {from: user1});
      expect(chat[0].content).to.equal("hello world");
    });

    it("should retrieve a chat between 2 users", async () => {
      await sn.sendMessage(1, user2, "hello world", {
        from: user1,
      });
      await sn.sendMessage(1, user1, "hello handsome", {
        from: user2,
      });

      let chat = await sn.getChat(1, user2, {from: user1});
      expect(chat[0].content).to.equal("hello world");
      expect(chat[1].content).to.equal("hello handsome");
    });
  });
});
