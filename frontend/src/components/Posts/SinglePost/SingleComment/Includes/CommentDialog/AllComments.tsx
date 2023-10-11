import React, { useContext } from 'react'
import CommentContextProvider from '@/CommentContext/CommentContext'
import { AllCommentsContext } from '@/src/components/Posts/Context/AllCommentsContext'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

import SingleComment from '../../SingleComment'
import Divider from '@mui/material/Divider'

const AllComments: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
   const {
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)
   const {
      commentsReducer: { AllComments },
   } = useContext(AllCommentsContext)

   return (
      <>
         <Divider sx={{ mt: 1, mb: 1 }} />
         {isLoading ? (
            <h1>Töltés...</h1>
         ) : (
            <>
               {AllComments.map((comment) => (
                  <CommentContextProvider key={comment._id} singleComment={comment} postId={_id}>
                     <SingleComment />
                  </CommentContextProvider>
               ))}
            </>
         )}
      </>
   )
}

export default AllComments
