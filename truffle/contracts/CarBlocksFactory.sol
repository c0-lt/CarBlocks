// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./CarBlocks.sol";

/// @title The CarBlocksFactory Smart Contract
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing to create & manage Carblocks NFT collections
/// @dev Stay away from this or you're facing sleep deprivation
contract CarBlocksFactory {
    CarBlocks[] public carblocksCollection;

    event CarblocksCollectionCreated(
        address contractAddress,
        string energyType
    );

    function createCarblocksCollection(string calldata _energyType)
        external
        returns (CarBlocks)
    {
        CarBlocks carblocks = new CarBlocks(_energyType);
        carblocksCollection.push(carblocks);

        emit CarblocksCollectionCreated(address(carblocks), _energyType);

        return carblocks;
    }
}
