import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jolly | Join Now',
  description: `A social media platform where users can create posts and interact with other people thorugh commentig and liking other user's post`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
        <body className='bg-bg'>
          <div className='min-h-screen w-screen flex justify-center items-center'>
            {children}
          </div>
        </body>
        </html>
    </ClerkProvider>
  )
}
