import loadInputAsLines from '../shared/loadInputAsLines.ts';

const cards = [
    'A',
    'K',
    'Q',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    'J',
] as const;

type Card = (typeof cards)[number];

type CardCombination = [Card, Card, Card, Card, Card];

type CardCount = Record<Card, number>;

enum CombinationType {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPairs = 3,
    OnePair = 2,
    HighCard = 1,
}

type ValuedCombination = {
    type: CombinationType;
    cards: CardCombination;
    bid: number;
};

const parseCombination = (combination: string): CardCombination => {
    return combination
        .split('')
        .map((card) => card[0] as Card) as CardCombination;
};

const cardWithCountOf = (
    cardCount: CardCount,
    count: number,
    skip?: Card
): Card | undefined => {
    for (const cardCountKey in cardCount) {
        if (
            cardCount[cardCountKey as Card] === count &&
            cardCountKey !== skip
        ) {
            return cardCountKey as Card;
        }
    }

    return undefined;
};

const determineCombinationType = (cards: Card[]): CombinationType => {
    const countPerCardWithoutJoker: CardCount = {};
    const countPerCardWithJoker: CardCount = {};
    const jokerCards = cards.filter((card) => card === 'J').length;

    if (jokerCards === 5) {
        return CombinationType.FiveOfAKind;
    }

    cards.forEach((card) => {
        countPerCardWithoutJoker[card] =
            (countPerCardWithoutJoker[card] || 0) + 1;

        countPerCardWithJoker[card] =
            (countPerCardWithJoker[card] || jokerCards) + 1;

        countPerCardWithJoker['J'] = 0;
        countPerCardWithoutJoker['J'] = 0;
    });

    let card = cardWithCountOf(countPerCardWithJoker, 5);
    let secondaryCard: Card | undefined = undefined;
    if (card) {
        return CombinationType.FiveOfAKind;
    }

    card = cardWithCountOf(countPerCardWithJoker, 4);
    if (card) {
        return CombinationType.FourOfAKind;
    }

    card = cardWithCountOf(countPerCardWithJoker, 3);
    secondaryCard = cardWithCountOf(countPerCardWithoutJoker, 2, card);
    if (card && secondaryCard) {
        return CombinationType.FullHouse;
    }

    if (card) {
        return CombinationType.ThreeOfAKind;
    }

    card = cardWithCountOf(countPerCardWithJoker, 2);
    secondaryCard = cardWithCountOf(countPerCardWithoutJoker, 2, card);
    if (card && secondaryCard) {
        return CombinationType.TwoPairs;
    }

    if (card) {
        return CombinationType.OnePair;
    }

    return CombinationType.HighCard;
};

const firstIsBetterEqualCombination = (
    a: ValuedCombination,
    b: ValuedCombination
): boolean => {
    if (a.type !== b.type) {
        throw new Error('Combination types are not equal');
    }

    for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] === b.cards[i]) {
            continue;
        }

        return cards.indexOf(a.cards[i]) < cards.indexOf(b.cards[i]);
    }

    return false;
};

async function run() {
    const input = await loadInputAsLines('./input/2023/day7.txt');

    const parsedCombinations: ValuedCombination[] = input.map((line) => {
        const [cardsString, bidString] = line.split(' ');
        const combination = parseCombination(cardsString);

        return {
            cards: combination,
            type: determineCombinationType(combination),
            bid: parseInt(bidString, 10),
        };
    });

    parsedCombinations.sort((a, b) => {
        if (a.type === b.type) {
            return firstIsBetterEqualCombination(a, b) ? 1 : -1;
        }

        return a.type > b.type ? 1 : -1;
    });

    const totalWinnings = parsedCombinations.reduce(
        (acc, combination, index) => {
            const rank = index + 1;

            return acc + combination.bid * rank;
        },
        0
    );

    console.log('Day 7 part 2: ', totalWinnings);
}

run();
