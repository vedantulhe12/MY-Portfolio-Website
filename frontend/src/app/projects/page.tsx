import { Metadata } from 'next'
import { ProjectsGrid } from '@/components/projects-grid'
import { getServerSideRepositories } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects and open-source contributions.',
}

export default async function ProjectsPage() {
  const repositories = await getServerSideRepositories()

  return (
    <div className="min-h-screen py-20">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I've built, ranging from full-stack applications 
            to open-source libraries and tools.
          </p>
        </div>
        
        <ProjectsGrid repositories={repositories} />
      </div>
    </div>
  )
}