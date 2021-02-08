var express    = require("express"),
    app        =   express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalSrtategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment"),
    
   
    User       = require("../models/Authentication/user"),
    seedDB     = require("../IBA_WebSite/seeds")

//requiring routes
var commentRoutes    = require("../routes/comments"),
    campgroundRoutes = require("../routes/campgrounds"),
    indexRoutes      = require("../routes/index")

 
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/src"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB(); //seed the database

//passport CONFIGURATION
app.use(require("express-session")({
   secret:"!",
   resave: false,
   saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalSrtategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
	next();
});


app.use("/", indexRoutes);
app.use(commentRoutes);

app.use("/campgrounds", campgroundRoutes);


app.listen(3017, function(){
console.log("Server has started");
});

// nodemon IBA_WebSite/app.js