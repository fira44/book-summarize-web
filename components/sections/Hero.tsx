import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Headphones, Languages, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative py-20 sm:py-32 lg:py-40 bg-gradient-to-br to-primary/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            AI-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-400 ml-3">
              Summarization
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload PDFs or paste article URLs to get intelligent summaries in seconds. 
            Optional MP3 audio generation in multiple languages.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
              <Link href="#upload">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="text-lg px-8 bg-black border-primary/20 hover:border-primary/40">
            <Link href="#about">
            Learn More
            </Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Smart Summaries</h3>
              <p className="text-muted-foreground text-center text-sm">
                AI-powered summaries that capture key insights
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-purple-500/10 mb-4">
                <Headphones className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Audio Generation</h3>
              <p className="text-muted-foreground text-center text-sm">
                Convert summaries to high-quality MP3 files
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
              <div className="p-3 rounded-full bg-purple-400/10 mb-4">
                <Languages className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">Multi-Language</h3>
              <p className="text-muted-foreground text-center text-sm">
                Support for 50+ languages with translation
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}