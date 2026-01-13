import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { FeaturedProjects } from '@/components/featured-projects'
import { GitHubStats } from '@/components/github-stats'
import { CallToAction } from '@/components/call-to-action'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <GitHubStats />
      <CallToAction />
    </div>
  )
}