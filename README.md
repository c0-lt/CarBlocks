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

## Details

Changes in package.json for "browserslist" see https://stackoverflow.com/a/71037227/1336421


## Tips
- Test with truffle console : mint a new NFT
    ```sh
    $ cd truffle
    $ truffle exec truffle_console_debug.js
    ```