$(function() {
    $(document).keydown(function(e) {
        var levelNo = $(".selection").length
        var rand = Math.ceil(Math.random() * levelNo)
        if (e.keyCode == 32) {
            var selLev = "#selection" + rand
            var levWidth = $(selLev).width()
        }
    })


})