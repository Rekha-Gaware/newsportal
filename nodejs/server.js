var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cors = require('cors');

// file includes
var config = require('./config');

var app = express();
var db;

app.use(cors());

// parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));

// set headers for cross origin


//app.all('/studapi/*', [require('./middlewares/validateRequests')]);
app.use('/', require('./routes'));


// if no routes is match by now, it must be a 404

app.use(function (req, res, next) {
    res.status(404).json({ status: "Page Not Found" }).end();
});

// Start server and DB

// start server
app.set('port', config.port);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

// Database connection

mongoose.connect(config.mongo.url, function (err, database) {
    if (err) {
        console.log('Error: ', err);
        process.exit(1);
    }

    // save the database obj from callback reuse
    db = database;
    console.log('Database Connected.');

});