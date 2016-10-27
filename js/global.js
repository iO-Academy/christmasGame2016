/**
 * Pads input - adds leading zero to the left of string passed in. Returns a value that can be checked depending on what is entered
 *
 * @param string pass in a string to be padded
 * @param pad pass in digits as a string - the number of digits will be the full length of the returned string
 * @return string a string the length of pad will be returned
 */
function leftPad(string, pad) {
    return pad.substring(0, pad.length - string.length) + string
}