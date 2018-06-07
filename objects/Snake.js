class Snake {
	constructor(col, row, size, dir) {
		this.col = col;
		this.row = row;
		this.size = size;
		this.dir = dir;
		this.body = [new Vector2d(col-1, row), new Vector2d(col, row)];
		this.color = "orange";

		this.highlight = false;

	}

	draw() {
		for(let bodyPart of this.body) {
			ctx.beginPath();
			let x = bodyPart.x * this.size;
			let y = bodyPart.y * this.size;
			ctx.fillStyle = this.color;
			ctx.fillRect(x, y, this.size, this.size);
		}
	}

	move() {
		let movePosCol = this.body[this.body.length-1].getX() + this.dir.x;
		let movePosRow = this.body[this.body.length-1].getY() + this.dir.y;
		this.body.push(new Vector2d(movePosCol, movePosRow));
		this.body.shift();
	}

	edges() {
		if(this.body[this.body.length-1].getX() >= 20) {
			this.body[this.body.length-1].setX(0);
		}

		if(this.body[this.body.length-1].getX() < 0) {
			this.body[this.body.length-1].setX(19);
		}

		if(this.body[this.body.length-1].getY() >= 20) {
			this.body[this.body.length-1].setY(0)
		}

		if(this.body[this.body.length-1].getY() < 0) {
			this.body[this.body.length-1].setY(19)
		}
	}

	grow() {
		let lastBodyPartCol = this.body[0].getX(); 
		let lastBodyPartRow = this.body[0].getY();

		let newBodyPart;
		if(lastBodyPartCol + 1 == this.body[1].getX()) { 
			// Grow left
			newBodyPart = new Vector2d(lastBodyPartCol - 1, lastBodyPartRow);
		} else if(lastBodyPartCol - 1 == this.body[1].getX()) { 
			// Grow right
			newBodyPart = new Vector2d(lastBodyPartCol + 1, lastBodyPartRow);
		} else if(lastBodyPartRow + 1 == this.body[1].getY()) { 
			// Grow Up
			newBodyPart = new Vector2d(lastBodyPartCol, lastBodyPartRow - 1);
		} else if(lastBodyPartRow - 1 == this.body[1].getY()) { 
			// Grow Down
			newBodyPart = new Vector2d(lastBodyPartCol, lastBodyPartRow + 1);
		} else{
			newBodyPart = new Vector2d(lastBodyPartCol, lastBodyPartRow + 1);
		}

		this.body.unshift(newBodyPart);
	}

	collision() {
		let head = this.body[this.body.length-1];
		for(var i = 0; i < this.body.length-1; i++) {
			if(head.getX() == this.body[i].getX() && head.getY() == this.body[i].getY()) {
				return true;
			}
		}
		return false;
	}

	showDeath() {
		let head = this.body[this.body.length-1];
		let x = head.x * this.size;
		let y = head.y * this.size;
		ctx.fillStyle = this.highlight ? "darkred" : this.color;
		ctx.fillRect(x, y, this.size, this.size);
		this.highlight = !this.highlight;
	}
}