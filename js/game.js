$(function() {

    function gameStart(e) {
        var initialSpeed = 0.08,
            speed = initialSpeed,
            increaseFactor = 1.1,
            counter = 0,
            maxSpeed = initialSpeed * Math.pow(increaseFactor, 7)
        if (e.keyCode == 32 && inPlay == false) {
            inPlay = true
            moveSnowman()
            gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
        }
    }

    function gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter) {
        var $loadedLevel,
            totalLevels = $("#levelContainer .level").length,
            canvasWidth = $("#game").width(),
            speedIncrementer = Math.floor(counter / totalLevels)
        if (speed >= maxSpeed) {
            speed = maxSpeed
        } else if (initialSpeed * Math.pow(increaseFactor, speedIncrementer) > maxSpeed) {
           speed = maxSpeed
        } else {
            speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
        }
        counter++
        $loadedLevel = load(canvasWidth, totalLevels, counter, increaseFactor, speedIncrementer)

        animate1($loadedLevel, canvasWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels)
    }

    function load(canvasWidth, totalLevels, counter, increaseFactor, speedIncrementer) {
        var rand = Math.ceil(Math.random() * totalLevels),
            selectedLevel = "#levelContainer .level" + rand,
            $selectedLevel = $(selectedLevel),
            $loadedLevel
        $selectedLevel.clone().appendTo("#game")
        $loadedLevel = $("#game .level")
        $loadedLevel.last().css({
            "left": canvasWidth + 150
        })
        return $loadedLevel
    }

    function animate1($loadedLevel, canvasWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels) {
        var level = $loadedLevel.last(),
            levWidth = level.width(),
            dur1 = levWidth / speed
        if (counter % totalLevels == 0) {
            var wait = (dur1/8)
            level.delay(wait)
        }
                level.animate({
            left: - (levWidth - canvasWidth)
        }, dur1, "linear", function() {
                    animate2(level, canvasWidth, speed)
           gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
        })
    }

    function animate2(level, canvasWidth, speed) {
        var
            levWidth = level.width(),
        dur2 = canvasWidth / speed
        level.animate({
            left: - levWidth
        }, dur2, "linear", function() {
            level.remove()
        })
    }

    var inPlay = false
    $(document).keydown(function(e) {
        gameStart(e)
    })

})
