// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/// @title The SocialNetwork Smart Contract for CarBlocks
/// @author Quentin COLLETTE & Maxime LESBROS
/// @notice Smart Contract allowing users to interact with each others
/// @dev Stay away from this or you're facing sleep deprivation
contract SocialNetwork {
    /*TODO:
- stocker les utilisateurs
- poster un commentaire sur une fiche véhicule (les commentaires sont liés à une fiche)
- noter un véhicule correspondant à un NFT que l'utilisateur possède (marque+modèle) (les notes sont liés à une fiche)
-- stocker des commentaires
- envoyer un message à un utilisateur (messages lié à une offre)
- envoyer une offre à un utilisateur (liée à un NFT en vente)

 */

    struct Message {
        uint256 timestamp;
        address author;
        string content;
    }

    /* uint256 price, address user, uint256 tokenId
  à partir du tokenId, je dois récupérer le price et le user
  tokenId peut avoir plusieurs offres
  tokenId => [{price, user}]
  - Faire une offre : pousser dans le tableau une nouvelle offre. Vérifier qu'une offre n'est pas déjà existante
  - Refuser une offre : supprimer l'offre dans le tableau
  - Accepter l'offre : transférer le token et remettre un tableau vide dans le mapping pour le tokenId
   */
    struct Offer {
        uint256 price;
        address user;
    }
    mapping(uint256 => Offer[]) private _allOffers; // tokenId => [{price, user}]

    function makeOffer(uint256 _tokenId, uint256 _price) external {
        require(
            _allOffers[_tokenId].length < 10,
            "Error : user has already received 10 offers"
        );
        _allOffers[_tokenId].push(Offer(_price, msg.sender));
    }

    function rejectOffer(uint256 _tokenId, address _bider) external {
        //TODO: require OwnerOf(tokenId == msg.sender)

        for (uint256 i = 0; i < _allOffers[_tokenId].length; i++) {
            if (_allOffers[_tokenId][i].user == _bider) {
                // We switch with the last element in array
                _allOffers[_tokenId][i] = _allOffers[_tokenId][
                    _allOffers[_tokenId].length - 1
                ];
                _allOffers[_tokenId].pop();
            }
        }
    }

    function acceptOffer(uint256 _tokenId, address _bider) external {
        //TODO : transfer token to _bider
        delete _allOffers[_tokenId];
    }

    function hasMadeOffer(uint256 _tokenId) external view returns (bool) {
        for (uint256 i = 0; i < _allOffers[_tokenId].length; i++) {
            if (_allOffers[_tokenId][i].user == msg.sender) {
                return true;
            }
        }
        return false;
    }

    /*
    mapping(idCard => [Opinions])
    id de card
    string brand
string model
string photoURI
array opinion */

    /*function _getChatId(uint256 _tokenId, address _from, address _to) {
        if(_from < _to)
            return keccak256(abi.encodePacked(_from, _to));
        else
            return keccak256(abi.encodePacked(_to, _from));
    }*/

    /*
    
    mapping(bytes32 => []Message)
    // concatener tokenId+hash1+hash2
    function sendMessage(uint256 tokenId, address _to, string _content) {}
    function getAllMessages(uint)
     */
}
