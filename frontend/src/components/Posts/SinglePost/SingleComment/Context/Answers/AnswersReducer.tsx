import { produce } from 'immer'
import type { ICommentAnswers, IPostLike } from '@/src/types/LikeTypes'

type AnswerActions =
   | 'SET_ANSWERS'
   | 'SET_POST_ID'
   | 'SET_COMMENT_ID'
   | 'SET_REMOVED_ANSWER_IMG_LINK'
   | 'ADD_ANSWER_LIKE'
   | 'ADD_SINGLE_COMMENT_ANSWER'
   | 'UPDATE_SINGLE_COMMENT_ANSWER'
   // | 'UPDATE_ANSWER_TEXT'
   | 'REMOVE_ANSWER_LIKE'
   | 'REMOVE_ANSWER_IMAGE'

export interface IAnswerAction {
   type: AnswerActions
   payload: any
}

export interface InitialAnswerState {
   singleAnswer: ICommentAnswers
   removedAnswerImageLink: string | null
   commentAnswers: ICommentAnswers[]
   postId: string
   commentId: string
}

export const initialAnswerState: InitialAnswerState = {
   singleAnswer: {} as ICommentAnswers,
   removedAnswerImageLink: null,
   commentAnswers: [],
   postId: '',
   commentId: '',
}

export default function AnswersReducer(
   state: InitialAnswerState,
   { payload, type }: IAnswerAction
): InitialAnswerState {
   switch (type) {
      case 'SET_ANSWERS':
         const nextState = produce(state, (draft) => {
            draft.commentAnswers = payload
         })
         return nextState
      case 'SET_POST_ID':
         const newPostId = produce(state, (draft) => {
            draft.postId = payload
         })
         return newPostId
      case 'SET_COMMENT_ID':
         const newCommentId = produce(state, (draft) => {
            draft.commentId = payload
         })
         return newCommentId
      case 'ADD_ANSWER_LIKE':
         const { commentAnswersIndex, updatedCommentAnswerLikes } = payload as {
            commentAnswersIndex: number
            updatedCommentAnswerLikes: IPostLike[]
         }
         const newAnswerLikes = produce(state, (draft) => {
            draft.commentAnswers[commentAnswersIndex].likes = updatedCommentAnswerLikes
         })
         return newAnswerLikes
      case 'ADD_SINGLE_COMMENT_ANSWER':
         const newComments = produce(state, (draft) => {
            draft.commentAnswers = payload
         })
         return newComments
      case 'SET_REMOVED_ANSWER_IMG_LINK':
         const removedAnswerImgLink = produce(state, (draft) => {
            draft.removedAnswerImageLink = null
         })
         return removedAnswerImgLink
      case 'UPDATE_SINGLE_COMMENT_ANSWER':
         const { answerID, modifiedText, commentImage } = payload as {
            answerID: string
            modifiedText: string
            commentImage: string | null
         }
         const UpdatedComments = produce(state, (draft) => {
            const foundAnswer = draft.commentAnswers?.find((answer) => answer._id == answerID)
            if (foundAnswer) {
               foundAnswer.comment = modifiedText
               foundAnswer.commentImage = commentImage
            }
         })
         return UpdatedComments
      case 'REMOVE_ANSWER_LIKE':
         const { answerId, likeIdToDelete } = payload
         const removedAnswerLikes = produce(state, (draft) => {
            const foundAnswerIndex = draft.commentAnswers.findIndex(
               (answer) => answer._id.toString() === answerId.toString()
            )
            const modifiedAnswerLike = draft.commentAnswers[foundAnswerIndex].likes.filter(
               (like) => like._id !== likeIdToDelete
            )
            draft.commentAnswers[foundAnswerIndex].likes = modifiedAnswerLike
         })
         return removedAnswerLikes
      case 'REMOVE_ANSWER_IMAGE':
         const removedAnswerImage = produce(state, (draft) => {
            const foundAnswerIndex = draft.commentAnswers.findIndex(
               (answer) => answer._id.toString() === payload
            )
            draft.removedAnswerImageLink = draft.commentAnswers[foundAnswerIndex].commentImage
            draft.commentAnswers[foundAnswerIndex].commentImage = null
         })
         return removedAnswerImage
      default:
         return state
   }
}
