# Modern Full-Stack Portfolio

A professional portfolio website built with Next.js and Django, featuring real-time GitHub integration and a clean, modern design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ and pip
- Git

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.local.example .env
# Edit .env with your GitHub token
python manage.py migrate
python manage.py runserver
```

Visit http://localhost:3000 to see the portfolio!

## 📁 Project Structure

```
Portfolio/
├── frontend/          # Next.js React application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/# Reusable components
│   │   ├── lib/       # Utilities and API client
│   │   └── types/     # TypeScript definitions
│   └── public/        # Static assets
├── backend/           # Django REST API
│   ├── portfolio_api/ # Django project
│   ├── github_api/    # GitHub integration
│   └── core/          # Contact form handling
└── README.md
```

## 🎯 Features

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive Design** mobile-first
- **SEO Optimized** with metadata
- **Dark Theme** as default

### Backend
- **Django REST Framework** API
- **GitHub Integration** with caching
- **Contact Form** with spam protection
- **Rate Limiting** and security
- **Environment Configuration**
- **Production Ready** deployment

### Pages
- **Home**: Hero, skills, featured projects, GitHub stats
- **Projects**: All repositories with filtering
- **About**: Experience timeline, tech stack
- **Resume**: PDF download, summary
- **Contact**: Working contact form

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Backend (.env)
```bash
SECRET_KEY=your-secret-key
DEBUG=True
GITHUB_TOKEN=your-github-token
GITHUB_USERNAME=your-username
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Customization

#### Personal Information
Edit `frontend/src/lib/constants.ts`:
- Update `PERSONAL_INFO` with your details
- Modify `SOCIAL_LINKS` with your profiles
- Customize `EXPERIENCE` with your work history
- Adjust `SKILLS` with your technologies

#### GitHub Integration
1. Get a GitHub Personal Access Token
2. Set `GITHUB_TOKEN` and `GITHUB_USERNAME` in backend `.env`
3. The API will automatically fetch your repositories and stats

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL
   - `NEXT_PUBLIC_SITE_URL`: Your frontend URL
3. Deploy automatically

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables from `.env.production.example`
3. Add PostgreSQL database
4. Deploy with auto-migrations

## 📱 API Endpoints

### GitHub Integration
- `GET /api/github/repos/` - Get repositories
- `GET /api/github/stats/` - Get GitHub stats
- `POST /api/github/refresh/` - Refresh cache

### Contact Form
- `POST /api/contact/` - Submit contact form
- `GET /api/contact/info/` - Get form configuration

## 🎨 Customization Guide

### Colors & Theming
The portfolio uses a dark-first design with customizable colors in:
- `tailwind.config.js` - Tailwind theme
- `globals.css` - CSS custom properties
- Components use semantic color classes

### Content Management
All content is managed through constants:
- `constants.ts` - Personal info, experience, skills
- Easy to update without touching components
- Type-safe with TypeScript

### Adding New Sections
1. Create component in `src/components/`
2. Add to appropriate page in `src/app/`
3. Update types in `src/types/` if needed

## 🔒 Security Features

- **Rate Limiting** on API endpoints
- **CORS Protection** configured
- **Input Validation** on forms
- **Spam Protection** on contact form
- **Security Headers** configured
- **Environment Variables** for secrets

## 📊 Performance

- **Server Components** for optimal rendering
- **Image Optimization** with Next.js
- **API Caching** to reduce GitHub requests
- **Bundle Analysis** with Webpack Bundle Analyzer
- **Core Web Vitals** optimized

## 🛠️ Development Scripts

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

### Backend
```bash
python manage.py runserver      # Development server
python manage.py migrate        # Run migrations
python manage.py createsuperuser # Create admin user
python manage.py collectstatic   # Collect static files
```

## 🤝 Contributing

This is a personal portfolio template, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Inspiration

Built with modern web development best practices:
- Component-driven development
- API-first architecture
- Mobile-first responsive design
- Performance optimization
- SEO and accessibility
- Clean, maintainable code

---

**Happy coding!** 🎉