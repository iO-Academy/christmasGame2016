$(function() {
    $(".leaderboard").on("click", function() {
        leaderBoardGenerate()
    })
})

// // Leaderboard button event handler
// $("#dieLeaderboard").click(function () {
//     $(".notificationPopUp").load("index.html #leaderScreen")
// })

function leaderBoardGenerate() {
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
                $("#leaderScreen").append('<table id="leaders"><tr><th>Name</th><th>Time</th></tr></table>')
                $.each(response.data.leaderboard, function (key, person) {
                    $("#leaderScreen table").append("<tr><td>" + person.name + "</td><td>" + person.time + "</td></tr>")
                })
                $("#leaderScreen").append('<button class="large" id="close" type="button">Close</button>')
                $("#close").click(closePopup)
            }
        },
        error: function(data) {
            console.log(data)
            $("#error").text(ajaxErrorMessage)
        }
    })
}