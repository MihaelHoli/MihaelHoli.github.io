'use client'

import HeroSection from './components/HeroSection'
import SystemArchitecture from './components/SystemArchitecture'
import TechnicalMetrics from './components/TechnicalMetrics'
import ContactSection from './components/ContactSection'
import ProjectTerminal from './components/ProjectTerminal'
import ProjectCards from './components/ProjectCards'

export default function BackendPortfolio() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white overflow-x-hidden">
      <HeroSection />
      <SystemArchitecture />
      <TechnicalMetrics />
      
      {/* Terminal-style project list */}
      <section className="px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-xl font-mono text-green-400 mb-4">$ ls ./projects</h2>
        <ProjectTerminal />
      </section>

      {/* Detailed project cards */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Selected Projects</h2>
        <ProjectCards />
      </section>

      <ContactSection />
    </main>
  )
}
