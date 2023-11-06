import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { ModelFournisseur } from '@/fournisseur/model-fournisseur'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChicBlend Dashboard',
  description: 'ChicBlend Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ModelFournisseur/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
