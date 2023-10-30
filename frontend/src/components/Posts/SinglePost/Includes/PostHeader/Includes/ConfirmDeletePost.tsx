import React, { useContext, Dispatch, SetStateAction } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import useDeletePost from '../Hooks/useDeletePost'

import ConfirmDelete from '@/Base/ConfirmDelete/ConfirmDelete'

const ConfirmDeletePost: React.FC<{
   isOpen: boolean
   setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({ isOpen, setIsDialogOpen }) => {
   const {
      removeSinglePostById,
      postsReducer: {
         singlePost: { createdAt },
      },
   } = useContext(PostContext)
   const { postDeleteMutation } = useDeletePost(removeSinglePostById)

   const handleDeletePost = () => {
      postDeleteMutation()
   }

   return (
      <ConfirmDelete
         isOpen={isOpen}
         createdAt={createdAt}
         handleCloseAndDelete={handleDeletePost}
         setIsDialogOpen={setIsDialogOpen}
      />
   )
}

export default ConfirmDeletePost
