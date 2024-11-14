const express = require("express")
const router = express.Router();
// const {} = require('../controllers/app')

// define the routes
router.get('/dashboard', (req,res)=> res.render('pages/dashboard',{error:false, msg:''})) 

module.exports = router;