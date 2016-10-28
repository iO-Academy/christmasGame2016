/*
* Generate popup div
* Clone in content from passed in element
* Display popup
*
* param $element pass in jQuery element name
*
*/
function openPopup($element) {
    var elementHtml = $element.clone(true, true).wrap("<div/>").parent().html()
    if ($("#game").length > 0) {
        $("#game").prepend('<div class="notificationPopUp"></div>')
    } else {
        $("#canvas").prepend('<div class="notificationPopUp"></div>')
    }
    $(".notificationPopUp").html(elementHtml)
    $(".notificationPopUp").fadeIn(350)
}

/*
 * Clear cloned content
 * Hide popup
 */
function closePopup(callback) {
    if($(".notificationPopUp").length > 0) {
        $(".notificationPopUp").fadeOut(function () {
            $(".notificationPopUp, table").remove()
            if (typeof callback == "function") {
                callback()
            }
        })
    } else {
        if (typeof callback == "function") {
            callback()
        }
    }
}

/*
 * Create click event handlers for how to play button
 */

    function instructionsHandler() {
        $("#rules").on("click", function () {
            console.log("sausages")
            openPopup($("#rulesScreen"))
            $(this).attr("id", "closeRules")
            $("#retryText").text("Close")

            // create close event handler
            $("#closeRules").one("click", function () {
                closePopup()
                $(this).attr("id", "rules")
                $("#retryText").text("How To Play")
                instructionsHandler()
            })
        })
    }


/*
 * Create retry button event handler
 */
$(function() {
    // die screen retry button event handler
    $("#canvas").on("click", '.retry', function () {
        closePopup()
        init()
        gameStartHandler()
        instructionsHandler()
    })

})