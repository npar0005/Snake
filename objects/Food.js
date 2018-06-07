class Food {
	constructor(size) {
		this.col;
		this.row;
		this.size = size;
	}

	draw() {
		ctx.beginPath();
		let x = this.col * this.size;
		let y = this.row * this.size;
		ctx.fillStyle = "red";
		ctx.fillRect(x, y, this.size, this.size);
	}

	eaten(snake) {
		let scol = snake.body[snake.body.length-1].x;
		let srow = snake.body[snake.body.length-1].y;

		return (this.col == scol && this.row == srow); 
	}

	spawn(snake) {
		let foodLoc = new Vector2d(rand(0, 19), rand(0, 19));
		for(let i = 0; i < snake.body.length; i++) {
			if(foodLoc.x == snake.body[i].x && foodLoc.y == snake.body[i].y) {
				i = 0;
				foodLoc = new Vector2d(rand(0, 19), rand(0, 19));
			}
		}

		this.col = foodLoc.getX();
		this.row = foodLoc.getY();
	}
}