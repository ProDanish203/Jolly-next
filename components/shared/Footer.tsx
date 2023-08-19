"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";

export const Footer = () => {

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
    <section className='fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden'>
      <div className='flex items-center justify-between gap-3 xs:gap-5'>
      {sideBarLinks.map((link) => {
        const isActive = (pathName.includes(link.title) && link.path.length > 1) || pathName === link.path;

        return (
          <Link href={link.path} key={link.title}
          className={`${isActive && "bg-primary"} relative flex flex-col items-center gap-1 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5`}
          >
            <Image src={link.icon} height={28} width={28} alt={link.title}/>

            <p
            className="text-sm text-text max-sm:hidden"
            >{link.title.split(/\s+/)[0]}</p>
          </Link>
        )
      })}
      </div>
    </section>
  )
}
