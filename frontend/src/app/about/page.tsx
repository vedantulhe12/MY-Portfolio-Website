import { Metadata } from 'next'
import { AboutHero } from '@/components/about-hero'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { TechStack } from '@/components/tech-stack'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my background, experience, and the technologies I work with.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <AboutHero />
      <ExperienceTimeline />
      <TechStack />
    </div>
  )
}