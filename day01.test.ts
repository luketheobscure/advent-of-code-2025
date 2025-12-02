import { expect, test } from "bun:test";
const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

test("day 1", () => {
    let cur = 50;
    let count = 0;
    input.split("\n").forEach((line) => {
        const dir = line[0];
        const dist = parseInt(line.slice(1), 10);

        // 50
        // turn L 75
        // 25

        if (dir === "L") {
            cur -= dist;
            if (cur < 0) {
                cur = 100 + cur;;
            }
        } else {
            cur += dist;
            if (cur >= 100) {
                cur = cur - 100;
            }
        }
        // cur = Math.abs(cur) % 100;
        console.log(line, cur);
        if (cur === 0) {
            count += 1;
        }

    });

    console.log(Math.abs(cur));
    expect(count).toBe(3);
});