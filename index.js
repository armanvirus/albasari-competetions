const express = require("express");
const app = express();
const path = require('path')
const dotenv = require("dotenv")
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser'); 
const morgan = require('morgan')
const authRoutes = require('./routes/auths')
const appRoutes = require('./routes/app')
const helpers = require('./utils/helpers.js');
app.locals.helpers = helpers;

//parse cookie
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
//setting templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));
//config environment variable
dotenv.config()
//connect db
require('./database/dbConnection.js')()
// parse incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//log request
app.use(morgan())
//default route
app.get("/", (req,res)=>{
    res.render("pages/home");
})
// refer to these routes for any authentication related stuffs.
app.use('/user/auth', authRoutes)
app.use("/app", appRoutes)









app.listen(PORT, ()=> console.log(`server is running on PORT ${PORT}`))