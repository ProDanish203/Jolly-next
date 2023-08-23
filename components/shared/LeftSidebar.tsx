"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';
import { navLinks } from "@/utils/data";

export const LeftSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const {userId} = useAuth();

  return (
    <section className='leftSidebar z-20 w-fit border-r-2 border-r-accentBg bg-bgDark1 pb-5 pt-28 max-md:hidden'>
      <div className="relative flex lg:w-full flex-1 flex-col gap-4 lg:px-6">
        {navLinks.map((link) => {
          const isActive = (pathName.includes(link.title) && link.path.length > 1) || pathName === link.path
          if(link.path === "/profile") link.path = `/profile/${userId}`

          return (
            <Link href={link.path} key={link.title}
            className={`${isActive && "bg-primary"} relative flex lg:justify-start justify-center items-center gap-2 rounded-lg px-3 lg:pr-6 py-3 w-full `}
            >
              <i className={`${link.icon} text-text text-lg`}></i>
              <p className="max-lg:hidden text-text text-lg">{link.title}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10 px-4">
      <SignedIn>
            {/* @ts-ignore */}
            <SignOutButton 
            signOutCallback={() => router.push('/sign-in')}
            >
              <div className="rounded-md px-3 py-1.5 cursor-pointer w-full flex gap-2 items-center">
                <Image src="/logout.svg" height={28} width={28} alt='logout' title='Logout' className='object-cover'/>

                <p className="text-text max-lg:hidden">Logout</p>
              </div>

            </SignOutButton>
          </SignedIn>
      </div>
    </section>
  )
}
