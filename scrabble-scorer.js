// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let wordInQuestion;

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   wordInQuestion =(input.question("Enter a word to score: "));
};

let simpleScorer = function(word){
   let letterPoints = '';
   let lettersArray = [];
   let letterBreaker = word.split('');
   lettersArray.push(letterBreaker);
   return letterBreaker.length;
};

let vowelBonusScorer = function vowelBonusScorer(word) {
   let score = 0;
   const lowercaseWord = word.toLowerCase();
   const vowels = ['a', 'e', 'i', 'o', 'u'];
 
   for (let i = 0; i < lowercaseWord.length; i++) {
     const char = lowercaseWord[i];
     if (vowels.includes(char)) {
       score += 3;
     } else {
       score += 1;
     }
   }
   return score;
 };

let scrabbleScorer = function(word){
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      score += newPointStructure[letter] || 0;
   }

   return score;

};
const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
    },
    {
      name: "Vowel Bonus Scorer",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
    },
    {
      name: "Old Scrabble Scorer",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
    }
]

function scorerPrompt() {
   let selection = input.question(`Which scoring algorithm would you like to use?\n 
   0 - Simple: One point per character\n 
   1 - Vowel Bonus: Vowels are worth 3 points\n
   2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2: `).trim();
   if(selection === "0"){
      return scoringAlgorithms[0];
   }
   else if(selection === "1"){
      return scoringAlgorithms[1];
   }
   else if(selection === "2"){
      return scoringAlgorithms[2];
   }
   else{
      console.log("Invalid Entry. Choose between 0 and 2");
      return null;
   }
}

function transform(whatsTransformed) {
   let newPointStructure = {};

  for (const pointValue in whatsTransformed) {
    const letters = whatsTransformed[pointValue];
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      newPointStructure[letter.toLowerCase()] = +pointValue;
    }
  }
  
  return newPointStructure;
};
//
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   const selectedAlgorithm = scorerPrompt();

   if (selectedAlgorithm) {
      const score = selectedAlgorithm.scorerFunction(wordInQuestion);
      console.log(`Score for '${wordInQuestion}': ${score}`);
   }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
