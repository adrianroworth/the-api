// const utilHelper = require('./helpers/utilHelper');

function createHandsData() {
    // returns an object.
    // object key is the card value.
    // object value is the number of times the card
    // value appears in the game (of the 7 cards).
    function getCardQuantities(cards) {
        const cardQuanities = {};
        cards.forEach(card => {
            cardQuanities[card.cardValue] = cardQuanities[card.cardValue]
                ? cardQuanities[card.cardValue] + 1
                : 1;
        });
        return cardQuanities;
    }

    // returns an object.
    // object key is the card suit.
    // object value is the number of times the card
    // suit appears in the game (of the 7 cards).
    function getCardSuits(cards) {
        const cardSuits = {};
        cards.forEach(card => {
            cardSuits[card.cardSuit] = cardSuits[card.cardSuit] ? cardSuits[card.cardSuit] + 1 : 1;
        });
        return cardSuits;
    }

    function sortCardsByCardValue(cards, acesHigh = true) {
        const sortedCards = cards.sort(function compare(a, b) {
            if (acesHigh && a.cardValue === 1) {
                return 1;
            }
            if (acesHigh && b.cardValue === 1) {
                return -1;
            }
            if (a.cardValue > b.cardValue) {
                return 1;
            }
            if (a.cardValue < b.cardValue) {
                return -1;
            }
            return 0;
        });

        return sortedCards;
    }

    // sort order:
    // spades, hearts, diamonds, clubs.
    function sortCardsByCardSuit(cards) {
        const suitOrder = {
            spades: 4,
            hearts: 3,
            diamonds: 2,
            clubs: 1
        };
        const sortedCards = cards.sort(function compare(a, b) {
            if (suitOrder[a.cardSuit] > suitOrder[b.cardSuit]) {
                return 1;
            }
            if (suitOrder[a.cardSuit] < suitOrder[b.cardSuit]) {
                return -1;
            }
            return 0;
        });

        return sortedCards;
    }

    function getCardsGroupedByValue(playerCards, cardQuantity) {
        const cardsClone = playerCards.slice(0);
        const cardValues = []; // a list of all the card values that there are 'cardQuanity' of.
        const set = [];

        const cardQuantityLookup = getCardQuantities(cardsClone);

        // get all the card values that there are more than 'cardQuantity - 1' of.
        // i.e. 'cardQuantity' or more.
        Object.keys(cardQuantityLookup).forEach(cardValue => {
            if (cardQuantityLookup[cardValue] > cardQuantity - 1) {
                cardValues.push(Number.parseInt(cardValue, 10));
            }
        });

        // are there any pairs?
        if (cardValues.length) {
            // descending order.
            cardValues.sort((a, b) => a - b).reverse();
            cardValues.forEach(cardValue => {
                const anotherSet = [];
                cardsClone.forEach(card => {
                    // iterate through the 'cardValues' and push the
                    // corresponding cards to an array that will end of being
                    // a length of 'cardQuantity'.
                    if (
                        anotherSet.length !== cardQuantity &&
                        card.cardValue === Number.parseInt(cardValue, 10)
                    ) {
                        anotherSet.push(card);
                    }
                });
                // then push that array of cards to the array of sets.
                set.push(anotherSet);
            });
        }

        return set;
    }

    // if the cards passed in via the 'cardsClone' parameter contain
    // a flush, then the flush is returned.
    // Returns an array of cards.
    // if no flush in found, then the boolean value 'false' is returned.
    function getFlush(cardsClone) {
        let flushedSuit; // the name of the suit in the flush.
        const cardSuitLookup = getCardSuits(cardsClone);
        const set = [];

        Object.keys(cardSuitLookup).forEach(cardSuit => {
            if (cardSuitLookup[cardSuit] > 4) {
                flushedSuit = cardSuit;
            }
        });

        if (flushedSuit) {
            cardsClone.forEach(card => {
                if (card.cardSuit.toLowerCase() === flushedSuit.toLowerCase()) {
                    set.push(card);
                }
            });
        }

        if (set.length) {
            // return last 5 items in the array as they will be of the highest value.
            return set.slice(-5);
        }

        return false;
    }

    const hands = {
        'high-card': {
            name: 'High Card',
            description: 'Card with the highest value',
            precedence: 0,
            rule: playerCards => {
                const cardsClone = playerCards.slice(0);
                const set = [];
                // get the last item of the sorted array because that
                // will have the highest value.
                set.push(cardsClone.pop());
                const description = `High ${set[0].cardName}`;

                return {
                    cards: {
                        best: set[0],
                        all: set
                    },
                    description
                };
            }
        },
        pair: {
            name: 'Pair',
            description: 'Two cards with the same value',
            precedence: 1,
            rule: playerCards => {
                const set = getCardsGroupedByValue(playerCards, 2);

                if (set.length) {
                    const description = `Pair of ${set[0][0].cardName}s`;
                    return {
                        cards: {
                            best: set[0],
                            all: set
                        },
                        description
                    };
                }
                return false;
            }
        },
        'two-pairs': {
            name: 'Two Pairs',
            description: 'Two times two cards with the same value',
            precedence: 2,
            rule: playerCards => {
                // get all pairs. piggy-back off of the pair rule function.
                let pairs = hands.pair.rule(playerCards);
                // if there are pairs.
                if (pairs && pairs.cards && pairs.cards.all && pairs.cards.all.length > 1) {
                    const set = [];
                    pairs = pairs.cards.all;
                    // the pairs will be in descending order (this is done
                    // in the "pair" rule function).
                    // iterate through all the pairs and create an array with
                    // that pair and the next pair in it. add this array to
                    // the set and carry on.
                    // this will ensure that there is a list of the best pairs
                    // that are in your hand. there is no need to group a pair
                    // with another pair that is not the next best value pair *.
                    // e.g. if you had a pair of 4s, 7s, and 10s.
                    // [[2, 2], [4, 4], [7, 7], [10, 10]];
                    // the resulting set would be:
                    // [
                    //      [[2, 2], [4, 4]],
                    //      [[4, 4], [7, 7]],
                    //      [[7, 7], [10, 10]]
                    // ]
                    //
                    // * using the above example, there would be no need
                    // to create a pair of 2s and 10s because that would
                    // be beaten by the pair of 7s, and 10s which you
                    // already have.

                    for (let i = 0; i < pairs.length - 1; i += 1) {
                        const pair = [pairs[i], pairs[i + 1]];
                        set.push(pair);
                    }
                    if (set.length) {
                        // eslint-disable-next-line prettier/prettier
                        const description = `Pair of ${set[0][0][0].cardName}s, and pair of ${set[0][1][0].cardName}s`;
                        return {
                            cards: {
                                best: set[0],
                                all: set
                            },
                            description
                        };
                    }
                }
                return false;
            }
        },
        'three-of-a-kind': {
            name: 'Three Of A Kind',
            description: 'Three cards with the same value',
            precedence: 3,
            rule: playerCards => {
                const set = getCardsGroupedByValue(playerCards, 3);

                if (set.length) {
                    const description = `3 ${set[0][0].cardName}s`;
                    return {
                        cards: {
                            best: set[0],
                            all: set
                        },
                        description
                    };
                }
                return false;
            }
        },
        straight: {
            name: 'Straight',
            description:
                'Sequence of 5 cards in increasing value (Ace can precede 2 and follow up King)',
            precedence: 4,
            rule: playerCards => {
                const cardsClone = playerCards.slice(0);
                let set = [];
                let cardsContainAce = false;
                let aceCard;

                // check to see if the set of cards contains
                // an ace.
                cardsClone.forEach(card => {
                    if (card.cardValue === 1) {
                        cardsContainAce = true;
                        aceCard = card;
                    }
                });

                // add a duplicate of the ace card to the
                // start of the array. The reason for this
                // is so we can test for ace-low, and
                // ace-high straights in a single loop.
                if (cardsContainAce) {
                    cardsClone.unshift(aceCard);
                }

                // reverse the array so that we are checking for the
                // highest straight, as opposed to the lowest.
                // if we find consecutive numbers going in reverse we
                // will then reverse the result to be a increasing straight.
                cardsClone.reverse();

                cardsClone.forEach(card => {
                    // if we have already found a 'straight' then
                    // don't waste any more time looping.
                    if (set.length === 5) {
                        return;
                    }

                    // if there is nothing in the set, then add the
                    // first item and go from there.
                    if (!set.length) {
                        set.push(card);
                    }

                    // if the the last card in the set array's value
                    // is 1 more than the current card value.
                    // i.e. if they are consecutive integers.
                    // OR if the cards are 13, and 1 to cater for
                    // ace-high scenarios.
                    if (
                        set[set.length - 1].cardValue - card.cardValue === 1 ||
                        (set[set.length - 1].cardValue === 1 && card.cardValue === 13)
                    ) {
                        // add it to the array
                        set.push(card);
                    } else {
                        // otherwise start again.
                        set = [];
                        set.push(card);
                    }
                });

                if (set.length && set.length === 5) {
                    // put the cards back in numerical order.
                    set.reverse();
                    const description = `${set[4].cardName}-high straight`;
                    return {
                        cards: {
                            best: set, // the array of five cards.
                            all: [set] // "all" needs to be an array of sets. so put the array in an array.
                        },
                        description
                    };
                }
                return false;
            }
        },
        flush: {
            name: 'Flush',
            description: '5 cards of the same suit',
            precedence: 5,
            rule: playerCards => {
                const sets = [];
                const cardsClone = playerCards.slice(0);

                // get the flush (if it exists).
                const flushSet = getFlush(cardsClone);

                // is there a flush in the hand?
                if (flushSet) {
                    sets.push(flushSet);
                }

                if (sets.length) {
                    const description = `${sets[0][4].cardName}-high flush`;
                    return {
                        cards: {
                            best: sets[0],
                            all: sets
                        },
                        description
                    };
                }
                return false;
            }
        },
        'full-house': {
            name: 'Full House',
            description: 'Combination of three of a kind and a pair',
            precedence: 6,
            rule: playerCards => {
                const cardsClone = playerCards.slice(0);
                const threeOfAKind = hands['three-of-a-kind'].rule(cardsClone.slice(0));
                let pair = hands.pair.rule(cardsClone.slice(0));
                const sets = [];

                if (!threeOfAKind || !pair) {
                    return false;
                }

                const threeOfAKindValue = threeOfAKind.cards.best[0].cardValue;
                let pairValue = pair.cards.best[0].cardValue;

                // the full house can't consist of all the same suit.
                if (pairValue === threeOfAKindValue) {
                    const allPairs = pair.cards.all;
                    // start all the second pair because we already know the
                    // first one has the same suit as the three of a kind.
                    for (let i = 1; i < allPairs.length; i += 1) {
                        // different suits?
                        if (allPairs[i][0].cardValue !== threeOfAKindValue) {
                            pair = allPairs[i];
                            pairValue = pair[0].cardValue;
                            break;
                        }
                    }
                    // if they still match, just return.
                    if (pairValue === threeOfAKindValue) {
                        return false;
                    }
                }

                const fullhouse = threeOfAKind.cards.best.concat(pair);
                sets.push(fullhouse);

                if (sets[0].length) {
                    // eslint-disable-next-line prettier/prettier
                    const description = `Full house, ${sets[0][0].cardName}s full of ${sets[0][4].cardName}s`;
                    return {
                        cards: {
                            best: sets[0],
                            all: sets
                        },
                        description
                    };
                }
                return false;
            }
        },
        'four-of-a-kind': {
            name: 'Four Of A Kind',
            description: 'Four cards of the same value',
            precedence: 7,
            rule: playerCards => {
                const set = getCardsGroupedByValue(playerCards, 4);

                if (set.length) {
                    const description = `4 ${set[0][0].cardName}s`;
                    return {
                        cards: {
                            best: set[0],
                            all: set
                        },
                        description
                    };
                }
                return false;
            }
        },
        'straight-flush': {
            name: 'Straight Flush',
            description: 'Straight of the same suit',
            precedence: 8,
            rule: playerCards => {
                const cardsClone = playerCards.slice(0);
                const straight = hands.straight.rule(cardsClone.slice(0));
                const sets = [];

                // if it isn't a straight, then don't waste any more time on it.
                if (!straight) {
                    return false;
                }

                // are the cards in the straight also a flush?
                const straightFlush = getFlush(straight.cards.best);

                // no flush, no mush!
                if (!straightFlush) {
                    return false;
                }

                // if we are here then it must be both a straight
                // and a flush. All good!
                sets.push(straightFlush);

                if (sets.length) {
                    const description = `${sets[0][4].cardName}-high straight flush`;
                    return {
                        cards: {
                            best: sets[0],
                            all: sets
                        },
                        description
                    };
                }
                return false;
            }
        },
        'royal-flush': {
            name: 'Royal Flush',
            description: 'Straight flush from Ten to Ace',
            precedence: 9,
            rule: playerCards => {
                let cardsClone = playerCards.slice(0);
                const flush = hands.flush.rule(cardsClone.slice(0));
                // the 'straight'-finding logic relies on the card value only. so if there are 2 cards
                // with the same value, but different suit, then they will produce the same
                // resulting 'straight'. i.e. a ten of clubs, and a ten of hearts will
                // give the same resulting straight "strength". The royal flush logic also
                // relies on this 'straight' logic (and the flush logic) due to this being "DRY". for a royal
                // flush to be found, we  need to have the cards have all the same suit (a flush), and all
                // the cards to be the values 10 through ace. If the flush that is found does not have all
                // of the same suit, then the royal flush would never be found. e.g:
                // if we had these cards:
                // ['1-s', '10-s', '13-c', '13-s', '5-h', '12-s', '11-s']
                // then a straight containing ['10-s', '11-s'. '12-s', '13-c' '1-s'] would
                // be found. This is because it was originally only sorted by card value, and did not consider
                // card suit. Given that the '13-c' card precedes the '13-s', the '13-c' card is first first and
                // is then added to the resulting straight. This poses a problem when trying to find a royal
                // flush, for example, because even though the cards contained a royal flush, the 'straight' logic
                // fail to find a 1-suit straight.
                // The solution to this issue is to also sort by card suit, this way the cards are automatically
                // going to fall in to suit and value order.
                cardsClone = sortCardsByCardSuit(cardsClone.slice(0));
                const straight = hands.straight.rule(cardsClone.slice(0));
                const sets = [];

                // if it isn't a straight flush, then don't waste any more time on it.
                if (!straight || !flush) {
                    return false;
                }

                // the above condition is met so it must be a straight AND a flush.
                // rename it for readability.
                const straightFlush = straight;
                const cardQuanities = getCardQuantities(straightFlush.cards.best);

                // does the straight flush contain a 10 through ace?
                if (
                    cardQuanities['10'] &&
                    cardQuanities['11'] &&
                    cardQuanities['12'] &&
                    cardQuanities['13'] &&
                    cardQuanities['1']
                ) {
                    // add the royal flush to the result.
                    sets.push(straightFlush.cards.best);
                }
                if (sets.length) {
                    const description = `Royal flush`;
                    return {
                        cards: {
                            best: sets[0],
                            all: sets
                        },
                        description
                    };
                }
                return false;
            }
        }
    };

    return Object.freeze({
        hands,
        helpers: {
            sortCardsByCardValue,
            sortCardsByCardSuit,
            getCardQuantities
        }
    });
}

module.exports = createHandsData;
