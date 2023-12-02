import loadInput from '../shared/loadInput.ts';

type Set = { red: number; green: number; blue: number };

const maxCubes: Set = { red: 12, green: 13, blue: 14 };

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

const drawsArePossible = (draws: Set[], maxCubes: Set) => {
    return draws.every((draw) => {
        return Object.keys(draw).every((color) => {
            return draw[color as keyof Set] <= maxCubes[color as keyof Set];
        });
    });
};

async function run() {
    const input = await loadInput('./input/2023/day2.txt');

    const games = input.map((line) => {
        const [game, draws] = line.split(': ');
        const parsedDraws = parseDraws(draws);

        if (drawsArePossible(parsedDraws, maxCubes)) {
            return parseInt(game.split(' ')[1]);
        }

        return 0;
    });

    const sum = games.reduce((acc, id) => acc + id, 0);
    console.log(sum);
}

run();
