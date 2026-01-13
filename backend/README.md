# Django Portfolio Backend

REST API backend for the portfolio website with GitHub integration and contact form handling.

## 🚀 Quick Start

### Development Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.local.example .env
# Edit .env with your configuration

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

## 📁 Project Structure

```
backend/
├── portfolio_api/     # Main Django project
├── github_api/        # GitHub integration app
├── core/             # Contact form and utilities
├── requirements.txt  # Python dependencies
├── manage.py        # Django management
└── Procfile         # Deployment configuration
```

## 🔧 Configuration

### Environment Variables
```bash
# Django Core
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# GitHub Integration
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_USERNAME=your-github-username

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Database (optional - uses SQLite by default)
DATABASE_URL=postgres://user:pass@host:port/db

# Caching
CACHE_TTL=3600
```

## 📡 API Endpoints

### GitHub Integration (`/api/github/`)

#### GET `/api/github/repos/`
Fetch user repositories with filtering and caching.

**Query Parameters:**
- `limit` (int): Number of repositories (default: 20, max: 50)
- `featured` (bool): Return only featured repositories

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 123,
      "name": "awesome-project",
      "description": "An awesome project",
      "html_url": "https://github.com/user/awesome-project",
      "topics": ["react", "typescript"],
      "stargazers_count": 15,
      "language": "TypeScript",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/api/github/stats/`
Get user statistics and language breakdown.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_repos": 25,
    "total_stars": 150,
    "total_forks": 45,
    "languages": [
      {
        "name": "Python",
        "percentage": 35.5,
        "color": "#3776ab"
      }
    ]
  }
}
```

### Contact Form (`/api/contact/`)

#### POST `/api/contact/`
Submit contact form with spam protection.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon."
}
```

## 🔒 Security Features

### Rate Limiting
- GitHub endpoints: 30 requests/hour
- Contact form: 5 submissions/hour per IP

### Input Validation
- Email format validation
- HTML/script injection prevention
- Spam domain blocking
- Honeypot field protection

### CORS Protection
- Configured allowed origins
- Credential support for authenticated requests

## 📊 Caching Strategy

### GitHub API Caching
- Repository data: 1 hour TTL
- User statistics: 2 hours TTL
- Automatic cache invalidation
- Manual refresh endpoint

### Implementation
```python
from django.core.cache import cache

# Cache data
cache.set('github_repos_username', data, 3600)

# Retrieve cached data
cached_data = cache.get('github_repos_username')
```

## 🛠️ Development

### Running Tests
```bash
python manage.py test
```

### Database Operations
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations  
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Admin Interface
Access Django admin at `/admin/` to view:
- Contact form submissions
- User management
- System configuration

## 🚀 Deployment

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Environment Variables
Set these in your deployment platform:
```bash
SECRET_KEY=production-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.railway.app
DATABASE_URL=postgresql://...
GITHUB_TOKEN=your-token
GITHUB_USERNAME=your-username
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Production Checklist
- [ ] Set `DEBUG=False`
- [ ] Configure production database
- [ ] Set secure `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up CORS for frontend domain
- [ ] Configure static files serving
- [ ] Set up SSL/HTTPS

## 📈 Monitoring & Logging

### Logging Configuration
- Console output for development
- Structured logging for production
- GitHub API request logging
- Contact form submission tracking

### Health Checks
- `/health/` - Basic health check
- `/api/github/health/` - GitHub integration status

## 🔧 Customization

### Adding New Endpoints
1. Create views in appropriate app
2. Add URL patterns
3. Implement serializers
4. Add tests

### Custom GitHub Integration
Modify `github_api/services.py` to:
- Change repository filtering
- Add new statistics
- Customize caching behavior

### Contact Form Customization
Extend `core/models.py` and `core/serializers.py` to:
- Add new form fields
- Customize validation
- Add email notifications

## 🤝 API Integration

### Frontend Integration
```typescript
// API client example
const apiClient = {
  async getRepositories() {
    const response = await fetch('/api/github/repos/')
    return response.json()
  },
  
  async submitContact(data) {
    const response = await fetch('/api/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
```

### Error Handling
All endpoints return consistent error format:
```json
{
  "success": false,
  "error": "Error type",
  "message": "Human readable message",
  "status_code": 400
}
```

---

Built with ❤️ using Django REST Framework