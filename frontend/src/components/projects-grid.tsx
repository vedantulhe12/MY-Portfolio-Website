"use client"

import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import Image from "next/image"
import { ExternalLink, Github, Calendar, Star, GitFork, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Repository } from "@/types"
import { formatRelativeTime } from "@/lib/utils"

interface ProjectsGridProps {
  repositories: Repository[]
}

export function ProjectsGrid({ repositories }: ProjectsGridProps) {
  const [filter, setFilter] = useState<'all' | 'popular' | 'recent'>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  const languages = useMemo(() => {
    const langs = repositories
      .map(repo => repo.language)
      .filter(Boolean)
      .reduce((acc, lang) => {
        acc[lang!] = (acc[lang!] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    return Object.entries(langs)
      .sort(([,a], [,b]) => b - a)
      .map(([lang]) => lang)
  }, [repositories])

  const filteredRepositories = useMemo(() => {
    let filtered = [...repositories]

    // Apply language filter
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(repo => repo.language === selectedLanguage)
    }

    // Apply type filter
    switch (filter) {
      case 'popular':
        filtered = filtered.filter(repo => repo.stargazers_count > 0)
        filtered.sort((a, b) => b.stargazers_count - a.stargazers_count)
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        break
      default:
        filtered.sort((a, b) => b.stargazers_count - a.stargazers_count)
    }

    return filtered
  }, [repositories, filter, selectedLanguage])

  const ProjectCard = ({ repo, index }: { repo: Repository; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {repo.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            {repo.stargazers_count > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center space-x-1">
                <GitFork className="h-3 w-3" />
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {repo.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {repo.language && (
            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
              {repo.language}
            </span>
          )}
          {repo.topics.slice(0, 2).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 2 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
              +{repo.topics.length - 2}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Updated {formatRelativeTime(repo.updated_at)}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="group/btn"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                Code
              </a>
            </Button>
            {repo.homepage && (
              <Button
                asChild
                size="sm"
                className="group/btn"
              >
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-3 w-3 group-hover/btn:scale-110 transition-transform" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div>
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4 mb-8 p-4 glass rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter by:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(['all', 'popular', 'recent'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filter === filterType
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLanguage('all')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              selectedLanguage === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Languages
          </button>
          {languages.slice(0, 4).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedLanguage === lang
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      {filteredRepositories.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRepositories.map((repo, index) => (
            <ProjectCard key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your filters.</p>
        </div>
      )}

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 glass rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-center">Project Statistics</h3>
        <div className="grid gap-4 sm:grid-cols-3 text-center">
          <div>
            <div className="text-2xl font-bold">{repositories.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Stars</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{languages.length}</div>
            <div className="text-sm text-muted-foreground">Languages Used</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}