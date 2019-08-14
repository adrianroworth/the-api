const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a flush', () => {
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
                        card: 'four of diamonds',
                        cardCode: '4-d',
                        cardName: 'four',
                        cardSuit: 'diamonds',
                        cardValue: 4
                    },
                    {
                        card: 'seven of diamonds',
                        cardCode: '7-d',
                        cardName: 'seven',
                        cardSuit: 'diamonds',
                        cardValue: 7
                    },
                    {
                        card: 'ten of diamonds',
                        cardCode: '10-d',
                        cardName: 'ten',
                        cardSuit: 'diamonds',
                        cardValue: 10
                    },
                    {
                        card: 'king of diamonds',
                        cardCode: '13-d',
                        cardName: 'king',
                        cardSuit: 'diamonds',
                        cardValue: 13
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
                            card: 'four of diamonds',
                            cardCode: '4-d',
                            cardName: 'four',
                            cardSuit: 'diamonds',
                            cardValue: 4
                        },
                        {
                            card: 'seven of diamonds',
                            cardCode: '7-d',
                            cardName: 'seven',
                            cardSuit: 'diamonds',
                            cardValue: 7
                        },
                        {
                            card: 'ten of diamonds',
                            cardCode: '10-d',
                            cardName: 'ten',
                            cardSuit: 'diamonds',
                            cardValue: 10
                        },
                        {
                            card: 'king of diamonds',
                            cardCode: '13-d',
                            cardName: 'king',
                            cardSuit: 'diamonds',
                            cardValue: 13
                        }
                    ]
                ]
            },
            description: 'king-high flush',
            precedence: 5,
            name: 'Flush'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['10-d', '4-d', '13-d', '3-d', '5-s', '10-c', '7-d']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the flush', () => {
            const result = HelpEm.getHands().flush;
            // console.log({result});
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "5"', () => {
            const result = HelpEm.getHands().flush;
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands().flush;
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Flush" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a flush set in "all"', () => {
            const result = HelpEm.getHands().flush;
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands().flush;
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['flush', 'pair', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 3', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(3);
        });
    });
});
