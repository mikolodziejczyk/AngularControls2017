import { NumberFormat } from "./numberFormat";

/**
 * parses a float number allowing localized group separators and decimal point, still being strict about format; returns NaN if the format is invalid
 * @param input 
 */
export function localePaseFloat (input : string) : number {
    var dsep = NumberFormat.decimalSeparator;
    var tsep = NumberFormat.groupSeparator;

    var res = "^-?((\\d{1,3}(\\" + tsep + "\\d{3})*(\\" + dsep + "\\d+)?)|((\\d+)(\\" + dsep + "\\d+)?))$"

    var rx = new RegExp(res);


    if (rx.test(input) == false) {
        return NaN;
    }

    input = input.replace(new RegExp(tsep, "g"), "")
    input = input.replace(new RegExp(dsep, "g"), ".")
    return parseFloat(input)
}

/**
 * Parses an int number allowing localized group separators, still being strict about the format; returns NaN if the format is invalid
 * @param input 
 */
export function localeParseInt(input : string) : number {
    var tsep = NumberFormat.groupSeparator;

    var res = "^-?((\\d{1,3}(\\" + tsep + "\\d{3})*)|(\\d+))$"

    var rx = new RegExp(res);


    if (rx.test(input) == false) {
        return NaN;
    }

    input = input.replace(new RegExp(tsep, "g"), "")
    return parseInt(input)
}