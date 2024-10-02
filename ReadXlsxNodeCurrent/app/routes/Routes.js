const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});

router.get('/uploads', (req, res) => {
    res.json("Metodo GET Xlsx")
})

// Configuración del middleware Multer
const upload = multer({ storage: storage });

// Ruta para subir un archivo
router.post('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const filePath = req.file.path;

    // Leer el archivo XLSX
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Obtener los datos del objeto JSON con opción defval para respetar espacios vacíos
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // Eliminar el archivo después de leerlo
        fs.unlinkSync(filePath);

        // Obtener solo los valores del objeto JSON y eliminar las claves
        // const values = jsonData.map((obj) => Object.values(obj));
        res.json(jsonData);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo XLSX' });
    }
});

module.exports = router;
