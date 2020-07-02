var app = require("express")();
let http = require('http').createServer(app);
var exphbs = require("express-handlebars");
let io = require('socket.io')(http)
let express = require("express");
// var MomentHandler = require("handlebars.moment")
// MomentHandler.registerHelpers(exphbs)

// var app = express();

// var MomentHandler = require("handlebars.moment")
// MomentHandler.registerHelpers(exphbs);

// COMMENTED OUT TO REMOVE SEQUELIZE ON 9/9/19
// var db = require("./models");

var PORT = process.env.PORT || 3000;

app.engine(
  "handlebars",
  exphbs({
    helpers: {
      formatDate: function(date, format) {
        return moment(date).format(format);
      },
      changeSpacesToDashes: function(str) {
        str = str.replace(/\s+/g, "-")
        // str = str.replace(/---/g, " - ")
        return str
      },
      changeDashesToSpaces: function(str) {
        str = str.replace(/-/g, " ")        
      }
      // function(name, options) {
      //     if(!this._sections) this._section = {};
      //     this._sections[name] = options.fn(this);
      //     return null
      // }
    }
  })
);
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('new username', (username) => {
    console.log('new user: ', username);
    io.emit('new user', username)
  })
})

http.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});
