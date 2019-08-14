const handsData = require('./handsData')();

function createTexasHelpEm() {
    let playerCards = [];
    let winningHands = {};
    const { hands } = handsData;
    const { helpers } = handsData;

    const cardSuitLookupTable = {
        s: 'spades',
        h: 'hearts',
        d: 'diamonds',
        c: 'clubs'
    };

    const cardNameLookupTable = {
        1: 'ace',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'jack',
        12: 'queen',
        13: 'king'
    };

    function assertainHands() {
        const winners = {};
        Object.keys(hands).forEach(hand => {
            const potentialHand = hands[hand];
            const result = potentialHand.rule(playerCards);
            if (result) {
                winners[hand] = {};
                winners[hand].cards = result.cards;
                winners[hand].description = result.description;
                winners[hand].precedence = potentialHand.precedence;
                winners[hand].name = potentialHand.name;
            }
        });

        return winners;
    }

    function transformCards(cards) {
        const transformedCards = cards.map(card => {
            const cardData = card.split('-');
            return {
                cardCode: card,
                cardValue: Number.parseInt(cardData[0], 10),
                cardSuit: cardSuitLookupTable[cardData[1]],
                cardName: cardNameLookupTable[cardData[0]],
                card: `${cardNameLookupTable[cardData[0]]} of ${cardSuitLookupTable[cardData[1]]}`
            };
        });
        return transformedCards;
    }

    function setCards(cards) {
        // wrong number of cards supplied.
        if (cards.length !== 7) {
            const error = new Error();
            error.statusCode = 400;
            error.title = 'Bad Request';
            error.message = 'Request must contain an array with 7 elements';
            throw error;
        }
        // duplicate cards supplied.
        if (cards.length !== new Set(cards).size) {
            const error = new Error();
            error.statusCode = 400;
            error.title = 'Bad Request';
            error.message = 'Request must contain 7 unique elements';
            throw error;
        }

        playerCards = helpers.sortCardsByCardValue(transformCards(cards));
        winningHands = assertainHands();
    }

    function getCards() {
        return playerCards;
    }

    function getHands() {
        return winningHands;
    }

    function getHand(handName) {
        return winningHands[handName];
    }

    function getBestHand() {
        let bestHand;
        let highestPrecedence = -1;
        Object.keys(winningHands).forEach(handName => {
            if (winningHands[handName].precedence > highestPrecedence) {
                highestPrecedence = winningHands[handName].precedence;
                bestHand = handName;
            }
        });
        return winningHands[bestHand];
    }

    return Object.freeze({
        setCards,
        getCards,
        getHands,
        getHand,
        getBestHand
    });
}

module.exports = createTexasHelpEm;
