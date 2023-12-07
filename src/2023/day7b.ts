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

const determineCombinationType = (cards: Card[]): CombinationType => {
    const jokerCards = cards.filter((card) => card === 'J').length;

    const countPerCard = cards.reduce(
        (acc, card) => {
            if (card === 'J') {
                acc[card] = (acc[card] || 0) + 1;
            } else {
                acc[card] = (acc[card] || jokerCards) + 1;
            }

            return acc;
        },
        {} as Record<Card, number>
    );

    const counts = Object.values(countPerCard);
    if (counts.includes(5)) {
        return CombinationType.FiveOfAKind;
    }

    if (counts.includes(4)) {
        return CombinationType.FourOfAKind;
    }

    if (counts.includes(3) && counts.includes(2)) {
        return CombinationType.FullHouse;
    }

    if (counts.includes(3)) {
        return CombinationType.ThreeOfAKind;
    }

    if (counts.filter((count) => count === 2).length === 2) {
        return CombinationType.TwoPairs;
    }

    if (counts.includes(2)) {
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
