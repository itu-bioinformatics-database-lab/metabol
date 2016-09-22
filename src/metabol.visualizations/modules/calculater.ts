export class Shuffle {

    public static Mode(N, array: Array<number>): Array<number> {
        var numbers = new Array<number>();
        var quarter: number = array.length / N;
        for (var i = 0; i < quarter; i++) {
            for (var j = 0; j < N; j++) {
                numbers.push(array[i + j * quarter]);
            }
        }
        return numbers;
    }
}

export function ModeShuffle(N, range, index): number {
    return (range / N) * (index % N) + Math.floor(index / N);
}
