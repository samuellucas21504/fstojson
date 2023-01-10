const fs = require('fs');
const path = require('path');
var dir = require('node-dir');  

const target = "CHANGE HERE";
const targetJson = "CHANGE HERE";


const DIRNAME = path.dirname('.');

const pasta = path.join(DIRNAME, target);
const jsonDir = path.join(DIRNAME, targetJson);

let arr = [];
const json = {};

dir.readFiles(pasta,
    function(err, content, next) {
        if (err) throw err;
        next();
    },
    function(err, files){
        if (err) throw err;
        arr = files;
        arr.forEach(paths => {
            var files = paths.split("\\");
            let actualFolder = null;
            for(let i = 0; i < files.length-1; i++){
                if(i === 0)
                    actualFolder = json[files[i]] = {...json[files[i]]}
                else
                    actualFolder = actualFolder[files[i]] = {...actualFolder[files[i]]};
            }
            actualFolder[files[files.length-1]] = paths;
        })
        if(fs.existsSync(jsonDir))
            fs.rmSync(jsonDir);

        fs.writeFileSync(jsonDir, JSON.stringify(json, undefined, "    "));
    });


