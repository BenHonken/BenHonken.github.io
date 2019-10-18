//set schedule array
var scheduleArray = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
//load date
var savedDate = localStorage.getItem("savedDate");
var savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
//check time moment().format('h:mm:ss a')
var currentTime = moment().format('h:mm:ss a');
//load calendar with slot, time, input, and save button 
for(var i = 0; i < 9; i++){
    var slot = $("<div>");
    slot.addClass("time-block");
    slot.addClass("row");
    var time = i + 9;
    var amPm = "AM"
    if(time > 12){
        time = time - 12
        amPm = "PM"
    }
    var timeString = time + ":00 " + amPm;
    var timeLabel = $("<div>");
    timeLabel.addClass("hour");
    timeLabel.addClass("col-md-2");
    timeLabel.text(timeString);
    slot.append(timeLabel);
    var textInput = $("<input>");
    textInput.addClass("eventText");
    textInput.addClass("col-md-8");
    textInput.attr("id", i);
    slot.append(textInput);
    var saveButton = $("<button>");
    saveButton.addClass("col-md-2 saveBtn");
    saveButton.attr("value", i);
    saveButton.html("<i class='fas fa-save fa-3x'></i>");
    slot.append(saveButton);
    $(".container").append(slot);
}
//color schedule
function color(){
    for(var i = 0; i < scheduleArray.length; i++){
        $("#" + i).removeClass("past");
        $("#" + i).removeClass("present");
        $("#" + i).removeClass("future");
    }
    var colorTime = moment().format("ha");
    if(scheduleArray.includes(colorTime)){
        var i = 0;
        while(scheduleArray[i] != colorTime){
            $("#" + i).addClass("past");
            i++;
        }
        $("#" + i).addClass("present");
        i++;
        while(i < 9){
            $("#" + i).addClass("future");
            i++;
        }
    }
    else if(colorTime[1] == "a" || colorTime[2] == "a"){
        for(var i = 0; i < scheduleArray.length; i++){
            $("#" + i).addClass("future");
        }
    }
    else{
        for(var i = 0; i < scheduleArray.length; i++){
            $("#" + i).addClass("past");
        }
    }

}
//save text fields to local storage using event listener and function
$("button").on("click", function(){
    var id = $(this);
    id = id.val();
    var savedEvent = {id: id, title: $("#" + id).val()};
    savedEvents.push(savedEvent);
    var stringifiedEvents = JSON.stringify(savedEvents);
    localStorage.setItem("savedEvents", stringifiedEvents);
    refresh();
    color();
})
//update date and time, moving time and refreshing at midnight moment().endOf('day').fromNow();
function refresh(){
    currentDate = moment().format('MMMM Do YYYY');
    if(currentDate != savedDate){
        savedDate = currentDate;
        savedEvents = [];
        localStorage.setItem("savedDate", savedDate);
        var stringifiedEvents = JSON.stringify(savedEvents);
        localStorage.setItem("savedEvents", stringifiedEvents);
    }
    $("#currentDay").text(moment().format('dddd, MMMM Do'));
    for(var i = 0; i < savedEvents.length; i++){
        $("#" + savedEvents[i].id).val(savedEvents[i].title);
    }
}
refresh();
color();