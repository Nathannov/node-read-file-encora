const { parse } = require("csv-parse"); // compararing with 3 differents libreries (fast-csv, node-csv, csv-parse) this was the faster
const { ShapeManager } = require("./shape_manager");
const FileProcessorInterface = require("../interfaces/file_processor_interface");
const { openDataToRead, errorDataReadProcess, closeDataReadProcess } = require("../commons/utils");

class CsvFileProcessor extends FileProcessorInterface {

	constructor(path_file, shape_type) {
		super(path_file, shape_type);
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
							resolve(true);
						})
						.on("close", closeDataReadProcess)
				});
		});
	}

	dataReadProcess(row, shapeType) {
		const sm = new ShapeManager(shapeType);
		const readValue = row[0];
		// validate the type value
		if (isNaN(readValue)) {
			console.log("This value is not a number.");
			return;
		}

		const shape = sm.generateShape(+readValue); //implicit conversion to number
		console.log(shape.area());
	}
}

module.exports = {
	CsvFileProcessor
}