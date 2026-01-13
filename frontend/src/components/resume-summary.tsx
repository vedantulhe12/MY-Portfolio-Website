"use client"

import { motion } from "framer-motion"
import { Download, ExternalLink, Calendar, MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PERSONAL_INFO, SOCIAL_LINKS, EXPERIENCE, SKILLS } from "@/lib/constants"

export function ResumeSummary() {
  const topSkills = SKILLS
    .filter(skill => skill.level >= 4)
    .sort((a, b) => b.level - a.level)
    .slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-8 mb-12"
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Header */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{PERSONAL_INFO.name}</h2>
              <p className="text-xl text-muted-foreground mb-2">{PERSONAL_INFO.title}</p>
              <p className="text-muted-foreground">{PERSONAL_INFO.location}</p>
            </div>
            
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" asChild>
  <a
    href={`mailto:${SOCIAL_LINKS.email}?subject=Portfolio%20Inquiry`}
  >
    <Mail className="mr-2 h-4 w-4" />
    Email
  </a>
</Button>

<Button variant="ghost" asChild>
  <a
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}&su=Portfolio%20Inquiry&body=Hi%20Vedant,%0D%0A%0D%0AI%20came%20across%20your%20portfolio.`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Open in Gmail
  </a>
</Button>


            </div>
          </div>
          
          <p className="text-muted-foreground leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-primary" />
              <a 
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {SOCIAL_LINKS.email}
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a 
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a 
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub Profile
              </a>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{PERSONAL_INFO.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Skills */}
      <div className="mt-8 pt-8 border-t border-border">
        <h3 className="text-lg font-semibold mb-4">Core Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <span
              key={skill.name}
              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="grid gap-4 sm:grid-cols-3 text-center">
          <div>
            <div className="text-2xl font-bold">4+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{EXPERIENCE.length}</div>
            <div className="text-sm text-muted-foreground">Professional Roles</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{SKILLS.length}+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}