const fs = require('fs');
const express = require('express');
const app = express.Router();
const multer = require('multer');
const mimeTypes = require('mime-types');
const XLSX = require('xlsx');

let fileNamePath = '';

// Le da el nombre al archivo e indica la ruta donde se guardará el archivo
const storage = multer.diskStorage({
    destination: 'uploads/', //Destino del archivo
    filename: function (req, file, cb) {
        cb("", file.originalname + "." + mimeTypes.extension(file.mimetype)); // Da el nombre por defecto al archivo
        asignNameFile((file.originalname + "." + mimeTypes.extension(file.mimetype))) // Llama a la funcion que asigan el nombre del archivo de manera global
    }
})

// Llama a la funcion que guarda el archivo en el fichero 'uploads'
const upload = multer({
    storage: storage
})

// Vista del index
app.get('/', (req, res) => {
    res.send('All Good!!! 👍')
});

//Lee el archivo del fichero 'uploads' y posteriormente lo borra cuando ya se procesó
app.post('/files', upload.single('xlsx'), (req, res) => {
    // res.send('All Good!!! 👍')
    console.log(fileNamePath);
    const workbook = XLSX.readFile(__dirname + '/uploads/' + fileNamePath);
    const workbookSheets = workbook.SheetNames;

    const sheet = workbookSheets[0];
    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    console.log(excelData);
    // console.log(JSON.stringify(excelData));
    res.json(excelData) 
    // res.send(JSON.stringify(excelData))
    // res.status(200).send(excelData); 

    const filePath = __dirname + '/uploads/' + fileNamePath;
    fs.access(filePath, error => {
        if (!error) {
            fs.unlinkSync(filePath);
        } else {
            console.error('Error occured:', error);
        }
    });




});

function asignNameFile(fileName) {
    fileNamePath = fileName;
}

module.exports = app;