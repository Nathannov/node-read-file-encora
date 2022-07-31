const { Square } = require("./square");

// this class allows adding new shape type classes without affecting the already implemented ones
class ShapeManager {
	constructor(shape_type) {
		this.shapeType = shape_type;
	}

	createShape(number) {
		let newShape;
		switch (this.shapeType) {
			case "square":
				newShape = new Square(number);
				break;
			default:
				console.log("This shape type is not implemented");
		}
		return newShape;
	}
}

module.exports = {
	ShapeManager
}