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

  describe("Test of card creation", () => {
    beforeEach(async () => {
      sn = await buildSocialNetwork();
    });

    it("should create a card", async () => {
      let car = {
        cardId: 4,
        brand: "Renault",
        model: "Clio",
        photoURI:
          "https://gateway.pinata.cloud/ipfs/QmeqGMaY9FQc2h5R6oQkjSKSY9sMS7jq1xRHCxpY7wzcTG",
        opinions: [
          {
            comment:
              "Voiture très modulaire et adaptée aux familles nombreuses",
            pros: "Spacieuse | modulaire",
            cons: "Manque un peu de puissance",
            safety: 4,
            budget: 5,
            comfort: 4,
            driving: 4,
            equipment: 4,
            finition: 3.5,
            reliability: 4.5,
            ecology: 3,
          },
          {
            comment: "Une jolie petite voiture, mais inconfortable",
            pros: "Design | Fiabilité",
            cons: "Inconfort des sièges",
            safety: 3.5,
            budget: 4,
            comfort: 2,
            driving: 4,
            equipment: 3.5,
            finition: 4,
            reliability: 4,
            ecology: 3,
          },
        ],
      };
      await sn.createCard(car.cardId, car.brand, car.model, car.photoURI);
      for (let i = 0; i < car.opinions.length; i++) {
        const op = car.opinions[i];

        let test = [
          op.safety * 10,
          op.budget * 10,
          op.comfort * 10,
          op.driving * 10,
          op.equipment * 10,
          op.finition * 10,
          op.reliability * 10,
          op.ecology * 10,
        ];
        await sn.createOpinion(car.cardId, op.comment, op.pros, op.cons, test);
      }
      let opi = await sn.opinions.call(4, 0);
      expect(await opi.pros).to.be.equal("Spacieuse | modulaire");
      let cards = await sn.getCards();
      expect(cards.length.toString()).to.be.bignumber.equal(BN(1));
      //TODO: QCO je ne trouve pas les notes dans opi...
    });
  });
});
