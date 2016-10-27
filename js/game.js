function savePlay(uid, time, attempt) {
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
            console.log(data)
            if (!data.success) {
                // @todo show an error in the die screen
            }
        },
        error: function(data) {
            // @todo show an error in the die screen
            console.log(data)
        }
    })
}

$(function()
{

    function gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed) {
            var rand = Math.ceil(Math.random() * totalLevels),
            selectedLevel = ".level" + rand,
            levWidth = $(selectedLevel).width(),
            $selectedLevel = $(selectedLevel),
            speedIncrementer = Math.floor(counter/totalLevels),
            dur
        
            if (speed >= maxSpeed) {
                speed = maxSpeed
            } else {
                speed = initialSpeed * Math.pow(increaseFactor, speedIncrementer)
            }
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
                        gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed)
                    })
                }
            )
    }

    $(document).keydown(function(e) {

        if (e.keyCode == 32) {
            var counter = 0,
            totalLevels = $(".level").length,
            canvasWidth = $("#game").width(),
            initialSpeed = 0.07466,
            speed = initialSpeed,
            increaseFactor = 1.2,
            maxSpeed = initialSpeed * Math.pow(increaseFactor, 7) //0.2675202785

            moveSnowman()
            gameLoop(counter, totalLevels, canvasWidth, initialSpeed, speed, increaseFactor, maxSpeed)
        }
    })
})

