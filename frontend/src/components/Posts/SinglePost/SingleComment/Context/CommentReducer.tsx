import { produce } from 'immer'
import type { ICommentAnswers, IPostComment, IPostLike } from '@/types/LikeTypes'

type CommentAction =
   | 'SET_POSTID'
   | 'SET_COMMENT'
   | 'SET_COMMENT_LIKE'
   | 'SET_COMMENT_IMAGE'
   | 'SET_REMOVED_IMG_LINK'
   | 'ADD_ANSWER_LIKE'
   | 'SET_CHILD_ANSWERS'
   | 'ADD_SINGLE_COMMENT_ANSWER'
   | 'UPDATE_SINGLE_COMMENT_ANSWER'
   | 'UPDATE_COMMENT_TEXT'
   | 'REMOVE_SINGLE_COMMENT_LIKE'
   | 'REMOVE_ANSWER_LIKE'
   | 'REMOVE_COMMENT_IMAGE'

export interface ICommentAction {
   type: CommentAction
   payload: any
}

export interface InitialCommentState {
   singleComment: IPostComment
   removedImageLink: string | null
   postId: string
   childAnswers: ICommentAnswers[]
}

export const initialCommentData: IPostComment = {
   answeredAt: '',
   comment: 'teszt',
   _id: '',
   likes: [],
   commentImage: null,
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
   removedImageLink: null,
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
         const { commentAnswersIndex, updatedCommentAnswerLikes } = payload as {
            commentAnswersIndex: number
            updatedCommentAnswerLikes: IPostLike[]
         }
         const newAnswerLikes = produce(state, (draft) => {
            draft.singleComment.commentAnswers[commentAnswersIndex].likes = updatedCommentAnswerLikes
         })
         return newAnswerLikes
      case 'ADD_SINGLE_COMMENT_ANSWER':
         const newComments = produce(state, (draft) => {
            draft.singleComment.commentAnswers = payload
         })
         return newComments
      case 'SET_COMMENT_IMAGE':
         const addedImage = produce(state, (draft) => {
            draft.singleComment.commentImage = payload
         })
         return addedImage
      case 'UPDATE_SINGLE_COMMENT_ANSWER':
         const { answerID, modifiedText, commentImage } = payload as {
            answerID: string
            modifiedText: string
            commentImage: string | null
         }
         const UpdatedComments = produce(state, (draft) => {
            const foundAnswer = draft.singleComment.commentAnswers?.find((answer) => answer._id == answerID)
            if (foundAnswer) {
               foundAnswer.comment = modifiedText
               foundAnswer.commentImage = commentImage
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
            const removed = draft.singleComment.likes.filter((like) => like._id.toString() !== payload)
            draft.singleComment.likes = removed
         })
         return removedLikes
      case 'REMOVE_ANSWER_LIKE':
         const { answerId, likeIdToDelete } = payload
         const removedAnswerLikes = produce(state, (draft) => {
            const foundAnswerIndex = draft.singleComment.commentAnswers.findIndex(
               (answer) => answer._id.toString() === answerId.toString()
            )
            const modifiedAnswerLike = draft.singleComment.commentAnswers[foundAnswerIndex].likes.filter(
               (like) => like._id !== likeIdToDelete
            )
            draft.singleComment.commentAnswers[foundAnswerIndex].likes = modifiedAnswerLike
         })
         return removedAnswerLikes
      case 'REMOVE_COMMENT_IMAGE':
         const removedImage = produce(state, (draft) => {
            draft.removedImageLink = draft.singleComment.commentImage
            draft.singleComment.commentImage = null
         })
         return removedImage
      case 'SET_REMOVED_IMG_LINK':
         const removedImgLink = produce(state, (draft) => {
            draft.removedImageLink = null
         })
         return removedImgLink
      default:
         return state
   }
}
