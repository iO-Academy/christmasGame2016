function gameStartHandler() {
    $(document).on("keydown", gameStart)
}

function gameStart(e) {
    var initialSpeed = 0.09,
        speed = initialSpeed,
        increaseFactor = 1.1,
        counter = 0,
        maxSpeed = initialSpeed * Math.pow(increaseFactor, 7)
    if (e.keyCode == 32) {
        $(document).off("keydown", gameStart)
        moveSnowman()
        gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
    }
}

function gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter) {
    var $loadedLevel,
        totalLevels = $("#levelContainer .level").length,
        canvasWidth = $("#game").width(),
        speedIncrementer = Math.floor(counter / totalLevels)

    speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
    if (speed >= maxSpeed) {
        speed = maxSpeed
    }

    counter++
    $loadedLevel = load(canvasWidth, totalLevels, counter, increaseFactor, speedIncrementer)
    animate1($loadedLevel, canvasWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels)
}

function load(canvasWidth, totalLevels, counter, increaseFactor, speedIncrementer) {
    var rand = Math.ceil(Math.random() * totalLevels),
        $selectedLevel = $("#levelContainer .level" + rand),
        $loadedLevel

    $selectedLevel.clone().appendTo("#game")
    $loadedLevel = $("#game .level")
    $loadedLevel.last().css("left", canvasWidth + 150)
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

function stopPlay() {
    $("#game .level").stop()
    $("#game .level").remove()
    stopSnowman()
    gameStartHandler()
}




