$(function() {

    $('form').submit(function() {
        var obj = {}
        obj.name = $('#username').val()
        obj.email = $('#email').val()

        if (validateForm()) {
            $.ajax({
                method: "POST",
                url: "POST.php",
                data: obj
            })
                .done(
                    function (a) {
                        console.log(a)

                    })
            return false;
        } else {
            $('#email').insertAfter("Invalid username or email. Please try again.")
        }
    })











})