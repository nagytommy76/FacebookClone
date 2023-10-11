import React, { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

import Dialog from '@mui/material/Dialog'

import SinglePost from '../../../SinglePost'
import AddComment from '../../../AddComment/AddComment'
import AllCommentsComponent from './AllComments'
import useGetComments from './Hook/useGetComments'

const CommentDialog: React.FC<{
   onCloseFn: () => void
   children: React.ReactNode
   commentRef: React.MutableRefObject<null>
   isDialogOpen: boolean
}> = ({ onCloseFn, isDialogOpen, commentRef, children }) => {
   const {
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)
   const isLoading = useGetComments(_id, isDialogOpen)

   return (
      <Dialog
         maxWidth='xl'
         scroll='body'
         sx={{ width: '100%', margin: 'auto' }}
         open={isDialogOpen}
         onClose={onCloseFn}
         aria-labelledby='scroll-dialog-title'
         aria-describedby='scroll-dialog-description'
      >
         <div style={{ width: '800px', overflowX: 'hidden' }}>
            <SinglePost
               isTextFieldActive={true}
               CommentsComponent={
                  <>
                     <AllCommentsComponent isLoading={isLoading} />
                     <AddComment postId={_id} reference={commentRef} />
                  </>
               }
            >
               {children}
            </SinglePost>
         </div>
      </Dialog>
   )
}

export default CommentDialog
