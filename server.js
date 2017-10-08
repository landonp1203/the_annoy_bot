var express = require('express');
var path = require('path');
var app = express();
const config = require('./config');
require("./annoy-bot");

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('*', function (req, res) {
    res.send('<h1>404, Page Not found</h1>');
});

app.listen(3000, function () {
    console.log('Bot listening on port 3000.');
})