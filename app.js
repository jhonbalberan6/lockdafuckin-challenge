// Utility function to get random integer between min and max (inclusive)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns exercise object based on number
function getExercise(num) {
    if (num === 1) {
        return { name: 'Push-ups', image: 'gifs/pushups.gif' };
    } else if (num === 2) {
        return { name: 'Squats', image: 'gifs/squats.gif' };
    } else if (num === 3) {
        return { name: 'Pull-ups', image: 'gifs/pullups.gif' };
    } else {
        return { name: 'Crunches / Leg raises', image: 'gifs/crunches.gif' };
    }
}

// DOM elements cached for better readability
const generateButton = document.getElementById('generateButton');
const repsDisplay = document.getElementById('repsDisplay');
const setsDisplay = document.getElementById('setsDisplay');
const variationDisplay = document.getElementById('variationDisplay');
const exerciseImage = document.getElementById('exerciseImage');
const countdownEl = document.getElementById('countdown');
const startingMinutesDisplay = document.getElementById('startingMinutesDisplay');

// Timer settings
let startingMinutes;
let time;
let intervalId = null;

// Update displayed starting minutes on page load or when changed
function updateStartingMinutesDisplay() {
    startingMinutesDisplay.textContent = startingMinutes;
}

// Update countdown timer display every second
function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;

    if (time <= 0) {
        clearInterval(intervalId);  // Stop timer at 0:00
        return;
    }

    time--;
}

// Main button click handler to generate exercise and start timer
generateButton.onclick = function() {
    // Show relevant UI elements
    variationDisplay.style.display = 'block';
    setsDisplay.style.display = 'block';
    repsDisplay.style.display = 'block';
    exerciseImage.style.display = 'block';
    countdownEl.style.display = 'block';

    // Reset timer and clear any existing intervals
    clearInterval(intervalId);

    // Generate random exercise details
    const reps = randomInteger(4, 8);
    const sets = randomInteger(2, 3);
    const variation = getExercise(randomInteger(1, 4));

    
    startingMinutes = getChallengeMinutes(variation, sets);
    time = startingMinutes * 60;
    updateStartingMinutesDisplay();


    // Update UI with exercise details
    repsDisplay.innerHTML = 'Reps: ' + reps;
    setsDisplay.innerHTML = 'Sets: ' + sets;
    variationDisplay.innerHTML = variation.name;
    exerciseImage.src = variation.image;

    // Start countdown timer
    intervalId = setInterval(updateCountdown, 1000);
};

function getChallengeMinutes(variation, sets) {
    const name = variation.name;

    if (name === 'Push-ups') {
        if (sets === 2) return 2;
        else return 3;
    } else if (name === 'Squats') {
        if (sets === 2) return 2;
        else return 3;
    } else if (name === 'Pull-ups') {
        if (sets === 2) return 3;
        else return 4;
    } else if (name === 'Crunches / Leg raises') {
        if (sets === 2) return 1;
        else return 2;
    } else {
        return 2; // fallback
    }
}

