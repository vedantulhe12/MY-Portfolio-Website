# Modern Full-Stack Developer Portfolio

A modern, recruiter-focused portfolio system showcasing skills, projects, and real-time GitHub activity.

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Deployed on Vercel**

### Backend
- **Django** + **Django REST Framework**
- **API-only backend**
- **GitHub API integration**
- **Deployed on Railway/Render**

## 📁 Project Structure

```
Portfolio/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/# Reusable components
│   │   ├── lib/       # Utilities and API clients
│   │   └── types/     # TypeScript type definitions
│   ├── public/        # Static assets
│   └── package.json
├── backend/           # Django REST API
│   ├── portfolio_api/ # Main Django project
│   ├── github_api/    # GitHub integration app
│   ├── core/          # Core utilities
│   └── requirements.txt
└── README.md
```

## 🏗️ Architecture

### Frontend Features
- **Home**: Hero, skills, featured projects, GitHub stats
- **Projects**: Auto-fetched from Django API
- **About**: Bio, experience timeline, tech stack
- **Resume**: PDF download, professional summary
- **Contact**: Server Actions form submission

### Backend Features
- **GitHub API Integration**: Auto-fetch repositories and stats
- **REST API Endpoints**: Clean, typed responses
- **Caching System**: Reduce GitHub API rate limits
- **Environment-based Configuration**: Secure secrets handling

## 🚀 Quick Start

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 📱 Key Features

- **Dark-first Design**: Modern, premium UI
- **Mobile Responsive**: Mobile-first approach
- **SEO Optimized**: Metadata, OpenGraph, sitemap
- **Real-time GitHub Data**: Live repository and stats updates
- **Performance Focused**: Server Components, caching
- **Type Safety**: Full TypeScript implementation

## 🔧 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_github_username
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## 📦 Deployment

### Frontend (Vercel)
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Backend (Railway/Render)
- Connect GitHub repository
- Add environment variables
- Deploy with automatic builds

## 🎯 Portfolio Highlights

This portfolio demonstrates:
- **Full-stack Architecture**: Clean separation of concerns
- **Modern Development Practices**: TypeScript, REST APIs, responsive design
- **Automation**: GitHub integration, real-time data
- **Performance**: Optimized loading, caching, SEO
- **Professional Design**: Recruiter-focused, clean aesthetic

---

Built with ❤️ for modern web development