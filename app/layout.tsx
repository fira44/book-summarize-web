import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TanstackProvider from './providers/tanstack-provider';

const inter = Inter({ subsets: ['latin'] });

// Create a new QueryClient instance

export const metadata: Metadata = {
  title: 'SummarizeAI - AI-Powered PDF & Article Summarization',
  description: 'Transform your PDFs and articles into concise summaries. Pay only for what you use with optional MP3 audio generation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <TanstackProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </TanstackProvider>
      </body>
    </html>
  );
}
