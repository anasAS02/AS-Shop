import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/Components/Navbar/Navbar'

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Apple Clone',
  description: 'Apple Website Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <Navbar />
      {children}</body>
    </html>
  )
}
