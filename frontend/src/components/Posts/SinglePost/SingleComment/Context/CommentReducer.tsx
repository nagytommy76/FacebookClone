import { produce } from 'immer'
import type { ICommentAnswers, IPostComment, LikeTypes } from '@/types/LikeTypes'

type CommentAction =
   | 'SET_POSTID'
   | 'SET_COMMENT'
   | 'SET_COMMENT_LIKE'
   | 'ADD_ANSWER_LIKE'
   | 'SET_CHILD_ANSWERS'
   | 'ADD_SINGLE_COMMENT_ANSWER'
   | 'UPDATE_SINGLE_COMMENT_ANSWER'
   | 'UPDATE_COMMENT_TEXT'
   | 'REMOVE_SINGLE_COMMENT_LIKE'

export interface ICommentAction {
   type: CommentAction
   payload: any
}

export interface InitialCommentState {
   singleComment: IPostComment
   postId: string
   childAnswers: ICommentAnswers[]
}

export const initialCommentData: IPostComment = {
   answeredAt: '',
   comment: 'teszt',
   _id: '',
   likes: [],
   commentAnswers: [],
   userId: {
      _id: '',
      email: '',
      firstName: '',
      sureName: '',
      userDetails: {
         profilePicturePath: [
            {
               _id: '',
               isSelected: true,
               path: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/facebook-profile.jpg?alt=media&token=654bab74-a4a3-4eab-8fdb-e7e22f116c9a&_gl=1*55zcu2*_ga*MTIyMDgyODMyOC4xNjgwNjI4NDU2*_ga_CW55HF8NVT*MTY4NjE2MDc5NS4xMC4xLjE2ODYxNjExMjIuMC4wLjA.',
            },
         ],
      },
   },
}
export const initialCommentState: InitialCommentState = {
   singleComment: initialCommentData,
   postId: '',
   childAnswers: [],
}

export default function CommentReducer(
   state: InitialCommentState,
   { payload, type }: ICommentAction
): InitialCommentState {
   switch (type) {
      case 'SET_POSTID':
         return {
            ...state,
            postId: payload,
         }
      case 'SET_COMMENT':
         const nextState = produce(state, (draft) => {
            draft.singleComment = payload
         })
         return nextState
      case 'SET_COMMENT_LIKE':
         const nextLikeState = produce(state, (draft) => {
            draft.singleComment.likes = payload
         })
         return nextLikeState
      case 'ADD_ANSWER_LIKE':
         const { commentAnswerId, reactionType } = payload as {
            commentAnswerId: string
            reactionType: LikeTypes
         }
         const newAnswerLikes = produce(state, (draft) => {
            const foundAnswer = draft.singleComment.commentAnswers?.find(
               (answer) => answer._id == commentAnswerId
            )
            console.log(commentAnswerId)
            console.log(draft.singleComment)
            // draft.singleComment.commentAnswers
         })
         return newAnswerLikes
      case 'ADD_SINGLE_COMMENT_ANSWER':
         const newComments = produce(state, (draft) => {
            draft.singleComment.commentAnswers = payload
         })
         return newComments
      case 'UPDATE_SINGLE_COMMENT_ANSWER':
         const { answerID, modifiedText } = payload as { answerID: string; modifiedText: string }
         const UpdatedComments = produce(state, (draft) => {
            const foundAnswer = draft.singleComment.commentAnswers?.find((answer) => answer._id == answerID)
            if (foundAnswer) {
               foundAnswer.comment = modifiedText
            }
         })
         return UpdatedComments
      case 'SET_CHILD_ANSWERS':
         const newAnswers = produce(state, (draft) => {
            draft.childAnswers = payload
         })
         return newAnswers
      case 'UPDATE_COMMENT_TEXT':
         const updatedCommentText = produce(state, (draft) => {
            draft.singleComment.comment = payload
         })
         return updatedCommentText
      case 'REMOVE_SINGLE_COMMENT_LIKE':
         const removedLikes = produce(state, (draft) => {
            const removed = draft.singleComment.likes.filter((like) => like._id.toString() == payload)
            draft.singleComment.likes = removed
         })
         return removedLikes
      default:
         return state
   }
}
