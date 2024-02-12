import type { IUserTypes } from '@/types/AuthTypes'
import type { IPost } from '@/types/PostTypes'

type UserDataActions = 'SET_INITIAL_USER_DATA' | 'SET_SELECTED_IMG' | 'ADD_WORKPLACE'

export interface IBaseListAction {
   type: UserDataActions
   payload: any
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
      workPlaces: [
         { _id: '', city: '', companyName: '', position: '', description: '', startDate: '', endDate: null },
      ],
   },
}

export const initialProfileState: InitialState = {
   initialUserDataState,
   usersPosts: [],
}
