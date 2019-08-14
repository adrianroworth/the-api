const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a royal flush', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
                    {
                        card: 'ten of spades',
                        cardCode: '10-s',
                        cardName: 'ten',
                        cardSuit: 'spades',
                        cardValue: 10
                    },
                    {
                        card: 'jack of spades',
                        cardCode: '11-s',
                        cardName: 'jack',
                        cardSuit: 'spades',
                        cardValue: 11
                    },
                    {
                        card: 'queen of spades',
                        cardCode: '12-s',
                        cardName: 'queen',
                        cardSuit: 'spades',
                        cardValue: 12
                    },
                    {
                        card: 'king of spades',
                        cardCode: '13-s',
                        cardName: 'king',
                        cardSuit: 'spades',
                        cardValue: 13
                    },
                    {
                        card: 'ace of spades',
                        cardCode: '1-s',
                        cardName: 'ace',
                        cardSuit: 'spades',
                        cardValue: 1
                    }
                ],
                all: [
                    [
                        {
                            card: 'ten of spades',
                            cardCode: '10-s',
                            cardName: 'ten',
                            cardSuit: 'spades',
                            cardValue: 10
                        },
                        {
                            card: 'jack of spades',
                            cardCode: '11-s',
                            cardName: 'jack',
                            cardSuit: 'spades',
                            cardValue: 11
                        },
                        {
                            card: 'queen of spades',
                            cardCode: '12-s',
                            cardName: 'queen',
                            cardSuit: 'spades',
                            cardValue: 12
                        },
                        {
                            card: 'king of spades',
                            cardCode: '13-s',
                            cardName: 'king',
                            cardSuit: 'spades',
                            cardValue: 13
                        },
                        {
                            card: 'ace of spades',
                            cardCode: '1-s',
                            cardName: 'ace',
                            cardSuit: 'spades',
                            cardValue: 1
                        }
                    ]
                ]
            },
            description: 'Royal flush',
            precedence: 9,
            name: 'Royal Flush'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['1-s', '10-s', '13-c', '13-s', '5-h', '12-s', '11-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the royal flush', () => {
            const result = HelpEm.getHands()['royal-flush'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "9"', () => {
            const result = HelpEm.getHands()['royal-flush'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['royal-flush'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Royal Flush" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a royal flush set in "all"', () => {
            const result = HelpEm.getHands()['royal-flush'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['royal-flush'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = [
                'royal-flush',
                'straight-flush',
                'straight',
                'flush',
                'pair',
                'high-card'
            ];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 6', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(6);
        });
    });
});
