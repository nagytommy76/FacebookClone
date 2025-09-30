import FriendsComponent from '@/components/Friends/Friends'
import { IFriendsResponse } from '@/components/Friends/Types'

const DEV_URL = process.env.NEXT_PUBLIC_DEV_API_URL
const PRODUCTION_URL = process.env.NEXT_PUBLIC_PROD_API_URL

async function getAllUsers(): Promise<IFriendsResponse[]> {
   const res = await fetch(`${PRODUCTION_URL}/api/friends/get-friends`)
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
