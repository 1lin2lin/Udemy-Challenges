var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").keydown(function(){
    if (started === false) {
        started = true;
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

//step 4 check which button is pressed
$(".btn").click(function () {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});

function playSound(key) {
        var audio = new Audio ("sounds/"+key+".mp3");
        audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(lastIndex) {
    if (gamePattern[lastIndex] === userClickedPattern[lastIndex]){
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    // for (var i = 0; i < lastIndex; i++) {
    //     if (gamePattern[i] === userClickedPattern[i]){
    //         console.log("success");
    //     }
    //     else {
    //         playSound("wrong");
    //         $("body").addClass("game-over");
    //         setTimeout(function () {
    //             $("body").removeClass("game-over");
    //         }, 200);
    //         $("#level-title").text("Game Over, Press Any Key to Restart");
    //         startOver();
    //     }
    // }
    // if (lastIndex === gamePattern.length) {
    //     setTimeout(function () {
    //         nextSequence();
    //     }, 1000);
    // }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}