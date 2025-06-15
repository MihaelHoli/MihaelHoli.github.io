import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mihael Holi – Web & Game Developer',
  description:
    'Portfolio of Mihael Holi – passionate web and game developer with expertise in AI, simulation, and interdisciplinary digital projects. Explore creative work combining frontend, backend, and Godot/VR simulations.',
  keywords: [
    'Web Developer',
    'Game Developer',
    'Godot',
    'React Native',
    'Vue',
    'AI in browser',
    'TensorFlow.js',
    'face-api.js',
    'Portfolio',
    'Backend',
    'JavaScript',
    'TypeScript',
    'GitHub',
    'Simulation',
    'Education',
    'Creative Developer',
    'Mihael Holi',
  ],
  authors: [{ name: 'Mihael Holi' }],
  creator: 'Mihael Holi',
  openGraph: {
    title: 'Mihael Holi – Web & Game Developer',
    description:
      'Discover the portfolio of Mihael Holi, featuring web, game and AI-powered projects. From browser-based emotion detection to Godot simulations.',
    url: 'https://mihaelholi.github.io',
    siteName: 'Mihael Holi Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mihael Holi – Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mihael Holi – Web & Game Developer',
    description:
      'Explore creative projects in web, game, and AI development. From React Native apps to Godot simulations.',
    creator: '@MihaelHoli',
    images: ['/og-image.jpg'],
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
