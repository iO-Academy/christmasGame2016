$(function() {
    var startingPositionY = $("#snowman").css("top")

    $(document).keydown(function (e) {
        var levelNo
        var rand = Math.ceil(Math.random() * levelNo)
        console.log(rand)
        if (e.keyCode == 32) {
            // $("#selection" + )
        }
    })

    function moveSnowman() {
        $("#game").keydown(function (e) {
            if (e.keyCode == 40 && (startingPositionY <= 485 - 50)) {
                // startingPositionY += 5
                // $("#snowman").css("top", startingPositionY)
                $('#snowman').animate({top: "+=5px"}, 'fast')
            } else {
                startingPositionY = startingPositionY += 0
            }

            if (e.keyCode == 38 && (startingPositionY >= 0)) {
                // startingPositionY -= 5
                // $("#snowman").css("top", startingPositionY)
                $('#snowman').animate({top: "-=5px"}, 'fast')
            }
        })
        console.log(startingPositionY)
    }

    moveSnowman()
})