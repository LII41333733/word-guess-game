var gameVars = {
  gameStart: false,
  gameOver: false,
  wins: 0,
  wordPool: ["JAVASCRIPT", "HTML", "CSS", "PSEUDOCODE", "JQUERY", "ARRAY", "BOOTSTRAP", "OBJECT", "FUNCTION"], 
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  blanks:[],
}

var gameFuncs = {

  resetGame: function() {
    gameVars.blanks = [];
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
    
    //TEST
    document.querySelector("#word").innerHTML = gameVars.currentWord;
    
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


      if (gameVars.guessesRemaining === 0) {
        setTimeout(function() {
          if (!gameVars.blanks.join("").includes("_")) {
            alert("YOU LOSE AND ARE BANISHED TO THE UNDERWORLD FOREVER");
            gameFuncs.resetGame();}
          }, 0);
      } else {
        // Feature: Picture changes
        if (!gameVars.guessedChars.includes(guess)) {
          gameVars.guessedChars.push(guess);
          gameVars.guessesRemaining--;
          document.querySelector("#guessesRemaining").innerHTML = gameVars.guessesRemaining;
          console.log(gameVars.guessedChars.join());
          document.querySelector("#guessed").innerHTML = gameVars.guessedChars;
        }

      }
    }
  }

}

//Creates word and sets 'blanks' variable
gameFuncs.resetGame();


//TEST
var word = gameVars.currentWord;
document.querySelector("#word").innerHTML = word;

// Event Listeners:
//When a key is pressed, start 'gamePlay' function
document.onkeyup = function(event) {
  if (/[a-zA-Z]/.test(event.key)) {
    gameVars.gameStart = true;
    var guessedLetter = event.key.toUpperCase();
    gameFuncs.gamePlay(guessedLetter);
  }
  setTimeout(function() {
    if (!gameVars.blanks.join("").includes("_")) {
      alert("YOU WIN! PRESS SPACEBAR TO PLAY AGAIN");
      gameFuncs.resetGame();
    }
  }, 0);
  


}