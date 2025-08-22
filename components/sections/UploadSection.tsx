'use client'

import { useState, useCallback, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Upload, Link, FileText, Globe, CreditCard, Headphones } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import Modal from '../modal'
import axios from 'axios';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code : 'tr', name : 'Turkish'}
]

export default function UploadSection() {
  const [url, setUrl] = useState('')
  const [language, setLanguage] = useState('en')
  const [customPrompt, setCustomPrompt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [generateAudio, setGenerateAudio] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pdfRef = useRef<string>('')
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.type === 'application/pdf') {
        handleFileUpload(file)
      } else {
        toast.error('Please upload a PDF file')
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await fetch("/api/get-pdf", {
        method: "POST",
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      console.log(data);
      console.log("Scraped PDF text:", data.text);
      pdfRef.current = data.text;
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  
  

  const handleUrlSubmit = async () => {
    if (!url) {
      toast.error('Please enter a valid URL')
      return
    }
    
    setUploading(true)
    try {
      const result = await fetch('/api/extract-url',{
        method : 'POST',
        body : JSON.stringify({url})
      })
      if (!result.ok) throw new Error("Fetching URL failed");
      const data = await result.json();
      if (data){
        pdfRef.current = data.text;
      }
      console.log(pdfRef.current)
      toast.success('URL processed successfully! Generating summary...')
      setUrl('')
    } catch (error) {
      toast.error('Fetching URL failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }
  const handleGenerate = () => {
    setIsModalOpen(true);
  }

  return (
    <section id="upload" className="py-20 bg-gradient-to-br from-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Start Summarizing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 ml-3">
              Now
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload your PDF or paste an article URL to get started
          </p>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Upload className="mr-2 h-5 w-5 text-primary" />
              Upload Content
            </CardTitle>
            <CardDescription>
              Choose your content source and customize your summary preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/20">
                <TabsTrigger value="upload" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  Upload PDF
                </TabsTrigger>
                <TabsTrigger value="url" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Link className="mr-2 h-4 w-4" />
                  Article URL
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  {isDragActive ? (
                    <p className="text-lg font-medium text-foreground">Drop your PDF here...</p>
                  ) : (
                    <div>
                      <p className="text-lg font-medium mb-2 text-foreground">
                        Drag & drop your PDF here, or click to select
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF files up to 50MB
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-foreground">Article URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-background/50 border-border"
                  />
                </div>
                <Button onClick={handleUrlSubmit} disabled={uploading} className="w-full bg-primary hover:bg-primary/90">
                  {uploading ? 'Processing...' : 'Process URL'}
                </Button>
              </TabsContent>
            </Tabs>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-border">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-foreground">Summary Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-background/50 border-border">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>axios
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center">
                            <Globe className="mr-2 h-4 w-4" />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prompt" className="text-foreground">Custom Instructions (Optional)</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Focus on key findings, methodology, etc..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={3}
                    className="bg-background/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border bg-card/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-foreground font-medium">Add MP3 Audio</div>

                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="checkbox"
                      id="audio"
                      checked={generateAudio}
                      onChange={(e) => setGenerateAudio(e.target.checked)}
                      className="rounded border-border cursor-pointer"
                    />
                    <Label htmlFor="audio" className="text-sm text-muted-foreground cursor-pointer">
                      Generate high-quality MP3 audio file
                    </Label>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Headphones className="mr-1 h-3 w-3" />
                    Natural voice in selected language
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <Button className="w-full mt-3 bg-primary text-muted hover:bg-primary/90" onClick={handleGenerate} disabled={uploading || !pdfRef.current}>
                    {uploading ? 'Processing...' : `Generate`}
                  </Button>
                </div>
                {isModalOpen && <Modal language={language} pdf={pdfRef.current} setIsModalOpen={setIsModalOpen} />}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}