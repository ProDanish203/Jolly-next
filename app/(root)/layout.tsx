import { ClerkProvider } from '@clerk/nextjs/app-beta'
import '../globals.css'
import type { Metadata } from 'next'
import { Footer, Header, LeftSidebar, RightSidebar } from '@/components/shared'


export const metadata: Metadata = {
  title: 'Jolly | Joining Everyone',
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
        <body>
          <Header/>

          <main className='flex flex-row '>
            <LeftSidebar/>

              <section className='flex min-h-screen flex-1 flex-col items-center bg-bg px-6 pb-10 pt-28 max-md:pb-32 sm:px-10'>
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
