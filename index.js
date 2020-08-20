// Import and Save canvas!!!
const cvs = document.getElementById("canvas");
// This is how to give canvas a method called getContext!
const ctx = cvs.getContext("2d");

// create the unit
// every unit has 32 pixels!
const box = 32; 

// load images
// To import play ground!
const ground = new Image();
ground.src = "img/ground.png";
// To import my delicious apple!:)
const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
// To combine loaded audios to new Audio() method!
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food
// x is left to right & right to left ! 
// y is up to down & down to up ! 
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
let score = 0;

//control the snake
let d;
// Here I make an event called keydown to get the premission to use keyboard buttons!
document.addEventListener("keydown",direction);
// this is how to define keyboard keys 
// which is like this => 
//37 is the Left key (A)
//38 is the Up key (W)
// 39 is the right key (D)
// 40 is the Bottom(Down) key (S)
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas
function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food it get bigger and bigger and bigger and bigger
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    // this is a function which define game over logic
    // this means if you hit the walls or snake's tail you're K.O ! :)
    if(snakeX <= -1*box  || snakeX > 18 * box || snakeY < 2*box || snakeY > 18*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        // game over alert!
        alert("The Game is over buddy :( Click OK and try to reload the browser if you wanna play again!")
    }
    // Restart(make snake great again) :D
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// Call draw function which moves the snake every 120 ms!
let game = setInterval(draw,120);
