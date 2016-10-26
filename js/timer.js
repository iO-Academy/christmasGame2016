 // set global variables or use in functions
    var i = 0
    var timer

    // calculates the number of minutes the counter has been running for
    function getGameMinutes(i) {
        return Math.floor(i / 60)
    }

    // calculates the number of seconds the counter has been running for
    function getGameSeconds(i) {
        return i % 60;
    }

    // stops the timer - call on collision etc
    function stopTimer() {
        // Display finish time on the die screen
        $(".insertTime").text($("#timer").text())
        clearInterval(timer)
    }

    // start times on space to start
    function startTimer() {
        timer = setInterval(function() {

            // increase the counter by one on each 1000ms interval
            i += 1

            // turn game minutes to a string for correct display
            var gameMinutes = getGameMinutes(i) + ''

            // turn game seconds to a string for correct display
            var gameSeconds = getGameSeconds(i) + ''

            // padding char to expand minutes and seconds
            var pad = "00"

            // pads minutes and seconds - adds leading zero to display two digits for m & s at all times
            var paddedMinutes = pad.substring(0, pad.length - gameMinutes.length) + gameMinutes
            var paddedSeconds = pad.substring(0, pad.length - gameSeconds.length) + gameSeconds

            // send times with leading zeroes out to the game screen every sewcond
            $("#timer").text(paddedMinutes + ":" + paddedSeconds)
        }, 1000)
    }