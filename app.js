var express    = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var path       = require('path');
var validator  = require('express-validator');


// Create app
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());



//Config handlebars
app.engine('handlebars', handlebars({defaultLayout: 'navigation'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

//Set port
app.set('port', process.env.port || 7777);


app.use(require('./controllers'));



app.listen(app.get('port'), function(){
    console.log('Server start at port: ' + app.get('port'));
});
