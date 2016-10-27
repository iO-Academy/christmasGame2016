
/**
 * Activated by a keyDown. If the key pressed is the space bar, then the keyDown listener is turned off
 * and moveSnowman() and gameLoop() are called.
 * Also, sets:
 * initialSpeed, the initial speed of level movement;
 * increaseFactor, the rate at which this speed increases;
 * counter, the level counter, and
 * maxSpeed, the maximum speed of level movement.
 *
 * @param e OBJECT keyDown event
 */
function gameStart(e) {
    var initialSpeed = 0.09,
        speed = initialSpeed,
        increaseFactor = 1.1,
        counter = 0,
        maxSpeed = initialSpeed * Math.pow(increaseFactor, 7)
    if (e.keyCode == 32) {
        $(document).off('keydown', gameStart)
        moveSnowman()
        gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
    }
}

function gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter) {
    var $loadedLevel,
        totalLevels = $("#levelContainer .level").length,
        gameWidth = $("#game").width(),
        speedIncrementer = Math.floor(counter / totalLevels)
    if (speed >= maxSpeed) {
        speed = maxSpeed
    } else if (initialSpeed * Math.pow(increaseFactor, speedIncrementer) > maxSpeed) {
       speed = maxSpeed
    } else {
        speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
    }
    counter++
    $loadedLevel = load(gameWidth, totalLevels, counter, increaseFactor, speedIncrementer)

    animate1($loadedLevel, gameWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels)
}

function load(gameWidth, totalLevels, counter, increaseFactor, speedIncrementer) {
    var rand = Math.ceil(Math.random() * totalLevels),
        selectedLevel = "#levelContainer .level" + rand,
        $selectedLevel = $(selectedLevel),
        $loadedLevel
    $selectedLevel.clone().appendTo("#game")
    $loadedLevel = $("#game .level")
    $loadedLevel.last().css({
        "left": gameWidth + 150
    })
    return $loadedLevel
}

function animate1($loadedLevel, gameWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels) {
    var level = $loadedLevel.last(),
        levWidth = level.width(),
        dur1 = levWidth / speed
    if (counter % totalLevels == 0) {
        var wait = (dur1/8)
        level.delay(wait)
    }
            level.animate({
        left: - (levWidth - gameWidth)
    }, dur1, "linear", function() {
                animate2(level, gameWidth, speed)
       gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
    })
}

function animate2(level, gameWidth, speed) {
    var
        levWidth = level.width(),
    dur2 = gameWidth / speed
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


function gameStartHandler() {
    $(document).on('keydown', gameStart)
}



