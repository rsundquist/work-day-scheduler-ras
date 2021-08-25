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
