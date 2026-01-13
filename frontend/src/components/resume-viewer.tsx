"use client"

import { motion } from "framer-motion"
import { Download, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PERSONAL_INFO } from "@/lib/constants"

export function ResumeViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass rounded-xl p-8"
    >
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="h-12 w-12 text-primary" />
        </div>
        
        <h3 className="text-2xl font-semibold mb-4">Resume Document</h3>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Download my complete resume as a PDF or view it in your browser. 
          Updated regularly with latest experience and skills.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground group"
          >
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Download PDF
            </a>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group"
          >
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              View in Browser
            </a>
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> The PDF includes detailed work history, education, 
            certifications, and project details not shown on this website.
          </p>
        </div>
      </div>
      
      {/* Resume Preview Placeholder */}
      <div className="mt-8 border-2 border-dashed border-border rounded-lg p-8">
        <div className="aspect-[8.5/11] bg-muted/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Resume Preview
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Click "View in Browser" to see the full document
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}