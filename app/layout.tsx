/** @jsxImportSource react */
import '/styles/globals.css'
import '/styles/prism.css'
import type { Metadata } from 'next'
import ClientProviders from './ClientProviders'

export const metadata: Metadata = {
  metadataBase: new URL('https://antonarbus.com'),
  title: 'Anton Arbus',
  description: 'Blog',
  authors: [{ name: 'Anton Arbus' }],
  openGraph: {
    type: 'website',
    images: ['/favicon.png?v999'],
  },
  icons: {
    icon: '/favicon.png?v999',
    apple: '/favicon.png?v999',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'antonarbus.com',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-TileImage': '/favicon.png?v999',
    'msapplication-TileColor': '#fff',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
