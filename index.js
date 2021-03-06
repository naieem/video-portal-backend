//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;
var cors = require('cors')
var app = express();
app.use(cors());
db.on('error', console.error);

//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');


// Uncomment the following lines to start logging requests to consoles.
// app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//connedting to mongoDB
// mongoose.connect('mongodb://' + configs.dbHost + '/' + configs.dbName);
mongoose.connect('mongodb://naieem:1234@ds111299.mlab.com:11299/video-portal');
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
routes(app);

// serve video files.
app.use('/videos', express.static('videos'));
// serve client side code.
app.use('/', express.static('client'));

//Finally starting the listener
app.listen(configs.applicationPort, function() {
    console.log('Example app listening on port ' + configs.applicationPort + '!');
});