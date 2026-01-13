"use client"

import { motion } from "framer-motion"
import { SKILLS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const skillCategories = {
  frontend: { name: "Frontend", color: "from-blue-500 to-cyan-500" },
  backend: { name: "Backend", color: "from-green-500 to-emerald-500" },
  database: { name: "Database", color: "from-purple-500 to-violet-500" },
  tools: { name: "Tools", color: "from-orange-500 to-red-500" },
  cloud: { name: "Cloud", color: "from-pink-500 to-rose-500" },
}

export function Skills() {
  const groupedSkills = SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof SKILLS>)

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-width section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I work with modern technologies to build scalable and performant applications
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {Object.entries(groupedSkills).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-lg p-6"
            >
              <div className="flex items-center mb-6">
                <div className={cn(
                  "w-3 h-3 rounded-full bg-gradient-to-r mr-3",
                  skillCategories[category as keyof typeof skillCategories]?.color
                )} />
                <h3 className="text-xl font-semibold">
                  {skillCategories[category as keyof typeof skillCategories]?.name}
                </h3>
              </div>

              <div className="space-y-4">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
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
                              ? `bg-gradient-to-r ${skillCategories[category as keyof typeof skillCategories]?.color}`
                              : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}