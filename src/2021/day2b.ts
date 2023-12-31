import loadInputAsLines from '../shared/loadInputAsLines.ts';

async function run() {
    const input = await loadInputAsLines('./input/2021/day2.txt');

    let aim = 0;
    let horizontal = 0;
    let depth = 0;

    input.forEach((line) => {
        const [direction, value] = line.split(' ');
        switch (direction) {
            case 'forward':
                horizontal += parseInt(value);
                depth += aim * parseInt(value);
                break;

            case 'down':
                aim += parseInt(value);
                break;

            case 'up':
                aim -= parseInt(value);
                break;

            default:
                throw new Error('Fucking hell, idiot');
        }
    });

    console.log(`Day 2b: ${horizontal} x ${depth} = ${horizontal * depth}`);
}

run();
