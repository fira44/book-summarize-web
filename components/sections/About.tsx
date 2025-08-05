import { FileText, Zap, Globe, Shield, Clock, DollarSign } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'PDF & URL Support',
    description: 'Upload PDFs directly or paste article URLs for instant processing with our advanced AI.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get comprehensive summaries in under 30 seconds with state-of-the-art language models.'
  },
  {
    icon: Globe,
    title: '50+ Languages',
    description: 'Process content and generate summaries in over 50 different languages with high accuracy.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your documents are processed securely and automatically deleted after summarization.'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Reduce reading time by 80% while retaining all key information and insights.'
  },
  {
    icon: DollarSign,
    title: 'Pay Per Use',
    description: 'No monthly subscriptions. Pay only $0.50 per summary, $1.00 extra for MP3 audio.'
  }
]

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Why Choose
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 ml-3">
              SummarizeAI
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven features designed to help you consume more content in less time, 
            with transparent pay-per-use pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto p-8 rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <div className="text-3xl font-bold text-primary mb-2">$0.50</div>
                <div className="text-sm text-muted-foreground">Per Summary</div>
                <div className="text-xs text-muted-foreground mt-1">PDF or URL processing</div>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <div className="text-3xl font-bold text-purple-400 mb-2">+$1.00</div>
                <div className="text-sm text-muted-foreground">MP3 Audio (Optional)</div>
                <div className="text-xs text-muted-foreground mt-1">High-quality voice generation</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              No subscriptions, no hidden fees. Pay only for what you use. 
              Perfect for students, researchers, and professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}