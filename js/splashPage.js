var user

$(function() {

    $("#newUserReg").submit(function() {
        var ajaxErrorMessage = "Unexpected error. Please try again."
        var obj = {}
        obj.userName = $("#username").val()
        obj.userEmail = $("#email").val()
        obj.action = "createUser"

        if (validateForm(obj.userName, obj.userEmail)) {
            $.ajax({
                method: "POST",
                url: "api/",
                data: obj,
                success: function(response) {
                    if (!response.success) {
                        $("#error").text(ajaxErrorMessage)
                    } else {
                        user = response.data // save user data for later
                        $('#canvas').load("game.html", function() {
                            $(this).addClass("game")
                            init()
                            $("#timer").html("00:00")
                            gameStartHandler()
                            instructionsHandler()
                        })
                    }
                },
                error: function() {
                    $("#error").text(ajaxErrorMessage)
                }
            })
            $("#error").text("")
        } else {
            $("#error").text("Invalid username or email. Please try again.")
        }
        return false
    })

})
function validateForm(name, email) {
    if (
        typeof name == "string"
        && typeof email == "string"
        && name != ""
        && email.search(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != -1
    ) {
        return true
    }
    return false
}