import Image from "next/image";

interface Params{
  accountId: string;
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
}

export const ProfileHeader = ({
  accountId, userId, username, name, image, bio
}: Params) => {
  return (
    <>
    <div className="flex flex-col w-full gap-4 ">
      <div className="flex items-center justify-start sm:gap-5 gap-3">
        <div className="relative max-sm:w-16 max-sm:h-16  w-20 h-20 rounded-full object-cover">
          <Image src={image} alt={username} fill className="rounded-full object-cover"/>
        </div>

        <div className="flex flex-col">
          <h2 className="sm:text-2xl text-xl font-bold text-text">{name}</h2>
          <h4 className="text-gray-400 max-sm:text-sm">@{username}</h4>
        </div>
      </div>

      <p className="text-text">{bio}</p>

      <div className="mt-5 h-0.5 bg-bgDark1 w-full"/>
    </div>
    </>
  )
}
