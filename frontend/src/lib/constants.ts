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
    title: 'AI Engineer Intern',
    company: 'KaDeep Technologies',
    location: 'Mumbai, India',
    period: 'Jan 2026 - Present',
    description: [
      'Developing and optimizing AI/ML models for production-grade applications',
      'Contributing to model training, evaluation, and deployment pipelines',
      'Performing data preprocessing, feature engineering, and performance tuning',
      'Collaborating with engineering teams to integrate AI solutions into scalable systems',
      'Conducting research and experimentation to improve model accuracy and inference efficiency'
    ],
    tech: [
      'Python',
      'Machine Learning',
      'Deep Learning',
      'Model Deployment',
      'Data Processing',
      'API Integration'
    ]
  },
  {
    id: '2',
    title: 'AI/ML Developer',
    company: 'Accenture',
    location: 'Pune, India',
    period: '2025 - Jan 2026',
    description: [
      'Developed MedScan – an AI-powered prescription recognition system using OCR and NLP techniques',
      'Architected a multi-stage OCR pipeline integrating Mindee API, OCR.Space, PaddleOCR, and EasyOCR with intelligent fallback logic',
      'Implemented NLP-based filtering with fuzzy matching and contextual analysis to extract structured medical data',
      'Achieved 94% OCR accuracy through advanced image preprocessing and multimodal fusion techniques',
      'Built a mobile-first solution using React Native and integrated external medical APIs for drug information retrieval'
    ],
    tech: [
      'Python',
      'OCR (Mindee, PaddleOCR, EasyOCR)',
      'NLP',
      'React Native',
      'K-Means Clustering',
      'API Integration'
    ]
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'Wipro',
    location: 'Pune, India',
    period: '2022 - 2023',
    description: [
      'Developed and maintained scalable REST APIs for enterprise-level applications',
      'Implemented API authentication and authorization mechanisms to ensure secure data exchange',
      'Conducted functional and regression API testing using Postman',
      'Managed API lifecycle including deployment, monitoring, and performance optimization',
      'Collaborated within Agile teams to deliver backend services efficiently'
    ],
    tech: [
      'Node.js / Python',
      'REST APIs',
      'Postman',
      'SQL',
      'Git',
      'Agile'
    ]
  }
]

export const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Storefront',
    description: 'A modern full-stack e-commerce application built using React, TypeScript, and Express.js, featuring secure authentication, product browsing, cart management, checkout flow, and an admin dashboard. The project uses file-based persistent storage for easy development while supporting PostgreSQL for production scalability. It demonstrates clean archite',
    tech: ['React', 'TypeScript', 'shadcn',"Tailwind CSS", 'Express.js', 'passport.js', 'zod', 'PostgreSQL'],
    github: 'https://github.com/vedantulhe12/KaDeep-Technologies-Full-Stack-Intern',
    demo: 'https://kadeep-technologies-full-stack-intern.onrender.com/products',
    featured: true
  },
  {
    id: '2',
    title: 'InternHub',
    description: 'An AI-based internship matching engine that analyzes student profiles and job descriptions to generate skill gap insights, tailored resumes, and ATS-style confidence scores using Gemini 2.0 Flash.',
    tech: ['Django', 'Python', 'SQLite', 'OpenAI API'],
    github: 'https://github.com/vedantulhe12/KaDeep_Technologies_AI_Intern',
    demo: 'https://kadeeptechnologiesaiintern-production.up.railway.app/docs',
    featured: true
  }
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/vedantulhe12',
  linkedin: 'https://www.linkedin.com/in/vedantulhe/',
  twitter: 'https://twitter.com/vedantulhe',
  email: 'ulhevedant@gmail.com',
}
export const PERSONAL_INFO = {
  name: 'Vedant Ulhe',
  title: 'Full-Stack Developer',
  bio: 'Passionate full-stack developer with 4+ years of experience building modern web applications. I specialize in React, Next.js, Node.js, and Python, with a focus on creating scalable, user-centered solutions.',
  location: 'Pune, Maharashtra, India',
  resumeUrl: '/resume.pdf',
}
