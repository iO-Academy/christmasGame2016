$(function() {

    function moveSnowman() {

        var startingPositionY = $("#snowman").css("top")

        $(document).keydown(function (e) {
            if (e.keyCode == 40) {
                startingPositionY = $("#snowman").css("top", "+=5px")
                $('#snowman').animate({top: startingPositionY})
                console.log(startingPositionY)
            }

            if (e.keyCode == 38) {
                startingPositionY = $("#snowman").css("top", "-=5px")
                $('#snowman').animate({top: startingPositionY})
            }
        })
    }
})