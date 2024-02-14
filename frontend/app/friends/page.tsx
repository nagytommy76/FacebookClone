import FriendsComponent from '@/components/Friends/Friends'
import { IFriendsResponse } from '@/components/Friends/Types'

async function getAllUsers(): Promise<IFriendsResponse[]> {
   const res = await fetch('http://localhost:5050/api/friends/get-friends')
   if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Nem sikerült betölteni az ismerősöket')
   }
   return await res.json()
}

const page = async () => {
   const allUsers = await getAllUsers()
   return <FriendsComponent friends={allUsers} />
}

export default page
