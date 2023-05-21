import { produce } from 'immer'
import type { IPost } from '../../Posts/Types'

export enum PostsActions {
   SET_POSTS = 'SET_POSTS',
}

export interface IPostsAction {
   type: PostsActions
   payload: any
}

export interface InitialPostsState {
   posts: IPost[]
}

export const initialPostsData: IPost[] = [
   {
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
   },
]
export const initialPostsState: InitialPostsState = {
   posts: initialPostsData,
}

export default function PostsReducer(state: InitialPostsState, action: IPostsAction): InitialPostsState {
   switch (action.type) {
      case PostsActions.SET_POSTS:
         const nextState = produce(state, (draft) => {
            draft.posts = action.payload
         })
         return nextState
      default:
         return state
   }
}
