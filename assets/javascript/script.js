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
             "DANGEROUS", "THE GIRL IS MINE", "HEAL THE WORLD", "INVINCIBLE",
             "THE WAY YOU MAKE ME FEEL", "MAN IN THE MIRROR", "PRETTY YOUNG THING",
             "ROCK WITH YOU", "THRILLER"],
  wordPoolCopy: ["ABC", "BAD", "BEAT IT", "BILLIE JEAN", "BLACK OR WHITE",
             "DANGEROUS", "THE GIRL IS MINE", "HEAL THE WORLD", "INVINCIBLE",
             "THE WAY YOU MAKE ME FEEL", "MAN IN THE MIRROR", "PRETTY YOUNG THING",
             "ROCK WITH YOU", "THRILLER"],
  currentWord: "",
  albumIndex: "",
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
    if (gameVars.wordPool.length === 0) {
      gameVars.wordPool = gameVars.wordPoolCopy.slice(0, gameVars.wordPoolCopy.length);
    }
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
    
    for (var i = 0; i < gameVars.currentWord.length; i++) {
      if (gameVars.currentWord[i] == " ") {
        gameVars.blanks.push("&nbsp;&nbsp;");
      } else {
        gameVars.blanks.push("_");
      }
    }
  }

  albumIndex = gameVars.wordPoolCopy.indexOf(gameVars.currentWord);

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


        if (gameVars.guessesRemaining < 9) {
          albumDiv.style.visibility = "visible";
          slideshowDiv.style.visibility = "hidden";
          albumDiv.style.background = "url('assets/images/album-images/" + albumFile + ".jpg')";
          albumDiv.style.backgroundSize = "cover";
        }
      }
    };

    this.updateHTML();


////////////////////////WIN///////////////////////////


    if (!gameVars.blanks.includes("_")) {
      start.innerHTML = "PLAY AGAIN?";
      slideshowDiv.style.visibility = "hidden";
      albumDiv.style.visibility = "visible";
      albumDiv.style.background = "url('assets/images/album-images/" + albumIndex + "-9.jpg')";
      albumDiv.style.backgroundSize = "cover";
      gameVars.wins++;
      wins.innerHTML = gameVars.wins;
      gameVars.wordPool.splice(gameVars.wordPool.indexOf(gameVars.currentWord), 1);
      gameVars.gameStart = false;
      result.style.visibility = 'visible';
      result.innerHTML = quotes.win[Math.floor((Math.random() * quotes.win.length) + 0)] + "<br><br> You win!";
      result.style.opacity = 1;
    };

///////////////////////////LOSE/////////////////////////

    if (gameVars.guessesRemaining === 0) {
      albumDiv.style.background = "url('assets/images/album-images/" + albumIndex + "-9.jpg')";
      albumDiv.style.backgroundSize = "cover";
      blanks.innerHTML = gameVars.currentWord;
      start.innerHTML = "PLAY AGAIN?";
      gameVars.losses++;
      losses.innerHTML = gameVars.losses;
      gameVars.wordPool.splice(gameVars.wordPool.indexOf(gameVars.currentWord), 1);
      gameVars.gameStart = false;
      result.style.visibility = 'visible';
      result.innerHTML = quotes.lose;
      result.style.opacity = 1;
    };
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