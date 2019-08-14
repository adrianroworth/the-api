// test if the exact number/set of cards for each hand produced the correct result
// test if the wrong number/set of cards does not produce the correct result.
// test if you have more than enough of the cards that it still returns the hands it should (e.g. 4 aces will return a pair, 2 pair, 3 of a kind, and 4 of a kind)

const TexasHelpEm = require('../src/lib/texasHelpEm');
const utilHelper = require('../src/lib/helpers/utilHelper');

describe("Texas Help'em", () => {
    it('should allow 7 cards', () => {
        const HelpEm = new TexasHelpEm();
        HelpEm.setCards(['2-d', '1-s', '4-d', '5-c', '10-d', '6-h', '12-s']);
        const result = HelpEm.getCards();
        expect(result.length).toEqual(7);
    });

    it('should not allow fewer than 7 cards', () => {
        const HelpEm = new TexasHelpEm();
        expect(() => {
            HelpEm.setCards(['2-d', '1-s']);
        }).toThrow();
    });

    it('should not allow more than 7 cards', () => {
        const HelpEm = new TexasHelpEm();
        expect(() => {
            HelpEm.setCards(['2-d', '1-s', '4-d', '5-c', '6-d', '10-d', '6-h', '12-s', '9-h']);
        }).toThrow();
    });

    it('should not allow duplicate cards', () => {
        const HelpEm = new TexasHelpEm();
        expect(() => {
            HelpEm.setCards(['2-d', '1-s', '4-d', '4-d', '10-d', '6-h', '12-s']);
        }).toThrow();
    });

    describe('Given any hand', () => {
        let HelpEm;
        const expected = [
            {
                card: 'two of diamonds',
                cardCode: '2-d',
                cardName: 'two',
                cardSuit: 'diamonds',
                cardValue: 2
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
            },
            {
                card: 'six of hearts',
                cardCode: '6-h',
                cardName: 'six',
                cardSuit: 'hearts',
                cardValue: 6
            },
            {
                card: 'ten of diamonds',
                cardCode: '10-d',
                cardName: 'ten',
                cardSuit: 'diamonds',
                cardValue: 10
            },
            {
                card: 'queen of spades',
                cardCode: '12-s',
                cardName: 'queen',
                cardSuit: 'spades',
                cardValue: 12
            },
            {
                card: 'ace of spades',
                cardCode: '1-s',
                cardName: 'ace',
                cardSuit: 'spades',
                cardValue: 1
            }
        ];

        beforeEach(() => {
            HelpEm = new TexasHelpEm();
            HelpEm.setCards(['2-d', '1-s', '4-d', '5-c', '10-d', '6-h', '12-s']);
        });

        afterEach(() => {
            // for enumerable properties
            Object.keys(HelpEm).forEach(key => {
                delete HelpEm[key];
            });
        });

        it('should return a set of 7 transformed cards', () => {
            const result = HelpEm.getCards();
            expect(result).toEqual(expected);
        });

        it('should return a transformed card with properties', () => {
            const result = Object.keys(HelpEm.getCards()[0]);
            expect(result).toEqual(
                expect.arrayContaining(['card', 'cardCode', 'cardName', 'cardSuit', 'cardValue'])
            );
        });

        // it('should return an object of valid hands for the set of cards', () => {
        //     const result = HelpEm.getHands();
        //     expect(result).toEqual(true); // will fail.
        // });

        // it('should return an "blah" as a valid hand', () => {
        //     const result = HelpEm.getHands();
        //     expect(result).toEqual(true); // will fail.
        // });
    });

    describe('utility functions', () => {
        describe('swapObjectKeysAndValues', () => {
            it("should swap an object's keys and values", () => {
                const input = {
                    a: 1,
                    hello: 2,
                    foo: 'bar'
                };
                const expected = {
                    1: ['a'],
                    2: ['hello'],
                    bar: ['foo']
                };
                expect(utilHelper.swapObjectKeysAndValues(input)).toEqual(expected);
            });

            it("should swap an object's keys and values where some values are identical", () => {
                const input = {
                    a: 1,
                    hello: 'bar',
                    foo: 'bar',
                    baz: 'fizz'
                };
                const expected = {
                    1: ['a'],
                    bar: ['hello', 'foo'],
                    fizz: ['baz']
                };
                expect(utilHelper.swapObjectKeysAndValues(input)).toEqual(expected);
            });

            it("should swap an object's keys and values where all values are identical", () => {
                const input = {
                    6: 3,
                    hello: 3,
                    foo: 3,
                    baz: 3
                };
                const expected = {
                    3: ['6', 'hello', 'foo', 'baz']
                };
                expect(utilHelper.swapObjectKeysAndValues(input)).toEqual(expected);
            });

            it('should coerce types and swap values accordingly', () => {
                const input = {
                    6: 3,
                    hello: '3',
                    foo: 3,
                    baz: 3.0
                };
                const expected = {
                    3: ['6', 'hello', 'foo', 'baz']
                };
                expect(utilHelper.swapObjectKeysAndValues(input)).toEqual(expected);
            });
        });
    });
});
