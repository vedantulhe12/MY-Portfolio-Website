import { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { ContactInfo } from '@/components/contact-info'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for project collaborations, job opportunities, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-width section-padding">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to collaborate on new projects or discuss opportunities. 
            Let's connect and create something amazing together!
          </p>
        </div>
        
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  )
}