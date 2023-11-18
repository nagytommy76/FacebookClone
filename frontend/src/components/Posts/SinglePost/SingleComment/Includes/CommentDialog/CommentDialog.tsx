import React, { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

import Dialog from '@mui/material/Dialog'
import { StyledDialogContext } from './Styles'

import SinglePost from '../../../SinglePost'
import AddComment from '../../../AddComment/AddComment'
import AllCommentsComponent from './AllComments'
import useGetComments from './Hook/useGetComments'

const CommentDialog: React.FC<{
   onCloseFn: () => void
   children: React.ReactNode
   commentRef: React.MutableRefObject<HTMLTextAreaElement | undefined>
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
         maxWidth='md'
         scroll='body'
         open={isDialogOpen}
         onClose={onCloseFn}
         aria-labelledby='scroll-dialog-title'
         aria-describedby='scroll-dialog-description'
      >
         <StyledDialogContext>
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
         </StyledDialogContext>
      </Dialog>
   )
}

export default CommentDialog
