# 🚗 CarBlocks DApp 🚗

## Welcome to the home of the now famous Carblocks DApp !

<em>This decentralized application leverages the power of the Ethereum blockchain technology and IPFS to bring back trust and traceability into the automotive ecosystem.</em>

## Details

This DApp is an attempt to build an application that implements both an NFT Marketplace, and a social network.

- **Marketplace** : users can convert their car into an NFT so that they can keep track of all the maintenance operations and upload important assets regarding those operations, such as bills and reports. This is also the place where they will be able to sell their car, hence their NFT. If they choose to do so, they will receive offers directly from other users, and transfer the NFT if they accept one of them.
- **Social Network** : users can browse through the various car cards, in order to consult opinions of the community about specific car. In order to add a new opinion, the user must own an NFT with the same brand & model. If a user makes an offer, he will be able to chat directly to the NFT owner.

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

### Eth Gas Report

TODO

## Tech - Fixtures import

```sh
truffle migrate --f 5
truffle exec scripts/import_fixtures.js
```

## Tech - Security

### Mythril report

### Slither report

# TODO

- mythril report
