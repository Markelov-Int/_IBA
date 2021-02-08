var express    = require("express");
var router     = express.Router();
var passport   = require("passport");
var User       = require("../models/Authentication/user");

router.get("/", function(req, res){
  res.render("landing");
});

router.get("/contact", function(req, res){
  res.render("models_Authentication/contact");
});

router.get("/sport", function(req, res){
  res.render("models_Authentication/sport");
});

// ============
// AUTH ROUTES
// ============
//show register form
router.get("/register", function(req, res){
	res.render("models_Authentication/register");
});
//handling user sign up
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
      if(err){
      	req.flash("error", err.message);
      	return res.render("models_Authentication/register");
      }
      passport.authenticate("local")(req, res, function(){
    
         res.redirect("/");
      });
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("models_Authentication/login");
});

//login logic
//middleware
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect:"/login"
}), function(req, res){
});

//logic route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/");
});



module.exports = router;