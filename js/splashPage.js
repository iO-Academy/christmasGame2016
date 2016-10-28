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
                success: function(data) {
                    if (!data.success) {
                        $("#error").text(ajaxErrorMessage)
                    } else {
                        $('#canvas').load("game.html", function() {
                            $(this).addClass("game")
                            init()
                            gameStartHandler()
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