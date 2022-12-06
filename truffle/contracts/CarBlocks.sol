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
    //TODO : QCO for sale ?

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
        uint256 kilometers;
        MaintenanceType mType;
        string maintenanceURI;
    }

    /// @notice Defines the carblock NFT structure
    struct Carblock {
        CarState carState;
        Car car;
    }
         
    // @notice This array holds all the minted NFTs
    Carblock[] private carblocksNFT;

    //TODO : QCO si on transfert il faut virer le tokenID dans users
    mapping(address =>uint256[]) private users;   
    mapping(uint256 => Maintenance[]) allMaintenances;  // tokenID => [Maintenance1, Maintenance2]  

    constructor() ERC721("Carblocks", "CBK") {}

    
    function getCarblock(uint256 _tokenId)external view returns(Carblock memory) {
        return carblocksNFT[_tokenId];
    }

    function getCarblocks(address _addr)external view returns(Carblock[] memory) {
        Carblock[] memory carblocks = new Carblock[](users[_addr].length);
        
        for(uint256 i =0 ; i< users[_addr].length; i++){
            carblocks[i] = carblocksNFT[users[_addr][i]];
        }
        return carblocks;
    }

    function addMaintenance(uint256 _tokenId, uint _date, MaintenanceType _mType, uint _kilometers, string calldata _maintenanceURI) external {
        require(_msgSender() == ownerOf(_tokenId), "Error : you are not the owner of the car");
        allMaintenances[_tokenId].push(Maintenance(_date, _kilometers, _mType, _maintenanceURI));
    }

    function getMaintenances(uint256 _tokenId) external view returns(Maintenance[] memory){
        require(_msgSender() == ownerOf(_tokenId), "Error : you are not the owner of the car");
        return allMaintenances[_tokenId];
    }

    //TODO : onlyOwner ?
    //TODO : check memory vs calldata
    //TODO : payable
    /// @notice Allow user to mint a new Carblock NFT
    /// @dev
    /// @param _user address of the futur owner of minted NFT
    /// @param _circulationStartDate first circulation date of owner's car
    /// @param _VIN car serial number
    /// @param _brand brand of car
    /// @param _model model of car
    /// @param _tokenURI URI to json stored on IPFS
    /// @param _state car's state (ENUM)
    function mintCarblock(
        address _user,
        uint256 _circulationStartDate,
        string calldata _VIN,
        string calldata _brand,
        string calldata _model,
        string calldata _tokenURI,
        CarState _state
    ) external returns(uint256){
        // Increment NFT ID (starts at 0)
        _tokenIds.increment(); 

        Car memory car = Car(_circulationStartDate, _VIN, _brand, _model);
        carblocksNFT.push(Carblock(_state, car));

        uint256 newTokenId = _tokenIds.current();
        _safeMint(_user, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        users[_user].push(newTokenId);

        return newTokenId;
    }
}
