var today = moment()
$("#currentDay").text(today.format("dddd, MMMM, Do, YYYY"))

var appointment = {
    "nine": [],
    "ten": [],
    "eleven": [],
    "twelve": [],
    "one": [],
    "two": [],
    "three": [],
    "four": [],
    "five": []
}  

var setAppointment = function() {
    localStorage.setItem("appointment", JSON.stringify("appointment"))
}

var getAppointment = function() {
    var enteredAppointment = JSON.parse(localStorage.getItem("appointment"))
    if (enteredAppointment) {
        appointment = enteredAppointment

        $.each(appointment, function(hour, appointment) {
            var hourDiv = $("#" + hour)
            createappointment(appointment, hourDiv)
        })
    }
    auditAppointment()
}
var createAppointment = function(appointmentText, hourDiv) {
    var appointmentDiv = hourDiv.find("appointment")
    var appointmentP = $("<p>")
        .addClass("description")
        .text(appointmentText)
    appointmentDiv.html(appointmentP)
}

var auditAppointment = function() {
    /* update the background of each row based on the time of day */

    var currentHour = moment().hour();
    $(".appointment-info").each( function() {
        var elementHour = parseInt($(this).attr("id"))

        // handle past, present, and future
        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past")
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present")
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future")
        }
    })
}

