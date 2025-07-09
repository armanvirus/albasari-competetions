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

// Load environment variables first
dotenv.config()

// Security middleware (install with: npm install helmet compression express-rate-limit)
try {
    const helmet = require('helmet')
    const compression = require('compression')
    const rateLimit = require('express-rate-limit')
    
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:", "https:"],
                fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            },
        },
    }));
    
    app.use(compression())
    
    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use('/api/', limiter);
    
    // Stricter rate limiting for auth routes
    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5, // limit each IP to 5 requests per windowMs
        message: 'Too many authentication attempts, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use('/user/auth', authLimiter);
    
    console.log('✅ Security middleware loaded');
} catch (error) {
    console.log('⚠️  Security middleware not installed. Run: npm install helmet compression express-rate-limit');
}

//parse cookie
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//setting templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Serve static files (like CSS)
app.use(express.static(path.join(__dirname, 'public')));

//connect db
require('./database/dbConnection.js')()

// parse incoming request body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

//log request
app.use(morgan('combined'))

// Make helpers available to all templates
app.locals.helpers = helpers;

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '2.0.0'
    });
});

//default route
app.get("/", (req,res)=>{
    res.render("pages/home");
})

// refer to these routes for any authentication related stuffs.
app.use('/user/auth', authRoutes)
app.use("/app", appRoutes)

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ 
        error: true, 
        msg: 'Page not found',
        url: req.originalUrl 
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ 
        error: true, 
        msg: 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    });
});

app.listen(PORT, ()=> {
    console.log(`🚀 Server is running on PORT ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
})