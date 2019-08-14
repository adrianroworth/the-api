const TexasHelpEm = require('../src/lib/texasHelpEm');

describe("Texas Help'em", () => {
    describe('Given a hand with a high card', () => {
        let HelpEm;
        const expected = {
            cards: {
                best: {
                    card: 'ace of spades',
                    cardCode: '1-s',
                    cardName: 'ace',
                    cardSuit: 'spades',
                    cardValue: 1
                },
                all: [
                    {
                        card: 'ace of spades',
                        cardCode: '1-s',
                        cardName: 'ace',
                        cardSuit: 'spades',
                        cardValue: 1
                    }
                ]
            },
            description: 'High ace',
            precedence: 0,
            name: 'High Card'
        };

        beforeEach(() => {
            // console.log({HelpEm});
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '1-s', '4-d', '5-c', '10-d', '6-h', '12-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return an array containing the high card', () => {
            const result = HelpEm.getHands()['high-card'];
            expect(result).toEqual(expected);
        });

        it('should have a precedence of "0"', () => {
            const result = HelpEm.getHands()['high-card'];
            expect(result.precedence).toEqual(expected.precedence);
        });

        it('should have the correct description', () => {
            const result = HelpEm.getHands()['high-card'];
            expect(result.description).toEqual(expected.description);
        });

        it('should return a "High Card" as the best hand', () => {
            const result = HelpEm.getBestHand();
            expect(result.name).toEqual(expected.name);
        });

        it('should have 1 card object "all"', () => {
            const result = HelpEm.getHands()['high-card'];
            expect(result.cards.all.length).toEqual(1);
        });

        it('should have identical "best" and "all[0]"', () => {
            const result = HelpEm.getHands()['high-card'];
            expect(result.cards.best).toEqual(result.cards.all[0]);
        });
    });
});
