var path = require("path");

// Import the model (event.js) to use its database functions
var db = require("../models/");

// Routes
module.exports = function(app) {
    // app.get("/", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public.blog.html"));
    // });

    app.get('/', function (req, res) {
        res.render('home');
    })

    app.get("/cms", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // app.get("/events", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../public/events.html"));
    // })

    app.get("/events", function (req, res) {
        db.Event.findAll()
        .then(function(dbEvent) {
            console.log("dbEvent: ", dbEvent);
            // for (let index = 0; index < dbEvent.length; index++) {
            //     const element = array[index];
                
            // }
            var hbsObject = {
                events: dbEvent
            };
            return res.render("events", hbsObject)
        })
            
        })
    
}