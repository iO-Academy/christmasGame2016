window.objArray = []
var $player
var playerSize
var attempts

function savePlay(uid, time, attempt) {
    var saveTime = paddedMinutes + ":" + paddedSeconds;
    $.ajax({
        method:"post",
        url:"api/",
        data:{
            "action": "saveAttempt",
            "uid":uid,
            "time":time,
            "attempt":attempt
        },
        success: function(data) {
            if (!data.success) {
                errorMsg(saveTime, "OOPS! There has been an error saving your details<br>Click below to try again.")

            }
        },
        error: function(data) {
            errorMsg(saveTime, "There has been an error, please refresh your page and try again.")
        }
    })
}

function errorMsg(time, errorMsg){
    openPopup($(".dieScreen"))
    $(".notificationPopUp .insertTime").html(time)
    $(".dieScreen #successMsg").html(errorMsg)
}

/**
* Sets the player variables.
* is called when game page is loaded.
*/
function init() {

    $player = $("#snowman")
    playerSize = {
        width: $player.width(),
        height: $player.height()
    }
}


/**
 * Sets an event listener for the keydown event, with gameStart() as the callback method.
 */
function gameStartHandler() {
    $(document).on("keydown", gameStart)
    resetTimer()
}

/**
 * Activated by a keydown.
 * If the key pressed is the space bar, then:
 * the keydown listener with gameStart() as the callback method is turned off;
 * moveSnowman()is called;
 * gameLoop() is called.
 *
 * @param e OBJECT keydown event
 */
function gameStart(e) {
    if (e.keyCode == 32) { //checking if the key pressed was the space bar
        var initialSpeed = 0.09, //the speed of level movement when the game begins (px/ms)
            speed = initialSpeed, //the current speed of level movement (px/ms)
            increaseFactor = 1.1, //the amount speed is multiplied by on every increase
            increaseLimit = 7, //the number of times the speed will increase before reaching the maximum
            counter = 0, //indicates the number of times gameLoop() has been executed, i.e. how many levels have passed
                         //through the game area
            maxSpeed = initialSpeed * Math.pow(increaseFactor, increaseLimit) //the upper limit for level movement speed
                                                                              //(px/ms)
        attempts = parseInt(user.curAttempt) + 1

        objArray = []
        $(document).off("keydown")
        moveSnowman()
        startTimer()
        gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
    }
}

/**
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
    var $loadedLevel, //a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are currently
                      //loaded into #game
        totalLevels = $("#levelContainer .level").length, //the total number of levels available for play
        gameWidth = $("#game").width(), //the width of the game area inside the white frame (px)
        speedIncrementer = Math.floor(counter / 4) //records the counter, modulo the total number of levels,
                                                             //e.g. if there are 8 levels in total, this increments by
                                                             //1 every time 8 levels pass through the game area

    speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
    if (speed >= maxSpeed) {
        speed = maxSpeed
    }

    counter++
    $loadedLevel = load(gameWidth, totalLevels, counter, increaseFactor, speedIncrementer)
    animate1($loadedLevel, gameWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels)
}

/**
 * Randomly selects a level, clones it and appends the clone to #game, moves it to the right of the game area, ready for
 * animation and updates $loadedLevel.
 *
 * creates an array of obstacles currently loaded.
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
    var rand = Math.ceil(Math.random() * totalLevels), //a random integer between 1 and totalLevels (inclusive),
                                                       // indicating the next level to be loaded
        $selectedLevel = $("#levelContainer .level" + rand), //a jQuery OBJECT containing the next level (DOM OBJECT) to
                                                             //be loaded into #game, determined by a CSS selector
                                                             // specified to level 6 for first level in if statement below
                                                             // otherwise contains rand.
        $loadedLevel, //a jQuery OBJECT whose properties 0 & 1 contain the two levels (DOM OBJECTS) that are currently
                      //loaded into #game
        levelSeparator = 150 //the gap between consecutive levels, chosen by trial and improvement (px)

    if(counter == 1) {
        $selectedLevel = $("#levelContainer .level" + 6)
    }

    $selectedLevel.clone().appendTo("#game")
    $loadedLevel = $("#game .level")
    $loadedLevel.last().css("left", gameWidth + levelSeparator)

    $.each($loadedLevel.last().children(), function(){
        var obj = this;
        var $obj = $(this)
        if($(obj).hasClass('snowman')){

            objArray.push(
                {
                    top: $obj.position().top,
                    left: $obj.position().left,
                    width: $obj.width(),
                    height: $obj.height(),
                    isSnowman: true,
                    //obj containing:   left/top positions relative to level position
                    head: {
                        top: $obj.position().top
                        + ($('.head', obj).position().top),
                        left: $obj.position().left
                        + ($('.head', obj).position().left),
                        radius: $('.head', obj).width() / 2
                    },
                    body: {
                        top: $obj.position().top
                        + ($('.body', obj).position().top),
                        left: $obj.position().left,
                        radius: $('.body', obj).width() / 2
                    }
                })
        }
        else {
            objArray.push(
                {
                    top: $obj.position().top,
                    left: $obj.position().left,
                    width: $obj.width(),
                    height: $obj.height(),
                    isSnowman: false
                }
            )
        }
    })

    return $loadedLevel
}

/**
 * Calculates the duration of animation that will ensure that its movement speed is the same as the current value of the
 * speed variable.
 * Applies a delay to the first level after a speed increase to prevent the obstacles from catching up with those in the
 * previous, slower, level.
 * Animates level to transition leftwards from its current position (to the right of the game area) until its right edge
 * is aligned with the right edge of the game area.
 * During the animation, check for obstacle collision and if collides stop the animation.
 * On completion of the animation, animate2() and gameLoop() are called.
 *
 * COMMENT: currentObjArray created so screenPos is only applied to the obstacles within that animation
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
    var level = $loadedLevel.last(), //a jQuery OBJECT whose property 0 contains the most recently loaded level
                                     //(DOM OBJECT), that which is to be animated
        levWidth = level.width(), //the width of level (px)
        dur1 = levWidth / speed, //the duration of animation (ms)
        divisor = 8, //used to determine the length of the wait period: the wait is 1/divisor of the animation duration
        currentObjArray = objArray.slice($loadedLevel.first().children().length, objArray.length)

    if (counter % totalLevels == 0) {
        var wait = (dur1/divisor) //the delay put onto the animation of the first level after a speed increase
        level.delay(wait)
    }

    if ($loadedLevel.length == 1) { // if its the first level, use first set of obstacles
        currentObjArray = objArray
    }

    level.animate(
        {
            left: - (levWidth - gameWidth)
        },
        {
            step: function(screenPos) {
                if(collides($player.position(), playerSize, currentObjArray, screenPos)){
                    stopPlay()
                }
            },
            duration: dur1,
            easing: "linear",
            complete: function() {
                setTimeout(function() {     //fixing the function stack call order
                    animate2(level, gameWidth, speed)
                    gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
                }, 0)
            }
        })
}

/**
 * Calculates the duration of animation that will ensure that its movement speed is the same as the current value of the
 * speed variable.
 * Animates level to transition leftwards from its current position (right-aligned with the game area) until its right edge
 * is aligned with the left edge of the game area (it's out of the play area).
 * During the animation, check for obstacle collision and if collides stop the animation.
 * On completeion of the animation, removes the animated level from #game and removes unloaded objects from objArray.
 *
 * COMMENT: currentObjArray created so screenPos is only applied to the obstacles within that animation
 *
 * @param level OBJECT a jQuery OBJECT whose property 0 contains the level (DOM OBJECT) that has just been passed through
 * animate1 and is to be animated here in animate2
 * @param gameWidth NUMBER the width of the game area inside the white frame (px)
 * @param speed NUMBER the current speed of level movement (px/ms)
 */
function animate2(level, gameWidth, speed) {
    var levWidth = level.width(), //the width of level (px)
        dur2 = gameWidth / speed //the duration of animation (ms)

    // remove the second level obs so it only detects on first level
    var currentObjArray = objArray.slice(0, level.children().length)

    level.animate(
        {
            left: - levWidth
        },
        {
            step: function(screenPos) {
                if(collides($player.position(), playerSize, currentObjArray, screenPos)){
                    stopPlay()
                }
            },
            duration: dur2,
            easing: "linear",
            complete: function() {
                objArray = objArray.slice(level.children().length, objArray.length)
                level.remove()
            }
        })
}

/**
 * Stops animation of levels and removes them from #game.
 * Stops animation of the snowman avatar.
 * Calls gameStartHandler().
 */
function stopPlay() {
    $("#game .level").stop().remove()
    stopTimer()
    savePlay(user.uid, gamePlaySeconds, attempts)
    stopSnowman()
    openPopup($(".dieScreen"))
    resetTimer()
}

/**
 * Checks if the player has collided with any of the obstacles currently loaded
 * If obstacle is snowman, checks if collides with head or body separately
 *
 * @param playerPos OBJECT contains player left and top values
 * @param playerSize OBJECT contains player width and height
 * @param obsArray ARRAY contains all obstacles currently loaded
 * @param screenPos NUMBER left value of level being animated
 *
 * @returns BOOLEAN is true if collides
 */
function collides(playerPos, playerSize, obsArray, screenPos) {

    var collides = false

    playerPos.top = playerPos.top - 5 // remove the border of the #game div

    $.each(obsArray, function(i) {
        if(!this.isSnowman) {
            if (((playerPos.left + playerSize.width) > (this.left + screenPos)) &&
                (((playerPos.top) + playerSize.height) > this.top) &&
                (((this.left + screenPos) + this.width) > playerPos.left) &&
                ((this.top + this.height) > (playerPos.top)))
            {
                collides = true
            }
        }
        else {
            if  ((((playerPos.left + playerSize.width) > (this.head.left + screenPos))
                && (((playerPos.top) + playerSize.height) > this.head.top)
                && (((this.head.left + screenPos) + (this.head.radius*2)) > playerPos.left)
                && ((this.head.top + (this.head.radius*2) > (playerPos.top))))
                ||
                (( (playerPos.left + playerSize.width) > (this.body.left + screenPos))
                && (((playerPos.top) + playerSize.height) > this.body.top)
                && (((this.body.left + screenPos) + (this.body.radius*2)) > playerPos.left)
                && (this.body.top + (this.body.radius*2) > (playerPos.top))))
            {
                collides = true
            }
        }
    })

    return collides
}