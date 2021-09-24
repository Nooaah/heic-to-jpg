const {
    promisify
} = require('util');
const fs = require('fs');
const convert = require('heic-convert');

//Mettre chemin du dossier contenant toutes les photos HEIC
var variantFolder = '/Users/noahchatelain/Desktop/photos_polocrosse/';
//Mettre chemin du dossier où il y aura les futures photos
var outputFolder = '/Users/noahchatelain/Desktop/photos_polocrosse_output/';

fs.readdir(variantFolder, (err, fileNames) => {
    fileNames.forEach((fileName, index) => {
        if (fileName.substr(fileName.length - 5, fileName.length) == '.HEIC') {
            fileName = fileName.substr(0, fileName.length - 5);
            console.log(fileName);
            (async () => {
                const inputBuffer = await promisify(fs.readFile)('/Users/noahchatelain/Desktop/photos_polocrosse/' + fileName + '.HEIC');
                const outputBuffer = await convert({
                    buffer: inputBuffer,
                    format: 'JPEG',
                    quality: 0
                });
                console.log(fileName + '.JPG - ' + ((index + 1) / fileNames.length) * 100 + '%', '(' + (index + 1) + ' sur ' + fileNames.length + ')');
                await promisify(fs.writeFile)(outputFolder.toString() + fileName + '.jpg', outputBuffer);
            })();
        }
    });
});