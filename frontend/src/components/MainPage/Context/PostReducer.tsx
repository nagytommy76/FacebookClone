import { produce } from 'immer'
import type { IPost } from '@/types/PostTypes'

export type PostAction =
   | 'REMOVE_SINGLE_LIKE'
   | 'ADD_POST_LIKE'
   | 'ADD_SINGLE_SOCKET_POST_LIKE'
   | 'SET_SINGLE_POST'
   | 'SET_COMMENTS_LENGTH'
   | 'ADD_UPLOADED_IMAGES'
   | 'UPDATE_POSTED_PICTURES'
   | 'UPDATE_POST_DESCRIPTION'

export interface IPostsAction {
   type: PostAction
   payload: any
}

export interface InitialPostsState {
   singlePost: IPost
   commentsLength: number
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
   postedPicturesPath: null,
   userId: {
      _id: '',
      email: '',
      firstName: '',
      sureName: '',
      userDetails: {
         dateOfBirth: { day: 0, month: 0, year: 0 },
         gender: 'female',
         profilePicturePath: [{ _id: '', isSelected: false, path: '' }],
         birthTown: '',
         homeTown: '',
         relationShip: { inRelation: false, isAlone: true },
         studies: {
            elementary: { from: 0, to: 0, name: '' },
            highSchool: { from: 0, to: 0, name: '' },
            university: { from: 0, to: 0, name: '' },
         },
         workPlaces: [],
      },
   },
}

export const initialPostsState: InitialPostsState = {
   singlePost: initialSinglePostData,
   commentsLength: 0,
}

export default function PostsReducer(state: InitialPostsState, action: IPostsAction): InitialPostsState {
   switch (action.type) {
      case 'SET_SINGLE_POST':
         const nextState = produce(state, (draft) => {
            draft.singlePost = action.payload
         })
         return nextState
      case 'ADD_POST_LIKE':
         const newPostLikes = produce(state, (draft) => {
            draft.singlePost.likes = action.payload
         })
         return newPostLikes
      case 'ADD_SINGLE_SOCKET_POST_LIKE':
         const socketPostLikes = produce(state, (draft) => {
            const { likes, toModifyPostId } = action.payload
            if (draft.singlePost._id === toModifyPostId) {
               draft.singlePost.likes = likes
            }
         })
         return socketPostLikes
      case 'REMOVE_SINGLE_LIKE':
         const removedPostLikes = produce(state, (draft) => {
            draft.singlePost.likes = action.payload
         })
         return removedPostLikes
      case 'SET_COMMENTS_LENGTH':
         const newLength = produce(state, (draft) => {
            draft.commentsLength = action.payload
         })
         return newLength
      case 'ADD_UPLOADED_IMAGES':
         const uploadedImgs = produce(state, (draft) => {
            if (!draft.singlePost.postedPicturesPath) return draft
            const newImgs = draft.singlePost.postedPicturesPath.concat(action.payload as string[])
            draft.singlePost.postedPicturesPath = newImgs
         })
         return uploadedImgs
      case 'UPDATE_POSTED_PICTURES':
         const updatedPictures = produce(state, (draft) => {
            draft.singlePost.postedPicturesPath = action.payload
         })
         return updatedPictures
      case 'UPDATE_POST_DESCRIPTION':
         const updatedDescription = produce(state, (draft) => {
            draft.singlePost.description = action.payload
         })
         return updatedDescription
      default:
         return state
   }
}
