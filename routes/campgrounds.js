var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campg
router.get("/", function(req, res){
 //Get all camp from DB
 Campground.find({}, function(err, allCampgrounds){
 	if(err){
		console.log(err);
	} else{
		res.render("index", {campgrounds:allCampgrounds});
	}
 });
});


//SHOW - show more info about one campg
router.get("/:id" , function(req, res){
	//find the campg
	Campground.findByIdAndUpdate(req.params.id,{$inc: {views: +1}}, {new:true}).populate("comments").exec(function(err, foundCampground){
      if(err){
		console.log(err);
	} else {
		console.log(foundCampground)
		res.render("campgrounds/show", {campground: foundCampground});  
	}
	});	
});

module.exports = router;
