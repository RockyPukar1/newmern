const fs = require("fs");
const path = require("path");

const makeDirectory = (path) => {
    let dir = process.cwd() + "/uploads/" + path;
    fs.mkdir(dir, {recursive: true}, (err, success) => {
        if (err) {
            //err
            console.log("Desired location could not be created.")
        }
    })
}

module.exports = {
    makeDirectory: makeDirectory
};