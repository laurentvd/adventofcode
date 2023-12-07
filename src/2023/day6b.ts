import loadInputAsString from '../shared/loadInputAsString.ts';

async function run() {
    const input = await loadInputAsString('./input/2023/day6.txt');
    const [timesLine, distancesLine] = input.split('\n');
    const time = parseInt(
        [...timesLine.matchAll(/(\d+)/g)].map((time) => time[0].trim()).join('')
    );
    const record = parseInt(
        [...distancesLine.matchAll(/(\d+)/g)]
            .map((distance) => distance[0].trim())
            .join('')
    );

    let longerDistances = 0;
    for (let i = 0; i < time; i++) {
        if (i * (time - i) > record) {
            longerDistances++;
        }
    }

    console.log('Day 6 part 2: ', longerDistances);
}

run();
