import { NumberFormat } from "./numberFormat";
import { roundAwayFromZero } from "./numberHelpers";


/**
 * Formats a float / int to a string
 * @param number the number to format
 * @param decimalDigits decimal digits
 * @param useGroups true to apply a roundtrip groupSeparator (suitable for edit), false not to emit groups, or any string to use as a group separator
 */
export function formatNumber(number: number, decimalDigits?: number, useGroups?: boolean | string) {
    decimalDigits = decimalDigits || 2;
    let s = useGroups ? ((useGroups === true) ? NumberFormat.groupSeparator : useGroups) : "";
    let c = NumberFormat.decimalSeparator;

    let re = '\\d(?=(\\d{' + 3 + '})+' + (decimalDigits > 0 ? '\\D' : '$') + ')';
    let num = roundAwayFromZero(number, decimalDigits).toFixed(decimalDigits);

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + s);
};

/**
 * An overload of formatNumber that produces a string for display purposes, not suitable for edit purposes
 * @param number the number to format
 * @param decimalDigits decimal digits
 */
export function formatNumberForDisplay(number: number, decimalDigits?: number) {
    return formatNumber(number, decimalDigits, NumberFormat.displayGroupSeparator);
}

/**
 * 
 * @param number Formats a number with a localized decimal separator but without groups.
 */
export function formatNumberPlain(number: number) : string {
    let dsep = NumberFormat.decimalSeparator;
    let s = number.toString().replace(".",dsep);
    return s;
}