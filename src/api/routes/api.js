const express = require('express');
const TexasHelpEm = require('../../lib/texasHelpEm');

const router = express.Router();
const handsData = require('../../lib/handsData')();

const regXHandName = /^[a-zA-Z-]{1,30}$/;
const regXCardId = /^([1-9]|1[0-3])-[shdc]$/;

router.get('/hands/:handName/precedence', (req, res) => {
    const { handName } = req.params;
    const hand = handsData.hands[handName];

    if (!regXHandName.test(handName) || !hand) {
        const err = Error(`Bad request`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const response = {
        data: {
            type: 'precedences',
            id: handName,
            attributes: {
                precedence: hand.precedence
            }
        }
    };
    res.status(200).json(response);
});

router.get('/hands/:handName/description', (req, res) => {
    const { handName } = req.params;
    const hand = handsData.hands[handName];

    if (!regXHandName.test(handName) || !hand) {
        const err = Error(`Bad request`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const response = {
        data: {
            type: 'descriptions',
            id: handName,
            attributes: {
                precedence: hand.description
            }
        }
    };
    res.status(200).json(response);
});

router.post('/hands/:handName', (req, res) => {
    const { handName } = req.params;
    const hand = handsData.hands[handName];
    const cards = req.body.data && req.body.data[0].attributes && req.body.data[0].attributes.cards;

    if (!cards || !Array.isArray(cards)) {
        const err = Error(`Bad Request. "cards" needs to be an array of card IDs`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    // does the hand type exist?
    if (!regXHandName.test(handName) || !hand) {
        const err = Error(`Bad Request. ${handName} is not a valid hand name`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const invalidCards = [];
    cards.forEach(x => {
        if (!regXCardId.test(x)) {
            invalidCards.push(x);
        }
    });

    // does every card id conform to the card id pattern?
    if (invalidCards.length) {
        const err = Error(`400 Bad Request. Malformed card IDs: '${invalidCards.join(', ')}'`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const HelpEm = TexasHelpEm();
    HelpEm.setCards(cards);
    const validHand = HelpEm.getHand(handName);

    res.status(200).json({
        data: [
            {
                type: 'hands',
                id: handName,
                attributes: validHand || {}
            }
        ]
    });
});

router.post('/hands', (req, res) => {
    const cards = req.body.data && req.body.data.cards;

    if (!cards || !Array.isArray(cards)) {
        const err = Error(`Bad Request. "cards" needs to be an array of card IDs`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const invalidCards = [];
    cards.forEach(x => {
        if (!regXCardId.test(x)) {
            invalidCards.push(x);
        }
    });

    // does every card id conform to the card id pattern?
    if (invalidCards.length) {
        const err = Error(`400 Bad Request. Malformed card IDs: '${invalidCards.join(', ')}'`);
        err.name = 'HTTPError';
        err.statusCode = 400;
        err.error = '400 Bad Request';
        throw err;
    }

    const HelpEm = TexasHelpEm();
    HelpEm.setCards(cards);
    const validHands = HelpEm.getHands();

    const resourceCollection = [];

    Object.keys(validHands).forEach(handName => {
        const resource = {};
        resource.type = 'hands';
        resource.id = handName;
        resource.attributes = validHands[handName];
        resourceCollection.push(resource);
    });

    const response = {
        data: resourceCollection
    };

    res.status(200).json(response);
});

module.exports = router;
