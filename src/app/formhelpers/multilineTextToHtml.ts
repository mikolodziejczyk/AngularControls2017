
/**
 * Replaces \r\n with <br/> in the specified text.
 * @param text The text to replace crlf with <br/>
 */
export function multilineTextToHtml(text: string): string {
    let rx = /\r\n/g;
    let r = text.replace(rx, "<br/>");
    return r;
}