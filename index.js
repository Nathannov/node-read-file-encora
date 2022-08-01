const { startProcess } = require("./src/start_process");

// start process
(async () => await startProcess("input", ".csv", "square"))(); //IIFE