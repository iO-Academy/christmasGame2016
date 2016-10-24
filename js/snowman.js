$(function() {

        var gameHeight = $("#game").height() - 5
        var snowmanHeight = $("#snowman").height()

        $(document).keydown(function (e) {
            console.log("sausage")
            var startingPositionY = $("#snowman").css("top")
            var positionNumber = startingPositionY.substring(0, (startingPositionY.length - 2))
            if (e.keyCode == 40 && positionNumber <= (gameHeight - snowmanHeight)) {
                startingPositionY = $("#snowman").css("top", "+=5px")
                $('#snowman').animate({top: startingPositionY}, "fast")
            }

            if (e.keyCode == 38 && positionNumber > 0) {
                startingPositionY = $("#snowman").css("top", "-=5px")
                $('#snowman').animate({top: startingPositionY}, "fast")
            }
        })

})

