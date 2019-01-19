const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {

    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];
 
    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default:
            console.log("That input does not currently exist.");
            break;
    }
  }

const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function(fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let lines = data.toString().split("\n");
            let results = lines.splice(0,5).join("\n");
            done(results);
        });
    },
    "tail": function(fullPath) {
        const fileName = fullPath[0];
        // const lastLine = fullPath.length;
        // const fivefromEnd = fullPath.length - 5;
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let lines = data.toString().split("\n");
            let results = lines.splice(10).join("\n");
            done(results);
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;

