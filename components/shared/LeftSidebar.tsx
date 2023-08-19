"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from '@clerk/nextjs';

export const LeftSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const sideBarLinks = [
    {
      title: "Home",
      path: "/",
      icon: "/logout.svg"
    },
    {
      title: "About",
      path: "/about",
      icon: "/logout.svg"
    }
  ]

  return (
    <section className='sticky left-0 top-0 z-20 flex h-screen lg:max-w-[250px] lg:w-full max-lg:w-fit flex-col justify-between overflow-auto border-r-2 border-r-accentBg bg-bgDark1 pb-5 pt-28 max-md:hidden'>
      <div className="relative flex w-full flex-1 flex-col gap-2 px-6">
        {sideBarLinks.map((link) => {
          const isActive = (pathName.includes(link.title) && link.path.length > 1) || pathName === link.path

          return (
            <Link href={link.path} key={link.title}
            className={`${isActive && "bg-primary"} relative flex justify-start gap-1 rounded-lg px-3 lg:pr-6 py-3 w-full `}
            >
              <Image src={link.icon} height={28} width={28} alt={link.title}/>
              <p className="max-lg:hidden text-text">{link.title}</p>
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
