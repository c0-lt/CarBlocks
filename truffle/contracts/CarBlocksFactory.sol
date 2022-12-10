// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./CarBlocks.sol";

/// @title The CarBlocksFactory Smart Contract
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing to create & manage Carblocks NFT collections
/// @dev Stay away from this or you're facing sleep deprivation
//TODO : nat spec
contract CarBlocksFactory {
    CarBlocks[] private _carblocksCollection;

    event CarblocksCollectionCreated(
        address contractAddress,
        string energyType
    );

    function createCarblocksCollection(string calldata _energyType) external {
        CarBlocks carblocks = new CarBlocks(_energyType);
        _carblocksCollection.push(carblocks);

        emit CarblocksCollectionCreated(address(carblocks), _energyType);
    }

    function getCarblocksCollection()
        external
        view
        returns (CarBlocks[] memory)
    {
        return _carblocksCollection;
    }
}
