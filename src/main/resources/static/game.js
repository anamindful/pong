// Constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;
const BALL_RADIUS = 5;
const BALL_SPEED = 3;

// Game objects
let player1 = {
    x: 20,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    dy: 0,
    score: 0
};

let player2 = {
    x: WIDTH - 20 - PADDLE_WIDTH,
    y: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    dy: 0,
    score: 0
};

let ball = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    dx: BALL_SPEED,
    dy: BALL_SPEED
};

// Event listeners for player input
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player1.dy = -PADDLE_SPEED;
            break;
        case 'ArrowDown':
            player1.dy = PADDLE_SPEED;
            break;
        case 'w':
            player2.dy = -PADDLE_SPEED;
            break;
        case 's':
            player2.dy = PADDLE_SPEED;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player1.dy = 0;
            break;
        case 'w':
        case 's':
            player2.dy = 0;
            break;
    }
});

// Function to update game state
function update() {
    // Update player positions
    player1.y += player1.dy;
    player2.y += player2.dy;

    // Ensure paddles stay within the canvas bounds
    player1.y = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, player1.y));
    player2.y = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, player2.y));

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > HEIGHT) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (ball.x - BALL_RADIUS < player1.x + PADDLE_WIDTH &&
        ball.y > player1.y &&
        ball.y < player1.y + PADDLE_HEIGHT) {
        ball.dx *= -1;
    }

    if (ball.x + BALL_RADIUS > player2.x &&
        ball.y > player2.y &&
        ball.y < player2.y + PADDLE_HEIGHT) {
        ball.dx *= -1;
    }

    // Ball out of bounds (score)
    if (ball.x - BALL_RADIUS < 0) {
        player2.score++;
        resetBall();
    }

    if (ball.x + BALL_RADIUS > WIDTH) {
        player1.score++;
        resetBall();
    }
}

// Function to reset ball position
function resetBall() {
    ball.x = WIDTH / 2;
    ball.y = HEIGHT / 2;
    ball.dx = BALL_SPEED;
    ball.dy = BALL_SPEED;
}

// Function to render graphics
function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw paddles
    ctx.fillStyle = '#000';
    ctx.fillRect(player1.x, player1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(player2.x, player2.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();

    // Display scores
    ctx.font = '20px Arial';
    ctx.fillText('Player 1: ' + player1.score, 20, 30);
    ctx.fillText('Player 2: ' + player2.score, WIDTH - 140, 30);
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
