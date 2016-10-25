// handler to enable the stop function to work without affecting other keypresses and functions
function snowmanHandler(e) {
    // increase to make the snowman move quicker
    var movementIncrement = 10

    // used to limit the snowman's movement to with the game border
    var gameHeight = $("#game").height() - 10

    // used to limit the snowman's movement to with the game border
    var snowmanHeight = $("#snowman").height()

    // the original position of the snowman. increased in functions to move up and down
    var startingPositionY = $("#snowman").css("top")

    // convert position to a string for limiting movement within the box
    var positionNumber = startingPositionY.substring(0, (startingPositionY.length - 2))

    // down movement on DOWN ARROW press
    if (e.keyCode == 40 && positionNumber <= (gameHeight - snowmanHeight)) {
        startingPositionY = $("#snowman").css("top", "+=" + movementIncrement + "px")
        $('#snowman').animate({top: startingPositionY}, "fast")
    }

    // down movement on DOWN ARROW press
    if (e.keyCode == 38 && positionNumber > 0) {
        startingPositionY = $("#snowman").css("top", "-=" + movementIncrement + "px")
        $('#snowman').animate({top: startingPositionY}, "fast")
    }
}

// calls the snowman movement handler and changes the image to a moving gif
function moveSnowman() {
    $(document).keydown(snowmanHandler)
    $("#runningMan").attr("src", "assets/runningsnowman.gif")

}

// switches off the movement listener so the snowman won't move when the game ends
// change the image to a static snowman
function stopSnowman() {
    $(document).off("keydown", snowmanHandler)
    $("#runningMan").attr("src", "assets/standingsnowman.jpg")
}


// // this whole section is here for testing
// // Z key will stop the snowman from moving
// // X key will start the snowman moving
// // NONE OF THE PREVIOUS CODE NEEDS TO BE IN THE DOCUMENT READY FUNCTION
//
// $(function() {
//
//     function testPicture() {
//         $(document).keydown(function(e) {
//         if (e.keyCode == 90) {
//              stopSnowman()
//         }
//             if (e.keyCode == 88) {
//                 moveSnowman()
//             }
//     })
//     }
// })

