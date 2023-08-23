import Image from "next/image";
import Link from "next/link";

interface Props{
    id: string;
    name: string;
    username: string;
    image: string;
    userType: string;
}

export const UserCard = ({id, name, username, image, userType}:Props) => {
  return (
    <article className="flex flex-row gap-2 items-center justify-between sm:p-4 py-2">
        
        <div className="flex flex-row items-center gap-4">
            <Link href={`/profile/${id}`} className="relative sm:w-14 sm:h-14 w-10 h-10">
            <Image
            src={image}
            fill
            alt={username}
            className="object-cover rounded-full"
            />
            </Link>

            <div className="flex flex-col gap-1">
              <Link href={`/profile/${id}`}>
                <h3 className="sm:text-lg font-bold text-text">@{username}</h3>
              </Link>
              <p className="text-sm font-semibold text-gray-400">{name}</p>
            </div>
        </div>

        <Link href={`/profile/${id}`}>
          <button className="bg-primary max-xs:hidden px-4 max-sm:text-sm py-2 rounded-md text-text">View</button>
        </Link>

    </article>
  )
}
