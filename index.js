//game constant and variables
let inputDir = { x: 0, y: 0 };
// const foodsound = new Audio('');
// const gameoversound = new Audio('');
// const movesound = new Audio ('');
// const musicsound = new Audio ('');
let speed = 5;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 5, y: 7 };


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed); {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x &&snake[i].y===snake[0].y  ){
            return true;
        }
    } // if your bump
        if (snake[0].x >=18||snake[0].x<=0 || snake[0].y >=18||snake[0].y<=0){
            return true;
        }
        
    
}
function gameEngine() {
    // part:1 updating the snake arrays & food
    if(isCollide(snakeArr)){
        // gameoversound.play();
        // musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over . press any key to play again!");
        snakeArr =[{x :13 ,y:15}];
        // musicsound.play();
        score = 0;

    }
    // if you have eat the food tha increment the score and regenarate the food
    if (snakeArr[0].y ===food.y && snakeArr[0].x === food.x){
        // foodsound.play();
        score+=1;
        scoreBox.innerHTML="score"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y});
        let a = 2;
        let b = 16;
        food ={x: Math.round (a+(b-a)*Math.random()), y: Math.round (a+(b-a)*Math.random())}
    }
    // moving the snack
    for (let i = snakeArr.length -2 ;i >=0; i--) {
        
        snakeArr[i+1]= {...snakeArr[i]};

        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;

    // part :2 display the snake food
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('sanke');
        }
        snakeElement.classList.add('sanke');
        board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

// main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    //  movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('arrowup')
            inputDir.x =0 ;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log('arrowdown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log('arrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('arrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});