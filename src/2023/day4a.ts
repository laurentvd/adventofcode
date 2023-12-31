import loadInputAsLines from '../shared/loadInputAsLines.ts';

const stringToNumbersArray = (str: string) =>
    str
        .split(' ')
        .map((n) => parseInt(n, 10))
        .filter((n) => !isNaN(n));

async function run() {
    const input = await loadInputAsLines('./input/2023/day4.txt');
    const pointsPerCard = input.map((line) => {
        const [id, numbers] = line.split(': ');
        const [winningNumbersStr, allNumbersStr] = numbers.split(' | ');
        const winningNumbers = stringToNumbersArray(winningNumbersStr);
        const allNumbers = stringToNumbersArray(allNumbersStr);

        const matchingNumbers = allNumbers.filter((n) => winningNumbers.includes(n));
        if (matchingNumbers.length <= 1) {
            return matchingNumbers.length;
        }

        return 2 ** (matchingNumbers.length - 1);
    });

    console.log(
        'Day 4 part 1: ',
        pointsPerCard.reduce((a, b) => a + b, 0)
    );
}

run();
