const { checkFileExist } = require("./src/file_verificacion");

//Testing ok call
(async () => await checkFileExist("input", ".csv", "square"))(); //IIFE