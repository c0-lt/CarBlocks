
const Utils = {
  getSocialCards: async (contract) => {
    const cards = await contract.getCards();
    if (cards.length > 15) {
      // TODO pagination
      return cards.slice(0, 16);
    }
    return cards;
  },
  getSocialOpinions: async (contract, cardId) => {
    const opinions = await contract.getOpinions(cardId);
    return opinions;
  },
};

export default Utils;
