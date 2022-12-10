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
});
