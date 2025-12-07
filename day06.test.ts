import { test } from "bun:test";
import fs from "fs";

const input = fs.readFileSync("./input/day06.txt", "utf8");

const rotateArray = (arr: any[][]): any[][] => {
    const rotated: any[][] = [];
    const rowCount = arr.length;
    const colCount = arr[0]!.length;

    for (let col = 0; col < colCount; col++) {
        const newRow: any[] = [];
        for (let row = rowCount - 1; row >= 0; row--) {
            newRow.push(arr[row]![col]!);
        }
        rotated.push(newRow);
    }

    return rotated;
};

test("day 6a", () => {
    let unrotated = input.split("\n").map(line => line.split(" ").map(char => char.trim()).filter(Boolean));
    const lines = rotateArray(unrotated);
    const count = lines.map((line) => {
        const operator = line.shift();
        const isMult = operator === "*";
        const operation = isMult ? (a: number, b: number) => a * b : (a: number, b: number) => a + b;

        return line.reduce((acc, val) => operation(acc, parseInt(val, 10)), isMult ? 1 : 0);
    }).reduce((a, b) => a + b, 0);

    console.log("Solution: ", count);
});

test("day 6b", () => {
    let lines = input.split("\n");
    const lastLine = lines[lines.length - 1]!;
    const [_, ...lengths] = (lastLine + ' ').split(/\+|\*/);

    let lastIndex = 0;
    const equations = lengths.map(len => {
        const equation = [...lines.map(line => line.substr(lastIndex, len.length))];
        lastIndex += len.length + 1;
        return equation;
    });

    const solution = equations.map(equationLines => {
        const operator = equationLines.pop()!.trim();
        const isMult = operator === "*";
        const operation = isMult ? (a: number, b: number) => a * b : (a: number, b: number) => a + b;
        const numbers = equationLines[0]!.split('').map((_, idx) => equationLines.map(line => line[idx]!).join('').trim());

        return numbers.reduce((acc, val) => operation(acc, parseInt(val, 10)), isMult ? 1 : 0);
    }).reduce((a, b) => a + b, 0);

    console.log("Solution: ", solution);
});
