

var blanks = document.querySelector("#blanks");
var guessesRemaining = document.querySelector("#guessesRemaining");
var guessed = document.querySelector("#guessed");
var start = document.querySelector("#start");
var reset = document.querySelector("#reset");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");
var result = document.querySelector("#result");

var gameVars = {
  gameStart: false,
  result,
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
    result.style.visibility = 'hidden'; 
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
      gameVars.wins++;
      wins.innerHTML = gameVars.wins;
      gameVars.gameStart = false;
      result.style.visibility = 'visible';
      result.innerHTML = "of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ";
    }

    if (gameVars.guessesRemaining === 0) {
      blanks.innerHTML = gameVars.currentWord;
      start.innerHTML = "PLAY AGAIN?";
      gameVars.losses++;
      losses.innerHTML = gameVars.losses;
      gameVars.gameStart = false;
      result.style.visibility = 'visible';
      result.innerHTML = "YOU LOSE! THE CODE WAS: ";
    }
  },

  updateHTML: function() {
    blanks.innerHTML = gameVars.blanks.join("");
    guessesRemaining.innerHTML = gameVars.guessesRemaining;
    guessed.innerHTML = gameVars.guessedChars.join(" ");
    start.innerHTML = "START";
  },



}
