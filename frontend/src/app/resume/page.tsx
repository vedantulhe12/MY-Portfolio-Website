import { Metadata } from 'next'
import { ResumeViewer } from '@/components/resume-viewer'
import { ResumeSummary } from '@/components/resume-summary'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Download my resume or view my professional experience and qualifications.',
}

export default function ResumePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my professional experience, skills, and qualifications.
          </p>
        </div>
        
        <ResumeSummary />
        <ResumeViewer />
      </div>
    </div>
  )
}