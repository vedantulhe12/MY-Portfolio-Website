import { Skill, Experience, Project } from '@/types'

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', level: 5 },
  { name: 'Next.js', category: 'frontend', level: 5 },
  { name: 'TypeScript', category: 'frontend', level: 4 },
  { name: 'Vue.js', category: 'frontend', level: 4 },
  { name: 'Tailwind CSS', category: 'frontend', level: 5 },
  { name: 'Framer Motion', category: 'frontend', level: 4 },
  
  // Backend
  { name: 'Node.js', category: 'backend', level: 4 },
  { name: 'Python', category: 'backend', level: 5 },
  { name: 'Django', category: 'backend', level: 5 },
  { name: 'Express.js', category: 'backend', level: 4 },
  { name: 'FastAPI', category: 'backend', level: 4 },
  { name: 'GraphQL', category: 'backend', level: 3 },
  
  // Database
  { name: 'PostgreSQL', category: 'database', level: 4 },
  { name: 'MongoDB', category: 'database', level: 4 },
  { name: 'Redis', category: 'database', level: 3 },
  { name: 'Prisma', category: 'database', level: 4 },
  
  // Tools & Cloud
  { name: 'Docker', category: 'tools', level: 4 },
  { name: 'Git', category: 'tools', level: 5 },
  { name: 'AWS', category: 'cloud', level: 4 },
  { name: 'Vercel', category: 'cloud', level: 5 },
  { name: 'Railway', category: 'cloud', level: 4 },
]

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Company Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: [
      'Led development of customer-facing web applications using React, Next.js, and Node.js',
      'Architected and implemented microservices backend with Python and Django REST Framework',
      'Improved application performance by 40% through code optimization and caching strategies',
      'Mentored junior developers and established code review processes'
    ],
    tech: ['React', 'Next.js', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'AWS']
  },
  {
    id: '2',
    title: 'Full-Stack Developer',
    company: 'Startup XYZ',
    location: 'Remote',
    period: '2020 - 2022',
    description: [
      'Built and maintained web applications for e-commerce platform serving 100k+ users',
      'Developed RESTful APIs and integrated third-party services for payment processing',
      'Implemented automated testing and CI/CD pipelines using GitHub Actions',
      'Collaborated with design team to create responsive, accessible user interfaces'
    ],
    tech: ['Vue.js', 'Express.js', 'MongoDB', 'Stripe API', 'Docker', 'Digital Ocean']
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'New York, NY',
    period: '2019 - 2020',
    description: [
      'Developed responsive websites and web applications for various clients',
      'Converted design mockups to pixel-perfect, interactive user interfaces',
      'Optimized websites for performance, SEO, and accessibility',
      'Collaborated with backend developers to integrate APIs and dynamic content'
    ],
    tech: ['JavaScript', 'React', 'SCSS', 'WordPress', 'PHP', 'MySQL']
  }
]

export const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.',
    image: '/projects/ecommerce.jpg',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    github: 'https://github.com/username/ecommerce-platform',
    demo: 'https://ecommerce-demo.vercel.app',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates, team workspaces, and advanced filtering.',
    image: '/projects/taskapp.jpg',
    tech: ['React', 'Firebase', 'TypeScript', 'Framer Motion'],
    github: 'https://github.com/username/task-manager',
    demo: 'https://taskapp-demo.vercel.app',
    featured: true
  },
  {
    id: '3',
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with real-time metrics, customizable charts, and export functionality.',
    image: '/projects/analytics.jpg',
    tech: ['Vue.js', 'D3.js', 'Python', 'Django', 'Chart.js'],
    github: 'https://github.com/username/analytics-dashboard',
    demo: 'https://analytics-demo.vercel.app',
    featured: true
  }
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'your.email@example.com',
}

export const PERSONAL_INFO = {
  name: 'Vedant Ulhe',
  title: 'Full-Stack Developer',
  bio: 'Passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Next.js, Node.js, and Python, with a focus on creating scalable, user-centered solutions.',
  location: 'San Francisco, CA',
  resumeUrl: '/resume.pdf',
}