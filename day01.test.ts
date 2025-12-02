import { expect, test } from "bun:test";
import fs from "fs";

const input = fs.readFileSync("./input/day01.txt", "utf8");

test("day 1a", () => {
    let cur = 50;
    let count = 0;

    input.split("\n").forEach((line) => {
        const dir = line[0] === "L" ? -1 : 1;
        const dist = (parseInt(line.slice(1), 10) % 100) * dir;

        cur = (cur + dist) % 100;

        if (cur === 0) count += 1;
    });

    console.log("Solution: ", count);
});

test("day 1b", () => {
    let cur = 50;
    let count = 0;

    input.split("\n").forEach((line) => {
        let prevIsZero = cur === 0;
        const dir = line[0] === "L" ? -1 : 1;
        const dist = parseInt(line.slice(1), 10);
        count += Math.floor(dist / 100);
        cur += Math.abs(dist % 100) * dir;

        if (cur < 0) {
            if (!prevIsZero) count++;

            cur = 100 + cur;
        }

        if (cur >= 100) {
            if (cur !== 100) count++;
            cur = cur - 100;
        }


        if (cur === 0) count += 1;
    });

    console.log("Solution:  ", count);
});