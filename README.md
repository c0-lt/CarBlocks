# 🚗 CarBlocks DApp 🚗

## Welcome to the home of the now famous Carblocks DApp !

<em>This decentralized application leverages the power of the Ethereum blockchain technology and IPFS to bring back trust and traceability into the automotive ecosystem.</em>

## Details

This DApp is an attempt to build an application that implements both an NFT Marketplace, and a social network.

- **Marketplace** : users can convert their car into an NFT so that they can keep track of all the maintenance operations and upload important assets regarding those operations, such as bills and reports. This is also the place where they will be able to sell their car, hence their NFT. If they choose to do so, they will receive offers directly from other users, and transfer the NFT if they accept one of them.
  The `CarBlocksFactory.sol` as its name suggests, allows us to deploy multiple instance of `CarBlocks.sol`, and decline NFT Collection upon the type of energy (gasoline, diesel, hybrid...)
- **Social Network** : users can browse through the various car cards, in order to consult opinions of the community about specific car. To add a new opinion, the user must own an NFT with the same brand & model. If a user makes an offer, he will be able to chat directly to the NFT owner. Unfortunately, this last chat feature has not been implemented on the frontend side of the DApp, but unit tests for message management in `SocialNetwork.sol` are working.

## Demo - Video

TODO

## Setup

```sh
# Compile and deploy truffle on Ganache (make sure it is running before)
$ cd truffle
$ npm install
$ truffle migrate --reset
```

```sh
#  Starting the development server
$ cd client
$ npm start

```

## Tech - Unit tests

```sh
# To launch unit tests
$ cd truffle
$ truffle test

```

### Unit tests trace

    Contract: Test cases for CarBlocks smart contract
      Test of the deployment phase
        ✓ should have an address (1ms)
        ✓ should have a symbol (17ms)
        ✓ should have a name (19ms)
      Test of NFT minting
        ✓ should have a balance of 1 (31ms)
        ✓ should have an owner with address : 0x83cC5196531f0C4b7c7e8e56f8Db9197180D3310 (32ms)
        ✓ should have this tokenURI : https://gateway.pinata.cloud/ipfs/QmeCgSRsv1J1KDTz6gctSXc2Y8jwqkGqvqGfp9Tja8WpNX/multipla.json (32ms)
        ✓ Should emit Transfer event (205ms, 299621 gas)
      Test of carblock access functions
        ✓ should get an array of 3 carblocks (53ms)
        ✓ should get one carblock corresponding to a Fiat (30ms)
        ✓ should check if user has a specific car (brand + model) (149ms)
      Test of maintenances access functions
        ✓ should add a new maintenance for user with tokenId : 1 (144ms, 112840 gas)
        ✓ should emit MaintenanceAdded event when new maintenance is added (118ms, 97840 gas)
        ✓ should get a maintenances for 10000 kilometers (21ms)
      Test of NFT transfer
        ✓ should transfer a token from user 1 to user 2  (335ms, 181197 gas)
      Test of NFT marketplace
        ✓ should get a list of 3 NFT for sale (41ms)
        ✓ should set a price of 10000 for a NFT (110ms, 48483 gas)
      Test of offers management
        ✓ should make an offer (231ms, 105532 gas)
        ✓ should not make an offer if recipient is not owner (340ms)
        ✓ should reject an offer (498ms, 242409 gas)
        ✓ should check if offer has been made (97ms, 105532 gas)
        ✓ should accept an offer (280ms, 176063 gas)
        ✓ should get an offer (466ms, 105532 gas)

    Contract: Test cases for CarBlocksFactory smart contract
      Test of the deployment phase of factory
        ✓ should have an address (0ms)
        ✓ should deploy a new CarBlocks contract with symbol CBK and energyType Hybrid (367ms, 3074480 gas)

    Contract: Test cases for SocialNetwork smart contract
      Test of the deployment phase
        ✓ should have an address (0ms)
      Test of message management
        ✓ should send a message (108ms, 106544 gas)
        ✓ should retrieve a chat between 2 users (242ms, 198281 gas)
      Test of card creation
        ✓ should create a card (823ms, 891509 gas)
       28 passing (28s)

### Eth Gas Report

    ·--------------------------------------------------|---------------------------|-------------|----------------------------·
    |       Solc version: 0.8.17+commit.8df45f5f       ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 6718946 gas  │
    ···················································|···························|·············|·····························
    |  Methods                                         ·               13 gwei/gas               ·      1194.72 eur/eth       │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  Contract          ·  Method                     ·  Min        ·  Max        ·  Avg        ·  # calls     ·  eur (avg)  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  acceptOffer                ·          -  ·          -  ·      70531  ·           2  ·       1.10  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  addMaintenance             ·      97840  ·     112840  ·     105340  ·           4  ·       1.64  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  makeOffer                  ·          -  ·          -  ·     105532  ·           8  ·       1.64  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  mintCarblock               ·     299621  ·     374685  ·     333020  ·          40  ·       5.17  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  rejectOffer                ·          -  ·          -  ·      31345  ·           2  ·       0.49  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  setPrice                   ·          -  ·          -  ·      48483  ·           2  ·       0.75  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocks         ·  transferCarblockNFT        ·      76078  ·     105119  ·      90599  ·           2  ·       1.41  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  CarBlocksFactory  ·  createCarblocksCollection  ·          -  ·          -  ·    3074480  ·           1  ·      47.75  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  SocialNetwork     ·  createCard                 ·          -  ·          -  ·     193065  ·           1  ·       3.00  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  SocialNetwork     ·  createOpinion              ·     341018  ·     357426  ·     349222  ·           2  ·       5.42  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  SocialNetwork     ·  sendMessage                ·      91737  ·     106544  ·     100621  ·           5  ·       1.56  │
    ·····················|·····························|·············|·············|·············|··············|··············
    |  Deployments                                     ·                                         ·  % of limit  ·             │
    ···················································|·············|·············|·············|··············|··············
    |  CarBlocks                                       ·          -  ·          -  ·    4040956  ·      60.1 %  ·      62.76  │
    ···················································|·············|·············|·············|··············|··············
    |  CarBlocksFactory                                ·          -  ·          -  ·    4339591  ·      64.6 %  ·      67.40  │
    ···················································|·············|·············|·············|··············|··············
    |  SocialNetwork                                   ·          -  ·          -  ·    1289294  ·      19.2 %  ·      20.02  │
    ·--------------------------------------------------|-------------|-------------|-------------|--------------|-------------·

## Tech - Fixtures import

```sh
truffle migrate --f 5
truffle exec scripts/import_fixtures.js
```

## Tech - Security

### Mythril report

```sh
  $ myth analyze contracts/CarBlocks.sol -t 3 --execution-timeout 60
  > The analysis was completed successfully. No issues were detected.
  $ myth analyze contracts/CarBlocksFactory.sol -t 3 --execution-timeout 60
  > The analysis was completed successfully. No issues were detected.
  $ myth analyze contracts/SocialNetwork.sol -t 3 --execution-timeout 60
  > The analysis was completed successfully. No issues were detected.
```

### Slither report

Unfortunately, unable to make it work. Some cryptic issue with solc.
