import loadInput from '../shared/loadInput.ts';

const numbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
};

const firstNumber = (line: string) => {
    let lowestIndex = line.length;
    let value = -1;

    Object.keys(numbers).forEach((number) => {
        const index = line.indexOf(number);

        if (index >= 0 && index < lowestIndex) {
            lowestIndex = index;
            value = numbers[number as keyof typeof numbers];
        }
    });

    return value;
};

const lastNumber = (line: string) => {
    let highestIndex = -1;
    let value = -1;

    Object.keys(numbers).forEach((number) => {
        const index = line.lastIndexOf(number);

        if (index >= 0 && index > highestIndex) {
            highestIndex = index;
            value = numbers[number as keyof typeof numbers];
        }
    });

    return value;
};

async function run() {
    const input = await loadInput('./input/2023/day1.txt');

    const digits = input.map((line) => {
        let firstDigit = firstNumber(line);
        let lastDigit = lastNumber(line);

        return parseInt(`${firstDigit}${lastDigit}`);
    });

    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    console.log(sum);
}

// 54530

run();
