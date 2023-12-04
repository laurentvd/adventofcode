import loadInput from '../shared/loadInput.ts';

const numbers = 'one two three four five six seven eight nine'.split(' ');
const regex = new RegExp(`(?=(${numbers.join('|')}|\\d))`, 'g');
const matchToDigit = (match: string) => {
    let digit = parseInt(match, 10);
    if (isNaN(digit)) {
        return numbers.indexOf(match) + 1;
    }

    return digit;
};

async function run() {
    const input = await loadInput('./input/2023/day1.txt');

    const digits = input.map((line) => {
        const matches = [...line.matchAll(regex)];
        const first = matchToDigit(matches[0][1]);
        const last = matchToDigit(matches[matches.length - 1][1]);

        return parseInt(`${first}${last}`);
    });

    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    console.log('Day 1 part 2: ', sum);
}

run();
