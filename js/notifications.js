function popupNotification($element) {
    var elementHtml = $element.clone().wrap("<div/>").parent().html()
    $("#game").html('<div class="notificationPopUp"></div>')
    $(".notificationPopUp").html(elementHtml)
    $(".notificationPopUp").show()
}

function closePopup() {
    $("#game").html("")
    $(".notificationPopUp").hide()
}

