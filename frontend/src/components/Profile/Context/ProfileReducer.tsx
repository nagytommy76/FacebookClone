import type { IUserTypes } from '@/types/AuthTypes'
import type { IPost, IProfilePicture } from '@/types/PostTypes'
import { produce } from 'immer'

export enum UserDataActions {
   SET_USERS_POSTS = 'SET_USERS_POSTS',
   SET_USER_PROFILE_PICUTRES = 'SET_USER_PROFILE_PICUTRES',
   SET_INITIAL_USER_DATA = 'SET_INITIAL_USER_DATA',
   ADD_NEW_POST = 'ADD_NEW_POST',
}

export interface IBaseListAction {
   type: UserDataActions
   payload: IUserTypes | IProfilePicture[] | any
}

export interface InitialState {
   initialUserDataState: IUserTypes
   usersPosts: IPost[]
}

export const initialUserDataState: IUserTypes = {
   _id: '',
   createdAt: 0,
   email: '',
   firstName: '',
   friends: [{ userId: '' }],
   isEmailConfirmed: false,
   password: '',
   posts: [],
   sureName: '',
   updatedAt: 0,
   userDetails: {
      birthTown: '',
      dateOfBirth: { day: 0, month: 0, year: 0 },
      gender: 'female',
      homeTown: '',
      profilePicturePath: [{ _id: '', isSelected: false, path: '' }],
      relationShip: { inRelation: false, isAlone: true },
      studies: {
         elementary: { from: 2000, name: '', to: 2000 },
         highSchool: { from: 2000, name: '', to: 2000 },
         university: { from: 2000, name: '', to: 2000 },
      },
      workPlaces: [{ city: '', companyName: '', from: 2000, post: '', to: 2000 }],
   },
}

export const initialProfileState: InitialState = {
   initialUserDataState,
   usersPosts: [],
}

export default function UserDetailsReducer(state: InitialState, action: IBaseListAction): InitialState {
   switch (action.type) {
      case UserDataActions.SET_USERS_POSTS:
         const usersPostsState = produce(state, (draft) => {
            draft.usersPosts = action.payload
         })
         return usersPostsState
      case UserDataActions.SET_INITIAL_USER_DATA:
         return {
            ...state,
            initialUserDataState: action.payload,
         }
      case UserDataActions.SET_USER_PROFILE_PICUTRES:
         const nextState = produce(state, (draft) => {
            draft.initialUserDataState.userDetails.profilePicturePath = action.payload
         })
         return nextState
      case UserDataActions.ADD_NEW_POST:
         const withNewPost = produce(state, (draft) => {
            draft.initialUserDataState.posts.push(action.payload)
         })
         return withNewPost
      default:
         return state
   }
}
