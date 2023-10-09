var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//user clicked pattern
$('[type="button"]').on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//random sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("H1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//playing sound function
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//animate press function
function animatePress(currentCoulour) {
  $("#" + currentCoulour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentCoulour).removeClass("pressed");
  }, 100);
}

//check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("H1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

//start again
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
