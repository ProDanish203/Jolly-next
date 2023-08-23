import { UserCard } from "@/components/cards";
import { fecthUser, fetchAllUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Search = async () => {

  const currUser = await currentUser();
  if(!currUser) return null;

  const userData = await fecthUser(currUser.id);
  if(!userData.onboarded) redirect('/onboarding');

  const {users, isNext} = await fetchAllUsers({
    userId: currUser?.id,
    searchString: "",
    pageNo: 1,
    limit: 30,
    sortBy: "desc"
  });

  return (
    <section>
        <h1 className='mt-2 mb-5 text-4xl max-sm:text-3xl font-bold text-text'>Search</h1>


        <div className="mt-14 flex flex-col gap-4">
        {users.length === 0 ? (
          <p className="text-text text-xl">No Users Found :&#40;</p>
        ) : (
        <>
        {users.map((user) => (
          <UserCard 
          key={user.id}
          id={user.id}
          name={user.name}
          username={user.username}
          image={user.image}
          userType="User"
          />
        )
        )}
        
        </>
        )}
        </div>

    </section>
  )
}

export default Search;