$(function() {
    function gameLoop(counter, levelNo, canvasWidth) {
            var rand = Math.ceil(Math.random() * levelNo),
            selectedLevel = "#selection" + rand,
            levWidth = $(selectedLevel).width(),
            $selectedLevel = $(selectedLevel),
            dur = levWidth/(0.07466*Math.pow(1.2, (Math.floor(counter/levelNo))))
            counter++

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
                    requestAnimationFrame(function() {
                        gameLoop(counter, levelNo, canvasWidth)
                    })
                }
            )

    }

    $(document).keydown(function(e) {

        if (e.keyCode == 32) {
            var counter = 0,
            levelNo = $(".selection").length,
            canvasWidth = $("#game").width()
            gameLoop(counter, levelNo, canvasWidth)
        }
    })

})