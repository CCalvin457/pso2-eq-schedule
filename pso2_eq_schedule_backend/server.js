const express = require('express');
const bodyParser = require('body-parser');
const { db } = require('./config/db');

let port = 8081;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app, db);

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
});