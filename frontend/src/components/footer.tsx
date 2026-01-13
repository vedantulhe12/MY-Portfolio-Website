import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { SOCIAL_LINKS, PERSONAL_INFO } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container-width section-padding py-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex flex-col items-center space-y-2 sm:items-start">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              href={SOCIAL_LINKS.github}
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={SOCIAL_LINKS.linkedin}
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}