// Catch the ID
const cvs = document.getElementById("canvas");
// Using getContext method
const ctx = cvs.getContext('2d');

//Create unit
const box = 32;


//Load Images
const ground = new Image();
ground.src   = "./img/ground.png";

const foodIMG = new Image();
foodIMG.src   = "./img/food.png";


//Load Audio files!
const dead  = new Audio();
const eat   = new Audio();
const up    = new Audio();
const down  = new Audio();
const left  = new Audio();
const right = new Audio();
//Import source file!
dead.src   = "./audio/dead.mp3";
eat.src    = "./audio/eat.mp3";
up.src     = "./audio/up.mp3";
down.src   = "./audio/down.mp3";
left.src   = "./audio/left.mp3";
right.src  = "./audio/right.mp3";


//Create the snake
let snake = []

snake[0] = {
    x: 9 * box,
    y: 10 * box,
} 

//Create the food
let food = {
    x: Math.floor(Math.random()* 17+1) * box,
    y: Math.random(Math.random()*15+3) * box,
}

//Create the score variable
let score = 0;

//Control the Snake!
let d;

document.addEventListener("keydown", direction)