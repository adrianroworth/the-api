const VError = require('verror');

const regXCardId = /^([1-9]|1[0-3])-[shdc]$/;

function createValidationService() {
    function validateCardSet(cards) {
        if (!cards || !Array.isArray(cards)) {
            throw new VError(
                {
                    name: 'CardSetValidationError',
                    info: {
                        cards
                    }
                },
                `'cards' needs to be an array of card IDs`
            );
        }

        // wrong number of cards supplied.
        if (cards.length !== 7) {
            throw new VError(
                {
                    name: 'CardSetValidationError',
                    info: {
                        cards
                    }
                },
                `'cards' needs to be an array of length 7`
            );
        }

        // duplicate cards supplied.
        if (cards.length !== new Set(cards).size) {
            throw new VError(
                {
                    name: 'CardSetValidationError',
                    info: {
                        cards
                    }
                },
                `'cards' must contain unique and distinct elements`
            );
        }

        const invalidCards = [];
        cards.forEach(x => {
            if (!regXCardId.test(x)) {
                invalidCards.push(x);
            }
        });

        // does every card id conform to the card id pattern?
        if (invalidCards.length) {
            throw new VError(
                {
                    name: 'CardSetValidationError',
                    info: {
                        cards
                    }
                },
                `Malformed card IDs: '${invalidCards.join(', ')}'`
            );
        }
    }

    return Object.freeze({
        validateCardSet
    });
}

module.exports = createValidationService;
