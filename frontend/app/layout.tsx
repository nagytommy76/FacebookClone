import { Metadata } from 'next'
import { Work_Sans } from '@next/font/google'

const work = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Facebook Clone',
   description: 'Hobby project, cloning facebook',
   keywords: ['hobby project', 'next.js 13+', 'facebook clone application'],
   authors: [{ name: 'Nagy Tamás', url: 'https://nagytamas93.hu/' }],
   icons: '/facebook-96.svg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html className={work.className} lang='hu'>
         <head />
         <body>{children}</body>
      </html>
   )
}
