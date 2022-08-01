const { Square } = require("./square");

// this class allows adding new shape type classes without affecting the already implemented ones
class ShapeManager {
	constructor(shape_type) {
		this.shapeType = shape_type;
	}

	generateShape(number) {
		let newShape;
		switch (this.shapeType) {
			case "square":
				newShape = new Square(number);
				break;
			default:
				throw Error(`Shape type: ${this.shapeType} is not implemented`);
		}
		return newShape;
	}

	static validateShapeType(shapeType){
		let validatation = false;
		switch (shapeType) {
			case "square":
				validatation = true;
				break;
		}
		return validatation;
	}
}

module.exports = {
	ShapeManager
}