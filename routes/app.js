const express = require("express")
const router = express.Router();
const {application, participants,quiz} = require('../controllers/app')/

// define the routes
router.get('/dashboard', (req,res)=> res.render('pages/dashboard',{error:false, msg:''})) 
router.post("/application",application)
router.get("/participants",participants)
router.post("/quiz",quiz)

module.exports = router;