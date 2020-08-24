const express = require('express');
const bodyParser = require('body-parser');

let port = 8081;
var app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})