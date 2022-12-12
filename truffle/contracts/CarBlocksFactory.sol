// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./CarBlocks.sol";

/// @title The CarBlocksFactory Smart Contract
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing to create & manage Carblocks NFT collections
/// @dev This contract allows to deploy multiple collection of CarBlocks, based on vehicle energy type
contract CarBlocksFactory {
    /// @notice track the adresses of deployed CarBlock instance
    CarBlocks[] private _carblocksCollection;

    event CarblocksCollectionCreated(
        address contractAddress,
        string energyType
    );

    /// @notice Deploy a new collection of CarBlock
    /// @param _energyType define the energy type of vehicle collection
    function createCarblocksCollection(string calldata _energyType) external {
        CarBlocks carblocks = new CarBlocks(_energyType);
        _carblocksCollection.push(carblocks);

        emit CarblocksCollectionCreated(address(carblocks), _energyType);
    }

    /// @notice Get the various collection deployed
    /// @return array of CarBlocks
    function getCarblocksCollection()
        external
        view
        returns (CarBlocks[] memory)
    {
        return _carblocksCollection;
    }
}
