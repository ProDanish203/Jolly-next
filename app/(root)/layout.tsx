import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Footer, Header, LeftSidebar, RightSidebar } from '@/components/shared'


export const metadata: Metadata = {
  title: 'Jolly | Joining Everyone',
  description: `A social media platform where users can create posts and interact with other people thorugh commentig and liking other user's post`,
  icons: {
    icon: [
      '/favicon.ico?v=1'
    ],
    apple: [
      '/apple-touch-icon.png?v=1' 
    ],
    shortcut:[
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
        <body>
          <Header/>

          <main className='flex'>
            <LeftSidebar/>

              <section className='main-container min-h-screen flex flex-col items-center bg-bg px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
                <div className='w-full max-w-4xl'>
                  {children}
                </div>
              </section>

            <RightSidebar/>
          </main>
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  )
}
