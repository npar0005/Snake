/*
	File: Main driver file
	Author: N. Parsons
	Copyright: N. Parsons (C) 2018
*/

const SIZE = 30; // 30
const FPS = 6; // 6

let snake = new Snake(10, 10, SIZE, new Vector2d(0, 1));
let food = new Food(SIZE);

let score = 0;
let dirChange = true;

let gameLoop;
let reset = false;

function drawGrid(SIZE, color) {
	for(let x = 0; x < canvas.width; x+=SIZE) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	for(let y = 0; y < canvas.height; y+=SIZE) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
		ctx.strokeStyle = color;
		ctx.stroke();
	}
}

function endGame(gameLoop, snake) {
	clearInterval(gameLoop);
	ctx.font = "70px Georgia";
	let gameOver = "Game Over!";
	let txtWidth = ctx.measureText(gameOver).width;
	ctx.fillStyle = "darkred";
	ctx.fillText(gameOver, (canvas.width - txtWidth)/2, (canvas.height/2));
	ctx.font = "30px Georgia";
	let subTitle = "Press any key to continue";
	let subTitleWidth = ctx.measureText(subTitle).width;
	ctx.fillText(subTitle, (canvas.width - subTitleWidth)/2, (canvas.height/2)+30);

	reset = true;
	deathLoop = setInterval(function() {
		snake.showDeath();
	}, 1000/3);
}


function game() {
	clearCanvas(canvas, ctx); // Clear for rerender.

	snake.move();
	food.draw();

	snake.draw();
	drawGrid(SIZE, "black");
	snake.edges();

	if(snake.collision()) {
		endGame(gameLoop, snake);
	}

	if(food.eaten(snake)) {
		snake.grow();
		food.spawn(snake);

		score++;
		$(".tempScore").remove();
		$(".score").append("<span class='tempScore'>" +score +"</span>");
	}

	dirChange = true;
}

function resetGame() {
	clearInterval(deathLoop);
	snake = new Snake(10, 10, SIZE, new Vector2d(0, 1));
	score = 0;
	reset = false;
	gameLoop = setInterval(game, 1000/FPS);
}

$(function() {
	// Setup
	food.spawn(snake);

	$(".score").append("<span class='tempScore'>" +score +"</span>");

	// Game loop:
	gameLoop = setInterval(game, 1000/FPS);
});

$(document).keydown(function(e) {
	if(reset) {
		resetGame();
		return;
	}

	if(!dirChange) { // lock the direction so one key can be pressed once a frame
		return;
	}

	if((e.keyCode == 37 || e.keyCode == 65) && snake.dir.x != 1) {
		// move left
		snake.dir = new Vector2d(-1, 0);
	}

	if((e.keyCode == 38 || e.keyCode == 87) && snake.dir.y != 1) {
		// move up
		snake.dir = new Vector2d(0, -1);
	}

	if((e.keyCode == 39 || e.keyCode == 68) && snake.dir.x != -1) {
		// move right
		snake.dir = new Vector2d(1, 0);
	}

	if((e.keyCode == 40 || e.keyCode == 83) && snake.dir.y != -1) {
		// move down
		snake.dir = new Vector2d(0, 1);
	}

	dirChange = false;
});
