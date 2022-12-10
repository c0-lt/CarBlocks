// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/// @title The SocialNetwork Smart Contract for CarBlocks
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing users to interact with each others
/// @dev Stay away from this or you're facing sleep deprivation
contract SocialNetwork {
    /*TODO:
- noter un véhicule correspondant à un NFT que l'utilisateur possède (marque+modèle) (les notes sont liés à une fiche)
-- stocker des commentaires
 */
    struct Message {
        uint256 timestamp;
        address author;
        string content;
    }

    ///@notice store a list of messages from a hash(tokenId, _from, _to)
    mapping(bytes32 => Message[]) public _allMessages;

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
    /// @dev Concat the three param, always in the same order and hash them
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

    /*
    mapping(idCard => [Opinions])
    id de card
    string brand
    string model
    string photoURI
    array opinion */
}
