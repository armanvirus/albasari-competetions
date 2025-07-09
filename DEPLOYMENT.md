# Deployment Guide 🚀

This guide provides step-by-step instructions for deploying the Albasari Competition System to various cloud platforms.

## Pre-deployment Checklist

Before deploying, ensure you have:

- [ ] MongoDB database set up and accessible
- [ ] Environment variables configured
- [ ] Email service configured (SMTP)
- [ ] Domain name (optional)
- [ ] SSL certificates (for custom domains)

## Platform-Specific Deployment

### 1. Railway Deployment

Railway offers automatic deployments from GitHub repositories.

#### Setup Steps:
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Configure environment variables**:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb://railway-mongodb:27017/albasari-competitions
   JWT_TOKEN=your-production-jwt-secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   ```
4. **Deploy**: Railway will automatically build and deploy

#### Using Railway CLI:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy current directory
railway up
```

### 2. Heroku Deployment

#### Setup Steps:
1. **Install Heroku CLI**
2. **Login to Heroku**:
   ```bash
   heroku login
   ```
3. **Create Heroku app**:
   ```bash
   heroku create albasari-competitions
   ```
4. **Add MongoDB addon**:
   ```bash
   heroku addons:create mongolab:sandbox
   ```
5. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_TOKEN=your-production-jwt-secret
   heroku config:set MAIL_HOST=smtp.gmail.com
   heroku config:set MAIL_USER=your-email@gmail.com
   heroku config:set MAIL_PASSWORD=your-app-password
   ```
6. **Deploy**:
   ```bash
   git push heroku main
   ```

#### Heroku-specific Configuration:
Create `Procfile` in root directory:
```
web: npm start
```

### 3. Vercel Deployment

#### Setup Steps:
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Login to Vercel**:
   ```bash
   vercel login
   ```
3. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Vercel Configuration:
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 4. DigitalOcean App Platform

#### Setup Steps:
1. **Sign up** at [DigitalOcean](https://cloud.digitalocean.com/apps)
2. **Create new app** from GitHub repository
3. **Configure build settings**:
   - Build command: `npm install`
   - Run command: `npm start`
4. **Set environment variables** in app settings
5. **Deploy**

#### DigitalOcean App Spec:
```yaml
name: albasari-competitions
services:
- name: web
  source_dir: /
  github:
    repo: your-username/albasari-competetions
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: MONGODB_URI
    value: your-mongodb-url
  - key: JWT_TOKEN
    value: your-jwt-secret
```

### 5. AWS Elastic Beanstalk

#### Setup Steps:
1. **Install AWS CLI and EB CLI**
2. **Initialize Elastic Beanstalk**:
   ```bash
   eb init
   ```
3. **Create environment**:
   ```bash
   eb create production
   ```
4. **Set environment variables**:
   ```bash
   eb setenv NODE_ENV=production MONGODB_URI=your-mongodb-url JWT_TOKEN=your-jwt-secret
   ```
5. **Deploy**:
   ```bash
   eb deploy
   ```

### 6. Google Cloud Platform

#### Setup Steps:
1. **Create new project** in GCP Console
2. **Enable App Engine API**
3. **Create `app.yaml`**:
   ```yaml
   runtime: nodejs18
   
   env_variables:
     NODE_ENV: production
     MONGODB_URI: your-mongodb-url
     JWT_TOKEN: your-jwt-secret
   
   automatic_scaling:
     min_instances: 1
     max_instances: 10
   ```
4. **Deploy**:
   ```bash
   gcloud app deploy
   ```

## Docker Deployment

### Local Docker Setup:
```bash
# Build image
docker build -t albasari-competitions .

# Run container
docker run -p 5000:5000 -e NODE_ENV=production albasari-competitions
```

### Docker Compose Production:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/albasari-competitions
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:5.0
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    restart: unless-stopped

volumes:
  mongodb_data:
```

## Database Setup

### MongoDB Atlas (Recommended):
1. **Create cluster** at [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create database user**
3. **Whitelist IP addresses**
4. **Get connection string**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/albasari-competitions
   ```

### Self-hosted MongoDB:
```bash
# Install MongoDB
sudo apt update
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
use albasari-competitions
db.createUser({
  user: "albasari",
  pwd: "your-password",
  roles: ["readWrite"]
})
```

## Environment Variables

### Required Variables:
```env
# Application
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/albasari-competitions

# Authentication
JWT_TOKEN=your-super-secret-jwt-token-min-32-characters

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password

# URLs
CLIENT_URL=https://your-domain.com
CLIENT_F_P=https://your-domain.com/reset-password
```

### Optional Variables:
```env
# Security
SESSION_SECRET=your-session-secret
COOKIE_SECRET=your-cookie-secret

# File Upload
MAX_FILE_SIZE=5000000
UPLOAD_DIR=./uploads

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Cache
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
```

## SSL/HTTPS Setup

### Let's Encrypt (Free):
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Recommended):
1. **Add your domain** to Cloudflare
2. **Update nameservers**
3. **Enable SSL/TLS** (Full mode)
4. **Configure page rules** for performance

## Performance Optimization

### CDN Setup:
1. **Cloudflare CDN** (recommended)
2. **AWS CloudFront**
3. **Google Cloud CDN**

### Database Optimization:
```javascript
// Index creation for better performance
db.users.createIndex({ email: 1 })
db.musabaqaModel.createIndex({ school: 1, batch: 1 })
db.quizModel.createIndex({ school: 1, batch: 1 })
```

## Monitoring and Logging

### Health Check Setup:
```bash
# Create health check script
#!/bin/bash
curl -f http://localhost:5000/health || exit 1
```

### Log Management:
```bash
# PM2 for process management
npm install -g pm2
pm2 start index.js --name albasari-competitions
pm2 startup
pm2 save
```

## Backup Strategy

### Database Backup:
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="$MONGODB_URI" --out="/backups/$DATE"
```

### Application Backup:
```bash
# Backup application files
tar -czf app-backup-$(date +%Y%m%d).tar.gz /path/to/app
```

## Troubleshooting

### Common Issues:

1. **Database Connection Issues**:
   - Check MongoDB URI format
   - Verify network connectivity
   - Check firewall settings

2. **Environment Variables**:
   - Verify all required variables are set
   - Check for typos in variable names

3. **Memory Issues**:
   - Increase server memory
   - Optimize database queries
   - Enable compression

4. **Performance Issues**:
   - Enable caching
   - Optimize images
   - Use CDN

### Debugging Commands:
```bash
# Check application logs
pm2 logs albasari-competitions

# Monitor system resources
htop

# Check network connectivity
netstat -tulpn | grep :5000

# Test database connection
mongo $MONGODB_URI --eval "db.stats()"
```

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set secure environment variables
- [ ] Enable rate limiting
- [ ] Use strong passwords
- [ ] Regular security updates
- [ ] Database access restrictions
- [ ] Firewall configuration
- [ ] Regular backups
- [ ] Security headers enabled
- [ ] Input validation

## Support

For deployment issues:
- Check the [issues](https://github.com/armanvirus/albasari-competetions/issues) page
- Contact: albasary@gmail.com
- Documentation: [README.md](README.md)

---

**Happy Deploying! 🚀**