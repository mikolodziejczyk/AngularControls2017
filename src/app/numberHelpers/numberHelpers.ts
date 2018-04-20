/**
 * Rounds a number with midpoint away from zero mode
 * @param number the number to round
 * @param decimals the decimal places to produce, when ommited rounded to the whole numbers
 */

export function roundAwayFromZero(number : number, decimals: number) : number {
    var pow = Math.pow(10, (decimals) ? Math.abs(decimals) : 0);
    return Math.sign(number) * Math.round(Math.abs(number) * pow) / pow;
}
