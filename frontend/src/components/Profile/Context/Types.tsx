import type { IUserDetails } from '@/types/AuthTypes'
import type { IPost } from '@/types/PostTypes'

type UserDataActions = 'SET_INITIAL_USER_DATA' | 'SET_SELECTED_IMG' | 'ADD_WORKPLACE' | 'REMOVE_SINGLEWORK'

interface IUserContextType {
   _id: string
   userDetails: IUserDetails
   email: string
   firstName: string
   sureName: string
   posts: string[]
}

export interface IBaseListAction {
   type: UserDataActions
   payload: any
}

export interface InitialState {
   initialUserDataState: IUserContextType
   usersPosts: IPost[]
}

export const initialUserDataState: IUserContextType = {
   _id: '',
   email: '',
   firstName: '',
   posts: [],
   sureName: '',
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
      workPlaces: [
         { _id: '', city: '', companyName: '', position: '', description: '', startDate: '', endDate: null },
      ],
   },
}

export const initialProfileState: InitialState = {
   initialUserDataState,
   usersPosts: [],
}
