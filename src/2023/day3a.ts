import loadInput from '../shared/loadInput.ts';

type IndexTuple = [number, number];
type Analysis = LineAnalysis[];

type LineAnalysis = {
    numberIndexes: IndexTuple[];
    symbolIndexes: IndexTuple[];
};

const numberMatch = /(\d+)/g;
const symbolMatch = /([^\d.])/g;

const unique = <T extends IndexTuple>(array: T[]): T[] => {
    return array.filter((value, index) => {
        return !array.find((other, index2) => {
            if (index <= index2) {
                return false;
            }

            return value[0] === other[0] && value[1] === other[1];
        });
    });
};

const filterAdjacentIndexes = (indexes: IndexTuple[], otherIndexes: IndexTuple[]): IndexTuple[] => {
    return indexes.filter((index) => {
        let [start, end] = index;

        if (start > 0) {
            start--;
        }

        end++;

        return otherIndexes.some(([otherStart, otherEnd]) => {
            if (otherStart <= start) {
                return otherEnd >= start;
            } else {
                return otherStart <= end;
            }
        });
    });
};

const filterNumberIndexesAdjacentToSymbol = (analysis: Analysis): IndexTuple[] => {
    const filtered: IndexTuple[] = [];

    for (let rowIndex = 0; rowIndex < analysis.length; rowIndex++) {
        const currentRow = analysis[rowIndex];
        const previousRow = analysis[rowIndex - 1] ?? undefined;
        const nextRow = analysis[rowIndex + 1] ?? undefined;

        // Check which numbers are adjacent to symbols in the current row
        const matching = filterAdjacentIndexes(currentRow.numberIndexes, currentRow.symbolIndexes);

        // Check which numbers are adjacent to symbols in the next row
        const matchingNext = nextRow
            ? filterAdjacentIndexes(currentRow.numberIndexes, nextRow.symbolIndexes)
            : [];

        // Check which numbers are adjacent to symbols in the previous row
        const matchingPrevious = previousRow
            ? filterAdjacentIndexes(currentRow.numberIndexes, previousRow.symbolIndexes)
            : [];

        const all = [...matching, ...matchingNext, ...matchingPrevious];

        filtered.push(unique(all));
    }

    return filtered;
};

const indexesForRegex = (regex: RegExp, line: string): IndexTuple[] => {
    const matches = [...line.matchAll(regex)];

    return matches.map((match) => [match.index, match.index! + match[0].length - 1] as IndexTuple);
};

async function run() {
    const input = await loadInput('./input/2023/day3simple.txt');

    const analysis: Analysis = input.map((line): LineAnalysis => {
        const numberIndexes = indexesForRegex(numberMatch, line);
        const symbolIndexes = indexesForRegex(symbolMatch, line);

        return { numberIndexes, symbolIndexes };
    });

    const filteredAnalysis: Analysis = filterNumberIndexesAdjacentToSymbol(analysis);

    // console.log(filteredAnalysis);

    // const sum = analysis.reduce((acc, value) => acc + value.sum, 0);
    // console.log(sum);
}

run();
