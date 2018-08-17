var blanks = document.querySelector("#blanks");
var guessesRemaining = document.querySelector("#guessesRemaining");
var guessed = document.querySelector("#guessed");
var start = document.querySelector("#start");
var reset = document.querySelector("#reset");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");
var result = document.querySelector(".result");
var albumDiv = document.querySelector(".album");
var slideshowDiv = document.querySelector(".slideshow");
 
var gameVars = {
  gameStart: false,
  result,
  wins: 0,
  losses: 0,
  wordPool: ["ABC", "BAD", "BEAT IT", "BILLIE JEAN", "BLACK OR WHITE",
             "DANGEROUS", "THAT GIRL IS MINE", "HEAL THE WORLD", "INVINCIBLE",
             "THE WAY YOU MAKE ME FEEL", "MAN IN THE MIRROR", "HUMAN NATURE",
             "ROCK WITH YOU", "THRILLER"],
  currentWord: "",
  albumIndex: 0,
  guessesRemaining: 9,
  guessedChars: [],
  blanks: [],
}

start.onclick = function () {
  if (!gameVars.gameStart) {
    result.style.opacity = 0;
    albumDiv.style.visibility = "hidden";
    slideshowDiv.style.visibility = "visible";
    guessed.style.visibility = 'hidden'; 
    guessesRemaining.style.visibility = 'hidden';
    blanks.style.visibility = 'hidden';
    gameVars.guessesRemaining = 9;
    gameVars.guessedChars = [];
    gameVars.blanks = [];
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
    for (var i = 0; i < gameVars.currentWord.length; i++) {
      if (gameVars.currentWord[i] == " ") {
        gameVars.blanks.push("&nbsp;&nbsp;");
      } else {
        gameVars.blanks.push("_");
      }
    }
  }
  console.log(gameVars.currentWord);
  albumIndex = gameVars.wordPool.indexOf(gameVars.currentWord);
  console.log(albumIndex);  
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

        var albumFile = albumIndex + "-" + gameVars.guessesRemaining;
        console.log(albumFile);

        if (gameVars.guessesRemaining < 9) {
          albumDiv.style.visibility = "visible";
          slideshowDiv.style.visibility = "hidden";
          albumDiv.style.background = "url(../images/album-images/" + albumFile + ".jpg)";
        }
      }
    }

    this.updateHTML();


////////////////////////////////// WIN ////////////////////////////////////////////////////


    if (!gameVars.blanks.includes("_")) {
      start.innerHTML = "PLAY AGAIN?";
      gameVars.wins++;
      wins.innerHTML = gameVars.wins;
      gameVars.gameStart = false;
      result.style.visibility = 'visible';
      result.innerHTML = quotes.win[Math.floor((Math.random() * quotes.win.length) + 0)] + "<br><br> You win!";
      result.style.opacity = 1;
      gameVars.wordPool.splice(gameVars.wordPool.indexOf(gameVars.currentWord), 1);
    }

///////////////////////////LOSE/////////////////////////////////////////////////////////////////////

    if (gameVars.guessesRemaining === 0) {
      blanks.innerHTML = gameVars.currentWord;
      start.innerHTML = "PLAY AGAIN?";
      gameVars.losses++;
      losses.innerHTML = gameVars.losses;
      gameVars.gameStart = false;
      albumDiv.style.zIndex == "99";
      result.style.visibility = 'visible';
      result.innerHTML = quotes.lose;
      result.style.opacity = 1;
      gameVars.wordPool.splice(gameVars.wordPool.indexOf(gameVars.currentWord), 1);

   
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
        "\“The world should be full of love. <br> Love is the  most important thing in the world.\”",
        "\“It’s better to fail in originality <br>than to succeed in imitation.\”",
        "\“I’m interested in making a path<br> instead of following a trail.\”",
        "\“In a world filled with despair,<br> we must still dare to dream.<br> And in a world filled with distrust,<br> we must still dare to believe.\”"
      ],
      lose: ["\“I don’t care if the whole world is <br>against you, teasing you or saying <br> you’re not gonna make it. <br><br> Believe in yourself, no matter what.\" <br><br> Try Again!"]
};


// #-9 guesses remaining - 0 squares
// #-8 - 1 square
// #-7 - 2 squares
// #-6 - 3 squares
// #-5 - 4 squares
// #-4 - 5 squares
// #-3 - 6 squares
// #-2 - 7 squares
// #-1 - 8 squares
// #-0 - solved


//if an incorrect letter is selected
  //change index of .middle-2 to 99

//when play is pressed, reset indexes/restore slideshow at start