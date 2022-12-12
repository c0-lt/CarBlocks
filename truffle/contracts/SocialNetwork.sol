// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/// @title The SocialNetwork Smart Contract for CarBlocks
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing users to interact with each others
/// @dev Stay away from this or you're facing sleep deprivation
contract SocialNetwork {
    struct Message {
        uint256 timestamp;
        address author;
        string content;
    }

    struct Opinion {
        uint256 date;
        string comment;
        string pros;
        string cons;
        uint256[] notes; /* order: [safety, budget, comfort, driving, equipment, finition, reliability, ecology] */
    }

    struct Card {
        uint256 cardId;
        string brand;
        string model;
        string photoURI;
    }
    ///@notice store all the car cards appearing social tab
    Card[] private _cards;

    ///@notice store all the car opinions : cardId => Opinion[]
    mapping(uint256 => Opinion[]) private _opinions;

    ///@notice store a list of messages from a hash(tokenId, _from, _to)
    mapping(bytes32 => Message[]) private _allMessages;

    /// @notice To save car cards in social part of our DApp
    /// @dev We use this function to import fixtures with import_fixtures.js
    /// @param _cardId internal card ID
    /// @param _brand brand of car
    /// @param _model model of car
    /// @param _photoURI photo of car on IPFS
    function createCard(
        uint256 _cardId,
        string calldata _brand,
        string calldata _model,
        string calldata _photoURI
    ) external {
        _cards.push(Card(_cardId, _brand, _model, _photoURI));
    }

    /// @notice Return all cards
    /// @return cards
    function getCards() external view returns (Card[] memory) {
        return _cards;
    }

    /// @notice To save car opinions in social part of our DApp
    /// @dev We use this function to import fixtures with import_fixtures.js
    /// @param _cardId internal card ID
    /// @param _comment general comment about car
    /// @param _pros advantages
    /// @param _pros disadvantages
    /// @param _notes array of 8 notes
    function createOpinion(
        uint256 _cardId,
        string calldata _comment,
        string calldata _pros,
        string calldata _cons,
        uint256[] calldata _notes
    ) external {
        _opinions[_cardId].push(
            Opinion(block.timestamp, _comment, _pros, _cons, _notes)
        );
    }

    ///@notice Retrieve all opinions regarding a specific car card
    ///@param _cardId the card ID of the car
    ///@return array of Opinion
    function getOpinions(uint256 _cardId)
        external
        view
        returns (Opinion[] memory)
    {
        return _opinions[_cardId];
    }

    /// @notice Send a message to a user regarding a specific NFT
    /// @dev store message in _allMessages with a hash
    /// @param _tokenId NFT token ID
    /// @param _to address of chat recipient
    /// @param _content address of chat recipient
    function sendMessage(
        uint256 _tokenId,
        address _to,
        string calldata _content
    ) external {
        _allMessages[_getChatId(_tokenId, msg.sender, _to)].push(
            Message(block.timestamp, msg.sender, _content)
        );
    }

    /// @notice Retrieve a conversation (chat) between 2 users on a specific NFT
    /// @dev Get an array of message between msg.sender and _to on tokenId
    /// @param _tokenId NFT token ID
    /// @param _to address of chat recipient
    /// @return messages array of Message
    function getChat(uint256 _tokenId, address _to)
        external
        view
        returns (Message[] memory)
    {
        return _allMessages[_getChatId(_tokenId, msg.sender, _to)];
    }

    /// @notice Generate a unique id for a message between 2 users and a specific NFT
    /// @dev Concatenate the three param, always in the same order and hash them
    /// @param _tokenId NFT token ID
    /// @param _to address of msg recipient
    /// @param _from address of msg sender
    /// @return hash of three parameters
    function _getChatId(
        uint256 _tokenId,
        address _from,
        address _to
    ) private pure returns (bytes32) {
        if (_from < _to)
            return keccak256(abi.encodePacked(_tokenId, _from, _to));
        else return keccak256(abi.encodePacked(_tokenId, _to, _from));
    }
}
