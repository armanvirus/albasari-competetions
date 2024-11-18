const express = require("express")
const router = express.Router();
const {dashboard,application, participants,quiz} = require('../controllers/app')
const {isAuthenticated} = require('../middlewares/authenticator')

// define the routes
router.get('/dashboard', isAuthenticated, dashboard);
router.get('/application', isAuthenticated, (req,res)=> res.render('pages/application',{error:false, msg:''})) 
router.get('/hadith', isAuthenticated, (req,res)=> res.render('pages/hadith',{error:false, msg:''})) 
router.get('/payment',isAuthenticated, (req,res)=> res.render('pages/payment',{error:false, msg:''})) 
// router.get('/document', isAuthenticated, (req,res)=> res.render('pages/document',{error:false, msg:''})) 
router.get('/profile', isAuthenticated, (req,res)=> res.render('pages/profile',{error:false, msg:'', user:req.user}))
router.post("/application", isAuthenticated, application)
router.get("/document",isAuthenticated, participants)
router.post("/quiz",isAuthenticated, quiz)



module.exports = router;