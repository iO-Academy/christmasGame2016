$(function() {
    $("#leaderboard").click(function() {
        var ajaxErrorMessage = "Unexpected error. Please try again."
        var obj = {}
        obj.action = "getLeaderboard"

        openPopup($("#leaderScreen"))

        $.ajax({
            method: "POST",
            url: "api/",
            data: obj,
            success: function(response) {
                console.log(response)
                if (!response.success) {
                    $("#error").text(ajaxErrorMessage)
                } else {

                    $.each(response.data.leaderboard, function (key, person) {
                        $("#leaderScreen").append(person.name + ": " + person.time + "<br>")
                    })
                }
            },
            error: function(data) {
                console.log(data)
                $("#error").text(ajaxErrorMessage)
            }
        })
    })


})


