import loadInputAsString from '../shared/loadInputAsString.ts';

type ParsedMaps = Record<
    string,
    Array<{
        destinationStart: number;
        sourceStart: number;
        range: number;
    }>
>;

const mapKeysInOrder = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
];

const parseSeeds = (input: string) => {
    const [firstLine] = input.split('\n');
    const [_, ...seeds] = firstLine.split(' ').map((num) => parseInt(num, 10));

    return seeds;
};

const parseMaps = (input: string): ParsedMaps => {
    const maps = input.split('\n\n');
    const parsedMaps: ParsedMaps = {};
    maps.forEach((map) => {
        const [key, value] = map.split(':');
        const [id] = key.split(' ');

        if (id === 'seeds') {
            return;
        }

        parsedMaps[id] = value
            .split('\n')
            .map((line) => line.trim())
            .filter((x) => !!x)
            .map((ranges) => {
                const [destinationStart, sourceStart, range] = ranges
                    .split(' ')
                    .map((num) => parseInt(num.trim(), 10));

                return { destinationStart, sourceStart, range };
            });
    });

    return parsedMaps;
};

async function run() {
    const input = await loadInputAsString('./input/2023/day5.txt');
    const seeds = parseSeeds(input);
    const parsedMaps = parseMaps(input);

    const convertedSeeds = seeds.map((seed) => {
        return mapKeysInOrder.reduce((seed, mapKey) => {
            const map = parsedMaps[mapKey];

            // Find the map with the correct range
            const rangeMapping = map.find((rangeMapping) => {
                return (
                    rangeMapping.sourceStart <= seed &&
                    seed < rangeMapping.sourceStart + rangeMapping.range
                );
            });

            if (!rangeMapping) {
                return seed;
            }

            const diffSourceDest = rangeMapping.destinationStart - rangeMapping.sourceStart;

            return seed + diffSourceDest;
        }, seed);
    });

    console.log('Day 5 part 1: ', Math.min(...convertedSeeds));
}

run();
