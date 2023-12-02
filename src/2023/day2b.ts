import loadInput from '../shared/loadInput.ts';

type Set = { red: number; green: number; blue: number };

const parseDraw = (draw: string) => {
    const cubes = draw.split(', ');
    const set: Set = { red: 0, green: 0, blue: 0 };

    cubes.forEach((cube) => {
        const [number, color] = cube.split(' ');
        set[color as keyof Set] = parseInt(number);
    });

    return set;
};

const parseDraws = (draws: string) => {
    return draws.split('; ').map(parseDraw);
};

const reduceMaxSet = (draws: Set[]): Set => {
    const max: Set = { red: 0, green: 0, blue: 0 };

    draws.forEach((draw) => {
        Object.keys(draw).forEach((color) => {
            max[color as keyof Set] = Math.max(
                max[color as keyof Set],
                draw[color as keyof Set]
            );
        });
    });

    return max;
};

async function run() {
    const input = await loadInput('./input/2023/day2.txt');

    const games = input.map((line) => {
        const [game, draws] = line.split(': ');
        const parsedDraws = parseDraws(draws);
        const maxSet = reduceMaxSet(parsedDraws);

        return maxSet.red * maxSet.green * maxSet.blue;
    });

    const sum = games.reduce((acc, id) => acc + id, 0);
    console.log(sum);
}

run();
