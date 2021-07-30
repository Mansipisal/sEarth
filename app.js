const express= require("express");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();

// Passport Config
require('./config/passport')(passport);

//Db config 
const db =  require("./config/keys").MongoURI;

//connect monodb DB
mongoose.connect(db , {  useNewUrlParser: true , useUnifiedTopology: true })
.then(() => console.log("mongoDB database connected..."))
.catch(err => console.log(err));


//body-parser to get data enter by user
app.use(express.urlencoded({ extended:false}));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

//EJS
// app.use(expressLayouts);
app.set("view engine" , "ejs");

// to load static pages 
app.use(express.static(__dirname + '/public'));


// Connect Flash
app.use(flash());


//ROUTES
app.use("/" ,require("./routes/index") );
app.use("/users" ,require("./routes/users") );



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on ${PORT}`));