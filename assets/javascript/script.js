var blanks = document.querySelector("#blanks");
var guessesRemaining = document.querySelector("#guessesRemaining");
var guessed = document.querySelector("#guessed");
var start = document.querySelector("#start");
var reset = document.querySelector("#reset");

var gameVars = {
  gameStart: false,
  gameOver: false,
  wins: 0,
  losses: 0,
  wordPool: ["JAVASCRIPT", "HTML", "CSS", "PSEUDOCODE", "JQUERY", "ARRAY", "BOOTSTRAP", "OBJECT", "FUNCTION"],
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  blanks: [],
}

start.onclick = function () {
  gameVars.currentWord = [];
  gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
  gameVars.guessesRemaining = 10;
  gameVars.wins = 0,
  gameVars.losses = 0,
  gameVars.guessedChars = [];
  gameVars.blanks = [];
  gameFuncs.updateBlanks();
  guessed.style.visibility = 'visible';
  guessesRemaining.style.visibility = 'visible';
  blanks.style.visibility = 'visible';
  gameVars.gameStart = true;
  console.log(gameVars.currentWord);
}

reset.onclick = function () {
  gameFuncs.resetGame();
  gameVars.gameStart = false;
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

  resetGame: function () {
    guessed.style.visibility = 'hidden'; 
    guessesRemaining.style.visibility = 'hidden';
    blanks.style.visibility = 'hidden';
  },

  updateBlanks: function () {
    if (!gameVars.gameStart) {
      for (var i = 0; i < gameVars.currentWord.length; i++) {
        gameVars.blanks.push("_ ");
      }
    }
    blanks.innerHTML = "<h1>" + gameVars.blanks.join("") + "<h1>";
  },

  gamePlay: function (guess) {
    if (gameVars.currentWord.includes(guess)) {
      for (var i = 0; i < gameVars.currentWord.length; i++) {
        if (guess === gameVars.currentWord[i]) {
          gameVars.blanks[i] = guess;
          gameFuncs.updateBlanks();
        }
      }
      setTimeout(function () {
        if (!gameVars.blanks.includes("_")) {
          alert("YOU WIN!");
        }
      }, 0);
    } else {
      if (!gameVars.guessedChars.includes(guess)) {
        gameVars.guessedChars.push(guess);
        guessed.innerHTML = gameVars.guessedChars.join(" ");
        gameVars.guessesRemaining--;
        guessesRemaining.innerHTML = gameVars.guessesRemaining;
      }

      if (gameVars.guessesRemaining === 0) {
        setTimeout(function () {
          alert("YOU LOSE! THE CODE WAS: " + gameVars.currentWord);
        }, 0);
        gameVars.gameStart = false;
      }

    }
  }
}
