const { promises: Fs } = require('fs');
const { CsvFileProcessor } = require('./csv_file_processor');

class FileManager {
  constructor(path_file, extention) {
    this.extention = extention;
    this.pathFile = path_file;
  }

  async validateFileExist() {
    try {
      await Fs.access(this.pathFile);
      return true;
    } catch {
      return false;
    }
  }

  validateFileExtention() {
    let validation = false;
    switch (this.extention) {
      case ".csv":
        validation = true;
        break;
    }

    return validation;
  }

  generateFileProcessor() {
    let fileProcessor;
  
    switch (this.extention) {
      case ".csv": {
        fileProcessor = CsvFileProcessor;
        break;
      }
      default:
        throw Error(`There is not created a processor for this file extention.`);
    }
    return fileProcessor;
  }
}

module.exports = FileManager;