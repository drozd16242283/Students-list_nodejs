var express      = require('express');
var passport     = require('passport');
var bodyParser   = require('body-parser');
var config       = require('./config');
var handlebars   = require('express-handlebars');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var validator    = require('express-validator');


// Create app
var app = express();

// Config session
app.use(session({
    secret: config.get('session:secret'),
    resave: config.get('session:resave'),
    saveUninitialized: config.get('session:saveUninitialized'),
    cookie: config.get('session:cookie')
}));

// Config middleware
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

// passport
app.use(passport.initialize());
app.use(passport.session());

//Config handlebars
app.engine('handlebars', handlebars({defaultLayout: 'navigation'}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');



// require passport strategy
require('./config/passport')(passport);


app.use(require('./controllers'));



// Start server
app.listen(config.get('port'), function(){
    console.log('Server start at port: ' + config.get('port'));
});
