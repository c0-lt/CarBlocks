# Carblocks DApp

## Installation

```sh
# Compile and deploy truffle on Ganache (make sure it is running before)
$ truffle migrate --reset
```

Start the react dev server.

```sh
#  Starting the development server
$ cd client
$ npm start

```

## Tests

```sh
# To start unit tests
$ cd truffle
$ truffle test

```

## Fixtures import

```sh
truffle migrate --f 3
truffle exec scripts/import_fixtures.js
```

# TODO

- eth-gas-reporter
- mythril report
