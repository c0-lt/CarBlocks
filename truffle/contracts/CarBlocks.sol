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

    /// @notice this will differentiate the various collections (gasoline, diesel, hybrid...)
    string public energyType;

    /// @notice forcing the name and symbol for our Carblock token
    string constant _name = "CarBlock";
    string constant _symbol = "CBK";

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
        uint256 kilometers;
        MaintenanceType mType;
        string maintenanceURI;
    }

    /// @notice Defines the carblock NFT structure
    struct Carblock {
        CarState carState;
        Car car;
        uint256 price;
        bool isForSale;
    }

    ///@notice Defines a way to store offers made by users
    struct Offer {
        uint256 price;
        address user;
    }

    /// @notice Make sure contract caller is owner of _tokenId
    modifier isNFTOwner(uint256 _tokenId) {
        require(msg.sender == ownerOf(_tokenId), "Err: not the owner of token");
        _;
    }

    /// @notice This array holds all the minted NFTs
    Carblock[] private carblocksNFT;

    //TODO : qui peut appeler _users ?
    mapping(address => uint256[]) private _users; // address => [tokenID]
    mapping(uint256 => Maintenance[]) private _allMaintenances; // tokenID => [Maintenance1, Maintenance2]
    mapping(uint256 => Offer[]) private _allOffers; // tokenId => [{price, user}]

    constructor(string memory _energyType) ERC721(_name, _symbol) {
        energyType = _energyType;
    }

    /// @notice Retrieve NFT from token ID
    /// @dev Get the Carblock struct with the NFT token ID
    /// @param _tokenId NFT token ID
    /// @return Carblock
    function getCarblock(uint256 _tokenId)
        external
        view
        isNFTOwner(_tokenId)
        returns (Carblock memory)
    {
        return carblocksNFT[_tokenId - 1];
    }

    //TODO: accessible only to NFT owner ?
    /// @notice Retrieve all NFTs of contract caller
    /// @dev Get an array of Carblock struct with the NFT token ID
    /// @return carblocks an array of carblock NFT
    function getCarblocks() external view returns (Carblock[] memory) {
        Carblock[] memory carblocks = new Carblock[](_users[msg.sender].length);

        for (uint256 i = 0; i < _users[msg.sender].length; i++) {
            carblocks[i] = carblocksNFT[_users[msg.sender][i] - 1];
        }
        return carblocks;
    }

    /// @notice Retrieve all NFTs that are for sale
    /// @dev The returned array of Carblock might not be completely full
    /// @return Carblock[] the list of carblocks NFT
    function getCarblocksForSale() external view returns (Carblock[] memory) {
        Carblock[] memory carblocksForSale = new Carblock[](
            carblocksNFT.length
        );
        uint256 counter;
        for (uint256 i = 0; i < carblocksNFT.length; i++) {
            if (carblocksNFT[i].isForSale == true) {
                carblocksForSale[counter] = carblocksNFT[i];
                counter++;
            }
        }
        return carblocksForSale;
    }

    /// @notice Allow NFT Owner to set a price for his car
    /// @dev _
    /// @param _tokenId NFT token ID
    /// @param _price expected price
    function setPrice(uint256 _tokenId, uint256 _price)
        external
        isNFTOwner(_tokenId)
    {
        carblocksNFT[_tokenId - 1].price = _price;
        carblocksNFT[_tokenId - 1].isForSale = true;
    }

    /// @notice Add a new maintenance to a specific NFT
    /// @dev After the maintenance file has been upload to IPFS call this method to update maintenanceURI
    /// @param _tokenId NFT token ID
    /// @param _date Date of maintenance
    /// @param _mType Type of maintenance (enum)
    /// @param _kilometers Total distance of the car at time of maintenance
    /// @param _maintenanceURI URI of maintenance JSON file on IPFS
    function addMaintenance(
        uint256 _tokenId,
        uint256 _date,
        MaintenanceType _mType,
        uint256 _kilometers,
        string calldata _maintenanceURI
    ) external isNFTOwner(_tokenId) {
        _allMaintenances[_tokenId].push(
            Maintenance(_date, _kilometers, _mType, _maintenanceURI)
        );
    }

    /// @notice Get list of all maintenances done on a car from a NFT token ID
    /// @dev Return an array of Maintenance struct
    /// @param _tokenId NFT token ID
    /// @return Maintenance[]
    function getMaintenances(uint256 _tokenId)
        external
        view
        isNFTOwner(_tokenId)
        returns (Maintenance[] memory)
    {
        return _allMaintenances[_tokenId];
    }

    //TODO : check memory vs calldata
    //TODO : payable
    /// @notice Allow user to mint a new Carblock NFT
    /// @dev We use _mint instead of _safeMint as we don't need to check if _user is a contract
    /// @param _user address of the future owner of minted NFT
    /// @param _circulationStartDate first circulation date of owner's car
    /// @param _vInfo array with [VIN, brand, model, tokenURI] in this order
    /// @param _state car's state (ENUM)
    /// @param _isForSale wether the car is for sale
    function mintCarblock(
        address _user,
        uint256 _circulationStartDate,
        string[] calldata _vInfo,
        CarState _state,
        bool _isForSale
    ) external returns (uint256) {
        _tokenIds.increment(); // Increment NFT ID (starts at 0)

        carblocksNFT.push(
            Carblock(
                _state,
                Car(_circulationStartDate, _vInfo[0], _vInfo[1], _vInfo[2]),
                0,
                _isForSale
            )
        );

        //uint256 newTokenId = _tokenIds.current();
        _mint(_user, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), _vInfo[3]);
        _users[_user].push(_tokenIds.current());

        return _tokenIds.current();
    }

    /** -- OFFERS MANAGEMENT --*/

    /// @notice Allow user to make an offer for NFT
    /// @dev Limit to 10 offers per NFT
    /// @param _tokenId Token ID of NFT that user wants to purchase
    /// @param _price price offer of user
    function makeOffer(uint256 _tokenId, uint256 _price) external {
        require(_allOffers[_tokenId].length < 10, "Err: 10 offers/NFT max");
        _allOffers[_tokenId].push(Offer(_price, msg.sender));
    }

    /// @notice Allow user to retrieve all offers for a NFT
    /// @dev Limit to 10 offers per NFT
    /// @param _tokenId Token ID of NFT that user wants to purchase
    /// @return allOffers an array of offers
    function getOffers(uint256 _tokenId)
        external
        view
        isNFTOwner(_tokenId)
        returns (Offer[] memory)
    {
        return _allOffers[_tokenId];
    }

    /** - OFFERS MANAGEMENT - */

    //TODO : check visibility
    /// @notice Transfer a NFT when an owner is selling his vehicle to new owner
    /// @dev Uses _transfer to update owner and update the '_users' mapping (don't need _safeTransfer for same reason as _safeMint)
    /// @param _to address of the new NFT owner
    /// @param _tokenId Token ID of NFT to transfer
    function transferCarblockNFT(address _to, uint256 _tokenId) internal {
        _transfer(msg.sender, _to, _tokenId);

        for (uint256 i = 0; i < _users[msg.sender].length; i++) {
            if (_users[msg.sender][i] == _tokenId) {
                // We switch with the last element of array
                _users[msg.sender][i] = _users[msg.sender][
                    _users[msg.sender].length - 1
                ];
                _users[msg.sender].pop();
                break;
            }
        }
        _users[_to].push(_tokenId);
    }
}
