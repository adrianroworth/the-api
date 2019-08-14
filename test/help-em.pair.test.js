const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with 1 pair', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: [
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
                all: [
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
                    ]
                ]
            },
            description: 'Pair of fives',
            precedence: 1,
            name: 'Pair'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '5-s', '4-d', '5-c', '10-d', '6-h', '12-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the pair', () => {
            const result = HelpEm.getHands().pair;
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "1"', () => {
            const result = HelpEm.getHands().pair;
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands().pair;
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Pair" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a pair set in "all"', () => {
            const result = HelpEm.getHands().pair;
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands().pair;
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        // describe('with a high card', () => {
        //     const expectedHighCardData = {
        //         cards: {
        //             best: {
        //                 card: 'queen of spades',
        //                 cardCode: '12-s',
        //                 cardName: 'queen',
        //                 cardSuit: 'spades',
        //                 cardValue: 12
        //             },
        //             all: [
        //                 {
        //                     card: 'queen of spades',
        //                     cardCode: '12-s',
        //                     cardName: 'queen',
        //                     cardSuit: 'spades',
        //                     cardValue: 12
        //                 }
        //             ]
        //         },
        //         description: 'High queen',
        //         precedence: 0,
        //         name: 'High card'
        //     };

        //     it('should have a high card', () => {
        //         const result = HelpEm.getHands()['high-card'];
        //         expect(result.cards.best).toEqual(expectedHighCardData.cards.best);
        //     });
        // });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = ['pair', 'high-card'];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 2', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(2);
        });
    });
});
