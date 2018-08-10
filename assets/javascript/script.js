var gameVars = {
  gameStart: true,
  gameOver: true,
  currentGuessed: "",
  wins: 0,
  wordPool: ["MARK", "JAVASCRIPT", "HTML", "CSS", "CODE", "JQUERY"], 
  currentWord: "",
  guessesRemaining: 10,
  guessedChars: [],
  solution: "",
}

var gameFuncs = {

  setCurrentWord: function() {
    gameVars.currentWord = gameVars.wordPool[Math.floor((Math.random() * gameVars.wordPool.length) + 0)];
  },

  createSolution: function() {     // "_ _ _ _ _ _"
 
  },

  matchLoop: function() {
    // if 'currentGuessed' matches a char in 'currentWord'
      // 'solutionLoop' --> 'solution'
  },

  solutionLoop: function() { // edits solution after guess
    // if 'currentGuessed' matches a char in 'currentWord'
      // replace 'createSolution[x]' with 'currentGuessed' 
  },

}

gameFuncs.setCurrentWord();

console.log(gameVars.currentWord);








document.getElementById("solution").addEventListener("click", function() {document.getElementById("solution").innerHTML = "Go Eagles!";
});



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