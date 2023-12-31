import loadInputAsLines from '../shared/loadInputAsLines.ts';

function sumPreviousThree(input: Array<number>, index: number): number {
    if (index < 2) {
        throw new Error('Seriously dude');
    }

    return input[index - 1] + input[index - 2] + input[index];
}

async function run() {
    const input = await loadInputAsLines('./input/2021/day1.txt');
    const inputInts = input.map((v) => parseInt(v));

    let higherCount = 0;
    for (let i = 3; i < inputInts.length; i++) {
        if (sumPreviousThree(inputInts, i) > sumPreviousThree(inputInts, i - 1)) {
            higherCount++;
        }
    }

    console.log(`Day 1b: ${higherCount}`);
}

run();
