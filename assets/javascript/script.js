

var blanks = document.querySelector("#blanks");
var guessesRemaining = document.querySelector("#guessesRemaining");
var guessed = document.querySelector("#guessed");
var start = document.querySelector("#start");
var reset = document.querySelector("#reset");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");
var result = document.querySelector(".result");

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
      result.innerHTML = quotes.win[Math.floor((Math.random() * quotes.win.length) + 0)] + "<br><br> You win!";

  
    }

    if (gameVars.guessesRemaining === 0) {
      blanks.innerHTML = gameVars.currentWord;
      start.innerHTML = "PLAY AGAIN?";
      gameVars.losses++;
      losses.innerHTML = gameVars.losses;
      gameVars.gameStart = false;
      result.style.visibility = 'visible';

      result.innerHTML = quotes.lose;
      result.classList.toggle("display");
   
    }
  },

  updateHTML: function() {
    blanks.innerHTML = gameVars.blanks.join("");
    guessesRemaining.innerHTML = gameVars.guessesRemaining;
    guessed.innerHTML = gameVars.guessedChars.join(" ");
    start.innerHTML = "START";
  },



}

var quotes = {
  win: ["\"Please go for your dreams. <br> Whatever your ideals, you can become whatever you want to become.\"", 
        "\“In a world filled with hate, <br>we must still dare to hope.\”",
        "\“The world should be full of love. <br>Love.<br> Love is the  most important thing in the world.\”",
        "\“It’s better to fail in originality <br>than to succeed in imitation.\”",
        "\“I’m interested in making a path<br> instead of following a trail.\”",
        "\“In a world filled with despair,<br> we must still dare to dream.<br> And in a world filled with distrust,<br> we must still dare to believe.\”"
      ],
      lose: ["\“I don’t care if the whole world is <br>against you, teasing you or saying <br> you’re not gonna make it. <br><br> Believe in yourself, no matter what.\" <br><br> Try Again"]
};