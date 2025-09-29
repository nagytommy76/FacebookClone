import type { IPost, IProfilePicture } from '@/types/PostTypes'
import { produce } from 'immer'
import type { IBaseListAction, InitialState, IUserContextType } from './Types'

export default function UserDetailsReducer(state: InitialState, action: IBaseListAction): InitialState {
   switch (action.type) {
      case 'SET_INITIAL_USER_DATA':
         return {
            ...state,
            initialUserDataState: action.payload as IUserContextType,
         }
      case 'SET_SELECTED_IMG':
         const selectedImg = produce(state, (draft) => {
            draft.initialUserDataState.userDetails.profilePicturePath = action.payload as IProfilePicture[]
         })
         return selectedImg
      case 'ADD_WORKPLACE':
         const newWorkplace = produce(state, (draft) => {
            draft.initialUserDataState.userDetails.workPlaces = action.payload
         })
         return newWorkplace
      case 'REMOVE_SINGLEWORK':
         const removed = produce(state, (draft) => {
            draft.initialUserDataState.userDetails.workPlaces =
               draft.initialUserDataState.userDetails.workPlaces.filter((work) => work._id != action.payload)
         })
         return removed
      default:
         return state
   }
}
