$(function() {
    $(document).keydown(function(e) {
        var levelNo = $(".selection").length
        var rand = Math.ceil(Math.random() * levelNo)
        var selLev
        var levWidth
        var canvasWidth
        if (e.keyCode == 32) {
            selLev = "#selection" + rand
            levWidth = $(selLev).width()
            console.log(levWidth)
            canvasWidth = $("#game").width()
            console.log(canvasWidth)
            $(selLev).appendTo("#game")
            $(selLev).css({
                "left": canvasWidth
            })
            $(selLev).animate({
                left: -(levWidth - canvasWidth)
                }, 3000)
        }
    })


})