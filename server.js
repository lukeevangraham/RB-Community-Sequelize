var express = require("express");
var exphbs = require('express-handlebars');
var db = require("./models");

var PORT = process.env.PORT || 3000;
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    });
});