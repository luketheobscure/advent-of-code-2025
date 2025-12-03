import { test } from "bun:test";
import fs from "fs";

const input = fs.readFileSync("./input/day02.txt", "utf8");

const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

const splitEven = (str: string) => {
    const mid = str.length / 2;
    return [str.slice(0, mid), str.slice(mid)];
}

test("day 2a", () => {
    const badIds = input.split(",").flatMap((line) => {
        const [startStr, endStr] = line.split("-");
        const ids = range(parseInt(startStr!, 10), parseInt(endStr!, 10));

        return ids.map((id) => {
            const idStr = id.toString();
            if (idStr.length % 2 !== 0) return 0;

            const [firstHalf, secondHalf] = splitEven(idStr);
            if (firstHalf !== secondHalf) return 0;

            return id;
        })

    });

    console.log("Solution: ", badIds.reduce((a, b) => a + b, 0));
});

test("day 2b", () => {
    const badIds: number[] = [];
    input.split(",").forEach((line) => {
        const [startStr, endStr] = line.split("-");
        const ids = range(parseInt(startStr!, 10), parseInt(endStr!, 10));
        ids.forEach((id) => {
            const idString = id.toString();
            if (idString.length === 1) return;

            for (let i = 0; i < idString.length / 2; i++) {
                const testPattern = idString.slice(0, i + 1);
                const patternA = new RegExp(`^(?:${testPattern})+$`, "g");
                if (patternA.test(idString)) {
                    badIds.push(id);
                    return;
                }
            }

        })
    });

    console.log("Solution: ", badIds.reduce((a, b) => a + b, 0));
});
