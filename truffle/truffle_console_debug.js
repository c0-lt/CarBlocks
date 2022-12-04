const CarBlocks = artifacts.require("./contracts/CarBlocks.sol");
// Mint a new carblock NFT with truffle console
module.exports = async function (callback) {
  let cb = await CarBlocks.deployed();
  try {
    await cb.mintCarblock(
      "0xF40B84F420B19f72eA719298c6595ebea6972e45",
      1670177418,
      "1234",
      "Renault",
      "Multipla",
      "ipfs://blabla",
      0
    );
  } catch (error) {
    console.log(error);
  }
  callback();
};
