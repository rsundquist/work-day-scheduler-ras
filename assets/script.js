var today = moment()
$("#currentDay").text(today.format("dddd, MMMM, Do, YYYY h:mm a"))

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

var timeBlock
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
    console.log("current hour",currentHour)
    $(".timeBlock").each( function() {
        var elementHour = parseInt($(this).attr("id").split("-")[1])
        console.log("element hour",elementHour)

        // handle past, present, and future
        if ( elementHour < currentHour ) {
            $(this).addClass("past")
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass("past")
            $(this).addClass("present")
        }
        else {
            $(this).removeClass("past")
            $(this).removeClass("present")
            $(this).addClass("future")
        }
    })
}

var replaceTextArea = function(textAreaElement) {
    timeBlock = textAreaElement.closest("timeBlock")
    var textArea = timeBlock.find("textArea")

    var time = timeBlock.attr("id")
    var text = textArea.val()
    //console.log(text)

    appointment[time] = [text]
    //setAppointment()

    createAppointment(text, timeBlock)
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


// save button click handler
$(".saveBtn").click(function() {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");
    localStorage.setItem(time, text)
    replaceTextArea($(this))
})

// update task backgrounds on the hour
timeToHour = 3600000 - today.milliseconds()  // check how much time is left until the next hour
setTimeout(function() {
    setInterval(auditTasks, 3600000)
}, timeToHour)

// get the tasks from localStorage on load.
getAppointment()


