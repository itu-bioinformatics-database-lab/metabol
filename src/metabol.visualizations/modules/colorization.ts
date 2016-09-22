import * as Calculater from './calculater';


/**
* Generate random color
* @return hex of color as '#6457A8'
*/
export function random(): string {
    var letters: Array<string> = '0123456789ABCDEF'.split('');
    var color: string = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function rainBow(range: number, step: number): string {
    var r, g, b;
    var h = step / range;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

/**
 * Generate identical color each time in range
 * @param rangeX4 should be time of 4
 * @return hex of color as "#FFFFFF"
 */
export function identicalByMode(rangeX4: number, step: number): string {
    if (rangeX4 % 4 != 0)
        throw new Error("Illegal Paramater: Range should be time of 4");
    step = Calculater.ModeShuffle(4, rangeX4, step - 1) + 1;
    return rainBow(rangeX4, step);
}

export class IdenticalByMode {
    private range: number;
    private current: number;

    constructor(range: number) {
        if (range <= 0)
            throw new Error("Illegal Paramater: Range should not be less than 0");
        this.range = range;
        this.current = 0;
    }

    public next(): string {
        this.current++;
        return identicalByMode(this.range, this.current);
    }

    public hasNext(): boolean {
        return this.current != this.range;
    }
}

export class IdenticalByHalf {

    private array: Array<number>;
    private current: number;

    constructor() {
        this.current = 0;
        this.array = [0, 64, 128, 192, 256];
    }

    public expandSpace(): void {
        var sorted = this.array.slice().sort((a, b) => a - b);
        for (var i = 0; i < sorted.length - 1; i++)
            this.array.push(Math.floor((sorted[i] + sorted[i + 1]) / 2));
    }

    public next() {
        if (this.current == this.array.length)
            this.expandSpace();
        return rainBow(256, this.array[this.current++]);
    }

    public hasNext() {
        return this.current <= 256;
    }
}

export class RainBow {
    private range: number;
    private current: number;

    constructor(range: number) {
        if (range <= 0)
            throw new RangeError();
        this.range = range;
        this.current = 0;
    }

    public next(): string {
        this.current++;
        return rainBow(this.range, this.current);
    }

    public hasNext(): boolean {
        return this.current != this.range;
    }
}
