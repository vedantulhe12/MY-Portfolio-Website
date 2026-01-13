import { Hero } from '@/components/hero'
import { Skills } from '@/components/skills'
import { FeaturedProjects } from '@/components/featured-projects'
import { GitHubStats } from '@/components/github-stats'
import { CallToAction } from '@/components/call-to-action'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="border-t border-border/20 mx-auto w-24" />
      <Skills />
      <div className="border-t border-border/20 mx-auto w-24" />
      <FeaturedProjects />
      <div className="border-t border-border/20 mx-auto w-24" />
      <GitHubStats />
      <div className="border-t border-border/20 mx-auto w-24" />
      <CallToAction />
    </div>
  )
}