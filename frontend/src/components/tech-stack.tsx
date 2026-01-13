"use client"

import { motion } from "framer-motion"
import { SKILLS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const categoryInfo = {
  frontend: { 
    name: "Frontend", 
    color: "from-blue-500 to-cyan-500",
    description: "Building beautiful, responsive user interfaces"
  },
  backend: { 
    name: "Backend", 
    color: "from-green-500 to-emerald-500",
    description: "Creating scalable server-side applications"
  },
  database: { 
    name: "Database", 
    color: "from-purple-500 to-violet-500",
    description: "Designing and optimizing data storage solutions"
  },
  tools: { 
    name: "Tools & DevOps", 
    color: "from-orange-500 to-red-500",
    description: "Streamlining development and deployment workflows"
  },
  cloud: { 
    name: "Cloud & Infrastructure", 
    color: "from-pink-500 to-rose-500",
    description: "Deploying and scaling applications in the cloud"
  },
}

export function TechStack() {
  const groupedSkills = SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof SKILLS>)

  return (
    <section className="py-20">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => {
            const categoryData = categoryInfo[category as keyof typeof categoryInfo]
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="glass rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-gradient-to-r mr-4",
                    categoryData.color
                  )} />
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {categoryData.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {categoryData.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-background/50 rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 0.2, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.05 + i * 0.02 
                              }}
                              className={cn(
                                "w-2 h-2 rounded-full",
                                i < skill.level
                                  ? `bg-gradient-to-r ${categoryData.color}`
                                  : "bg-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-muted rounded-full h-1">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.8, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 
                          }}
                          className={cn(
                            "h-1 rounded-full bg-gradient-to-r",
                            categoryData.color
                          )}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Expertise Summary
          </h3>
          
          <div className="grid gap-6 sm:grid-cols-3 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">
                {SKILLS.length}
              </div>
              <div className="text-muted-foreground">
                Technologies
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">
                {Object.keys(groupedSkills).length}
              </div>
              <div className="text-muted-foreground">
                Categories
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold mb-2">
                {SKILLS.filter(skill => skill.level >= 4).length}
              </div>
              <div className="text-muted-foreground">
                Advanced Skills
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}