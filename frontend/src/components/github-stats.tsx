"use client"

import { motion } from "framer-motion"
import { Star, GitFork, Code, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { GitHubStats as GitHubStatsType } from "@/types"
import { apiClient } from "@/lib/api"

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.getGitHubStats()
        if (response.success) {
          setStats(response.data)
        } else {
          // Set default stats structure if API fails
          setStats({
            total_repos: 0,
            total_stars: 0,
            total_forks: 0,
            languages: []
          })
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
        // Set default stats structure on error
        setStats({
          total_repos: 0,
          total_stars: 0,
          total_forks: 0,
          languages: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    delay 
  }: { 
    icon: any
    label: string
    value: string | number
    delay: number
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="elevated rounded-lg p-6 text-center hover-lift"
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >          <h2 className="heading-section text-3xl sm:text-4xl mb-6">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into my development activity and contributions
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-lg p-6 text-center animate-pulse">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted" />
                <div className="h-6 bg-muted rounded mb-1" />
                <div className="h-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              <StatCard 
                icon={Code} 
                label="Public Repositories" 
                value={stats.total_repos || 0}
                delay={0.1}
              />
              <StatCard 
                icon={Star} 
                label="Total Stars" 
                value={stats.total_stars || 0}
                delay={0.2}
              />
              <StatCard 
                icon={GitFork} 
                label="Total Forks" 
                value={stats.total_forks || 0}
                delay={0.3}
              />
              <StatCard 
                icon={TrendingUp} 
                label="Languages Used" 
                value={stats.languages?.length || 0}
                delay={0.4}
              />
            </div>

            {stats.languages && stats.languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-6 text-center">
                  Most Used Languages
                </h3>
                <div className="space-y-4">
                  {stats.languages.slice(0, 5).map((language, index) => (
                    <motion.div
                      key={language.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: language.color }}
                        />
                        <span className="text-sm font-medium">{language.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${language.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: language.color }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {language.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Unable to load GitHub statistics at this time.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}