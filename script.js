

//this function starts/initializes the game
function initializeGame() {
  //gets the elements by their ids
  const tileContainer = document.getElementById("tile-container");
  const input = document.getElementById("input");
  const output = document.getElementById("message");
  const scoreElement = document.getElementById("score");
  const checkButton = document.getElementById("check");

  //this function call updates the tile display
  updateTileDisplay();

  //this dom method adds an event listener to the check button
  checkButton.addEventListener("click", check);

  //this dom method prevents form submission by the enter key on the keyboard
  input.addEventListener('keydown', function(event) {
     //checks if enter is pressed
     if (event.key === 'Enter') {
        //method to ensure enter remains inert
        event.preventDefault();
     }
  });
}

//initial variables to persist game state across functions down below
let score = 0;
let correctWord = "";
let attempts = 0;


//this function holds 50 animal words (to remain consistent)
function getWordArray() {
  return [
     "ALLIGATOR", "ANT", "BEAR", "BEE", "BIRD", "CAMEL", "CAT", "CHEETAH", "CHICKEN", "CHIMPANZEE", 
     "COW", "CROCODILE", "DEER", "DOG", "DOLPHIN", "DUCK", "EAGLE", "ELEPHANT", "FISH", "FLY", "FOX", 
     "FROG", "GIRAFFE", "GOAT", "GOLDFISH", "HAMSTER", "HIPPOPOTAMUS", "HORSE", "KANGAROO", "KITTEN", 
     "LION", "LOBSTER", "MONKEY", "OCTOPUS", "OWL", "PANDA", "PIG", "PENGUIN", "PUPPY", "RABBIT", 
     "RAT", "SCORPION", "SEAL", "SHARK", "SHEEP", "SNAIL", "SNAKE", "SPIDER", "SQUIRREL", "TIGER", 
     "TURTLE", "WOLF", "ZEBRA"
  ];
}

//this function selects a random word leveraging a few string methods
function getRandomWord() {
  const words = getWordArray();
  return words[Math.floor(Math.random() * words.length)];
}


//this function scrambles a word using the "Fischer-Yates Algorithm"
function scrambleWord(word) {
 //convert the input word into an array of characters
 const wordArray = word.split('');
 //this is a loop that iterates the array in reverse
 for (let i = wordArray.length - 1; i > 0; i--) {
   //save the current item to a temp variable
   const temp = wordArray[i];
    //grab a random indice from 'j' between indice 0 and the current index 'i'
    const j = Math.floor(Math.random() * (i + 1));
    //swap the elements at indices 'i' and 'j'
    wordArray[i] = wordArray[j];
    //replace the random letter with the current letter as temp
    wordArray[j] = temp;
 }


 //join the shuffled array back into a string and return it
 return wordArray.join('');
}

//this function generates tiles
function generateTiles(word) {
 //then gets the container element for tiles by its ID
 const tileContainer = document.getElementById("tile-container");

 //it them clears the container's content and applies styling
 tileContainer.innerHTML = "";
 tileContainer.classList.add("d-flex", "justify-content-evenly");

 //then stores the correct word and generates a scrambled version
 correctWord = word;
 const scrambledWord = scrambleWord(word);

 //next it loops through each character in the word
 for (let i = 0; i < word.length; i++) {
    //creates a column element for each character
    const col = document.createElement("div");
    col.classList.add("col-1", "text-center");

    //creates a tile element from the bootstrap "card" component for the character
    const tile = document.createElement("div");
    tile.classList.add("card", "text-center", "border", "border-white", "border-3", "display-1", "pt-4", "px-2", "shadow");

    //it sets background and text color styles for the tile
    tile.style.backgroundColor = "#b9e5ff";
    tile.style.color = "#00659F";

    //then creates a card body element and sets its content to a character from the scrambled word
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.textContent = scrambledWord[i];

    //and finally appends or 'nests' the card body into the tile, and the tile into the column, and the column into the tile container
    tile.appendChild(cardBody);
    col.appendChild(tile);
    tileContainer.appendChild(col);
 }
}

//this function controls the game dynamics
function check() {
 //it gets the input, output, and score elements by their IDs
 const input = document.getElementById("input");
 const output = document.getElementById("message");
 const scoreElement = document.getElementById("score");

 //then checks if the input matches the correct word (from the array capitalizing both to avoid case-sensitivity
 if (input.value.toUpperCase() === correctWord.toUpperCase()) {
    //if they match a positive message displays
    output.innerHTML = "Correct!";
    //then the score is increased
    score++;
    scoreElement.textContent = "Score: " + score;

    //also, if the score is a multiple of 5 an encouraging phrase displays
    if (score % 5 === 0) {
       output.innerHTML += " Good job, keep going!";
    }

    //all of the above gets updated in the display
    updateTileDisplay();
 } else {
    //if the words don't match an incorrect message displays and the attempts get incremented
    output.innerHTML = "Incorrect! Try again.";
    attempts++;
    document.getElementById("attempts-counter").textContent = "Attempts: " + attempts;

    //the score gets reset to 0
    score = 0;
    scoreElement.textContent = "Score: " + score;

    //all of these above gets updated in the display
    updateTileDisplay();

    //if the user has reached the maximum number of attempts (e.g., attempt 1 displays a 0, attempt 2 displays a 1, attempt 3 displays a 2)
    if (attempts >= 3) {
       //then the game over message gets displayed
       output.innerHTML = "Game over.";
       //and the game gets reset to its initial state
       resetGame();
    }
 }

 //this clears the input value after each check
 input.value = "";

 //this is a function call to determine if a player has unscrambled all 50 of the animal words in the array
 checkWin();
}


//this function checks for a winning condition
function checkWin() {
 //then gets the current score from (the reference to) the score element
 let currentScore = parseInt(document.getElementById("score").textContent.split(" ")[1]);

 //it them checks if the current score is equal to the winning score of 50 points
 if (currentScore === 50) {
    //and lastly, it displays a congrulatory message that user has won
    document.getElementById("message").innerHTML = "Congratulations, you won the game!";
 }
}


//this fuunction updates the game display
function updateTileDisplay() {
 //puts the getRandomWord function into a randomWord variable for easier reference by other functions
 const randomWord = getRandomWord();

 //then geenerates and displays the tiles for the new random word
 generateTiles(randomWord);
}


//this function resets the game
function resetGame() {
  attempts = 0;
  score = 0;
  scrambledWord = "";
  //then updates the attempts and score display
  document.getElementById("attempts-counter").textContent = "Attempts: " + attempts;
  document.getElementById("score").textContent = "Score: " + score;
  //then updates the tile display
  updateTileDisplay();
  //then removes the check button event listener
  document.getElementById("check").removeEventListener("click", check);
  //and lastly, redirects the user to the start page after a second
  let timer = setTimeout(function () {
     window.location.href = "start.html";
  }, 1000);
}

//this is the function call to initialize the game
initializeGame();
