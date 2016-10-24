$(function() {
    $('form').submit(function() {
        var obj = {}
        obj.name = $('#username').val()
        obj.email = $('#email').val()
        $.ajax({
            method: "POST",
            url: "POST.php",
            data: obj
        })
            .done(
                function(a) {
                    console.log(a)

                })
        return false;
    })











})
function validateForm (name, email) {
    if (typeof name == "string" && typeof email == "string" && name != "" && email.search(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i) != -1) {
        return true
    }
    return false
}