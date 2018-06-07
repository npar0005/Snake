/*
	File: CAPI - Community edition
	Description: Implements those missing useful functionalities javascript is missing
	Author: N. Parsons
	Copyright: N. Parsons (C) 2018
	- Feel free to use this for your project
	* Note: some functions have been taken from stackoverflow and are not my original work
*/

// Objects
function Vector2d(x, y){
	if(x instanceof Vector2d) {
		this.x = x.x;
		this.y = x.y;
	} else if(x == null) {
		this.x = rand(-100, 100)/100;
		this.y = rand(-100, 100)/100;
	} else if(x != null && y == null) {
		this.x = x;
		this.y = x;
	} else if(x != null && y != null) {
		this.x = x;
		this.y = y;
	}

  	this.mag = function() {
		return Math.sqrt(((this.x * this.x) + (this.y * this.y)));
	}

	this.magSq = function() {
		return ((this.x * this.x) + (this.y * this.y));
	}

	this.bound = function(num) {
		if(this.x > num || this.x < -num) {
			this.x = num;
		}

		if(this.y > num || this.y < -num) {
			this.y = num;
		}
	}

	this.limit = function(num) {
		var magSq = this.magSq();
		if(magSq > num * num) {
			this.div(Math.sqrt(magSq));
			this.mult(num);
		}
		return this;
	}

	this.add = function(v2d) {
		if(v2d instanceof Vector2d) {
			this.x += v2d.x;
			this.y += v2d.y;
		} else if(parseInt(v2d) === v2d || parseFloat(v2d) === v2d) {
			this.x += v2d;
			this.y += v2d;
		}
		return this;
	}

	this.sub = function(v2d) {
		if(v2d instanceof Vector2d) {
			this.x -= v2d.x;
			this.y -= v2d.y;
		} else if(parseInt(v2d) === v2d || parseFloat(v2d) === v2d) {
			this.x -= v2d;
			this.y -= v2d;
		}
		return this;
	}


	this.mult = function(v2d) {
		if(v2d instanceof Vector2d) {
			this.x *= v2d.x;
			this.y *= v2d.y;
		} else if(parseInt(v2d) === v2d || parseFloat(v2d) === v2d) {
			this.x *= v2d;
			this.y *= v2d;
		}
		return this;
	}

	this.div = function(v2d) {
		if(v2d instanceof Vector2d) {
			this.x /= v2d.x;
			this.y /= v2d.y;
		} else if(parseInt(v2d) === v2d || parseFloat(v2d) === v2d) {
			this.x /= v2d;
			this.y /= v2d;
		}
		return this;
	}

	this.mult = function(v2d) {
		if(v2d instanceof Vector2d) {
			this.x /= v2d.x;
			this.y /= v2d.y;
		} else if(parseInt(v2d) === v2d || parseFloat(v2d) === v2d) {
			this.x *= v2d;
			this.y *= v2d;
		}
		return this;
	}


	this.normalize = function(v2d) {
  		var absoluteV = this.mag();
		this.x /= absoluteV;
		this.y /= absoluteV;
		return this;
	}


	this.setMag = function(newMag) {
		this.normalize();
		this.mult(newMag);
		return this;
	}

	this.getX = function(){return this.x;};
	this.getY = function(){return this.y;};
	this.setX = function(x){this.x = x;},
	this.setY = function(y){this.y = y;}
}

function UserException(message) {
	this.message = message;
	this.name = 'UserException';
}


// Functions
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

// Desc: Returns a hex (withou #) number depending on the % value of 'value'. Thus 0-1 (0-100%) for all i's will create a rainbow effect.
// value between 0-1 (percentage)
function color(value) { // From https://stackoverflow.com/questions/2374959/algorithm-to-convert-any-positive-integer-to-an-rgb-value
	var RGB = {R:0,G:0,B:0};
    if (0 <= value && value <= 1/8) {
        RGB.R = 0;
        RGB.G = 0;
        RGB.B = 4*value + .5; // .5 - 1 // b = 1/2
    } else if (1/8 < value && value <= 3/8) {
        RGB.R = 0;
        RGB.G = 4*value - .5; // 0 - 1 // b = - 1/2
        RGB.B = 1; // small fix
    } else if (3/8 < value && value <= 5/8) {
        RGB.R = 4*value - 1.5; // 0 - 1 // b = - 3/2
        RGB.G = 1;
        RGB.B = -4*value + 2.5; // 1 - 0 // b = 5/2
    } else if (5/8 < value && value <= 7/8) {
        RGB.R = 1;
        RGB.G = -4*value + 3.5; // 1 - 0 // b = 7/2
        RGB.B = 0;
    } else if (7/8 < value && value <= 1) {
        RGB.R = -4*value + 4.5; // 1 - .5 // b = 9/2
        RGB.G = 0;
        RGB.B = 0;
    } else {
        RGB.R = .5;
        RGB.G = 0;
        RGB.B = 0;
    }


    // scale for hex conversion
    RGB.R *= 15;
    RGB.G *= 15;
    RGB.B *= 15;

    return Math.round(RGB.R).toString(16)+''+Math.round(RGB.G).toString(16)+''+Math.round(RGB.B).toString(16);
    //return {r: RGB.R, g: RGB.G, b: RGB.B};
}

function containsWithinObj(obj, search, exact){
	if(exact == undefined) exact = false;

	for(var i in obj){
		if(!exact){
			if(i == search){
				return true;
			} else if(obj[i] == search){
				return true;
			}
		} else{
			if(i === search){
				return true;
			} else if(obj[i] === search){
				return true;
			}
		}
	}

	return false;
}

function firstOccurance(arr) {
	let occur = [];
	for(let elem of arr) {
		if(occur.indexOf(elem) >= 0) return elem;
		occur.push(elem);
	}
	return null;
}

function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

var contains = function(array, search, exact){
	if(exact == undefined) exect = false;
	for(var i in array){
		if(!exact){
			if(array[i] == search){
				return true;
			}
		} else{
			if(array[i] === search){
				return true;
			}
		}

	}
	return false;
}

function cloneObj(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function rand(intMin, intMax) {
	if(intMin > intMax) {
  		throw new UserException("MIN must be smaller than MAX!");
  	}

	return Math.floor(Math.random()*(intMax-intMin+1)+intMin); // From s-o-f
}

function loopLog(array){
	for(var i = 0; i < array.length; i++){
		console.log(array[i]);
	}
}

function char_in_string(word, search, exact){
	if(exact == undefined) exact = false;

	for(var i = 0; i < word.length; i++){
		if(!exact){
			if(word[i] == search){
				return true;
			}
		} else {
			if(word[i] === search){
				return true;
			}
		}
	}

	return false;
}

var word_in_string = function(string, search){
	string = string.split(" ");
	for(var word in string){
		if(string[word] == search){
			return true;
		}
	}

	return false;
}

function displayObjInArray(array){
	for(var i in array){
		console.log(i +": {");
		for(var j in array[i]){
			console.log("	" +j +": " +array[i][j]);
		}
		console.log("}");
	}
}


var bubble_sort = function(array){
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array.length-1; j++){
			if(array[j] > array[j+1]){
				var temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		}
	}

	return array;
}

var getHighestNumber = function(array){
	var high = array[0];
	for(var i = 0; i < array.length; i++){
		if(array[i] > high) high = array[i];
	}
	return high;
}

function roundToNearest(number, low, high){
	return (((number - high) < 0 ? -1 * (number - high):(number - high)) >= ((number - low) < 0 ? -1 * (number - low):(number - low)) ? low:high);
}

// example use: str = insert(str, ["<span class='highlight'>", "</span>"], [indexOne, indexTwo, 7, 9]);
function insert(string, inserts, indexs){
	var multiplier = 0;
	var span = false;
	for(var i = 0; i < indexs.length; i++){
		span = !span;
	    indexs[i] += multiplier + (span ? 0 : 1);
	    var insertVal = (span ? (inserts[0]) : (inserts[1]));
	    multiplier += insertVal.length;
	    var string = string.substr(0, indexs[i]) + insertVal + (string.substr(indexs[i], string.length));
	}
	return string;
}

function clearCanvas(canvas, ctx){
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


let cos = (deg) => Math.cos((Math.PI/180) * deg);
let sin = (deg) => Math.sin((Math.PI/180) * deg);
let tan = (deg) => Math.tan((Math.PI/180) * deg);
