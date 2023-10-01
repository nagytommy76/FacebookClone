import React, { useContext } from 'react'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'
import CommentContextProvider from '../../Context/CommentContext'
import useGetComments from './Hook/useGetComments'

import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'

import SinglePost from '../../../SinglePost'
import SingleComment from '../../SingleComment'
import AddComment from '../../../AddComment/AddComment'

const CommentDialog: React.FC<{
   onCloseFn: () => void
   children: React.ReactNode
   commentRef: React.MutableRefObject<null>
   isDialogOpen: boolean
   postId: string
}> = ({ onCloseFn, isDialogOpen, postId, commentRef, children }) => {
   const {
      postsReducer: {
         singlePost: { comments },
      },
   } = useContext(PostContext)
   const isLoading = useGetComments(postId, isDialogOpen)

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
                     <Divider sx={{ mt: 1, mb: 1 }} />
                     {isLoading ? (
                        <h1>Töltés...</h1>
                     ) : (
                        <>
                           {comments.map((comment) => (
                              <CommentContextProvider
                                 key={comment._id}
                                 singleComment={comment}
                                 postId={postId}
                              >
                                 <SingleComment />
                              </CommentContextProvider>
                           ))}
                        </>
                     )}

                     <AddComment postId={postId} reference={commentRef} />
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
