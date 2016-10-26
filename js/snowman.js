/**
 * handler to enable the stop function to work without affecting other keypresses and functions
 *
 * param e is the keycode
 */
function snowmanHandler(e) {
    // change to increase/decrease snowman movement speed.
    var movementIncrement = 10

    // Minimum y value
    var gameHeight = $("#game").height() - 10

    // gets the height of the snowman img for movement limiting calculations
    var snowmanHeight = $("#snowman").height()

    // the original position of the snowman
    var startingPositionY = $("#snowman").css("top")

    // get int from top value
    var positionNumber = startingPositionY.substring(0, (startingPositionY.length - 2))

    // down movement on DOWN ARROW press
    if (e.keyCode == 40 && positionNumber <= (gameHeight - snowmanHeight)) {
        startingPositionY = $("#snowman").css("top", "+=" + movementIncrement + "px")
        $('#snowman').animate({top: startingPositionY}, "fast")
    }

    // up movement on UP ARROW press
    if (e.keyCode == 38 && positionNumber > 0) {
        startingPositionY = $("#snowman").css("top", "-=" + movementIncrement + "px")
        $('#snowman').animate({top: startingPositionY}, "fast")
    }
}

/**
 * Calls the snowman movement handler and changes the image to a moving gif.
 */
function moveSnowman() {
    $(document).keydown(snowmanHandler)
    $("#runningMan").attr("src", "assets/runningsnowman.gif")
}

/**
 * Switches off the movement listener. Change the image to a static snowman
 */
function stopSnowman() {
    $(document).off("keydown", snowmanHandler)
    $("#runningMan").attr("src", "assets/standingsnowman.jpg")
}


// this whole section is here for testing
// Z key will stop the snowman from moving
// X key will start the snowman moving
// NONE OF THE PREVIOUS CODE NEEDS TO BE IN THE DOCUMENT READY FUNCTION

// $(function() {
//
//     function testPicture() {
//         $(document).keydown(function(e) {
//         if (e.keyCode == 90) {
//              stopSnowman()
//         }
//         if (e.keyCode == 88) {
//             moveSnowman()
//         }
//     })
//     }
//
//     testPicture()
// })

