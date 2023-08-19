import { SignedIn, SignOutButton, OrganizationSwitcher } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";
import { dark } from "@clerk/themes";

export const Header = () => {
  return (
    <nav className='fixed top-0 z-30 flex w-full items-center justify-between bg-bgDark1 px-6 py-3 text-text'>
      <Link href="/" className='flex gap-2 items-center'>
          <FaFacebookF className="text-2xl"/>
          <p 
          className='text-lg font-bold max-sm:hidden'
          >Jolly</p>
      </Link>

      <div className='flex items-center gap-2'>
        <div>
          <SignedIn>
            {/* @ts-ignore */}
            <SignOutButton className="md:hidden rounded-md px-3 py-1.5 cursor-pointer">
              <Image src="/logout.svg" height={60} width={60} alt='logout' title='Logout' className='object-cover'/>
            </SignOutButton>
          </SignedIn>
        </div>
      <div className='ml-2'>
        <OrganizationSwitcher
        appearance={{
          baseTheme: dark,
          elements:{
            organizationSwitcherTrigger: "px-4 py-2"
          }
        }}
        />
      </div>
        
      </div>
    </nav>
  )
}
