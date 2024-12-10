
let inputDir = { x: 0, y: 0 };
let speed = 25;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 10 }];
let food = { x: 5, y: 7 };
let isGameRunning = false;

const moveSound = new Audio('backgound.mp3');
const eatSound = new Audio('cm.mp3');
const gameOverSound = new Audio('end.mp3');


function main(ctime) {
    window.requestAnimationFrame(main);

    if (!isGameRunning) return;

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
   
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 20 || snake[0].x < 0 || snake[0].y >= 20 || snake[0].y < 0) {
        return true;
    }
    return false;
}

function gameEngine() {
 
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        isGameRunning = false;
        alert("Game Over! Press Start to play again.");
        snakeArr = [{ x: 10, y: 10 }];
        inputDir = { x: 0, y: 0 };
        score = 0;
        document.getElementById("scoreBox").innerText = "Score: 0";
        return;
    }

    
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        eatSound.play();
        score++;
        document.getElementById("scoreBox").innerText = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    }

  
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    const board = document.getElementById("board");
    board.innerHTML = "";

    snakeArr.forEach((segment, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y + 1;
        snakeElement.style.gridColumnStart = segment.x + 1;
        snakeElement.classList.add(index === 0 ? "head" : "snake");
        board.appendChild(snakeElement);
    });

    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


document.getElementById("startButton").addEventListener("click", () => {
    isGameRunning = true;
    inputDir = { x: 0, y: 1 }; 
    window.requestAnimationFrame(main);
});


window.addEventListener("keydown", (e) => {
    if (!isGameRunning) return;

    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y === 1) break;
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (inputDir.y === -1) break;
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (inputDir.x === 1) break;
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (inputDir.x === -1) break;
            inputDir = { x: 1, y: 0 };
            break;
    }
});

