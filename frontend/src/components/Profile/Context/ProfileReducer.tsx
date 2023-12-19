import type { IUserTypes } from '@/types/AuthTypes'
import type { IPost, IProfilePicture } from '@/types/PostTypes'
import { produce } from 'immer'

type UserDataActions = 'SET_INITIAL_USER_DATA'
export interface IBaseListAction {
   type: UserDataActions
   payload: IUserTypes
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
      case 'SET_INITIAL_USER_DATA':
         return {
            ...state,
            initialUserDataState: action.payload,
         }
      default:
         return state
   }
}
