var express      = require('express');
var passport     = require('passport');
var bodyParser   = require('body-parser');
var config       = require('./config');
var handlebars   = require('express-handlebars');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var validator    = require('express-validator');
var flash        = require('express-flash');


// Create app
var app = express();


// Config middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(validator());

// Config session
app.use(session({
    secret: config.get('session:secret'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie')
}));

// Config handlebars
app.engine('handlebars', handlebars({defaultLayout: 'navigation'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




// Require passport strategy
require('./config/passport')(passport);


// Require controllers
app.use(require('./controllers'));


// Start server
app.listen(config.get('port'), function(){
    console.log('Server start at port: ' + config.get('port'));
});
