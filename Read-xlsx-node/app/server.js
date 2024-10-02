const express = require('express');
const routes = require('./routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);

//Middlewares
app.use(cors());

//Routes
// app.get('/', (req, res) => res.send('Upload XLSX TELCEL'));
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log(app.get('port'))
})

//Run app, then load http://localhost:port in a browser to see the output.