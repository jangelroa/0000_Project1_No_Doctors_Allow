var express = require("express"),
	pg = require("pg"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	bcrypt = require("bcrypt"),
	//models = require("./models/index.js"), // this will break until I create models
    // ejs-locals, for layouts
    engine = require('ejs-locals'),
    flash = require('connect-flash'),
    session = require("cookie-session");
	// Modules to use with Passport
var passport = require("passport"),
    localStrategy = require("passport-local").Strategy;

var app = express();

app.set("view engine", "ejs");

// this is different from setting the view engine
// it enables the layout functionality
app.engine('ejs', engine);

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(methodOverride("_method"));


// enable the session
// the session needs a key
// with which to encode the session values
// exposed to us by require('connect-flash')
app.use(session({
  keys: ['key']
}));

app.use(flash());

// Modules to use with Passport
var passport = require("passport"),
    localStrategy = require("passport-local").Strategy;

// Setup passport
app.use(session( {
  secret: 'thisismysecretkey',
  name: 'chocolate chip',
  maxage: 3600000
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    models.User.find({
        where: {
            id: id
        }
    }).done(function(error,user){
        done(error, user);
    });
});


app.set("view engine", "ejs");

// use body parser to use req.body.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/assets'));

/********************************************************************************/
/********************************************************************************/

// MY HEROKU ADDRESS IS https://obscure-savannah-8786.herokuapp.com/


// *** ROOT ***
		app.get("/", function(req, res){
			res.render("index.ejs");
		});
		app.post('/', function(req,res) {
			console.log(req.body.search_string);	
		});

// *** LOGIN ***
		app.get("/login", function(req, res){
			res.render("login.ejs");
		});

// *** SIGNUP ***
		app.get("/signup", function(req, res){
			res.render("signup.ejs");
		});



/********************************************************************************/
/********************************************************************************/

// app.listen(3000);
app.listen(process.env.PORT || 3000);






























