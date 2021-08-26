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

var replaceTextArea = function(textAreaElement) {
    var appointmentInfo = textAreaElement.closest("appointment-info")
    var textArea = appointmentInfo.find("textArea")

    var time = appointmentInfo.attr("id")
    var text = textArea.val().trim()

    appointment[time] = [text]
    setAppointment()

    createAppointment(text, appointmentInfo)
}

$(".appointment").click(function() {
    replaceTextArea($(this))
})

var time = $(this).closest(".appointment-info").attr("id")
    if (parseInt(time) >= moment().hour()) {

        // create a textInput element that includes the current task
        var text = $(this).text()
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text)

        // add the textInput element to the parent div
        $(this).html(textInput)
        textInput.trigger("focus")
    }
})

// save button click handler
$(".saveBtn").click(function() {
    replaceTextarea($(this))
})

// update task backgrounds on the hour
timeToHour = 3600000 - today.milliseconds()  // check how much time is left until the next hour
setTimeout(function() {
    setInterval(auditTasks, 3600000)
}, timeToHour);

// get the tasks from localStorage on load.
getTasks()

