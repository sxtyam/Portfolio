require('dotenv').config()
var express = require("express")
var app = express()
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
var request = require("request")



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://new_user:<dyinglight>@aboutmecluster.iufrc.mongodb.net/<about_me>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


// var mongoose = require(‘mongoose’);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/about_me')



// mongoose.connect('mongodb://localhost:27017/about_me', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));




// =============
//  SCHEMA SETUP
// =============


// Academic Schema

var academicSchema = new mongoose.Schema({
    name: String,
    info: String,
    year: String,
    extra: String,
    imgsrc: String
})
var Academic = mongoose.model("Academic", academicSchema)

// Seedding Academic Schema

var academicData = [
    {
        name: "Delhi Technological University - DTU",
        info: "Bachelor of Technology (B.Tech.) in Computer Enginering (COE)",
        year: "2019-2023",
        extra: "Current CGPA: 8.80/10",
        imgsrc: "/images/dtu.jpg"
    },
    {
        name: "Cr Oasis Convent Sr. Sec. School, New Delhi",
        info: "Class: XI-XII",
        year: "2017-2019",
        extra: "Class XII Percentage: 90.6%",
        imgsrc: "/images/cr.png"
    },
    {
        name: "P.M.S. Public School, Moradabad <i class=\"fas fa-heart\"></i>",
        info: "Class: VI-X",
        year: "2013-2017",
        extra: "Class X CGPA: 9.8/10",
        imgsrc: "/images/pms.jpg"
    },
    {
        name: "K.L. International School, Meerut",
        info: "Class: III-V",
        year: "2010-2013",
        imgsrc: "/images/kl.jpg"
    }
]

Academic.deleteMany({}, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Removed Academics data")
        academicData.forEach(function (currentData) {
            Academic.create(currentData, function (err, addedData) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added Academic data")
                }
            })
        })
    }
})


// Project Schema

var projectSchema = new mongoose.Schema({
    name: String,
    imgsrc: String,
    description: String
})
var Project = mongoose.model("Project", projectSchema)

// Seeding Project Schema

var projectData = [
    {
        name: "Improved version of the RGB Color Guessing Game",
        imgsrc: "/images/project1.gif",
        description: "Created a basic Color Guessing Game, as a part of a Web Development Course. Then went on to use my own creativity as well as to test the depth of my knowledge to chage the basics of the game into a 1v1 real- time score tracker game with various other added features such as a flexible maximum score, changing the overall appearance of the game and playing with the basic JavaScript as well.And yeah, added a link to my insta handle as well. ;p<br>Languages Used: HTML, CSS, JS.<br><a href=\"/additionals/game.html\">Basic Version of the game.</a><br><a href=\"/additionals/colorGame.html\">My Upgraded Version.</a>"
    }
]

Project.deleteMany({}, function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("Removed Project data")
        projectData.forEach(function(currentProject) {
            Project.create(currentProject, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Project added")
                }
            })
        })
    }
})


// Web Series Schmea

var seriesSchema = new mongoose.Schema({
    name: String,
    imgsrc: String,
    rating: Number,
    favCharacter: String
})
var Series = mongoose.model("Series", seriesSchema)

// Seeding Series Data

var seriesData = [
    {
        name: "Game of Thrones",
        imgsrc: "/images/got.jpg", 
        rating: 5,
        favCharacter: "Jon Snow"
    },
    {
        name: "Sherlock",
        imgsrc: "images/sherlock.jpg",
        rating: 5,
        favCharacter: "Sherlock Holmes"
    },
    {
        name: "Sacred Games",
        imgsrc: "/images/sacred.jpg",
        rating: 4,
        favCharacter: "Ganesh Gaitonde"
    },
    {
        name: "Mirzapur",
        imgsrc: "/images/mirzapur.jpg",
        rating: 4.5,
        favCharacter: "Guddu Bhaiya"
    },
    {
        name: "Dark",
        imgsrc: "/images/dark.jpg",
        rating: 4.5,
        favCharacter: "Jonas Kahnwald"
    },
    {
        name: "Stranger Things",
        imgsrc: "/images/stranger.jpg",
        rating: 4,
        favCharacter: "Max"
    },
    {
        name: "Daredevil",
        imgsrc: "/images/daredevil.jpg",
        rating: 4,
        favCharacter: "Matt Murdock"
    },
    {
        name: "Breaking Bad",
        imgsrc: "/images/breaking.jpg",
        rating: 4.5,
        favCharacter: "Jesse Pinkman"
    }
]

Series.deleteMany({}, function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log("Removed Series data")
        seriesData.forEach(function(currentSeries) {
            Series.create(currentSeries, function(err) {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Added Series data")
                }
            })
        })
    }
})


// Review Schema

var reviewSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number,
    date: {type: Date, default: Date.now}
})
var Review = mongoose.model("Review", reviewSchema)




// =======
//  ROUTES
// =======


// Main Page Route

app.get("/", function(req, res) {
    res.render("index.ejs")
})


// Academics Page Route

app.get("/academics", function(req, res) {
    Academic.find({}, function (err, foundAcademicData) {
        if (err) {
            console.log(err)
        } else {
            res.render("academics.ejs", {academic: foundAcademicData})
        }
    })
})


// Projects Page Route

app.get("/projects", function(req, res) {
    Project.find({}, function(err, foundProjects) {
        if(err) {
            console.log(err)
        } else {
            res.render("projects.ejs", {projects: foundProjects})
        }
    })
})

// Web Series Page Route

app.get("/webseries", function(req, res) {
    Series.find({}, function(err, foundSeries) {
        if(err) {
            console.log(err)
        } else {
            res.render("webseries.ejs", {series: foundSeries})
        }
    })
})

// Social Media Page Route

app.get("/socialmedia", function(req, res) {
    res.render("socialmedia.ejs")
})

// Reviews Page Route

app.get("/reviews", function(req, res) {
    Review.find({}, function(err, foundReviews) {
        if(err) {
            console.log(err)
        } else {
            res.render("reviews.ejs", {reviews: foundReviews})
        }
    })
})

app.post("/reviews", function(req, res) {
    Review.create({
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating
    }, function(err, newReview) {
        if(err) {
            console.log(err)
        } else {
            console.log("Added review data")
            res.redirect("/reviews")
        }
    })
})




// ====================
// Server Intialisation
// ====================

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
    console.log("Server has Started!")
});