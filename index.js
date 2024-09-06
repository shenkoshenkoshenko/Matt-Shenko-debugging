const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts += 1;

  //*********************disabled this function */
  //hideAllMessages();

  //*********************corrected ==== to === */
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    //*************************************added lines to remove old messages */

    correctMessage.style.display = '';
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

//**********************************added lines to remove old messages */

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
      tooHighMessage.style.display = 'none';
    } else {
      tooHighMessage.style.display = '';
      tooLowMessage.style.display = 'none';
    }

    let remainingAttempts = (maxNumberOfAttempts - attempts);

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  //****************added message elimination for max guesses */

  if (attempts == maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    tooLowMessage.style.display = 'none';
    tooHighMessage.style.display = 'none';
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  // **************************** eliminated the < after 'elementIndex'*/
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

//************************corrected spelling of function */

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

//***********************corrected maxAttempts to attempts */

  // Reset number of attempts
  attempts = 0;

  //**********************corrected spelling of 'disabled' for submit */

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

//***************************switched order of reset styling and hideAll function */

  resetButton.style.display = 'none';
  hideAllMessages();
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
