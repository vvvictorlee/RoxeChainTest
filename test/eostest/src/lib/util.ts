var fs = require('fs');

export async function loadJson(fileName:any) {
    return JSON.parse(fs.readFileSync(fileName));
}

export async function writeFile(fileName:any, json:any) {
    fs.writeFile(fileName, JSON.stringify(json), function (error:any) {
        if (error)
            console.log(error);
    });
}

// module.exports = {
//     loadJson,
//     writeFile
// };