const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with 2 pairs', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
                    [
                        {
                            card: 'five of spades',
                            cardCode: '5-s',
                            cardName: 'five',
                            cardSuit: 'spades',
                            cardValue: 5
                        },
                        {
                            card: 'five of clubs',
                            cardCode: '5-c',
                            cardName: 'five',
                            cardSuit: 'clubs',
                            cardValue: 5
                        }
                    ],
                    [
                        {
                            card: 'two of diamonds',
                            cardCode: '2-d',
                            cardName: 'two',
                            cardSuit: 'diamonds',
                            cardValue: 2
                        },
                        {
                            card: 'two of hearts',
                            cardCode: '2-h',
                            cardName: 'two',
                            cardSuit: 'hearts',
                            cardValue: 2
                        }
                    ]
                ],
                all: [
                    [
                        [
                            {
                                card: 'five of spades',
                                cardCode: '5-s',
                                cardName: 'five',
                                cardSuit: 'spades',
                                cardValue: 5
                            },
                            {
                                card: 'five of clubs',
                                cardCode: '5-c',
                                cardName: 'five',
                                cardSuit: 'clubs',
                                cardValue: 5
                            }
                        ],
                        [
                            {
                                card: 'two of diamonds',
                                cardCode: '2-d',
                                cardName: 'two',
                                cardSuit: 'diamonds',
                                cardValue: 2
                            },
                            {
                                card: 'two of hearts',
                                cardCode: '2-h',
                                cardName: 'two',
                                cardSuit: 'hearts',
                                cardValue: 2
                            }
                        ]
                    ]
                ]
            },
            description: 'Pair of fives, and pair of twos',
            precedence: 2,
            name: 'Two Pairs'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '5-s', '4-d', '5-c', '10-d', '2-h', '12-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the array of two pairs', () => {
            const result = HelpEm.getHands()['two-pairs'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "2"', () => {
            const result = HelpEm.getHands()['two-pairs'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['two-pairs'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Two Pairs" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of an array of pairs in "all"', () => {
            const result = HelpEm.getHands()['two-pairs'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['two-pairs'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['two-pairs', 'pair', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 3', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(3);
        });
    });
});
