import loadInput from '../shared/loadInput.ts';

async function run() {
    const input = await loadInput('./input/2021/day2.txt');

    let horizontal = 0;
    let depth = 0;

    input.forEach((line) => {
        const [direction, value] = line.split(' ');
        switch (direction) {
            case 'forward':
                horizontal += parseInt(value);
                break;

            case 'down':
                depth += parseInt(value);
                break;

            case 'up':
                depth -= parseInt(value);
                break;

            default:
                throw new Error('Fucking hell, idiot');
        }
    });

    console.log(`Day 2a: ${horizontal} x ${depth} = ${horizontal * depth}`);
}

run();
