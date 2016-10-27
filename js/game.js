
/**
 * Sets:
 * initialSpeed, the speed of level movement when the game begins (px/ms);
 * speed, the current speed of level movement (px/ms);
 * increaseFactor, the amount speed is multiplied by on every increase;
 * counter, indicates the number of times gameLoop() has been executed, i.e. how many levels have passed through the
 *  game area;
 * maxSpeed, the upper limit for level movement speed (px/ms).
 *
 * Activated by a keyDown. If the key pressed is the space bar, then the keyDown listener is turned off
 * and moveSnowman() and gameLoop() are called.
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

/**
 * Sets:
 * $loadedLevel, a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are currently loaded
 *      into #game;
 * totalLevels, the total number of levels available for play;
 * gameWidth, the width of the game area inside the white frame (px);
 * speedIncrementer, records the counter, modulo the total number of levels, e.g. if there are 8 levels in total, this
 *      increments by 1 every time 8 levels pass through the game area.
 *
 * Multiplies speed by increaseFactor if counter is a multiple of totalLevels, capping it at maxSpeed if exceeded.
 * Increments counter by 1
 * Calls load() and assigns the returned value to $loadedLevel.
 * Calls animate1().
 *
 * @param speed NUMBER the current speed of level movement (px/ms)
 * @param maxSpeed NUMBER the upper limit for level movement speed (px/ms)
 * @param increaseFactor NUMBER the amount speed is multiplied by on every increase
 * @param initialSpeed NUMBER the speed of level movement when the game begins (px/ms)
 * @param counter NUMBER indicates the number of times gameLoop() has been executed, i.e. how many levels have passed
 * through the game area
 */
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

/**
 * Sets:
 * rand, a random integer between 1 and totalLevels (inclusive), indicating the next level to be loaded;
 * selectedLevel, a STRING containing the CSS selector for the level determined by rand;
 * $selectedLevel, a jQuery OBJECT containing the next level (the DOM OBJECT selected by selectedLevel) to be loaded
 *      into #game;
 * $loadedLevel, a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are currently loaded
 *      into #game;
 *
 * Randomly selects a level, clones it and appends the clone to #game, moves it to the right of the game area, ready for
 * animation and updates $loadedLevel.
 *
 * @param gameWidth NUMBER the width of the game area inside the white frame (px)
 * @param totalLevels NUMBER the total number of levels available for play
 * @param counter NUMBER indicates the number of times gameLoop() has been executed, i.e. how many levels have passed
 * through the game area
 * @param increaseFactor NUMBER the amount speed is multiplied by on every increase
 * @param speedIncrementer NUMBER records the counter, modulo the total number of levels, e.g. if there are 8 levels in
 * total, this increments by 1 every time 8 levels pass through the game area
 *
 * @returns $loadedLevel OBJECT a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are
 * currently loaded into #game
 */
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

/**
 * Sets:
 * level, a jQuery OBJECT whose property 0 contains the most recently loaded level (DOM OBJECT), that which is to be
 *      animated;
 * levWidth, the width of level (px);
 * dur1, the duration of animation that will ensure that its movement speed is the same as the value of the speed
 *      variable (ms);
 * wait, the delay put onto the animation of the first level after a speed increase.
 *
 * Applies a delay to the first level after a speed increase to prevent the obstacles from catching up with those in the
 * previous, slower, level.
 * Animates level to transition leftwards from its current position (to the right of the game area) until its right edge
 * is aligned with the right edge of the game area.
 * On completion of the animation, animate2() and gameLoop() are called.
 *
 * @param $loadedLevel OBJECT a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are
 * currently loaded into #game
 * @param gameWidth NUMBER the width of the game area inside the white frame (px)
 * @param speed NUMBER the current speed of level movement (px/ms)
 * @param maxSpeed NUMBER the upper limit for level movement speed (px/ms)
 * @param increaseFactor NUMBER the amount speed is multiplied by on every increase
 * @param initialSpeed NUMBER the speed of level movement when the game begins (px/ms)
 * @param counter NUMBER indicates the number of times gameLoop() has been executed, i.e. how many levels have passed
 * through the game area
 * @param totalLevels NUMBER totalLevels NUMBER the total number of levels available for play
 */
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



