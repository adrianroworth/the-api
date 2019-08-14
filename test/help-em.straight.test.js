const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a straight', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
                    {
                        card: 'three of diamonds',
                        cardCode: '3-d',
                        cardName: 'three',
                        cardSuit: 'diamonds',
                        cardValue: 3
                    },
                    {
                        card: 'four of spades',
                        cardCode: '4-s',
                        cardName: 'four',
                        cardSuit: 'spades',
                        cardValue: 4
                    },
                    {
                        card: 'five of spades',
                        cardCode: '5-s',
                        cardName: 'five',
                        cardSuit: 'spades',
                        cardValue: 5
                    },
                    {
                        card: 'six of clubs',
                        cardCode: '6-c',
                        cardName: 'six',
                        cardSuit: 'clubs',
                        cardValue: 6
                    },
                    {
                        card: 'seven of diamonds',
                        cardCode: '7-d',
                        cardName: 'seven',
                        cardSuit: 'diamonds',
                        cardValue: 7
                    }
                ],
                all: [
                    [
                        {
                            card: 'three of diamonds',
                            cardCode: '3-d',
                            cardName: 'three',
                            cardSuit: 'diamonds',
                            cardValue: 3
                        },
                        {
                            card: 'four of spades',
                            cardCode: '4-s',
                            cardName: 'four',
                            cardSuit: 'spades',
                            cardValue: 4
                        },
                        {
                            card: 'five of spades',
                            cardCode: '5-s',
                            cardName: 'five',
                            cardSuit: 'spades',
                            cardValue: 5
                        },
                        {
                            card: 'six of clubs',
                            cardCode: '6-c',
                            cardName: 'six',
                            cardSuit: 'clubs',
                            cardValue: 6
                        },
                        {
                            card: 'seven of diamonds',
                            cardCode: '7-d',
                            cardName: 'seven',
                            cardSuit: 'diamonds',
                            cardValue: 7
                        }
                    ]
                ]
            },
            description: 'seven-high straight',
            precedence: 4,
            name: 'Straight'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '4-s', '3-d', '6-c', '7-d', '5-s', '1-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the straight', () => {
            const result = HelpEm.getHands().straight;
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "4"', () => {
            const result = HelpEm.getHands().straight;
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands().straight;
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Four of a kind" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a straight set in "all"', () => {
            const result = HelpEm.getHands().straight;
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands().straight;
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['straight', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 1', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(2);
        });
    });

    describe('Given a hand with an ace-high straight', () => {
        let HelpEm;

        beforeEach(() => {
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['10-d', '13-s', '1-s', '11-d', '6-c', '12-s', '5-s']);
        });

        it('should return ace-high straight', () => {
            const expected = {
                cards: {
                    best: [
                        {
                            card: 'ten of diamonds',
                            cardCode: '10-d',
                            cardName: 'ten',
                            cardSuit: 'diamonds',
                            cardValue: 10
                        },
                        {
                            card: 'jack of diamonds',
                            cardCode: '11-d',
                            cardName: 'jack',
                            cardSuit: 'diamonds',
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
                                card: 'ten of diamonds',
                                cardCode: '10-d',
                                cardName: 'ten',
                                cardSuit: 'diamonds',
                                cardValue: 10
                            },
                            {
                                card: 'jack of diamonds',
                                cardCode: '11-d',
                                cardName: 'jack',
                                cardSuit: 'diamonds',
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
                description: 'ace-high straight',
                precedence: 4,
                name: 'Straight'
            };
            const result = HelpEm.getHands().straight;
            expect(result).toEqual(expected);
        });
    });

    describe('Given a hand with an ace-high 7-card straight', () => {
        let HelpEm;

        beforeEach(() => {
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['10-d', '13-s', '1-s', '11-d', '9-c', '12-s', '8-s']);
        });

        it('should return ace-high straight of 5 cards', () => {
            const expected = {
                cards: {
                    best: [
                        {
                            card: 'ten of diamonds',
                            cardCode: '10-d',
                            cardName: 'ten',
                            cardSuit: 'diamonds',
                            cardValue: 10
                        },
                        {
                            card: 'jack of diamonds',
                            cardCode: '11-d',
                            cardName: 'jack',
                            cardSuit: 'diamonds',
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
                                card: 'ten of diamonds',
                                cardCode: '10-d',
                                cardName: 'ten',
                                cardSuit: 'diamonds',
                                cardValue: 10
                            },
                            {
                                card: 'jack of diamonds',
                                cardCode: '11-d',
                                cardName: 'jack',
                                cardSuit: 'diamonds',
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
                description: 'ace-high straight',
                precedence: 4,
                name: 'Straight'
            };
            const result = HelpEm.getHands().straight;
            expect(result).toEqual(expected);
        });
    });

    describe('Given a hand with an ace-low straight', () => {
        let HelpEm;

        beforeEach(() => {
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['4-d', '2-s', '1-s', '11-d', '3-d', '8-h', '5-c']);
        });

        it('should return "ace-low" straight', () => {
            const expected = {
                cards: {
                    best: [
                        {
                            card: 'ace of spades',
                            cardCode: '1-s',
                            cardName: 'ace',
                            cardSuit: 'spades',
                            cardValue: 1
                        },
                        {
                            card: 'two of spades',
                            cardCode: '2-s',
                            cardName: 'two',
                            cardSuit: 'spades',
                            cardValue: 2
                        },
                        {
                            card: 'three of diamonds',
                            cardCode: '3-d',
                            cardName: 'three',
                            cardSuit: 'diamonds',
                            cardValue: 3
                        },
                        {
                            card: 'four of diamonds',
                            cardCode: '4-d',
                            cardName: 'four',
                            cardSuit: 'diamonds',
                            cardValue: 4
                        },
                        {
                            card: 'five of clubs',
                            cardCode: '5-c',
                            cardName: 'five',
                            cardSuit: 'clubs',
                            cardValue: 5
                        }
                    ],
                    all: [
                        [
                            {
                                card: 'ace of spades',
                                cardCode: '1-s',
                                cardName: 'ace',
                                cardSuit: 'spades',
                                cardValue: 1
                            },
                            {
                                card: 'two of spades',
                                cardCode: '2-s',
                                cardName: 'two',
                                cardSuit: 'spades',
                                cardValue: 2
                            },
                            {
                                card: 'three of diamonds',
                                cardCode: '3-d',
                                cardName: 'three',
                                cardSuit: 'diamonds',
                                cardValue: 3
                            },
                            {
                                card: 'four of diamonds',
                                cardCode: '4-d',
                                cardName: 'four',
                                cardSuit: 'diamonds',
                                cardValue: 4
                            },
                            {
                                card: 'five of clubs',
                                cardCode: '5-c',
                                cardName: 'five',
                                cardSuit: 'clubs',
                                cardValue: 5
                            }
                        ]
                    ]
                },
                description: 'five-high straight',
                precedence: 4,
                name: 'Straight'
            };
            const result = HelpEm.getHands().straight;
            expect(result).toEqual(expected);
        });
    });
});
