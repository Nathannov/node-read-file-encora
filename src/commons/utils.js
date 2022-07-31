const openDataToRead = () => {
	console.log("Opened to read the file \n");
}

const errorDataReadProcess = (message) => {
	console.log(message);
}

const closeDataReadProcess = () => {
	console.log("\nfile processed");
}

module.exports = {
    openDataToRead, errorDataReadProcess, closeDataReadProcess
}