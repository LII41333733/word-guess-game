var hangman = {
  gameStart: true,
  gameOver: true,
  currentGuessed = "",
  wins: 0,
  currentWord: wordPool[Math.random(wordPool)],
  wordPool: ["MARK", "JAVASCRIPT", "HTML", "CSS"], 
  guessesRemaining: 10,
  guessedChars: [],
  solution = "",
  createSolution: function() {     // "_ _ _ _ _ _"
    // if 'currentGuessed' matches a char in 
  },
  matchLoop: function() {
    // if 'currentGuessed' matches a char in 'currentWord'
      // 'solutionLoop' --> 'solution'
  },
  solutionLoop: function() {}, // edits solution after guess

}

var gameObj = {
  //if solution.contains("_") === false {
    //game over
}


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