const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a 4 of a kind', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
                    {
                        card: 'four of spades',
                        cardCode: '4-s',
                        cardName: 'four',
                        cardSuit: 'spades',
                        cardValue: 4
                    },
                    {
                        card: 'four of diamonds',
                        cardCode: '4-d',
                        cardName: 'four',
                        cardSuit: 'diamonds',
                        cardValue: 4
                    },
                    {
                        card: 'four of clubs',
                        cardCode: '4-c',
                        cardName: 'four',
                        cardSuit: 'clubs',
                        cardValue: 4
                    },
                    {
                        card: 'four of hearts',
                        cardCode: '4-h',
                        cardName: 'four',
                        cardSuit: 'hearts',
                        cardValue: 4
                    }
                ],
                all: [
                    [
                        {
                            card: 'four of spades',
                            cardCode: '4-s',
                            cardName: 'four',
                            cardSuit: 'spades',
                            cardValue: 4
                        },
                        {
                            card: 'four of diamonds',
                            cardCode: '4-d',
                            cardName: 'four',
                            cardSuit: 'diamonds',
                            cardValue: 4
                        },
                        {
                            card: 'four of clubs',
                            cardCode: '4-c',
                            cardName: 'four',
                            cardSuit: 'clubs',
                            cardValue: 4
                        },
                        {
                            card: 'four of hearts',
                            cardCode: '4-h',
                            cardName: 'four',
                            cardSuit: 'hearts',
                            cardValue: 4
                        }
                    ]
                ]
            },
            description: '4 fours',
            precedence: 7,
            name: 'Four Of A Kind'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '4-s', '4-d', '4-c', '7-d', '4-h', '10-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the four of a kind', () => {
            const result = HelpEm.getHands()['four-of-a-kind'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "7"', () => {
            const result = HelpEm.getHands()['four-of-a-kind'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['four-of-a-kind'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Four of a kind" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a four of a kind set in "all"', () => {
            const result = HelpEm.getHands()['four-of-a-kind'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['four-of-a-kind'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        // describe('with a three of a kind', () => {
        //     const expectedThreeOfAKindData = {
        //         cards: {
        //             best: [
        //                 {
        //                     card: 'four of spades',
        //                     cardCode: '4-s',
        //                     cardName: 'four',
        //                     cardSuit: 'spades',
        //                     cardValue: 4
        //                 },
        //                 {
        //                     card: 'four of diamonds',
        //                     cardCode: '4-d',
        //                     cardName: 'four',
        //                     cardSuit: 'diamonds',
        //                     cardValue: 4
        //                 },
        //                 {
        //                     card: 'four of clubs',
        //                     cardCode: '4-c',
        //                     cardName: 'four',
        //                     cardSuit: 'clubs',
        //                     cardValue: 4
        //                 }
        //             ],
        //             all: [
        //                 [
        //                     {
        //                         card: 'four of spades',
        //                         cardCode: '4-s',
        //                         cardName: 'four',
        //                         cardSuit: 'spades',
        //                         cardValue: 4
        //                     },
        //                     {
        //                         card: 'four of diamonds',
        //                         cardCode: '4-d',
        //                         cardName: 'four',
        //                         cardSuit: 'diamonds',
        //                         cardValue: 4
        //                     },
        //                     {
        //                         card: 'four of clubs',
        //                         cardCode: '4-c',
        //                         cardName: 'four',
        //                         cardSuit: 'clubs',
        //                         cardValue: 4
        //                     }
        //                 ]
        //             ]
        //         },
        //         description: '3 fours',
        //         precedence: 3,
        //         name: 'Three Of A Kind'
        //     };

        //     it('should have a three of a kind', () => {
        //         const result = HelpEm.getHands()['three-of-a-kind'];
        //         expect(result.cards.best).toEqual(expectedThreeOfAKindData.cards.best);
        //     });
        // });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['four-of-a-kind', 'three-of-a-kind', 'pair', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 4', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(4);
        });
    });
});
