import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vedant Ulhe - Full-Stack Developer',
    template: '%s | Vedant Ulhe - Full-Stack Developer'
  },
  description: 'Full-stack developer specializing in modern web technologies. Building scalable applications with React, Next.js, Node.js, and cloud technologies.',
  keywords: ['full-stack developer', 'web developer', 'react', 'next.js', 'node.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Vedant Ulhe' }],
  creator: 'Vedant Ulhe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vedantulhe.dev',
    title: 'Vedant Ulhe - Full-Stack Developer',
    description: 'Full-stack developer specializing in modern web technologies.',
    siteName: 'Vedant Ulhe Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vedant Ulhe - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedant Ulhe - Full-Stack Developer',
    description: 'Full-stack developer specializing in modern web technologies.',
    images: ['/og-image.jpg'],
    creator: '@vedantulhe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}