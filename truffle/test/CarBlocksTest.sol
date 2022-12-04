// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../contracts/CarBlocks.sol";
// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

contract CarBlocksTest {
    function testWriteValue() public {
        CarBlocks carBlocks = CarBlocks(DeployedAddresses.CarBlocks());

        Assert.equal(carBlocks.test(), 42, "Contract should have 42 stored");
    }
}
