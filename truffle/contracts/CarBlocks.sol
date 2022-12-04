// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

/// @title The CarBlocks Smart Contract
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing to manage NFT associated with cars
/// @dev Stay away from this or you're facing sleep deprivation
contract CarBlocks is ERC721URIStorage {
    using Counters for Counters.Counter;

    /// @notice counter to increment id of carblock NFT
    Counters.Counter private _tokenIds;

    /// @notice Defines the various states a car can be in
    enum CarState {
        circulation,
        accident,
        scrapped
    }

    /// @notice Defines the various maintenance types that can occur
    enum MaintenanceType {
        revision,
        technicalControl,
        partsChange,
        tireChange
    }

    /// @notice Holds constant information about a Car
    struct Car {
        uint256 circulationStartDate;
        string VIN;
        string brand;
        string model;
    }

    /// @notice Holds information linked to a maintenance operation
    struct Maintenance {
        uint256 date;
        MaintenanceType mtype;
        string billsUri;
    }

    /// @notice Defines the carblock NFT structure
    struct Carblock {
        CarState carState;
        Car car;
        // Maintenance[] maintenances; // QCO: this does not work, we need to using mapping instead
        mapping(uint256 => Maintenance) maintenances;
        uint256 maintenancesNumber;
    }

    Carblock[] carblocksNFT;

    constructor() ERC721("Carblock", "CBK") {}

    //TODO : onlyOwner ?
    //TODO : check memory vs calldata
    function mintCarblock(
        address _user,
        uint256 _circulationStartDate,
        string calldata _VIN,
        string calldata _brand,
        string calldata _model,
        string calldata _tokenURI,
        CarState _state
    ) external {
        _tokenIds.increment(); // Increment NFT ID (starts at 0)
        Car memory car = Car(_circulationStartDate, _VIN, _brand, _model);
        Carblock storage carblockNFT = carblocksNFT.push();
        carblockNFT.carState = _state;
        carblockNFT.car = car;
        carblockNFT.maintenancesNumber = 0;

        uint256 newTokenId = _tokenIds.current();
        _safeMint(_user, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
    }

    function test() public pure returns (uint256) {
        return 42;
    }
}
