"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Clock, MessageSquare } from "lucide-react"
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants"
import Link from "next/link"

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: SOCIAL_LINKS.email,
      href: `mailto:${SOCIAL_LINKS.email}`,
      description: "Send me an email anytime"
    },
    {
      icon: MessageSquare,
      label: "LinkedIn", 
      value: "Connect on LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      description: "Let's connect professionally"
    },
    {
      icon: MapPin,
      label: "Location",
      value: PERSONAL_INFO.location,
      description: "Available for remote work"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "Within 24 hours",
      description: "I'll get back to you quickly"
    }
  ]

  const availability = [
    "Full-time opportunities",
    "Freelance projects", 
    "Consulting work",
    "Open source collaboration",
    "Speaking engagements"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Let's Connect</h2>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            const content = (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">{method.label}</div>
                  <div className="text-muted-foreground text-sm mb-1">{method.value}</div>
                  <div className="text-muted-foreground text-xs">{method.description}</div>
                </div>
              </motion.div>
            )

            return method.href ? (
              <Link 
                key={method.label}
                href={method.href} 
                target={method.href.startsWith('http') ? "_blank" : undefined}
                rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="block hover:scale-105 transition-transform"
              >
                {content}
              </Link>
            ) : (
              content
            )
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass rounded-xl p-8"
      >
        <h3 className="text-xl font-semibold mb-4">Available For</h3>
        <div className="space-y-3">
          {availability.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}