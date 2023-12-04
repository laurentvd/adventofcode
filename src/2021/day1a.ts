import loadInput from '../shared/loadInput.ts';

async function run() {
    const input = await loadInput('./input/2021/day1.txt');

    let higherCount = 0;
    for (let i = 1; i < input.length; i++) {
        if (parseInt(input[i]) > parseInt(input[i - 1])) {
            higherCount++;
        }
    }

    console.log(`Day 1a: ${higherCount}`);
}

run();
