var objArray = []

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

function animate1($loadedLevel, canvasWidth, speed, maxSpeed, increaseFactor, initialSpeed, counter, totalLevels) {
    var level = $loadedLevel.last(),
        levWidth = level.width(),
        dur1 = levWidth / speed

    if (counter % totalLevels == 0) {
        var wait = (dur1/8)
        level.delay(wait)
    }

    level.animate(
        {
            left: - (levWidth - canvasWidth)
        },
        {
            step: function() {
            },
            duration: dur1,
            easing: "linear",
            complete: function() {
                animate2(level, canvasWidth, speed)
                gameLoop(speed, maxSpeed, increaseFactor, initialSpeed, counter)
            }
        })
}

function animate2(level, canvasWidth, speed) {
    var levWidth = level.width(),
        dur2 = canvasWidth / speed

    level.animate(
        {
            left: - levWidth
        },
        {
            step: function() {
            },
            duration: dur2,
            easing: "linear",
            complete: function() {
                level.remove()
            }
        })
}

function stopPlay() {
    $("#game .level").stop().remove()
    stopSnowman()
    gameStartHandler()
}

//pass in player as .position() obj
function collides(player, playerSize, object, screenPos) {

var collides = false


    //for each object being displayed on screen
    //if not snowman: box collide on img
    //if snowman: box collide on both head and body
    $.each(object, function(i) {
        if(!this.isSnowman) {
            // console.log("object")
            if (
                ((player.left + playerSize.width) > (this.left + screenPos)) &&
                ((player.top + playerSize.height) > this.top) &&
                (((this.left + screenPos) + this.width) > player.left) &&
                ((this.top + this.height) > player.top)
            ) {
                // console.log("player pos " + player.left + " " + player.top)
                // console.log("obj pos: " + (this.left + screenPos) + " " + this.top)
                // console.log("obj " + i + " size " + this.height)
                collides = true
            }
        }
        else {
            console.log("snowman")
            if  ((((player.left + playerSize.width) > (this.head.left + screenPos))
                && ((player.top + playerSize.height) > this.head.top)
                && (((this.head.left + screenPos) + (this.head.radius*2)) > player.left)
                && ((this.head.top + (this.head.radius*2) > player.top)))
                ||
                (( (player.left + playerSize.width) > (this.body.left + screenPos))
                && ((player.top + playerSize.height) > this.body.top)
                && (((this.body.left + screenPos) + (this.body.radius*2)) > player.left)
                && (this.body.top + (this.body.radius*2) > player.top)))
            {
                console.log("player pos " + player.left + " " + player.top)
                console.log("obj pos: " + (this.left + screenPos) + " " + this.top)
                collides = true
            }
        }
    })

    return collides
}