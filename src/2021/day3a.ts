import loadInput from "../shared/loadInput.ts";

const arrayOfBinaryNumbersToDecimalNumber = (arrayOfBinaryNumbers: number[]) => {
    return arrayOfBinaryNumbers.reduce((acc, curr) => {
        return acc * 2 + curr;
    }, 0);
};

async function run() {
    const input = await loadInput('./2021/input/day3.txt');

    const oneCountPerPosition: { [index: string]: number } = Object.assign({}, input[0].split('').map(() => 0));

    input.forEach(line => {
        line.split('').map((char, index) => {
            oneCountPerPosition[index] += char === '1' ? 1 : 0;
        });
    });

    const halfLines = Math.round(input.length / 2);

    const gamma = Object.values(oneCountPerPosition).map(value => value >= halfLines ? 1 : 0);
    const epsilon = Object.values(oneCountPerPosition).map(value => value >= halfLines ? 0 : 1);

    const gammaDecimal = arrayOfBinaryNumbersToDecimalNumber(gamma);
    const epsilonDecimal = arrayOfBinaryNumbersToDecimalNumber(epsilon);

    console.log(`Day 3a: ${gammaDecimal * epsilonDecimal}`);
}

run();