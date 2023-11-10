import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/Components/Navbar/Navbar'
import { Links } from '@/Components/Navbar/Links'
import { Footer } from '@/Components/Footer/Footer'
import { StatusContextProvider } from '@/Utils/statusContext'

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Salla Shop',
  description: 'Welcome to Salla Shop – Your One-Stop Destination for All Your Shopping Needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
      <StatusContextProvider>
        <Navbar />
        <Links />
        {children}
        <Footer />
      </StatusContextProvider>
      </body>
    </html>
  )
}
