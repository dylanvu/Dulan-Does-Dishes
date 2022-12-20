
/**
 * Function to generate a seed based on the string
 * Stolen from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param str 
 * @returns 
 */
function cyrb128(str: string) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/**
 * Function to generate a random based on a hash
 * Stolen from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 * @param a 
 * @returns 
 */
function mulberry32(a: number) {
    return function () {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/**
 * Return an array of uniquely randomly generated numbers between 0 and modulo based on today's date
 * @param count number of values
 * @param max the maximum
 * @returns 
 */
export function generateRandomNumbersToday(count: number, max: number): number[] {

    const seedString = new Date().toISOString();

    const checkThreshold = 1000;

    // begin mostly stolen code from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    // Create cyrb128 state:
    let seed = cyrb128(seedString);
    // Four 32-bit component hashes provide the seed for sfc32.

    // Only one 32-bit component hash is needed for mulberry32.
    let rand = mulberry32(seed[0]);

    // end mostly stolen code
    let randomNumSet: Set<number> = new Set();
    for (let i = 0; i < count; i++) {
        let iteration = 0;
        let randNum = rand() % max;
        while (randomNumSet.has(randNum)) {
            if (iteration > checkThreshold) {
                console.log("Threshold exceeded")
                break;
            }
            iteration++;
            randNum = rand();
        }
        randomNumSet.add(randNum);
    }
    const randNums = Array.from(randomNumSet);
    return randNums;
}