const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
let score = 0;
let speed = 100; // velocidad inicial

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Mover la serpiente
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;

    // Comer comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
        speed = Math.max(50, speed - 10); // Aumentar velocidad
    } else {
        snake.pop(); // Quitar el último segmento
    }

    // Colisiones
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head, snake)) {
        clearInterval(game);
        alert("¡Perdiste! Tu puntaje es: " + score);
        return;
    }

    snake.unshift(head);

    // Dibujar serpiente
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        if (i === 0) {
            // Cabeza de la serpiente
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, Math.PI * 2);
            ctx.fill();

            // Ojos
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 4, snake[i].y + box / 4, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(snake[i].x + (3 * box) / 4, snake[i].y + box / 4, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(snake[i].x + box / 4, snake[i].y + box / 4, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(snake[i].x + (3 * box) / 4, snake[i].y + box / 4, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

let game = setInterval(drawGame, speed);
