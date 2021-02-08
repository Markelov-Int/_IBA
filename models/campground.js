var mongoose  = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
    image: String, 
    views: Number,
    description: String,
    data: {
      type: Date,
      default: Date.now
    },
   comments: [
    {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: "Comment"
    }
   ]
});

var Blog = mongoose.model("Campground", campgroundSchema);



module.exports = mongoose.model("Campground", campgroundSchema);