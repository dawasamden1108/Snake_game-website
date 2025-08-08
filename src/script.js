
import { addScoreToLeaderboard } from './api.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;

const eatSound = new Audio('assets/eat.mp3');
const gameOverSound = new Audio('assets/gameover.mp3');

let snake = [{x: 9 * box, y: 10 * box}];
let direction = 'RIGHT';
let food = spawnFood();
let score = 0;
let gameInterval;
let gameOver = false;

// Listen for arrow keys
document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
    if (gameOver) return;
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    const skinColor = localStorage.getItem('snakeColor') || "#1e3c72";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = skinColor;
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "#e67e22";
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'DOWN') head.y += box;

    // Check collision with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        endGame();
        return;
    }

    // Check collision with self
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = "Score: " + score;
        food = spawnFood();
        eatSound.currentTime = 0; // Reset sound
        eatSound.play();
    } else {
        snake.pop();
    }

    snake.unshift(head);
}


function endGame() {
    clearInterval(gameInterval);
    gameOver = true;
    gameOverSound.currentTime = 0; // Reset sound
    gameOverSound.play();
    document.getElementById('gameOver').style.display = 'block';

    // Prompt for player name and update leaderboard
    setTimeout(() => {
        let name = prompt('Game Over! Enter your name for the leaderboard:', 'Player');
        if (name) {
            name = name.trim().substring(0, 16) || 'Player';
            addScoreToLeaderboard(name, score);
            // Notify leaderboard to refresh if present
            window.dispatchEvent(new Event('leaderboardUpdated'));
        }
    }, 500);
}

function gameLoop() {
    draw();
}

window.onload = function() {
    gameInterval = setInterval(gameLoop, 200);
    
};