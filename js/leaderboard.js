/**
 * callback ensures the leaderboard is only generated AFTER any open popups have closed
 */
$(function() {
    $("#canvas").on("click", '.leaderboard', function() {
        closePopup(leaderBoardGenerate)
    })
})

/**
 * AJAx request
 * Pass returned details into a table for display
 */
function leaderBoardGenerate() {
    var ajaxErrorMessage = "Unexpected error. Please try again."
    var obj = {"action" : "getLeaderboard"}

    $.ajax({
        method: "POST",
        url: "api/",
        data: obj,
        success: function(response) {
            console.log(response)
            if (!response.success) {
                $("#error").text(ajaxErrorMessage)
            } else {
                $("#hiddenPopups").append('<div id="leaderScreen"><img src="assets/tree.jpg" class="right" alt="christmas tree" id="leaderTree"><h1>Top Five Players</h1></div>')
                $("#leaderScreen").append('<table id="leaders"><tr><th>Name</th><th>Time</th></tr></table>')
                $.each(response.data.leaderboard, function (key, person) {
                    var leaderName = allTitleCase(person.name)
                    $("#leaderScreen table").append("<tr><td>" + leaderName + "</td><td>" + person.time + "</td></tr>")
                })
                openPopup($("#leaderScreen"))
                $("#leaderScreen").append('<button class="large wideButton" id="close" type="button">Close</button>')
                $("#close").click(closePopup)
            }
        },
        error: function(data) {
            console.log(data)
            $("#error").text(ajaxErrorMessage)
        }
    })
}

/**
 * @param inStr string
 * @returns string first letter of each word in string capitalised
 */
function allTitleCase(inStr)
{
    return inStr.replace(/\w\S*/g, function(tStr)
    {
        return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
    });
}