import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getUsers} from '../api/usersApi'
import User from "./User"



const Users = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    getNextPageParam: (_, pages) => {
        if (pages.length < 6) {
            return pages.length + 1
        } else {
            return undefined
        }
    }
  })


  if (isLoading) return <h1 className="text-center text-white py-7">Loading...</h1>
  if (isError) return <h1 className="text-center text-white py-7">Error:{error.message}</h1>



  return (
    <div className="py-10">

        {/*---------Users-List---------*/}
        <div>
            {
                data?.pages.map((group, i) => {
                    return (
                        <React.Fragment key={i}>
                            {
                                group.map(user => <User key={user.id} user={user} />)
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
        
        {/*---------Button---------*/}
        <div>
            {
                hasNextPage && 
                    <button disabled={!hasNextPage} onClick={() => fetchNextPage()} className="bg-white p-2 cursor-pointer">
                        { isFetchingNextPage ? 'Loading More...' : 'Load More' }
                    </button>
            }
        </div>

    </div>
  )
}

export default Users