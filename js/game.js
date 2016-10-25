$(function() {
    function gameLoop(counter, totalLevels, canvasWidth, speed) {
            var rand = Math.ceil(Math.random() * totalLevels),
            selectedLevel = "#selection" + rand,
            levWidth = $(selectedLevel).width(),
            $selectedLevel = $(selectedLevel),
            speedIncrementer = Math.floor(counter/totalLevels),
            increaseFactor = 1.2,
            dur

            speed *= Math.pow(increaseFactor, speedIncrementer)
            dur = levWidth/speed
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
                        gameLoop(counter, totalLevels, canvasWidth, speed)
                    })
                }
            )

    }

    $(document).keydown(function(e) {

        if (e.keyCode == 32) {
            var counter = 0,
            totalLevels = $(".selection").length,
            canvasWidth = $("#game").width(),
            speed = 0.07466
            gameLoop(counter, totalLevels, canvasWidth, speed)
        }
    })

})