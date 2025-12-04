import { test } from "bun:test";
import fs from "fs";

type point = [number, number];
const adjacentDirs = ([[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] as point[])

const findMovableRolls = (iterate: boolean) => {
    const input = fs.readFileSync("./input/day04.txt", "utf8")
        .split("\n")
        .map(line => line.split(""));
    let count = 0;
    let lastCount = null;

    while (lastCount !== count) {
        lastCount = count;
        input.forEach((row, rowIndex, rows) => {
            row.forEach((cell, cellIndex) => {
                if (cell !== "@") return;

                const adjacentCells = adjacentDirs
                    .reduce((acc, [dx, dy]) => {
                        const x = rowIndex + dx;
                        const y = cellIndex + dy;
                        if (rows[x]?.[y] === "@") acc++;

                        return acc;
                    }, 0);

                if (adjacentCells < 4) {
                    count++;
                    if (iterate) {
                        rows[rowIndex]![cellIndex] = "."
                    };
                };
            });
        });
        if (!iterate) break;
    }

    return count;
};

test("day 4a", () => console.log("Solution: ", findMovableRolls(false)));

test("day 4b", () => console.log("Solution: ", findMovableRolls(true)));
