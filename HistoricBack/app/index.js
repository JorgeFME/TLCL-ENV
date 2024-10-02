const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/Routes');

const app = express();
const port = process.env.PORT || 8080;

// Middleware CORS
app.use(cors());

// Middleware body-parser con límite de carga de 50 MB
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

// Rutas
app.use('/', routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
