"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Calendar, Code, Users } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/constants"

export function AboutHero() {
  return (
    <section className="py-20">
      <div className="container-width section-padding">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about creating digital experiences that not only look great but also 
                solve real-world problems. My journey in tech started with curiosity about how websites 
                work, and it has evolved into a deep appreciation for clean code, user experience, 
                and innovative solutions.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in continuous learning and staying up-to-date with the latest industry trends.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{PERSONAL_INFO.location}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Experience</div>
                  <div className="text-sm text-muted-foreground">4+ Years</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Code className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Focus</div>
                  <div className="text-sm text-muted-foreground">Full-Stack Development</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 glass rounded-lg">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Collaboration</div>
                  <div className="text-sm text-muted-foreground">Remote & On-site</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/8 rounded-2xl blur-3xl" />
              
              {/* Profile image placeholder - replace with actual image */}
              <div className="relative glass rounded-2xl overflow-hidden aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/8 flex items-center justify-center">
                  <div className="text-8xl font-bold text-muted-foreground/20">
                    {PERSONAL_INFO.name.charAt(0)}
                  </div>
                </div>
                {/* Uncomment and replace with actual image */}
                { <Image
                  src="/profile-photo.jpg"
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover object-[center_35%]"
                  priority
                /> }
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-full backdrop-blur-sm"
              />
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500/20 rounded-full backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
