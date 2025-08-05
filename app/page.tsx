'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import UploadSection from '@/components/sections/UploadSection'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <UploadSection />
      <About />
    </main>
  )
}