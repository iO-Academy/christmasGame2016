$(function() {
    function gameStart() {
            var levelNo = $(".selection").length,
            rand = Math.ceil(Math.random() * levelNo),
            selectedLevel = "#selection" + rand,
            levWidth = $(selectedLevel).width(),
            canvasWidth = $("#game").width(),
            $selectedLevel = $(selectedLevel),
            dur = levWidth / 0.07466

            $selectedLevel.appendTo("#game")
            $selectedLevel.css({
                "left": canvasWidth
            })
            $selectedLevel.animate({
                left: -levWidth 
            },
                dur,
                "linear",
                function() {
                    $selectedLevel.appendTo("#levelContainer")
                    requestAnimationFrame(gameStart)
                }
            )
    }

    $(document).keydown(function(e) {

        if (e.keyCode == 32) {
           gameStart()
        }
    })

})