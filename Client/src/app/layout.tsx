import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/Components/Navbar/Navbar'
import { Links } from '@/Components/Navbar/Links'
import { Footer } from '@/Components/Footer/Footer'
import { StatusContextProvider } from '@/Utils/Status/statusContext'
import { CartContextProvider } from './Cart/CartContext'

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'AS Shop',
  description: 'Welcome to AS Shop – Your One-Stop Destination for All Your Shopping Needs',
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
        <CartContextProvider>
          <Navbar />
          <Links />
          {children}
          <Footer />
        </CartContextProvider>
      </StatusContextProvider>
      </body>
    </html>
  )
}
