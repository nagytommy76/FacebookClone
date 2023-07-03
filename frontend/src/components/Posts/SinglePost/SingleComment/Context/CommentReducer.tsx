import { produce } from 'immer'
import type { ICommentAnswers, IPostComment } from '@/types/LikeTypes'

export enum CommentActions {
   SET_POSTID = 'SET_POSTID',
   SET_COMMENT = 'SET_COMMENT',
   SET_COMMENT_LIKE = 'SET_COMMENT_LIKE',
   SET_CHILD_ANSWERS = 'SET_CHILD_ANSWERS',
   ADD_SINGLE_COMMENT_ANSWER = 'ADD_SINGLE_COMMENT_ANSWER',
}

export interface ICommentAction {
   type: CommentActions
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
         firstName: '',
         profilePicturePath: [
            {
               _id: '',
               isSelected: true,
               path: 'https://firebasestorage.googleapis.com/v0/b/facebookimagestorage.appspot.com/o/facebook-profile.jpg?alt=media&token=654bab74-a4a3-4eab-8fdb-e7e22f116c9a&_gl=1*55zcu2*_ga*MTIyMDgyODMyOC4xNjgwNjI4NDU2*_ga_CW55HF8NVT*MTY4NjE2MDc5NS4xMC4xLjE2ODYxNjExMjIuMC4wLjA.',
            },
         ],
         sureName: '',
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
   action: ICommentAction
): InitialCommentState {
   switch (action.type) {
      case CommentActions.SET_POSTID:
         return {
            ...state,
            postId: action.payload,
         }
      case CommentActions.SET_COMMENT:
         const nextState = produce(state, (draft) => {
            draft.singleComment = action.payload
         })
         return nextState
      case CommentActions.SET_COMMENT_LIKE:
         const nextLikeState = produce(state, (draft) => {
            draft.singleComment.likes = action.payload
         })
         return nextLikeState
      case CommentActions.ADD_SINGLE_COMMENT_ANSWER:
         const newComments = produce(state, (draft) => {
            draft.singleComment.commentAnswers = action.payload
         })
         return newComments
      case CommentActions.SET_CHILD_ANSWERS:
         const newAnswers = produce(state, (draft) => {
            draft.childAnswers = action.payload
         })
         return newAnswers
      default:
         return state
   }
}
