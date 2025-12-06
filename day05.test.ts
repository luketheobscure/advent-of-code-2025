import { test } from "bun:test";
import fs from "fs";

const input = fs.readFileSync("./input/day05.txt", "utf8");
const [ranges, ingredients] = input.split("\n\n") as [string, string];

test("day 5a", () => {
    let count = 0;
    ingredients.split("\n").map(line => parseInt(line, 10)).map(ingredient => {
        const isValid = ranges.split("\n").some(range => {
            const [min, max] = range.split("-").map(num => parseInt(num, 10)) as [number, number];
            return ingredient >= min && ingredient <= max;
        });

        if (isValid) count++;
    });

    console.log("Solution: ", count);
});

test("day 5b", () => {
    const sortedRanges = ranges.split("\n").map(range =>
        range.split("-").map(num => parseInt(num, 10)) as [number, number]
    ).sort((a, b) => a[0] - b[0]) as [number, number][];

    const mergedRanges: [number, number][] = [];
    sortedRanges.reduce(([prevMin, prevMax], [min, max]) => {
        if (min <= prevMax) {
            const newMax = Math.max(prevMax, max);
            mergedRanges[mergedRanges.length - 1] = [prevMin, newMax];
            return [prevMin, newMax];
        }

        mergedRanges.push([min, max]);
        return [min, max];
    }, [0, 0]);

    const count = mergedRanges.reduce((acc, [min, max]) =>
        acc += max - min + 1
        , 0);

    console.log("Solution: ", count);
});
