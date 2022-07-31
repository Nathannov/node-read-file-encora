// this interface implemente the methods will be required it implemented attending the SOLID principals
class FileProcessorInterface {
    constructor(pathFile, shapeType){
        this.pathFile = pathFile;
		this.shapeType = shapeType;
    }
    readStreamProcess(){};
    processFile(){};
    dataReadProcess(row, shapeType){}
}

module.exports = FileProcessorInterface;