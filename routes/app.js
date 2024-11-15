const express = require("express")
const router = express.Router();
const {application, participants,quiz} = require('../controllers/app')
const {isAuthenticated} = require('../middlewares/authenticator')

// define the routes
router.get('/dashboard', isAuthenticated, (req,res)=> res.render('pages/dashboard',{error:false, msg:''}));
router.get('/application', isAuthenticated, (req,res)=> res.render('pages/application',{error:false, msg:''})) 
router.get('/hadith', isAuthenticated, (req,res)=> res.render('pages/hadith',{error:false, msg:''})) 
router.get('/payment',isAuthenticated, (req,res)=> res.render('pages/payment',{error:false, msg:''})) 
router.get('/document', isAuthenticated, (req,res)=> res.render('pages/document',{error:false, msg:''})) 
router.get('/profile', isAuthenticated, (req,res)=> res.render('pages/profile',{error:false, msg:''}))
router.post("/application", isAuthenticated, application)
router.get("/participants",isAuthenticated, participants)
router.post("/quiz",isAuthenticated, quiz)


module.exports = router;