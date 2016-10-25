$(function() {

    function gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed) {
            var rand = Math.ceil(Math.random() * totalLevels),
            selectedLevel = ".level" + rand,
            levWidth = $(selectedLevel).width(),
            $selectedLevel = $(selectedLevel),
            loadedLevel = "#game " + selectedLevel,
            speedIncrementer = Math.floor(counter/totalLevels),
            dur

            if (speed >= maxSpeed) {
                speed = maxSpeed
            } else {
                speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
            }
            dur = levWidth/speed
            counter++

            $selectedLevel.clone().appendTo("#game")
            var $loadedLevel = $(loadedLevel)
            $loadedLevel.css({
                "left": canvasWidth
            })
            $loadedLevel.animate({
                left: -levWidth 
            },
                dur,
                "linear",
                function() {
                    $loadedLevel.remove()
                    requestAnimationFrame(function() {
                        gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed)
                    })
                }
            )
    }

    function gameStart(e) {
        var counter = 0,
            totalLevels = $("#levelContainer .level").length,
            canvasWidth = $("#game").width(),
            initialSpeed = 0.07466,
            speed = initialSpeed,
            increaseFactor = 1.2,
            maxSpeed = initialSpeed * Math.pow(increaseFactor, 7) //0.2675202785
        if (e.keyCode == 32 && inPlay == false) {
            inPlay = true
            moveSnowman()
            gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed)
        }
    }

    var inPlay = false
    $(document).keydown(function(e) {
        gameStart(e)
    })
})


// console.log("rand: " + rand + "||",
//     "selectedLevel: " + selectedLevel + "||",
//     "$selectedLevel: " + $selectedLevel + "||",
//     "loadedLevel: " + loadedLevel + "||",
//     "$loadedLevel: " + $loadedLevel + "||"
// )
// console.log($selectedLevel)