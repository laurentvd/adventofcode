import loadInput from '../shared/loadInput.ts';

const isNumber = (char: string): boolean => {
    return !isNaN(parseInt(char));
};

const isSymbol = (char: string): boolean => {
    return char !== '.' && !isNumber(char);
};

const hasAdjacentSymbol = (
    rowIndex: number,
    charIndex: number,
    input: string[]
): boolean => {
    for (
        let i = Math.max(0, rowIndex - 1);
        i <= Math.min(rowIndex + 1, input.length - 1);
        i++
    ) {
        const row = input[i];
        for (
            let j = Math.max(0, charIndex - 1);
            j <= Math.min(charIndex + 1, row.length - 1);
            j++
        ) {
            const char = row[j];
            if (isSymbol(char)) {
                return true;
            }
        }
    }

    return false;
};

async function run() {
    const input = await loadInput('./input/2023/day3.txt');
    const numbers: Array<number> = [];

    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
        const line = input[rowIndex];
        let numberStart: number | undefined = undefined;
        let foundAdjacentSymbol = false;

        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            const isNum = isNumber(char);

            // End of number sequence
            if (numberStart !== undefined && !isNum) {
                const number = line.slice(numberStart, charIndex);
                if (foundAdjacentSymbol) {
                    numbers.push(parseInt(number));
                }

                // Start new number sequence
                numberStart = undefined;
                foundAdjacentSymbol = false;
            }

            if (!isNumber(char)) {
                continue;
            }

            numberStart = numberStart ?? charIndex;
            if (!foundAdjacentSymbol) {
                if (hasAdjacentSymbol(rowIndex, charIndex, input)) {
                    foundAdjacentSymbol = true;
                }
            }
        }

        if (numberStart !== undefined) {
            const number = line.slice(numberStart);
            if (foundAdjacentSymbol) {
                numbers.push(parseInt(number));
            }
        }
    }

    console.log(numbers.reduce((a, b) => a + b, 0));
}

run();
