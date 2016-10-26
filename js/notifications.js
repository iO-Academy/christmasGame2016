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
    $("#game").prepend('<div class="notificationPopUp"></div>')
    $(".notificationPopUp").html(elementHtml)
    $(".notificationPopUp").fadeIn(350)
}

/*
 * Clear cloned content
 * Hide popup
 */
function closePopup() {
    $("#game .notificationPopup").remove()
    $(".notificationPopUp").fadeOut()
}

$(function() {
    // die screen retry button event handler
    $("#canvas").on("click", '.retry', function () {
        closePopup()
        // TODO start game
    })
})

