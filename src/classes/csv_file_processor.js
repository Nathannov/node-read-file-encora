const fs = require("fs");
const { parse } = require("csv-parse"); // compararing with 3 differents libreries (fast-csv, node-csv, csv-parse) this was the faster
const { ShapeManager } = require("./shape_manager");
const FileProcessorInterface = require("../interfaces/file_processor_interface");
const {openDataToRead, errorDataReadProcess, closeDataReadProcess} = require("../commons/utils");

class CsvFileProcessor extends FileProcessorInterface {

	constructor(pathFile, shapeType) {
		super(pathFile, shapeType);
		this.processedOK = false;
	}

	async readStreamProcess() {
		console.time("Time it took to process the file");
		// to create a readable stream. Streams let you work with large amounts of data by allowing you to access it in chunks.
		const stream = fs.createReadStream(this.pathFile);
		const processed = await this.processFile(stream);
		console.timeEnd("Time it took to process the file");
		return processed;
	}

	processFile(stream) {
		const encoding = "utf8";
		stream.setEncoding(encoding);
		return new Promise((resolve, reject) => {
			// This will wait until we know the readable stream is actually valid before piping
			stream.on("open", openDataToRead)
				.on("ready", () => {
					// This just pipes the read stream to the response object (which goes to the client)
					stream.pipe(parse({ from_line: 2 }))
						.on("error", (error) => {
							errorDataReadProcess(error.message);
							reject(false);
						})
						.on("data", (row) => {
							this.dataReadProcess(row, this.shapeType)
						})
						.on("end", () => {
							resolve(this.processedOK);
						})
						.on("close", closeDataReadProcess)
				});
		});
	}

	dataReadProcess (row, shapeType) {
		const sm = new ShapeManager(shapeType);
		const shape = sm.createShape(+row[0]); //implicit conversion to number
		
		if (typeof shape === "object"){
			this.processedOK = true; 
			console.log(shape.area());
		}
	}
}

module.exports = {
	CsvFileProcessor
}