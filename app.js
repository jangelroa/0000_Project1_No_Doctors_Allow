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
var question;

// *** ROOT ***
		app.get("/", function(req, res){
			// the user goes to the main page always (authenticated or not)
			res.redirect("/main");
		});

		app.post('/', function(req,res) {
		});

// *** MAIN ***
		app.get("/main", function(req, res){
			if(req.isAuthenticated()) {
				res.render("index.ejs", {
					authenticated: req.isAuthenticated(),
					user_id: req.user.id
				});
			} else {
				res.render("index.ejs", {
					authenticated: req.isAuthenticated()
				});
			}
		});

// *** LOGIN ***
		app.get("/login", function(req, res){
			// if user is authenticated redirect to "/main"
			// else render "login.ejs"
			if(req.isAuthenticated()) {
				console.log("user is AUTHENTICATED");
				console.log(req.user.id);
				res.redirect("/main");
			} else {
				console.log("user is NOT AUTHENTICATED");
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
				console.log("user is NOT AUTHENTICATED");
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
		app.get("/questions", function(req, res){
			res.render("questions.ejs", req.flash('info')[0]);
		});

		// this form is in "/main" and has an action="/questions"
		app.post('/questions', function(req,res) {
			// console.log(req.body.search_string);

			// get the "search_string", get the search keys from it, 
			// query those keys in "title" in the "Question" table,
			// and redirect to "/questions" and show the questions selected
			// res.redirect("/questions");	

			models.Question.findAll().then(function(questions) { 
	            
				var templateData = { 
					authenticated: req.isAuthenticated(),
					search_string: req.body.search_string,
					questions: questions
				};

				if(templateData.authenticated) {
					templateData.user_id = req.user.id;
				}

				req.flash('info', templateData);
				res.redirect("/questions");
            });
		});








// *** QUESTION ***
		app.get("/:qu_id/question", function(req, res){

			models.Question.find({where: {id: req.params.qu_id}}).then(function(question) {
				var templateData = { 
						authenticated: req.isAuthenticated(),
						question: question,
						answers: ["A1", "A2", "A3"]
					};

				if(templateData.authenticated) {
					templateData.user_id = req.user.id;
				}

				req.flash('question', templateData.question);
				res.render("question.ejs", templateData);
			});

			// var templateData = { 
			// 		authenticated: req.isAuthenticated(),
			// 	};

			// if(templateData.authenticated) {
			// 	templateData.user_id = req.user.id;
			// }
			// res.render("question.ejs", templateData);




			// var authenticated = req.isAuthenticated();

			// if(authenticated) {
			// 	res.render("question.ejs", {
			// 		authenticated: req.isAuthenticated(),
			// 		user_id: req.user.id
			// 	});
			// } else {
			// 	res.render("question.ejs", {
			// 		authenticated: req.isAuthenticated()
			// 	});
			// }
		});

// *** CREATE_NEW_QUESTION ***
		app.get("/:user_id/create_new_question", function(req, res){

			var userId = parseInt(req.params.user_id, 10);

			if(req.isAuthenticated() && userId === req.user.id){
				res.render("create_new_question.ejs", {
					authenticated: req.isAuthenticated(),
					user_id: userId
				});
			} else {
				res.redirect("/main");
			}
		});

		app.post("/:user_id/create_new_question", function(req, res) {
			// create a new question and and redirect to the new created question
			console.log(req.body.qu_title, req.body.qu_body, req.params.user_id);
			
			var userId = parseInt(req.params.user_id, 10);

			if(req.isAuthenticated() && userId === req.user.id){
				models.Question.createNewQuestion({
				    qu_title: req.body.qu_title,
				    qu_body: req.body.qu_body,
				    qu_user_id: userId
				});
				res.redirect("/" + userId + "/question");
			} else {
				res.redirect("/main");
			}
		});

// *** ANSWER_THIS__QUESTION ***
		app.get("/:user_id/answer_this_question", function(req, res){

			var userId = parseInt(req.params.user_id, 10);
			if(!question){
				question = req.flash('question')[0];
			}

			if(req.isAuthenticated() && userId === req.user.id){
				res.render("answer_this_question.ejs", {
					authenticated: req.isAuthenticated(),
					user_id: userId,
					question: question
				});
			} else {
				res.redirect("/main");
			}
		});

		app.post("/:user_id/answer_this_question", function(req, res) {
			// create a new question and and redirect to the new created question
			console.log(req.body.qu_title, req.body.qu_body, req.params.user_id);
			
			var userId = parseInt(req.params.user_id, 10);

			if(req.isAuthenticated() && userId === req.user.id){
				models.Answer.createNewAnswer({
				    an_body: req.body.an_body,
				    an_user_id: parseInt(req.params.user_id, 10)
				});
				res.redirect("/" + userId + "/question"));
			} else {
				res.redirect("/main");
			}
		});









/********************************************************************************/
/********************************************************************************/

// app.listen(3000);
app.listen(process.env.PORT || 3000);






























