// set global variable for use in functions
var timer

/**
 * Calculates the number of minutes the counter has been running for.
 *
 * @param i pass in a number equalling the total number of seconds passed (1s interval i++)
 * @return number
 */
function getGameMinutes(i) {
    return Math.floor(i / 60)
}

/**
 * Calculates the seconds value from the total time passed in.
 *
 * @param i pass in a number equalling the total number of seconds passed (1s interval i++)
 * @return number
 */
function getGameSeconds(i) {
    return i % 60;
}

/**
 * Stops the timer
 */
function stopTimer() {
    clearInterval(timer)
}

/**
 * Starts the timer
 */
function startTimer() {
    var i = 0
    var padLength = "00"

    timer = setInterval(function() {

        // increase the counter by one on each 1000ms interval
        i++

        // turn game minutes to a string for correct display
        var gameMinutes = getGameMinutes(i) + ''

        // turn game seconds to a string for correct display
        var gameSeconds = getGameSeconds(i) + ''

        // add padding to minutes and seconds to return two digits for each
        var paddedMinutes = leftPad(gameMinutes, padLength)
        var paddedSeconds = leftPad(gameSeconds, padLength)

        // send times with leading zeroes out to the game screen every second
        $("#timer").html(paddedMinutes + ":" + paddedSeconds)
    }, 1000)
}
