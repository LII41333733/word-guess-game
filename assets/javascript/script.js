var gameVars = {
  gameStart: false, //
  gameOver: false,
  wins: 0,
  wordPool: ["MARK", "JAVASCRIPT", "HTML", "CSS", "CODE", "JQUERY"], 
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
    document.querySelector("#spaces").innerHTML = "<h1>" + gameVars.blanks.join("") + "<h1>";
  },

  gamePlay: function(guess) { // edits display after guess
    // if 'currentGuessed' matches a char in 'currentWord'
    console.log(guess);
    console.log(gameVars.currentWord.includes(guess));
    if (gameVars.currentWord.includes(guess)) {
      //loop through 'currentWord'
      for (var i = 0; i < gameVars.currentWord.length; i++) {
        if (guess === gameVars.currentWord[i]) {
          gameVars.blanks[i] = guess;
          this.maintainBlanks();
        }
      }
    } else {
      console.log(gameVars.guessesRemaining);
      gameVars.guessesRemaining--;
      gameVars.guessedChars.push(guess);
      //Feature: Picture changes
    }
  },

}

//Creates word and sets 'blanks' variable
gameFuncs.setWordAndBlanks();


//TEST
var word = gameVars.currentWord;
document.querySelector("#word").innerHTML = word;

// Event Listeners

//When a key is pressed, start 'gamePlay' function
document.onkeyup = function(event) {
  gameVars.gameStart = true;
  var guessedLetter = event.key.toUpperCase();
  gameFuncs.gamePlay(guessedLetter);
  if (!gameVars.blanks.join("").includes("_")) {
    alert("YOU WIN!");
  };
}


  // if !blanks.contains("_") {
    // 'gameOver = true';



/*

1. Press any key to start game

2. Wins = 0; gameStart = true;

3. When key is pressed:
  - push letter to guessedChars
  - (Function) matchLoop --> (Function) blanksLoop --> 
  - if wrong, 
    -- guessesremaining--
    else
    -- 


*/