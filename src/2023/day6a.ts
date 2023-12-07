import loadInputAsString from '../shared/loadInputAsString.ts';

async function run() {
    const input = await loadInputAsString('./input/2023/day6.txt');
    const [timesLine, distancesLine] = input.split('\n');
    const times = [...timesLine.matchAll(/(\d+)/g)].map((time) => parseInt(time[0], 10));
    const records = [...distancesLine.matchAll(/(\d+)/g)].map((time) => parseInt(time[0], 10));

    const longerDistancesPerTime = times.map((time, timeIndex) => {
        const longerDistances: Array<number> = [];
        for (let i = 0; i < time; i++) {
            if (i * (time - i) > records[timeIndex]) {
                longerDistances.push(i);
            }
        }

        return longerDistances;
    });

    const totalWays = longerDistancesPerTime.reduce((acc, longerDistances) => {
        if (acc === 0) {
            return longerDistances.length;
        }

        return acc * longerDistances.length;
    }, 0);

    console.log('Day 6 part 1: ', totalWays);
}

run();
