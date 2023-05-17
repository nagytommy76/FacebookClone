import type { IUserTypes } from '../../Auth/AuthTypes'
import type { IProfilePicture } from '../../Posts/Types'

export enum UserDataActions {
   GET_PROFILE_PICTURE = 'GET_PROFILE_PICTURE',
   GET_SELECTED_PROFILE_PICTURE = 'GET_SELECTED_PROFILE_PICTURE',
   SET_USER_PROFILE_PICUTRES = 'SET_USER_PROFILE_PICUTRES',
}

export interface IBaseListAction {
   type: UserDataActions
   payload: any
}

export interface InitialState {
   initialUserDataState: IUserTypes
   getEveryProfilePictures: () => IProfilePicture[]
   getSelectedProfilePicture: () => IProfilePicture | undefined
   setUserProfilePicutres: (newProfilePicturePath: IProfilePicture[]) => void
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
   getEveryProfilePictures: () => {
      return [{ _id: '', isSelected: false, path: '' }]
   },
   getSelectedProfilePicture: () => {
      return { _id: '', isSelected: false, path: '' }
   },
   setUserProfilePicutres: () => {},
}

export default function UserDetailsReducer(state: InitialState, action: IBaseListAction): InitialState {
   switch (action.type) {
      case UserDataActions.GET_PROFILE_PICTURE:
         return {
            ...state,
            getEveryProfilePictures: () => state.initialUserDataState.userDetails.profilePicturePath,
         }
      case UserDataActions.GET_SELECTED_PROFILE_PICTURE:
         return {
            ...state,
            getSelectedProfilePicture: () => {
               return state.initialUserDataState.userDetails.profilePicturePath.find(
                  (image) => image.isSelected
               )
            },
         }
      case UserDataActions.SET_USER_PROFILE_PICUTRES:
         return {
            ...state,
            setUserProfilePicutres: (newProfilePicturePath) => {
               state.initialUserDataState.userDetails.profilePicturePath = newProfilePicturePath
            },
         }
      default:
         return state
   }
}
