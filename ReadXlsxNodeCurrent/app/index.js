const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/Routes');

const app = express();
const port = 8080;

// Middleware CORS
app.use(cors());

// Middleware body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
