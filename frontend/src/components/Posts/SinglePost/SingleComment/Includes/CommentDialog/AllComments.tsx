import React, { useContext } from 'react'
import CommentContextProvider from '@/CommentContext/CommentContext'
import AnswerContextProvider from '@/AnswersContext/AnswersContext'
import { AllCommentsContext } from '@/AllCommentContext/AllCommentsContext'
import { PostContext } from '@/src/components/MainPage/Context/PostContextProvider'

import SingleComment from '../../SingleComment'
import Divider from '@mui/material/Divider'

import SingleCommentSkeleton from '@/Skeletons/Comments/SingleComment'

import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'

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
            <SingleCommentSkeleton />
         ) : (
            <TransitionGroup>
               {AllComments.map((comment) => (
                  <Collapse key={comment._id} timeout={150}>
                     <CommentContextProvider singleComment={comment} postId={_id}>
                        <AnswerContextProvider
                           commentId={comment._id}
                           postId={_id}
                           allCommentAnswers={comment.commentAnswers}
                        >
                           <SingleComment />
                        </AnswerContextProvider>
                     </CommentContextProvider>
                  </Collapse>
               ))}
            </TransitionGroup>
         )}
      </>
   )
}

export default AllComments
