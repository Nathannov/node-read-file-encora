const { ShapeInterface } = require("../interfaces/shape_interface");

// this class override the methods created on shape interface
class Square extends ShapeInterface {
	constructor(length) {
		super();
		this.length = length;
	}

	area() {
		return Math.pow(this.length, 2);
	}
}

module.exports = {
	Square
}
