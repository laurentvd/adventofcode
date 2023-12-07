import loadInputAsString from '../shared/loadInputAsString.ts';

type ParsedMaps = Record<
    string,
    Array<{
        destinationStart: number;
        sourceStart: number;
        range: number;
    }>
>;

type SeedRange = {
    start: number;
    range: number;
};

const mapKeysInOrder = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
];

const lowestValue = (arr: Array<number>) => {
    let lowest = arr[0];
    arr.forEach((num) => {
        if (num < lowest) {
            lowest = num;
        }
    });

    return lowest;
};

const createRange = (seedRange: SeedRange) => {
    const range = [];
    for (let i = seedRange.start; i < seedRange.start + seedRange.range; i++) {
        range.push(i);
    }
    return range;
};

const parseSeeds = (input: string) => {
    const [firstLine] = input.split('\n');
    const [_, ...seedRanges] = firstLine.split(' ').map((num) => parseInt(num, 10));

    let seeds: Array<SeedRange> = [];

    for (let i = 0; i < seedRanges.length; i += 2) {
        const start = seedRanges[i];
        const range = seedRanges[i + 1];

        seeds = [...seeds, { start, range: range }];
    }

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
    const seedRanges = parseSeeds(input);
    const parsedMaps = parseMaps(input);

    const convertedSeedsOfAllRanges = seedRanges.map((seedRange, index) => {
        console.log('Starting on range', index, new Date());
        let lowest = Number.MAX_VALUE;
        for (let seed = seedRange.start; seed < seedRange.start + seedRange.range; seed++) {
            for (const mapKey of mapKeysInOrder) {
                const map = parsedMaps[mapKey];

                // Find the map with the correct range
                const rangeMapping = map.find((rangeMapping) => {
                    return (
                        rangeMapping.sourceStart <= seed &&
                        seed < rangeMapping.sourceStart + rangeMapping.range
                    );
                });

                if (!rangeMapping) {
                    if (seed < lowest) {
                        lowest = seed;
                    }
                    continue;
                }

                const diffSourceDest = rangeMapping.destinationStart - rangeMapping.sourceStart;
                const newSeed = seed + diffSourceDest;

                if (newSeed < lowest) {
                    lowest = newSeed;
                }
            }
        }

        return lowest;
    });

    console.log('Day 5 part 2: ', lowestValue(convertedSeedsOfAllRanges));
}

run();
