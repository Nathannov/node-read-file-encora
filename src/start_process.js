const fs = require("fs");
const FileManager = require("./classes/file_manager");
const { ShapeManager } = require("./classes/shape_manager");

const startProcess = async (fileName, extention, shapeType) => {

	// validate shape type
	let flowValidation = ShapeManager.validateShapeType(shapeType);
	if (!flowValidation) {
		console.log("This shape type is not implemented");
		return flowValidation;
	}

	const pathFile = createPathFile(fileName, extention);
	const fm = new FileManager(pathFile, extention);

	// validate file exist
	flowValidation = await fm.validateFileExist();
	if (!flowValidation) {
		console.log("This file does not exist! Please checked out.");
		return flowValidation;
	}

	// validate extention
	flowValidation = fm.validateFileExtention();
	if (!flowValidation) {
		console.log("There is not created a process for this file extention.");
		return flowValidation;
	}

	console.time("Time it took to process the file");
	const stream = fs.createReadStream(pathFile);
	const fileProcessor = fm.generateFileProcessor();
	const fp = new fileProcessor(pathFile, shapeType);
	flowValidation = await fp.processFile(stream);
	console.timeEnd("Time it took to process the file");
	return flowValidation;
}

module.exports = {
	startProcess
}

const createPathFile = (fileName, extention) => {
	const fileNameExt = fileName + extention;
	const pathFile = `./inputFiles/${fileNameExt}`;
	return pathFile;
}