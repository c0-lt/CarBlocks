const CarBlocks = artifacts.require("../contracts/CarBlocks.sol");
const CarBlocksFactory = artifacts.require("../contracts/CarBlocksFactory.sol");
const SocialNetwork = artifacts.require("../contracts/SocialNetwork.sol");

var fixtures = [
  {
    to: "0xc72c0D99b3560a1c4020fabBf468abD36389230C",
    start: 1661378400,
    vinfo: [
      "SBM14FCAXNW001906",
      "Mclaren",
      "720S",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/1.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0xc72c0D99b3560a1c4020fabBf468abD36389230C",
    start: 1636585200,
    vinfo: [
      "ADF32FCGXNZ002205",
      "Porsche",
      "911 Carrera",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/2.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0xa444E94964e22390D1E10BcEb155C609ac1eb1D0",
    start: 1639004400,
    vinfo: [
      "ADF32FCGXNZ002203",
      "Porsche",
      "911 Carrera",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/3.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0xB03d44cCEB8c044B25f164CfbFb8CD3352b543e4",
    start: 1516834800,
    vinfo: [
      "ZEF48MDGXMX024501",
      "Kia",
      "Carens",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/4.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Diesel",
  },
  {
    to: "0x8273A917a5092683434ef06eBFCb7C8c1Ca9E468",
    start: 1640991600,
    vinfo: [
      "ZQR58MFBGXMX02445",
      "Fiat",
      "Multipla",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/5.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Diesel",
  },
  {
    to: "0x8273A917a5092683434ef06eBFCb7C8c1Ca9E468",
    start: 1640991600,
    vinfo: [
      "ZAR58MOLGXMX01045",
      "Renault",
      "Avantime",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/6.json",
    ],
    state: 0,
    isForSale: true,
    energy: "Diesel",
  },
  {
    to: "0x073F81b5d21f08492a2ee5a5C3b9ddE97393E0bb",
    start: 178758000,
    vinfo: [
      "LAMB4556652223333",
      "Lamborghini",
      "Miura",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/7.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0x073F81b5d21f08492a2ee5a5C3b9ddE97393E0bb",
    start: 1643670000,
    vinfo: [
      "FER23665663255576",
      "Ferrari ",
      "SF90 Stradale",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/8.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0xc72c0D99b3560a1c4020fabBf468abD36389230C",
    start: 1249164000,
    vinfo: [
      "DODG455575723333",
      "Dodge",
      "Challenger",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/9.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Essence",
  },
  {
    to: "0x097B078C7fB9808563272501B244005C8FF69efE",
    start: 1507586400,
    vinfo: [
      "WVWZZZAAZJD123515",
      "Wolkwagen",
      "Up",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/10.json",
    ],
    state: 0,
    isForSale: false,
    energy: "Diesel",
  },
  {
    to: "0x097B078C7fB9808563272501B244005C8FF69efE",
    start: 1507586400,
    vinfo: [
      "VNKKD3D360A177107",
      "Toyota",
      "Yaris",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/11.json",
    ],
    state: 0,
    isForSale: true,
    energy: "Essence",
  },
  {
    to: "0xa444E94964e22390D1E10BcEb155C609ac1eb1D0",
    start: 1581375600,
    vinfo: [
      "CIFR67KLO98764009",
      "Citroen",
      "C5",
      "https://gateway.pinata.cloud/ipfs/QmZNZkRjH8fBLrYpdbmBzWywpkSnXcwdFLyGK6wkVfFPaX/12.json",
    ],
    state: 0,
    isForSale: true,
    energy: "Diesel",
  },
];

var cards = [
  {
    cardId: 1,
    brand: "Mclaren",
    model: "720S",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmdDdTf4YgDFFsKr6VJGjV8hzcPqBfre7DYNdHDXLm43aG",
    opinions: [
      {
        comment: "Superbe voiture, efficace et sublime",
        pros: "Puissance | Esthétique",
        cons: "Trop belle",
        safety: 3.5,
        budget: 4,
        comfort: 3.5,
        driving: 5,
        equipment: 4,
        finition: 5,
        reliability: 4.5,
        ecology: 2,
      },
      {
        comment: "On se fait peur, elle est pour les riches",
        pros: "Vitesse",
        cons: "Entretien onéreux | Intérieur laid",
        safety: 2,
        budget: 1,
        comfort: 3,
        driving: 4.5,
        equipment: 3,
        finition: 3,
        reliability: 5,
        ecology: 1,
      },
    ],
  },
  {
    cardId: 2,
    brand: "Peugeot",
    model: "3008",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmfFSgwzji5Grkqayop6ysJFJjzFWSzqzZpw7zecMwbqTS",
    opinions: [
      {
        comment: "Une voiture familale fiable.",
        pros: "Fiable | Econome",
        cons: "Design intérieur froid",
        safety: 4,
        budget: 5,
        comfort: 4,
        driving: 4,
        equipment: 3.5,
        finition: 3,
        reliability: 4,
        ecology: 3.5,
      },
    ],
  },
  {
    cardId: 3,
    brand: "Peugeot",
    model: "207",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmSZWTfm7oGj9m5LGTz5bvr5quiBmQ88Ls1HoTm9PzX1kZ",
    opinions: [
      {
        comment: "Très bonne petite voiture",
        pros: "Fiable | Abordable",
        cons: "Design",
        safety: 4,
        budget: 4,
        comfort: 4,
        driving: 4,
        equipment: 4,
        finition: 3,
        reliability: 4,
        ecology: 3,
      },
    ],
  },
  {
    cardId: 4,
    brand: "Renault",
    model: "Clio",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmeqGMaY9FQc2h5R6oQkjSKSY9sMS7jq1xRHCxpY7wzcTG",
    opinions: [
      {
        comment: "Voiture très modulaire et adaptée aux familles nombreuses",
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
  },
  {
    cardId: 5,
    brand: "Renault",
    model: "Megane",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmNsQkghAf7qdvniHaTCHBWrQJdwyWVADg146s6SMv6b3P",
    opinions: [
      {
        comment: "Une très bonne voiture mais le confort à revoir.",
        pros: "Qualité routière | silencieuse",
        cons: "Sièges inconfortables",
        safety: 4,
        budget: 3,
        comfort: 3,
        driving: 5,
        equipment: 4,
        finition: 4,
        reliability: 4,
        ecology: 3,
      },
    ],
  },
  {
    cardId: 6,
    brand: "Renault",
    model: "Avantime",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmNt2zf4YzUm9oMYQoZmSobdpM1C2aRf53epioTj2Rh5bY/avantime.jpeg",
  },
  {
    cardId: 7,
    brand: "Porsche",
    model: "911 Carrera",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmSbjStzPW6PyXbAaxQJwGBEFiyDkbdFx3zp7gs1G4TV2f",
    opinions: [
      {
        comment: "Magnifique voiture, pour les sensations.",
        pros: "Fiabilité | Confort de conduite",
        cons: "Le prix",
        safety: 5,
        budget: 4,
        comfort: 5,
        driving: 5,
        equipment: 4,
        finition: 5,
        reliability: 4,
        ecology: 3.5,
      },
    ],
  },
  {
    cardId: 8,
    brand: "Kia",
    model: "Carens",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/Qmb4bMPqwsuaup6MJctBwQPDKDX1e7ynYV6wup1rxcdynG",
  },
  {
    cardId: 9,
    brand: "Fiat",
    model: "Multipla",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmNt2zf4YzUm9oMYQoZmSobdpM1C2aRf53epioTj2Rh5bY/multipla.jpeg",
  },
  {
    cardId: 10,
    brand: "Fiat",
    model: "Punto",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmTKoTHWLiCcCDy4CBPNmfpJ5oGmaSxJVWLCQFjVbEEYuA",
  },
  {
    cardId: 11,
    brand: "Renault",
    model: "Espace",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmbeAUUpFX5v9bZbzU2Yk32hjLKAm9rZYxdnjxjrFMjuB8",
  },
  {
    cardId: 12,
    brand: "VW",
    model: "Polo",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmfGSRuHsmXt69zM2SDgeRXco2FzccRprVr5Ssu2CREQdf",
  },
  {
    cardId: 13,
    brand: "Nissan",
    model: "Quashqai",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmPSxC2yrQuit43ua5Ym2BrCTQXPcERk2hf4Rt4nNFT9U2",
  },
  {
    cardId: 14,
    brand: "Citroen",
    model: "C3",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmZx8zPn7MYzDeZ2A6BGa8Kb1KcYYpGqupm5rPqk63xCWD",
  },
  {
    cardId: 15,
    brand: "Citroen",
    model: "C5",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/Qmf9pbfTSNk3kvP7gFbHrWTRbFZNwDhbLqEpjvzCmfpKsZ",
  },
  {
    cardId: 16,
    brand: "Toyota",
    model: "Yaris",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmViRRV4aFoXA6dfZiDrK7yFu85FHMsv4NdGFN1eno5ZSi",
  },
  {
    cardId: 17,
    brand: "Fiat",
    model: "500X",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmbRcSWKN5w9aSFzn6KuU3MxBnDELreNUVY7YcKk1h5XeX",
    opinions: [
      {
        comment: "Une voiture agréable mais chère en entretien",
        pros: "Design | moteur dynamique",
        cons: "Consommation | cout d'entretien",
        safety: 4,
        budget: 3,
        comfort: 4,
        driving: 3,
        equipment: 4,
        finition: 4,
        reliability: 3,
        ecology: 3,
      },
    ],
  },
  {
    cardId: 18,
    brand: "VW Golf",
    model: "Variant",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmfGSRuHsmXt69zM2SDgeRXco2FzccRprVr5Ssu2CREQdf",
  },
  {
    cardId: 19,
    brand: "Ford",
    model: "Puma",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmNWrdMyNtRAGqT67pVx3nkrwg6QcMJfiDDUDpQJC7S97q",
  },
  {
    cardId: 20,
    brand: "Ford",
    model: "Fiesta",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmRQhRtBjH1o3CqBFZb29zmU6DQ6z6QuNYThL7A4RK9Cnv",
    opinions: [
      {
        comment: "Excellente citadine",
        pros: "Equipements | Fiabilité",
        cons: "Consommation",
        safety: 4,
        budget: 4,
        comfort: 4,
        driving: 4,
        equipment: 4,
        finition: 3.5,
        reliability: 4,
        ecology: 3.5,
      },
    ],
  },
  {
    cardId: 21,
    brand: "Ford",
    model: "Sedan",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmbS1CacpCX9NLjapQ25AMgWNT2hh3qm7DYUwUhRXUScTa",
  },
  {
    cardId: 22,
    brand: "Honda",
    model: "Civic",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmSXcqyKap2Sqw9F6zBvKCu8VSrPkLqhGQhRqmVuKMP3Br",
  },
  {
    cardId: 23,
    brand: "Mini",
    model: "Countryman",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmcYKkskksBE5MbyYzuFsmp6wnefvs3CfzyFJ4Q9AX7uD6",
  },
  {
    cardId: 24,
    brand: "Audi",
    model: "A3",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmTgLc41JVdFgs9eNEyiCdsnGKWmd8so61EwmjKYRxW9fc",
  },
  {
    cardId: 25,
    brand: "Audi",
    model: "A4",
    photoURI:
      "https://gateway.pinata.cloud/ipfs/QmNhB4DvWA69PBTFxx4Q5LCo8P5E1kV6xk2PZ8cmR17a2T",
  },
];

module.exports = async function (callback) {
  try {
    let cf = await CarBlocksFactory.deployed();
    let collection = await cf.getCarblocksCollection();
    let sc = {
      Diesel: await CarBlocks.at(collection[0]),
      Essence: await CarBlocks.at(collection[1]),
    };

    // Import some cars into the DApp
    for (let i = 0; i < fixtures.length; i++) {
      const c = fixtures[i];
      await sc[c.energy].mintCarblock(
        c.to,
        c.start,
        c.vinfo,
        c.state,
        c.isForSale
      );
      console.log(c);
    }
  } catch (error) {
    console.log(error);
  }

  //Import some cards and opinions
  try {
    let sn = await SocialNetwork.deployed();
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let opinions = card.opinions || [];

      await sn.createCard(card.cardId, card.brand, card.model, card.photoURI);
      console.log("Card created for : ", card.brand, card.model);
      for (let j = 0; j < opinions.length; j++) {
        let op = opinions[j];
        console.log(op);
        await sn.createOpinion(card.cardId, op.comment, op.pros, op.cons, [
          op.safety * 10,
          op.budget * 10,
          op.comfort * 10,
          op.driving * 10,
          op.equipment * 10,
          op.finition * 10,
          op.reliability * 10,
          op.ecology * 10,
        ]);
      }
    }
  } catch (error) {
    console.error(error);
  }

  callback();
};
