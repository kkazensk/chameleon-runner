const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
const laneWidth = canvas.width / 3;
const playerHeight = 40;
const playerWidth = 30;
const playerStartLane = 1; // Middle lane (0: left, 1: middle, 2: right)
const objectSize = 30; // Size for both squares and circles

// Player state
let currentLane = playerStartLane;
let playerColor = 'green'; // Initial player color
let gameOver = false; // Game over flag
let score = 0; // Initialize score
let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : 0;
let objectSpeed = 3.5;

// Array to store falling objects (both squares and circles)
let objects = [];

// Colors for the objects
const colors = ['green', 'blue', 'yellow', 'red'];

// Starting color
let curr_square_color = colors[0]; // green

// Starting turn
let turn = 0;
let firstRound = true;

// Function to create objects for each lane
function createObjects() {
    turn += 1;

    if (turn < 8 && !gameOver) { // squares
        if (turn == 1) {
            if (!firstRound) {
                // Filter and shuffle colors
                const filteredColors = colors.filter(color => color !== curr_square_color);
                const shuffledColors = shuffleArray(filteredColors);

                // new color
                curr_square_color = shuffledColors[Math.floor(Math.random() * 3)];
            } else {
                firstRound = false;
            }
        }

        obstacleIndex = Math.floor(Math.random() * 3);

        for (let lane = 0; lane < 3; lane++) {
            const isObstacleRow = turn % 2 === 0; // Alternate every other row for obstacles
            
            if (lane == obstacleIndex && isObstacleRow){
                isObstacle = true;
            }
            else{
                isObstacle = false;
            }

            objects.push({
                x: lane * laneWidth + laneWidth / 2 - objectSize / 2,
                y: -objectSize - (objectSize * 1.5),
                color: isObstacle ? 'pink' : curr_square_color, // Pink color for obstacles
                type: isObstacle ? 'obstacle' : 'square', // Mark as obstacle
                touched: false
            });
        }
    }

    if (turn === 8 && !gameOver) { // circles
        turn = 0;

        // Filter and shuffle colors
        const filteredColors = colors.filter(color => color !== playerColor);
        const shuffledColors = shuffleArray(filteredColors);

        for (let lane = 0; lane < 3; lane++) {
            objects.push({
                x: lane * laneWidth + laneWidth / 2 - objectSize / 2,
                y: -objectSize - (objectSize * 1.5),
                color: shuffledColors[lane],
                type: 'circle'
            });
        }
    }
}


// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/// Function to draw the pixelated chameleon as the player
function drawPlayer() {
    const baseX = currentLane * laneWidth + laneWidth / 2 - playerWidth / 2;
    const baseY = canvas.height - playerHeight;

    // Chameleon pattern (12x17 grid)

const chameleonPattern = [
    ['black', 'black', 'black', playerColor, 'black', 'black', playerColor, playerColor, playerColor, 'black', 'black', 'black', 'black', playerColor, playerColor, 'black', 'black'],
    ['black', playerColor, playerColor, playerColor, 'black', playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, 'black', 'black', playerColor, 'black', playerColor, 'black'],
    [playerColor, playerColor, (playerColor === 'yellow' ? 'green' : 'white'), playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, 'black', 'black', playerColor, 'black', 'black'],
    [playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, playerColor, 'black', 'black', 'black'],
    ['black', 'black', 'black', 'black', playerColor, playerColor, 'black', 'black', playerColor, playerColor, playerColor, 'black', 'black', 'black', 'black', 'black', 'black'],
    ['black', 'black', 'black', playerColor, 'black', 'black', 'black',  playerColor, 'black', playerColor, 'black', 'black', 'black', 'black', 'black', 'black', 'black']
];



    // Loop through the pattern and draw each "pixel"
    for (let row = 0; row < chameleonPattern.length; row++) {
        for (let col = 0; col < chameleonPattern[row].length; col++) {
            const color = chameleonPattern[row][col];
            const pixelX = baseX + col * (playerWidth / (17/2)); // Divide width into 17 columns
            const pixelY = baseY + row * (playerHeight / 6); // Divide height into 6 rows

            ctx.fillStyle = color;
            ctx.fillRect(pixelX, pixelY, playerWidth / (17/2), playerHeight / 6); // Draw the pixel
        }
    }
}

function drawObjects() {
    for (const obj of objects) {
        ctx.fillStyle = obj.color;
        if (obj.type === 'square') {
            ctx.fillRect(obj.x, obj.y, objectSize, objectSize);
        } else if (obj.type === 'circle') {
            ctx.beginPath();
            ctx.arc(obj.x + objectSize / 2, obj.y + objectSize / 2, objectSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.type === 'obstacle') {
            // Draw a pink diamond for obstacles
            ctx.beginPath();
            ctx.moveTo(obj.x + objectSize / 2, obj.y);
            ctx.lineTo(obj.x + objectSize, obj.y + objectSize / 2);
            ctx.lineTo(obj.x + objectSize / 2, obj.y + objectSize);
            ctx.lineTo(obj.x, obj.y + objectSize / 2);
            ctx.closePath();
            ctx.fill();
        }
    }
}


// Update the positions of the objects
function updateObjects() {
    for (const obj of objects) {
        obj.y += objectSpeed;

        // Check for collision with the player
        const playerX = currentLane * laneWidth + laneWidth / 2 - playerWidth / 2;
        const playerY = canvas.height - playerHeight;

        // Collision with circles
        if (
            obj.type === 'circle' &&
            obj.y + objectSize >= playerY &&
            obj.y <= playerY + playerHeight &&
            obj.x + objectSize >= playerX &&
            obj.x <= playerX + playerWidth
        ) {
            // Collision detected with a circle
            playerColor = obj.color; // Change the player's color
            score += 10; // Increase score by 10 for touching a circle
        }

        // Collision with squares
        if (
            obj.type === 'square' &&
            obj.y + objectSize >= playerY &&
            obj.y <= playerY + playerHeight &&
            obj.x + objectSize >= playerX &&
            obj.x <= playerX + playerWidth
        ) {
            // Collision detected with a square
            if (!obj.touched) {
                // Only award points if the square hasn't been touched before
                if (obj.color !== playerColor) {
                    gameOver = true; // End the game
                    curr_square_color = 'green';
                    showGameOver(); // Show game over message
                } else {
                    score += 5; // Increase score by 5 for touching a square
                }
                obj.touched = true;
                obj.color = "rgba(255, 0, 0, 0)"; // "eat" block when touch
            }
        }

        // Collision with obstacles (pink diamond)
        if (
            obj.type === 'obstacle' &&
            obj.y + objectSize >= playerY &&
            obj.y <= playerY + playerHeight &&
            obj.x + objectSize >= playerX &&
            obj.x <= playerX + playerWidth
        ) {
            // Game over if player hits an obstacle
            gameOver = true;
            curr_square_color = 'green';
            showGameOver();
        }
    }

    // Remove objects that have fallen out of the canvas
    objects = objects.filter(obj => obj.y < canvas.height);
}


// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update the game state
function updateGame() {
    if (!gameOver) {
        clearCanvas();
        updateObjects();
        drawPlayer();
        drawObjects();
        drawScore(); // Draw the score on the canvas
        requestAnimationFrame(updateGame);
    }
}

// Draw the score on the canvas
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30); // Display current score

    // Display Best Score
    ctx.fillText('Best Score: ' + bestScore, canvas.width - 150, 30); // Display best score at the top-right corner
}


// Handle keyboard input
window.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && currentLane > 0 && !gameOver) {
        currentLane--;
    } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && currentLane < 2 && !gameOver) {
        currentLane++;
    }
});

// Add event listeners for screen buttons
document.getElementById('leftButton').addEventListener('click', () => {
    if (currentLane > 0 && !gameOver) {
        currentLane--;
    }
});

document.getElementById('rightButton').addEventListener('click', () => {
    if (currentLane < 2 && !gameOver) {
        currentLane++;
    }
});

// Show Game Over Screen
function showGameOver() {
    const gameOverText = 'Game Over! Press "R" to Restart';
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(gameOverText, canvas.width / 2 - 150, canvas.height / 2);

    // Compare and save best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);  // Save best score to local storage
    }

    // Draw Best Score
    ctx.fillText('Best Score: ' + bestScore, canvas.width / 2 - 100, canvas.height / 2 + 40);

    showRestartButton();
}

// Show the restart button
function showRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.id = 'restartButton'; // Add an ID to the button
    restartButton.style.position = 'absolute';
    restartButton.style.top = '50%';
    restartButton.style.left = '50%';
    restartButton.style.transform = 'translate(-50%, -50%)';
    restartButton.style.fontSize = '20px';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);
}

// Restart the game
function restartGame() {
    gameOver = false;
    score = 0; // Reset score
    playerColor = 'green';
    objects = [];
    turn = 0;
    firstRound = true;
    currentLane = playerStartLane;
    document.getElementById('restartButton').remove(); // Remove the restart button using its ID
    clearCanvas();
    updateGame();
}

// Start the game loop
updateGame();

// Create new objects at intervals
setInterval(createObjects, 500); // Create new objects every second

// Handle restart using the "R" key
window.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R' || e.key === ' ') {
        if (gameOver) {
            restartGame();
        }
    }

});
