var status = 0;
var states = ["Front page", "Quiz", "Scoring", "High Score"];
var question = 0;
var season = 0;
var score=0;
var time=0;
var correct="paused";
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
    var btn = $("<button>");
    btn.addClass("seasonButtons");
    btn.attr("value", i);
    btn.text("Season " + i);
    seasonButtons.push(btn);
}
var questionList = [];
var questionText = $("<h2>");
var answerButtons = [];
var answer = "";
for(var i = 1; i<5; i++){
    var btn = $("<button>");
    btn.addClass("answerButtons");
    btn.attr("id", "a" + i);
    answerButtons.push(btn);
}
var rightOrWrong = $("<h3>");
var entry = $("<input>");
entry.attr("placeholder", "initials");
var submit = $("<button>");
submit.addClass("submit");
submit.text("Submit");
var highScoreArray = JSON.parse(localStorage.getItem("scores"));
if(highScoreArray===null){
    highScoreArray=[];
}
var highScoreHeader = $("<h1>");
highScoreHeader.text("High Scores");
var highScoreList = "<ol>";
var goBack = $("<button>");
goBack.addClass("goBack");
goBack.text("Go Back");
var clearScores = $("<button>");
clearScores.addClass("clearScores");
clearScores.text("Clear Scores");
var topIndex = 0;
function navigate(){
    if(status==0){
        $("ol").remove();
        $("h1").remove();
        $("button").remove();
        question = 0;
        time = 0;
        score = 0;
        correct = "paused";
        timerDiv.text(time);
        $("#content").append(header);
        explanation.text("Choose a season and test your breaking bad knowledge!");
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
        $("a").remove();
        $(".timer").remove();
        $("h2").remove();
        $(".explanation").remove();
        $("input").remove();
        $(".submit").remove();
        $("#content").append(highScoreHeader);
        $("#content").append(highScoreList);
        for(var i = 0; i < highScoreArray.length; i++){
            var highScoreEntry = $("<li>");
            highScoreEntry.text(highScoreArray[i][0] + " - " + highScoreArray[i][1] + " seconds remaining on quiz " + highScoreArray[i][2] + " with " + highScoreArray[i][3] + " questions correct.")
            $("ol").append(highScoreEntry)
        }
        $("#content").append(goBack);
        $("#content").append(clearScores);
    }
    $(document).ready(function(){
        $("button").on("click", function(){
            if(this.className == "seasonButtons"){
                season = this.value;
                questionList=allQuestions[season-1];
                status = 1;
                navigate();
            }
            else if(this.className == "answerButtons"){
                if(this.value == answer){
                    correct=true;
                }
                else{
                    correct=false;
                }
                nextQuestion();
            }
            else if(this.className == "submit"){
                var result = [$("input").val(), time, season, score];
                highScoreArray.push(result);
                console.log(highScoreArray);
                console.log(highScoreArray.length);
                var highScoreArrayLength=highScoreArray.length; 
                var sortedArray=[];
                if (highScoreArrayLength>0){
                    while(sortedArray.length < highScoreArrayLength){
                        for(var i = 0; i < highScoreArray.length; i++){
                            topIndex = 0
                            if(highScoreArray[topIndex][1]<highScoreArray[i][1]){
                                topIndex = i;
                            }
                        }
                        sortedArray.push(highScoreArray[topIndex]);
                        highScoreArray.splice(topIndex);
                    }
                }
                highScoreArray=sortedArray;
                console.log(sortedArray);
                localStorage.setItem("scores", JSON.stringify(highScoreArray))
                status = 3;
                navigate();
            }
            else if(this.className == "goBack"){
                status = 0;
                navigate();
            }
            else if(this.className == "clearScores"){
                highScoreArray=[]
                localStorage.setItem("scores", JSON.stringify(highScoreArray))
                $("li").remove();
            }
        })
        $("a").on("click", function(){
            status = 3;
            navigate();
        })
    })
}
function startTimer(){
    time=75
    timer=setInterval(function(){
        time--;
        if(time < 0){
            clearInterval(timer);
            status=2;
            navigate();
        }
        if(status == 2){
            clearInterval(timer);
        }
    $(timerDiv).text(time);
    }, 1000)
}
function nextQuestion(){
    if(question<5) {
        $("h2").text(questionList[question]["title"]);
        var choices = questionList[question]["choices"];
        choices = choices.sort(function(a, b){return 0.5 - Math.random()});
        for(var i = 0; i < choices.length; i++){
            var j = i + 1;
            $("#a" + j).text(choices[i]);
            $("#a" + j).attr("value", choices[i]);
        }
        answer = questionList[question]["answer"];
        question++;
        if(correct===true){
            score++;
            rightOrWrong.text("Correct!");
            $("#content").append(rightOrWrong);
            rightOrWrongTimer = setInterval(function(){
                countdown--;
                if(countdown==0){
                    clearInterval(rightOrWrongTimer);
                    $("h3").remove();
                }
            }, 1000)
        }
        else if(correct===false){
            time=time-15;
            rightOrWrong.text("Incorrect!");
            $("#content").append(rightOrWrong);
            rightOrWrongTimer = setInterval(function(){
                countdown--;
                if(countdown==0){
                    clearInterval(rightOrWrongTimer);
                    $("h3").remove();
                }
            }, 1000)
        }
    }
    else{
        if(correct===true){
            score++;
            rightOrWrong.text("Correct!");
            $("#content").append(rightOrWrong);
            rightOrWrongTimer = setInterval(function(){
                countdown--;
                if(countdown==0){
                    clearInterval(rightOrWrongTimer);
                    $("h3").remove();
                }
            }, 1000)
        }
        else if(correct===false){
            time=time-15;
            rightOrWrong.text("Incorrect!");
            $("#content").append(rightOrWrong);
            rightOrWrongTimer = setInterval(function(){
                countdown--;
                if(countdown==0){
                    clearInterval(rightOrWrongTimer);
                    $("h3").remove();
                }
            }, 1000)
        }
        status = 2;
        navigate();
    }
    var countdown = 2;
    
}
navigate();