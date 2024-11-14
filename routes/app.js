const express = require("express")
const router = express.Router();
// const {} = require('../controllers/app')

// define the routes
router.get('/dashboard', (req,res)=> res.render('pages/dashboard',{error:false, msg:''})) 
router.get('/application', (req,res)=> res.render('pages/application',{error:false, msg:''})) 
router.get('/payment', (req,res)=> res.render('pages/payment',{error:false, msg:''})) 
router.get('/document', (req,res)=> res.render('pages/document',{error:false, msg:''})) 
router.get('/profile', (req,res)=> res.render('pages/profile',{error:false, msg:''}))

module.exports = router;