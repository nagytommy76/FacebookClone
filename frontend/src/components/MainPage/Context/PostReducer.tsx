import { produce } from 'immer'
import type { IPost } from '@/types/PostTypes'

export type PostAction =
   | 'REMOVE_SINGLE_COMMENT'
   | 'REMOVE_SINGLE_LIKE'
   | 'ADD_POST_LIKE'
   | 'ADD_NEW_COMMENT'
   | 'SET_SINGLE_POST'
   | 'SET_COMMENTS'

export interface IPostsAction {
   type: PostAction
   payload: any
}

export interface InitialPostsState {
   singlePost: IPost
}

export const initialSinglePostData: IPost = {
   _id: '',
   createdAt: '',
   updatedAt: '',
   comments: [],
   description: '',
   likes: [
      {
         _id: '',
         userId: '',
         reactionType: {
            isAngry: false,
            isCare: false,
            isHaha: false,
            isLike: false,
            isLove: false,
            isSad: false,
            isWow: false,
         },
      },
   ],
   postedPicturesPath: [''],
   userId: {
      _id: '',
      email: '',
      firstName: '',
      sureName: '',
      userDetails: {
         dateOfBirth: { day: 0, month: 0, year: 0 },
         gender: 'female',
         profilePicturePath: [{ _id: '', isSelected: false, path: '' }],
      },
   },
}

export const initialPostsState: InitialPostsState = {
   singlePost: initialSinglePostData,
}

export default function PostsReducer(state: InitialPostsState, action: IPostsAction): InitialPostsState {
   switch (action.type) {
      case 'SET_COMMENTS':
         const nextComment = produce(state, (draft) => {
            draft.singlePost.comments = action.payload
         })
         return nextComment
      case 'SET_SINGLE_POST':
         const nextState = produce(state, (draft) => {
            draft.singlePost = action.payload
         })
         return nextState
      case 'ADD_NEW_COMMENT':
         const newComments = produce(state, (draft) => {
            draft.singlePost.comments = action.payload
         })
         return newComments
      case 'ADD_POST_LIKE':
         const newPostLikes = produce(state, (draft) => {
            draft.singlePost.likes = action.payload
         })
         return newPostLikes
      case 'REMOVE_SINGLE_LIKE':
         const removedPostLikes = produce(state, (draft) => {
            const modified = draft.singlePost.likes.filter(
               (like) => like._id.toString() === action.payload.toString()
            )
            draft.singlePost.likes = modified
         })
         return removedPostLikes
      case 'REMOVE_SINGLE_COMMENT':
         const removedComments = produce(state, (draft) => {
            draft.singlePost.comments = draft.singlePost.comments.filter(
               (comment) => comment._id !== action.payload
            )
         })
         return removedComments
      default:
         return state
   }
}
