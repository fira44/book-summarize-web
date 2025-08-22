'use client'

import { useState } from 'react'
import Link from 'next/link'
import {FileText} from 'lucide-react'

export default function Navbar() {

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-foreground">SummarizeAI</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}