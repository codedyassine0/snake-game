var blocsize =25;
var rows = 20;
var columns = 20;
var board;
var context;
var snakex= blocsize*5;
var snakey = blocsize*5;
var foodx= blocsize*10 ;
var foody = blocsize*10;
var velovityx = 0;
var velovityy = 0;
var gameover = false;
var snakebody = [];

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocsize;
    board.width = columns * blocsize;
    context = board.getContext("2d");
    placefood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,1000/10);
}
function changeDirection(e){
    if(e.code=="ArrowUp" && velovityy != 1){
        velovityx = 0;
        velovityy = -1;
    }
    else if(e.code=="ArrowDown" && velovityy != -1){
        velovityx = 0;
        velovityy = 1;
    }
    else if(e.code=="ArrowLeft" && velovityx != 1){
        velovityx = -1;
        velovityy = 0;
    }
    else if(e.code=="ArrowRight" && velovityx != -1){
        velovityx = 1;
        velovityy = 0;
    }
}

function update(){
    if (gameover){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);
    context.fillStyle = "red";
    context.fillRect(foodx,foody,blocsize,blocsize);
    if (snakex == foodx && snakey == foody){
        snakebody.push([foodx,foody]);
        placefood();
    }
    for(let i = snakebody.length-1; i > 0; i--){
        snakebody[i] = snakebody[i-1] ;
    }
    if (snakebody.length > 0){
        snakebody[0] = [snakex,snakey];
    }
    context.fillStyle = "lime";
    snakex += velovityx * blocsize;
    snakey += velovityy * blocsize;
    context.fillRect(snakex,snakey,blocsize,blocsize);
    for(let i = 0; i < snakebody.length; i++){
        context.fillRect(snakebody[i][0],snakebody[i][1],blocsize,blocsize);
    }
    if(snakex < 0 || snakex > columns * blocsize || snakey < 0 || snakey > rows * blocsize){
        gameover=true;
        alert("game over");
    }
    for(let i = 0; i < snakebody.length; i++){
        if(snakex == snakebody[i][0] && snakey == snakebody[i][1]){
            gameover = true;
            alert("game over");
        }
    }
} 


function placefood(){
    foodx = Math.floor(Math.random() * columns) * blocsize;
    foody = Math.floor(Math.random() * rows) * blocsize;
}
