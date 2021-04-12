'use strict';
let playerZero = document.getElementById('name--0').textContent = prompt('Please enter the name of the player 1');
let playerOne = document.getElementById('name--1').textContent = prompt('Please enter the name of the player 1');
let scoreZero = document.querySelector('#score--0');
let scoreOne = document.querySelector('#score--1');
let currentScore = 0;
let activePlayer = 0;
let noPlayer = 1;
let playing = true;

const currentZero = document.getElementById('current--0');
const currentOne = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerActiveStyle0 = document.querySelector('.player--0');
const playerActiveStyle1 = document.querySelector('.player--1');

const score = [0,0];


scoreZero.textContent = 0;
scoreOne.textContent = 0;

let diceRoll = document.querySelector('.dice');

//Rolling dice
btnRoll.addEventListener('click', function () {
    if (playing) {
    // 1. Generating a random dice between 1 - 6
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice 
    diceRoll.classList.remove('hidden');
    console.log(randomNumber);
    diceRoll.src = `dice-${randomNumber}.png`;

    // 3. Check for roll: if is '1' swith to another player
    if(randomNumber !== 1) {
        // Add the current dice to the score
        currentScore += randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        // Switch to another player
        activePlayer = activePlayer === 0 ? 1 : 0;
        noPlayer = noPlayer === 1 ? 0 : 1;
        playerActiveStyle0.classList.toggle('player--active');
        playerActiveStyle1.classList.toggle('player--active');
    }
    }
});

//Holding the score
btnHold.addEventListener('click', function() {
    if (playing) {
    // Add current score to active player's score
    score[activePlayer] += currentScore; 
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    // Check if player's score is >= 100
    if (score[activePlayer] >= 10) {
        playing = false;
        diceRoll.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.getElementById(`score--${activePlayer}`).textContent = `🎊Winner!🎉`;
        document.getElementById(`score--${noPlayer}`).textContent = `Loser!😭`;
        document.getElementById(`score--${activePlayer}`).style.fontSize = '4.5rem';
        document.getElementById(`score--${activePlayer}`).style.color = 'white';
        document.getElementById(`score--${noPlayer}`).style.fontSize = '4.5rem';
    }
    // Switch the player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    noPlayer = noPlayer === 1 ? 0 : 1;
    playerActiveStyle0.classList.toggle('player--active');
    playerActiveStyle1.classList.toggle('player--active');
    }
});

// New Game
btnNew.addEventListener('click', function() {
    scoreZero.textContent = 0;
    scoreOne.textContent = 0;
    currentZero.textContent = 0;
    currentOne.textContent = 0;
    playerActiveStyle0.classList.remove('player--winner');
    playerActiveStyle1.classList.remove('player--winner');
    playerActiveStyle0.classList.add('player--active');
    playerActiveStyle1.classList.remove('player--active');
})
