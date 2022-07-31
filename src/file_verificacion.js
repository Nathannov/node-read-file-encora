const { promises: Fs } = require('fs')
const { CsvFileProcessor } = require("./classes/csv_file_processor");

async function checkFileExist(fileName, extention, shapeType) {
  const fileNameExt = fileName + extention;
  const pathFile = `./inputFiles/${fileNameExt}`;
  try {
    await Fs.access(pathFile);
    return callFileProcessor(pathFile, extention, shapeType);
  } catch {
    console.log("This file does not exist! Please checked out.");
    return false;
  }
}

module.exports = {
  checkFileExist
}

function callFileProcessor(pathFile, extention, shapeType) {
  let fileProcessor;

  switch (extention) {
    case '.csv': {
      fileProcessor = new CsvFileProcessor(pathFile, shapeType);
      return fileProcessor.readStreamProcess();
    }
    default: {
      console.log("There is not created a process for this file extention.");
      return false;
    }
  }
}