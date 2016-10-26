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
function closePopup() {
    $(".notificationPopUp").fadeOut(function() {
        $(this).remove()
    })
}

/*
 * Create click event handlers for how to play button
 */
function instructionsHandler() {
    $("#rules").one("click", function () {
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
        // TODO start game
    })
    instructionsHandler()
})


