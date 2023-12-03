import loadInput from '../shared/loadInput.ts';

const isNumber = (char: string): boolean => {
    return !isNaN(parseInt(char));
};

const hasAdjacentAsterisk = (
    rowIndex: number,
    charIndex: number,
    input: string[]
): [number, number] | undefined => {
    for (let i = Math.max(0, rowIndex - 1); i <= Math.min(rowIndex + 1, input.length - 1); i++) {
        const row = input[i];
        for (
            let j = Math.max(0, charIndex - 1);
            j <= Math.min(charIndex + 1, row.length - 1);
            j++
        ) {
            const char = row[j];
            if (char === '*') {
                return [i, j];
            }
        }
    }

    return undefined;
};

async function run() {
    const input = await loadInput('./input/2023/day3.txt');
    const numbers: Array<number> = [];
    const asteriskPositions: Record<string, number> = {};

    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        const line = input[rowIndex];
        let numberStart: number | undefined = undefined;
        let adjacentAsteriskCoordinates = undefined;

        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            const isNum = isNumber(char);

            // End of number sequence
            if (numberStart !== undefined && !isNum) {
                const number = line.slice(numberStart, charIndex);
                if (adjacentAsteriskCoordinates !== undefined) {
                    const key = `${adjacentAsteriskCoordinates[0]},${adjacentAsteriskCoordinates[1]}`;

                    if (asteriskPositions[key] !== undefined) {
                        console.log(`${asteriskPositions[key]} * ${parseInt(number)}`);

                        numbers.push(asteriskPositions[key] * parseInt(number));
                        // continue;
                    }

                    asteriskPositions[key] = parseInt(number);
                }

                // Start new number sequence
                numberStart = undefined;
                adjacentAsteriskCoordinates = undefined;
            }

            if (!isNumber(char)) {
                continue;
            }

            numberStart = numberStart ?? charIndex;
            if (!adjacentAsteriskCoordinates) {
                const asteriskPosition = hasAdjacentAsterisk(rowIndex, charIndex, input);

                if (asteriskPosition !== undefined) {
                    adjacentAsteriskCoordinates = asteriskPosition;
                }
            }
        }

        if (numberStart !== undefined) {
            const number = line.slice(numberStart);
            if (adjacentAsteriskCoordinates !== undefined) {
                const key = `${adjacentAsteriskCoordinates[0]},${adjacentAsteriskCoordinates[1]}`;

                if (asteriskPositions[key] !== undefined) {
                    numbers.push(asteriskPositions[key] * parseInt(number));
                    continue;
                }

                asteriskPositions[key] = parseInt(number);
            }
        }
    }

    console.log(numbers.reduce((a, b) => a + b, 0));
}

run();
