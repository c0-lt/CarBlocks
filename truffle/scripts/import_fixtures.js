const CarBlocks = artifacts.require("../contracts/CarBlocks.sol");

const collection = {
  Diesel: '0x9abE12BE4e1D9b4728215F3889C966f6d29ad021',
  Essence: '0x59C75278605109D965Ac302B877aE28cBe5C27e6'
};

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

module.exports = async function (callback) {
  try {
    let sc = {
      Diesel: await CarBlocks.at(collection.Diesel),
      Essence: await CarBlocks.at(collection.Essence),
    };

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
  callback();
};
