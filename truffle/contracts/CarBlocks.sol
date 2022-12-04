// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract CarBlocks is ERC721 {
    using Counters for Counters.Counter;

    constructor() ERC721("Carblocks", "CBK") {}

    function test() public pure returns (uint256) {
        return 42;
    }
}
