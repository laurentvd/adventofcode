import loadInput from '../shared/loadInput.ts';

const stringToNumbersArray = (str: string) =>
    str
        .split(' ')
        .map((n) => parseInt(n, 10))
        .filter((n) => !isNaN(n));

async function run() {
    const input = await loadInput('./input/2023/day4.txt');
    const scoresPerCard = input.map((line) => {
        const [id, numbers] = line.split(': ');
        const [winningNumbersStr, allNumbersStr] = numbers.split(' | ');
        const winningNumbers = stringToNumbersArray(winningNumbersStr);
        const allNumbers = stringToNumbersArray(allNumbersStr);

        const matchingNumbers = allNumbers.filter((n) => winningNumbers.includes(n));
        const score =
            matchingNumbers.length <= 1
                ? matchingNumbers.length
                : 2 ** (matchingNumbers.length - 1);

        return { matchingNumbers: matchingNumbers.length, score: score };
    });

    const countCardsRecursively = (cardIndex: number): number => {
        let count = 1;

        for (let j = cardIndex; j < cardIndex + scoresPerCard[cardIndex].matchingNumbers; j++) {
            count += countCardsRecursively(j + 1);
        }

        return count;
    };

    console.log(scoresPerCard.reduce((acc, cur, index) => acc + countCardsRecursively(index), 0));
}

run();
