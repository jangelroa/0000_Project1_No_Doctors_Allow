var express = require("express"),
	pg = require("pg"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	bcrypt = require("bcrypt"),
	models = require("./models/index.js"), // this will break until I create models
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

// var isAuthenticated = false;

// *** ROOT ***
		app.get("/", function(req, res){
			// the user goes to the main page always (authenticated or not)
			res.redirect("/main");
		});

		app.post('/', function(req,res) {
		});

// *** MAIN ***
		app.get("/main", function(req, res){
			res.render("index.ejs", {
				authenticated: req.isAuthenticated()
			});
		});

		app.post('/main', function(req,res) {
			console.log(req.body.search_string);
			// get the "search_string", get the search keys from it, 
			// query those keys in "title" in the "Question" table,
			// and redirect to "/questions" and show the questions selected
			// res.redirect("/questions");	

			res.render("questions.ejs", {
				authenticated: req.isAuthenticated(),
				search_string: req.body.search_string
			});
		});

// *** LOGIN ***
		app.get("/login", function(req, res){
			// if user is authenticated redirect to "/main"
			// else render "login.ejs"
			if(req.isAuthenticated()) {
				console.log("user is AUTHENTICATED");
				res.redirect("/main");
			} else {
				res.render("login.ejs");
			}
		});

		app.post("/login", passport.authenticate("local", {
		    successRedirect: "/main",
		    failureRedirect: "/login"
		}));

// *** LOGOUT ***
        app.get("/logout", function(req, res){
          req.logout();
          res.redirect("/");
        });

// *** SIGNUP ***
		app.get("/signup", function(req, res){
			if(req.isAuthenticated()) {
				console.log("user is AUTHENTICATED");
				res.redirect("/main");
			} else {
				res.render("signup.ejs");
			}
			res.render("signup.ejs");
		});

		app.post("/signup", function(req, res) {
			// create a new user and and redirect to "/login"
			// to allow the user login
			console.log(req.body.firstname, req.body.lastname, req.body.username, req.body.password);
			models.User.createNewUser({
			    firstname: req.body.firstname,
			    lastname: req.body.lastname,
			    username: req.body.username,
			    password: req.body.password
			});
			res.redirect("/login");
		});

// *** QUESTIONS ***
		// app.get("/questions", function(req, res){

		// 	res.render("questions.ejs");
		// });

// *** QUESTION ***
		app.get("/question", function(req, res){

			res.render("question.ejs", {
				authenticated: req.isAuthenticated()
			});
		});



/********************************************************************************/
/********************************************************************************/

// app.listen(3000);
app.listen(process.env.PORT || 3000);






























