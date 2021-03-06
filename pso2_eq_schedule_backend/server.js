const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db } = require('./config/db');
const { api } = require('./config/calendar');

let port = 8081;
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:8080', optionsSuccessStatus: 200}))

require('./routes')(app, db, api);

app.get('/', (req, res) => {
    res.status(200).send("Hello");
});

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
});