const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a full house', () => {
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
                        card: 'three of clubs',
                        cardCode: '3-c',
                        cardName: 'three',
                        cardSuit: 'clubs',
                        cardValue: 3
                    },
                    {
                        card: 'three of hearts',
                        cardCode: '3-h',
                        cardName: 'three',
                        cardSuit: 'hearts',
                        cardValue: 3
                    },
                    {
                        card: 'ten of diamonds',
                        cardCode: '10-d',
                        cardName: 'ten',
                        cardSuit: 'diamonds',
                        cardValue: 10
                    },
                    {
                        card: 'ten of clubs',
                        cardCode: '10-c',
                        cardName: 'ten',
                        cardSuit: 'clubs',
                        cardValue: 10
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
                            card: 'three of clubs',
                            cardCode: '3-c',
                            cardName: 'three',
                            cardSuit: 'clubs',
                            cardValue: 3
                        },
                        {
                            card: 'three of hearts',
                            cardCode: '3-h',
                            cardName: 'three',
                            cardSuit: 'hearts',
                            cardValue: 3
                        },
                        {
                            card: 'ten of diamonds',
                            cardCode: '10-d',
                            cardName: 'ten',
                            cardSuit: 'diamonds',
                            cardValue: 10
                        },
                        {
                            card: 'ten of clubs',
                            cardCode: '10-c',
                            cardName: 'ten',
                            cardSuit: 'clubs',
                            cardValue: 10
                        }
                    ]
                ]
            },
            description: 'Full house, threes full of tens',
            precedence: 6,
            name: 'Full House'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['10-d', '3-d', '13-d', '3-c', '5-s', '10-c', '3-h']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the full house', () => {
            const result = HelpEm.getHands()['full-house'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "6"', () => {
            const result = HelpEm.getHands()['full-house'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['full-house'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "Full House" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 array of a full house set in "all"', () => {
            const result = HelpEm.getHands()['full-house'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['full-house'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });

        it('should result in other valid hands', () => {
            const result = Object.keys(HelpEm.getHands());
            const expectedHands = [
                'full-house',
                'three-of-a-kind',
                'two-pairs',
                'pair',
                'high-card'
            ];
            expect(result).toEqual(expect.arrayContaining(expectedHands));
        });

        it('should result in other valid hands with a length of 5', () => {
            const result = Object.keys(HelpEm.getHands());
            expect(result.length).toEqual(5);
        });
    });
});
