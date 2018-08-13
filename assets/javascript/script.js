var blanks = document.querySelector("#blanks");
var guessesRemaining = document.querySelector("#guessesRemaining");
var guessed = document.querySelector("#guessed");
var start = document.querySelector("#start");
var reset = document.querySelector("#reset");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");

var gameVars = {
  gameStart: false,
  gameOver: false,
  wins: 0,
  losses: 0,
  wordPool: ["JAVASCRIPT", "HTML", "CSS", "PSEUDOCODE", "STRING", "NUMBER",
            "JQUERY", "ARRAY", "BOOTSTRAP", "OBJECT", "FUNCTION", "BOOLEAN",
            "CONSOLE", "DEVELOPER", "SOFTWARE", "LOOP", "METHOD", "VARIABLE", 
            "CLASS", "ELEMENT", "CONCATENATION", "INDEX", "OPERATOR", "CODE"],
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  blanks: [],
}

start.onclick = function () {
  if (!gameVars.gameStart) {
    guessed.style.visibility = 'hidden'; 
    guessesRemaining.style.visibility = 'hidden';
    blanks.style.visibility = 'hidden';
    gameVars.guessesRemaining = 10;
    gameVars.guessedChars = [];
    gameVars.blanks = [];
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
    for (var i = 0; i < gameVars.currentWord.length; i++) {
      gameVars.blanks.push("_ ");
    }
  }
  console.log(gameVars.currentWord);  
  gameVars.gameStart = true;
  gameFuncs.updateHTML();
  guessed.style.visibility = 'visible';
  guessesRemaining.style.visibility = 'visible';
  blanks.style.visibility = 'visible';
}



document.onkeyup = function (event) {
  if (gameVars.gameStart) {
    if (event.keyCode > 64 && event.keyCode < 91) {
      var guessedLetter = event.key.toUpperCase();
      gameFuncs.gamePlay(guessedLetter);
    }
  }
}

var gameFuncs = {

  gamePlay: function (guessedLetter) {

    if (gameVars.currentWord.includes(guessedLetter)) {
      for (var i = 0; i < gameVars.currentWord.length; i++) {
        if (gameVars.currentWord[i] === guessedLetter) {
          gameVars.blanks[i] = guessedLetter;
        }
      }
    } else {
      if (!gameVars.guessedChars.includes(guessedLetter)) {
        gameVars.guessedChars.push(guessedLetter);
        gameVars.guessesRemaining--;
      }
    }

    this.updateHTML();

    if (!gameVars.blanks.includes("_ ")) {
      start.innerHTML = "PLAY AGAIN?";
      wins.innerHTML++;
      gameVars.gameStart = false;
      setTimeout(function () {
        alert("YOU WIN!");
      }, 0);
    }

    if (gameVars.guessesRemaining === 0) {
      start.innerHTML = "PLAY AGAIN?";
      losses.innerHTML++;
      gameVars.gameStart = false;
      setTimeout(function () {
        alert("YOU LOSE! THE CODE WAS: " + gameVars.currentWord);
      }, 0);
    }
  },

  updateHTML: function() {
    blanks.innerHTML = "<h1>" + gameVars.blanks.join("") + "<h1>";
    guessesRemaining.innerHTML = gameVars.guessesRemaining;
    guessed.innerHTML = gameVars.guessedChars.join(" ");
    start.innerHTML = "START";
  },



}
