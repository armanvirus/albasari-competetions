# Albasari Competition System 🏆

A comprehensive competition management system for Albasari Islamic Academy, featuring modern UI/UX, enhanced security, and automated deployment capabilities.

![Home Page](https://github.com/user-attachments/assets/45efcbb9-0181-4b13-a11c-eb1d22354bb5)

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure login, registration, and password reset
- **Dashboard**: Real-time statistics and activity tracking
- **Application Management**: Handle competition applications efficiently
- **Student Management**: Track and manage student information
- **Payment System**: Integrated payment processing
- **Quiz System**: Interactive Hadith quizzes
- **Profile Management**: User profile customization

### Enhanced Features (v2.0)
- **Modern UI/UX**: Responsive design with smooth animations
- **Security Enhanced**: Rate limiting, input validation, and security headers
- **Real-time Notifications**: In-app notification system
- **Mobile Optimized**: Fully responsive across all devices
- **Performance Optimized**: Compression, caching, and lazy loading
- **Health Monitoring**: Built-in health checks and monitoring
- **Auto-deployment**: CI/CD pipeline with GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB 5.x or higher
- npm 9.x or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/armanvirus/albasari-competetions.git
   cd albasari-competetions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/albasari-competitions
   JWT_TOKEN=your-super-secret-jwt-token
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open http://localhost:5000 in your browser
   - Health check: http://localhost:5000/health

## 🛠️ Development

### Development Server
```bash
npm run dev
```

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build application for production
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with Docker Compose
- `npm run health` - Check application health
- `npm run setup` - Initial setup (install + env copy)

### Docker Development
```bash
# Build and run with Docker Compose
npm run docker:compose

# Or manually
docker build -t albasari-competitions .
docker run -p 5000:5000 albasari-competitions
```

## 🏗️ Architecture

### File Structure
```
albasari-competetions/
├── public/
│   ├── styles/
│   │   ├── main.css              # Core CSS architecture
│   │   ├── navigation.css        # Enhanced navigation
│   │   └── dashboard-enhanced.css # Modern dashboard
│   └── img/
├── views/
│   ├── layout.ejs               # Main layout with enhancements
│   ├── pages/                   # All page templates
│   └── partials/                # Reusable components
├── controllers/                 # Route handlers
├── database/                    # Database models and connection
├── middlewares/                 # Custom middleware
├── routes/                      # Route definitions
├── utils/                       # Helper functions
├── .github/workflows/           # CI/CD pipeline
├── Dockerfile                   # Container configuration
├── docker-compose.yml           # Development environment
└── package.json                 # Dependencies and scripts
```

### CSS Architecture
- **CSS Variables**: Consistent theming with CSS custom properties
- **Utility Classes**: Reusable classes for common patterns
- **Component-based**: Modular CSS for maintainability
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and engaging interactions

## 🔐 Security Features

- **Helmet**: Security headers for protection
- **Rate Limiting**: Prevents abuse and DOS attacks
- **Input Validation**: Server-side validation for all inputs
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Cross-origin request security
- **Compression**: Gzip compression for performance

## 📱 UI/UX Enhancements

### Design System
- **Color Palette**: Consistent Islamic-themed colors
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent spacing system
- **Shadows**: Elegant depth with shadow system
- **Animations**: Smooth transitions and hover effects

### Components
- **Navigation**: Modern sidebar with mobile menu
- **Dashboard Cards**: Gradient cards with hover effects
- **Forms**: Enhanced validation with real-time feedback
- **Notifications**: Toast notifications for user feedback
- **Loading States**: Spinners and skeleton screens

## 🚀 Deployment

### GitHub Actions CI/CD
The project includes automated deployment to multiple platforms:

1. **Push to main branch** triggers automatic deployment
2. **Testing** runs on multiple Node.js versions
3. **Security audit** checks for vulnerabilities
4. **Deployment** to configured platform

### Supported Platforms

#### Railway
```bash
npm run deploy:railway
```

#### Heroku
```bash
npm run deploy:heroku
```

#### Vercel
```bash
npm run deploy:vercel
```

#### DigitalOcean
Configure via GitHub Actions with secrets

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-url
JWT_TOKEN=your-production-jwt-secret
MAIL_HOST=your-smtp-server
MAIL_USER=your-email
MAIL_PASSWORD=your-email-password
```

## 📊 Monitoring & Health Checks

### Health Endpoint
```
GET /health
```
Returns:
```json
{
  "status": "OK",
  "timestamp": "2025-07-09T14:26:11.006Z",
  "uptime": 13.282611217,
  "version": "2.0.0"
}
```

### Logging
- **Morgan**: HTTP request logging
- **Console**: Application logs
- **Error Tracking**: Comprehensive error handling

## 🔧 Configuration

### Database Configuration
```javascript
// MongoDB connection with proper error handling
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Email Configuration
```javascript
// Nodemailer setup for email notifications
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});
```

## 📚 API Routes

### Authentication
- `POST /user/auth/login` - User login
- `POST /user/auth/register` - User registration
- `GET /user/auth/logout` - User logout
- `POST /user/auth/forgot/password/init` - Forgot password
- `POST /user/auth/password/change/:token/:issuer` - Reset password

### Application
- `GET /app/dashboard` - User dashboard
- `GET /app/application` - Application form
- `POST /app/application` - Submit application
- `GET /app/document` - View documents
- `GET /app/profile` - User profile

### Health & Monitoring
- `GET /health` - Health check endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛟 Support

For support, email albasary@gmail.com or create an issue in the repository.

## 🚀 Roadmap

### Phase 1 (Completed)
- [x] Enhanced UI/UX with modern design
- [x] Security improvements
- [x] Auto-deployment setup
- [x] Performance optimizations

### Phase 2 (Future)
- [ ] Real-time notifications with WebSocket
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Advanced reporting system

---

**Built with ❤️ by Albasari Islamic Academy**

*"The Best Among You Are Those Who Learn the Qur'an and Teach It"*
