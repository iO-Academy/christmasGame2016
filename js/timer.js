$(function() {

    var start = new Date
    var i = 0
    var timer

    function getGameMinutes(i) {
        return Math.floor(i / 60)
    }

    function getGameSeconds(i) {
        return i % 60;
    }

    function stopTimer() {
        clearInterval(timer)
    }

    function startTimer() {
        timer = setInterval(function() {
            i += 1
            var gM = getGameMinutes(i) + ''
            var gS = getGameSeconds(i) + ''
            var pad = "00"
            var paddedMinutes = pad.substring(0, pad.length - gM.length) + gM
            var paddedSeconds = pad.substring(0, pad.length - gS.length) + gS
            $("#timer").html(paddedMinutes + ":" + paddedSeconds)
        }, 1000)
    }
})