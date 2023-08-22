import { currentUser } from '@clerk/nextjs';
import { fecthUser } from "@/lib/actions/user.actions";
import { PostsTab, ProfileHeader } from '@/components/shared';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

const Profile = async ({ params }: {params: {id: string}}) => {

  const profileTabs = [
    {name: 'Posts', value: "posts", icon: "far fa-comment-dots"},
    {name: 'Replies', value: "replies", icon: "far fa-user"},
    {name: 'Tagged', value: "tagged", icon: "fas fa-tags"},
  ]

  const {id} = params;
  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fecthUser(id); 

  return (
    <>
    <section className=''>
        <ProfileHeader 
        accountId={userInfo.id}
        userId={user?.id}
        username={userInfo.username}
        name={userInfo.name}
        image={userInfo.image}
        bio={userInfo.bio}
        />

        <div className='mt-5'>
        <Tabs defaultValue='posts' className='w-full'>
          <TabsList className='flex min-h-[50px] flex-1 items-center gap-3 bg-bgDark1 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-gray-700 !important'>
          {profileTabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.value} className='flex min-h-[50px] flex-1 items-center gap-3 bg-bgDark1 data-[state=active]:bg-primary data-[state=active]:text-text !important'>
              <i className={`${tab.icon} text-lg`}></i>
              <p className='text-xl max-sm:text-lg max-xs:hidden'>{tab.name}</p>
              {tab.name === "Posts" && (
                <p className='text-text p-1 px-2 text-sm   rounded-md bg-gray-900'>
                  {userInfo?.posts?.length}
                </p>
              )}
            </TabsTrigger>
          ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.name}`} value={tab.value} className='w-full text-text'>
              <PostsTab
              currentUserId={user.id}
              profileId={userInfo.id}
              accountType="User"
              />
            </TabsContent>
          ))}
          

        </Tabs>
        </div>
    </section>
    </>
  )
}

export default Profile;