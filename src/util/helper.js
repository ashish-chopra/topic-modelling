const path = require('path');
const fs = require('fs');

function mkdir(dirPath, dirname) {
    let dir = dirname ? path.join(dirPath, dirname) : dirPath;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function random(min, max) {
    // Returns a random integer between min (include) and max (include)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



module.exports.mkdir = mkdir;
module.exports.random = random;