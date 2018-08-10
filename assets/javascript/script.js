var gameVars = {
  gameStart: false,
  gameOver: false,
  wins: 0,
  wordPool: ["JAVASCRIPT", "HTML", "CSS", "CODE", "JQUERY"], 
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  blanks:[],
}

var gameFuncs = {

  setWordAndBlanks: function() {
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
    for (var i = 0; i < gameVars.currentWord.length; i++) {
      gameVars.blanks.push("_ ");
    }
    this.maintainBlanks();
  },

  maintainBlanks: function() {
    document.querySelector("#blanks").innerHTML = "<h1>" + gameVars.blanks.join("") + "<h1>";
  },

  gamePlay: function(guess) {
    if (gameVars.currentWord.includes(guess)) {
      for (var i = 0; i < gameVars.currentWord.length; i++) {
        if (guess === gameVars.currentWord[i]) {
          gameVars.blanks[i] = guess;
          this.maintainBlanks();
        }
      }
    } else {
      gameVars.guessesRemaining--;
      gameVars.guessedChars.push(guess);
      // Feature: Picture changes
    }
  }

}

//Creates word and sets 'blanks' variable
gameFuncs.setWordAndBlanks();


//TEST
var word = gameVars.currentWord;
document.querySelector("#word").innerHTML = word;

// Event Listeners:
//When a key is pressed, start 'gamePlay' function
document.onkeyup = function(event) {
  gameVars.gameStart = true;
  var guessedLetter = event.key.toUpperCase();
  gameFuncs.gamePlay(guessedLetter);

  setTimeout(function() {
    if (!gameVars.blanks.join("").includes("_")) {
      alert("YOU WIN!");
    }
  }, 0);
  
}
