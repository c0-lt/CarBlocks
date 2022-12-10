const SocialNetwork = artifacts.require("SocialNetwork");

module.exports = async function (deployer) {
  await deployer.deploy(SocialNetwork);
};
