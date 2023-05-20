import type { IUserTypes } from '../../Auth/AuthTypes'
import type { IProfilePicture } from '../../Posts/Types'
import { produce } from 'immer'

export enum UserDataActions {
   SET_USER_PROFILE_PICUTRES = 'SET_USER_PROFILE_PICUTRES',
   SET_INITIAL_USER_DATA = 'SET_INITIAL_USER_DATA',
}

export interface IBaseListAction {
   type: UserDataActions
   payload: IUserTypes | IProfilePicture[] | any
}

export interface InitialState {
   initialUserDataState: IUserTypes
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
}

export default function UserDetailsReducer(state: InitialState, action: IBaseListAction): InitialState {
   switch (action.type) {
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
      default:
         return state
   }
}
