const express = require('express');
const VError = require('verror');

const TexasHelpEm = require('../../lib/texasHelpEm');
const handsData = require('../../lib/handsData')();
const createValidationService = require('../../services/validation-service');

const router = express.Router();

const regXHandName = /^[a-zA-Z-]{1,30}$/;

router.get('/hands/:handName/precedence', (req, res) => {
    const { handName } = req.params;
    const hand = handsData.hands[handName];

    if (!regXHandName.test(handName) || !hand) {
        const err = Error(`Hand name ${handName} does not exist`);
        err.name = 'HTTPError';
        err.statusCode = 404;
        err.error = '404 Not Found';
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
        const err = Error(`Hand name ${handName} does not exist`);
        err.name = 'HTTPError';
        err.statusCode = 404;
        err.error = '404 Not Found';
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
    const cards = req.body.data && req.body.data.attributes && req.body.data.attributes.cards;
    const validationService = createValidationService();

    validationService.validateCardSet(cards);

    // does the hand type exist?
    if (!regXHandName.test(handName) || !hand) {
        throw new VError(
            {
                name: 'ResourceNotFound'
            },
            `Hand name ${handName} does not exist`
        );
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
    const cards = req.body.data && req.body.data.attributes && req.body.data.attributes.cards;
    const validationService = createValidationService();

    validationService.validateCardSet(cards);

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
