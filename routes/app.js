const express = require("express")
const router = express.Router();
const { dashboard, application, participants, quiz, 
    editApplication, edit, edith, 
    edithApplication, pay, adminPage } = require('../controllers/app')
const { isAuthenticated } = require('../middlewares/authenticator')

// define the routes
router.get('/dashboard', isAuthenticated, dashboard);
router.get('/application', isAuthenticated, (req, res) => res.render('pages/application', { error: false, msg: '' }))
router.get('/hadith', isAuthenticated, (req, res) => res.render('pages/hadith', { error: false, msg: '' }))
router.get('/pay', isAuthenticated, (req, res) => res.render('pages/pay', { error: false, msg: '' }))


// admin routes

// Admin Dashboard
router.get('/admin', adminPage);

// Schools Page
router.get('/admin/schools', (req, res) => {
    res.render('pages/admin_schools', { error: false, msg: '' });
});

// Receipts Page
router.get('/admin/reciepts', (req, res) => {
    res.render('pages/reciepts', { error: false, msg: '' });
});

// Applications Page
router.get('/admin/applications', (req, res) => {
    res.render('pages/admin_app', { error: false, msg: '' });
});

// Payment Page
router.get('/admin/payment', (req, res) => {
    res.render('pages/admin_pay', { error: false, msg: '' });
});

// Optional: Redirect `/app/app` to `/app/admin`
router.get('/app', (req, res) => {
    res.redirect('/app/admin');
});



router.get('/payment', isAuthenticated, (req, res) => res.render('pages/payment', { error: false, msg: '' }))
router.get('/application/edit/:id', isAuthenticated, editApplication)
router.get('/hadith/edit/:id', isAuthenticated, edithApplication)
// router.get('/document', isAuthenticated, (req,res)=> res.render('pages/document',{error:false, msg:''})) 
router.get('/profile', isAuthenticated, (req, res) => res.render('pages/profile', { error: false, msg: '', user: req.user }))
router.post("/application", isAuthenticated, application)
router.get("/document", isAuthenticated, participants)
router.post("/quiz", isAuthenticated, quiz)
router.post('/application/edit/:id', isAuthenticated, edit)
router.post('/application/edith/:id', isAuthenticated, edith)
router.post('/pay', isAuthenticated, pay)



module.exports = router;