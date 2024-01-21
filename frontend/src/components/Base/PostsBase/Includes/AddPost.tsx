import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/reduxStore/store'
import type { IPost } from '@/types/PostTypes'

import AddPostSkeleton from '@/Skeletons/AddPostSkeleton/AddPostSkeleton'

const AddPostComponent = dynamic(() => import('../../../Posts/HandlePosts/AddPost/AddPost'), {
   loading: () => <AddPostSkeleton />,
})

const AddPost: React.FC<{ addNewPost: (newPost: IPost) => void }> = ({ addNewPost }) => {
   const { userId } = useParams() as { userId: string | undefined }
   const loggedInUserId = useAppSelector((state) => state.auth.userId)
   if (!userId) {
      return <AddPostComponent addNewPost={addNewPost} />
   } else {
      if (loggedInUserId == userId) {
         return <AddPostComponent addNewPost={addNewPost} />
      } else return null
   }
}

export default AddPost
