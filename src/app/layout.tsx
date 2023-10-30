import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
          <html className={inter.className} lang="en">
            <body className={'h-screen w-screen'} >
                {children}
            </body>
          </html>
      </ClerkProvider>

  )
}
