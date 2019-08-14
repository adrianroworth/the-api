const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a straight flush', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
                    {
                        card: 'three of hearts',
                        cardCode: '3-h',
                        cardName: 'three',
                        cardSuit: 'hearts',
                        cardValue: 3
                    },
                    {
                        card: 'four of hearts',
                        cardCode: '4-h',
                        cardName: 'four',
                        cardSuit: 'hearts',
                        cardValue: 4
                    },
                    {
                        card: 'five of hearts',
                        cardCode: '5-h',
                        cardName: 'five',
                        cardSuit: 'hearts',
                        cardValue: 5
                    },
                    {
                        card: 'six of hearts',
                        cardCode: '6-h',
                        cardName: 'six',
                        cardSuit: 'hearts',
                        cardValue: 6
                    },
                    {
                        card: 'seven of hearts',
                        cardCode: '7-h',
                        cardName: 'seven',
                        cardSuit: 'hearts',
                        cardValue: 7
                    }
                ],
                all: [
                    [
                        {
                            card: 'three of hearts',
                            cardCode: '3-h',
                            cardName: 'three',
                            cardSuit: 'hearts',
                            cardValue: 3
                        },
                        {
                            card: 'four of hearts',
                            cardCode: '4-h',
                            cardName: 'four',
                            cardSuit: 'hearts',
                            cardValue: 4
                        },
                        {
                            card: 'five of hearts',
                            cardCode: '5-h',
                            cardName: 'five',
                            cardSuit: 'hearts',
                            cardValue: 5
                        },
                        {
                            card: 'six of hearts',
                            cardCode: '6-h',
                            cardName: 'six',
                            cardSuit: 'hearts',
                            cardValue: 6
                        },
                        {
                            card: 'seven of hearts',
                            cardCode: '7-h',
                            cardName: 'seven',
                            cardSuit: 'hearts',
                            cardValue: 7
                        }
                    ]
                ]
            },
            description: 'seven-high straight flush',
            precedence: 8,
            name: 'Straight Flush'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['7-h', '4-h', '13-c', '3-h', '5-h', '6-h', '7-d']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the straight flush', () => {
            const result = HelpEm.getHands()['straight-flush'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "8"', () => {
            const result = HelpEm.getHands()['straight-flush'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['straight-flush'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Straight Flush" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a straight flush set in "all"', () => {
            const result = HelpEm.getHands()['straight-flush'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['straight-flush'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['straight-flush', 'straight', 'flush', 'pair', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 5', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(5);
        });
    });
});
