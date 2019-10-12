var status = 0;
var states = ["Front page", "Quiz", "Scoring", "High Score"];
var question = 0;
var season = 0;
var score=0;
var time=0;
var correct="paused";
var done=false;
var highScoreLink = $("<a>");
highScoreLink.text("View High Scores");
var timerDiv = $("<div>");
timerDiv.addClass("timer");
timerDiv.text(time);
var header = $("<h1>");
header.text("Breaking Bad Quiz");
var explanation = $("<div>");
explanation.addClass("explanation");
explanation.text("Choose a season and test your breaking bad knowledge!");
var seasonButtons = [];
for(var i = 1; i<6; i++){
    var btn = $("<btn>");
    btn.addClass("seasonButtons");
    btn.attr("id", "s" + i);
    btn.text("Season " + i);
    seasonButtons.push(btn);
}
var questionText = $("<h2>");
var answerButtons = [];
for(var i = 1; i<5; i++){
    var btn = $("<btn>");
    btn.addClass("answerButtons");
    btn.attr("id", "a" + i);
    answerButtons.push(btn);
}
var entry = $("<input>");
entry.attr("placeholder", "initials");
var submit = $("<btn>");
submit.addClass("submit");
var highScoreArray = JSON.parse(localStorage.getItem("scores"));
if(highScoreArray===null){
    highScoreArray=[];
}
var highScoreHeader = $("<h1>");
highScoreHeader.text("High Scores");
var highScoreList = "<ol>";
var goBack = $("<btn>");
goBack.addClass("goBack");
var clearScores = $("<btn>");
clearScores.addClass("clearScores");
function navigate(){
    if(status==0){
        question = 0;
        time = 0;
        score = 0;
        done = false;
        correct = "paused";
        timerDiv.text(time);
        $("#content").append(header);
        $("#content").append(explanation);
        for(var i = 0; i < seasonButtons.length; i++){
            $("#content").append(seasonButtons[i]);
        }
        $(".navbar").append(highScoreLink);
        $(".navbar").append(timerDiv);
    }
    else if(status==1){
        $("h1").remove();
        $(".explanation").remove();
        $(".seasonButtons").remove();
        startTimer();
        $("#content").append(questionText);
        for(var i = 0; i < answerButtons.length; i++){
            $("#content").append(answerButtons[i]);
        }
        nextQuestion();
    }
    else if(status==2){
        questionText.text("You've completed the quiz!");
        $(".answerButtons").remove();
        explanation.text("You got " + score + " questions right on the Breaking Bad season " + season + " quiz!  You had " + time + " seconds remaining!")
        $("#content").append(explanation);
        $("#content").append(entry);
        $("#content").append(submit);
    }
    else{
        //Load High Score page, header, scores,  add "go back" and "clear scores" buttons, hide timer and high score link
        $("a").remove();
        $(".timer").remove();
        $("h2").remove();
        $("explanation").remove();
        $("input").remove();
        $(".submit").remove();
        $("#content").append(highScoreHeader);
        $("#content").append(highScoreList);
        for(var i = 0; i < highScoreArray.length; i++){
            var highScoreEntry = $("<div>");
            highScoreEntry.text(highScoreArray[i][0] + " - " + highScoreArray[i][1] + " seconds remaining on quiz " + highScoreArray[i][2] + " with " + highScoreArray[i][3] + " questions correct.")
            $("ol").append(highScoreEntry)
        }
        $("#content").append(goBack);
        $("#content").append(clearScores);
    }
}
function startTimer(){
    time=75
    timer=setInterval(function(){
        time--;
        if(time===0 || question===5){
            clearInterval(timer);
            status=2;
            navigate();
        }
    $(timer).text(time);
    }, 1000)
}
function nextQuestion(){
    //Load in next question and answers
    $("h2").text(questionList[question]["title"]);
    var choices = questionList[question]["choices"];
    //shuffle.  Is there seriously not an existing function for this?
    var answer = questionList[question]["answer"];
    question++;
    if(correct===true){
        score++;
        //Load in "Correct" that will fade.
    }
    else if(correct===false){
        time=time-15;
        //Load in "Wrong!" that will fade.
    }
}

//redo button and link event listeners with jQuery, make sure season selectors set season and question list

navigate();