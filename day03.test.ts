import { expect, test } from "bun:test";
import fs from "fs";

const input = fs.readFileSync("./input/day03.txt", "utf8");

test("day 3a", () => {
    const solution = input.split("\n")
        .map(line => line.split("").map(char => parseInt(char, 10)))
        .map(digits => {
            let maxDigit = Math.max(...digits.slice(0, -1));
            let nextDigit = Math.max(...digits.slice(digits.indexOf(maxDigit) + 1, digits.length));

            return +`${maxDigit}${nextDigit}`;
        })
        .reduce((a, b) => a + b, 0);

    console.log("Solution: ", solution);
});

test("day 3b", () => {
    const solution = input.split("\n")
        .map(line => line.split("").map(char => parseInt(char, 10)))
        .map(digits => {
            let maxNumber = [];
            let count = 12;
            while (count > 0) {
                const arrayToCheck = digits.slice(
                    0,
                    digits.length - (count - 1)
                );
                let currentMax = Math.max(...arrayToCheck);
                digits = digits.slice(digits.indexOf(currentMax) + 1, digits.length);
                maxNumber.push(currentMax);
                count--;
            }

            return +`${maxNumber.join("")}`;
        })
        .reduce((a, b) => a + b, 0);

    console.log("Solution: ", solution);
});
