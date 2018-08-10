var gameVars = {
  gameStart: true,
  gameOver: true,
  currentGuessed: "",
  wins: 0,
  wordPool: ["MARK", "JAVASCRIPT", "HTML", "CSS", "CODE", "JQUERY"], 
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  solution:[],
}

var gameFuncs = {

  setCurrentWord: function() {
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
  },

  createSolution: function(currentWord) {     // "_ _ _ _ _ _"
    for (var i = 0; i < currentWord.length; i++) {
      gameVars.solution.push("_ ");
    }
  },

  matchLoop: function() {
    // if 'currentGuessed' matches a char in 'currentWord'
      // 'solutionLoop' --> 'solution'
  },

  wordDisplay: function() { // edits display after guess
    // if 'currentGuessed' matches a char in 'currentWord'
      // replace 'createSolution[x]' with 'currentGuessed' 
  },

}

gameFuncs.setCurrentWord();
gameFuncs.createSolution(gameVars.currentWord);

console.log(gameVars.currentWord);
console.log(gameVars.solution.join(""));

var spaces = "<h1>" + gameVars.solution.join("") + "</h1>";
var word = gameVars.solution;

// Set the inner HTML contents of the #game div to our html string
document.querySelector("#word").innerHTML = gameVars.currentWord;
document.querySelector("#spaces").innerHTML = spaces;

// if event.key === 

document.onkeyup = function(event) {
  if (currentWord.includes(event.key)){
  
  
  };

}


  // if !solution.contains("_") {
    // 'gameOver = true';



/*

1. Press any key to start game

2. Wins = 0; gameStart = true;

3. When key is pressed:
  - push letter to guessedChars
  - (Function) matchLoop --> (Function) solutionLoop --> 
  - if wrong, 
    -- guessesremaining--
    else
    -- 


*/